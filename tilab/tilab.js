/*!
 * TiLab.js v0.6a
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * <script src="https://cdn.abros.dev/tilab/tilab.js"></script>
 */

(function (window) {
  if (!window.TiLab) {
    const Constants = {
      CDN: "https://cdn.abros.dev",
      CONSOLE_TYPES: ["log", "info", "trace", "warn", "error"],
    };

    const now = () => Date.now();

    function loadScript(src, async = true) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = async;
        script.onload = () => {
          resolve(src);
        };
        script.onerror = () => {
          reject(new Error(`Не удалось загрузить скрипт: ${src}`));
        };
        document.head.appendChild(script);
      });
    }

    const ConsoleModule = () => {
      const storage = [];

      const addEntry = (type, name, message, data) => {
        const entry = {
          id: now() + Math.random(),
          time: new Date().toLocaleString(),
          type: type || "info",
          name: name || "Система",
          message: message || "",
          data,
        };
        storage.push(entry);
        return entry;
      };

      const console = {
        storage,
        clear: () => {
          storage.length = 0;
        },
      };

      Constants.CONSOLE_TYPES.forEach((type) => {
        console[type] = (name, message, data) =>
          addEntry(type, name, message, data);
      });

      return console;
    };

    const LibraryModule = () => {
      const storage = [];

      const init = (libName, callback) => {
        const existingLib = storage.find((lib) => lib.name === libName);
        if (existingLib?.isLoaded) {
          if (typeof callback === "function") {
            const exports = existingLib.exports || {};
            callback(...Object.values(exports));
          }
          return Promise.resolve(existingLib.exports);
        }

        const libRecord = {
          name: libName,
          meta: {
            name: "",
            desc: "",
          },
          isLoaded: false,
          isLoading: true,
          timestamp: now(),
          exports: {},
          error: null,
        };
        storage.push(libRecord);
        window.TiLabExport = (libData) => {
          libRecord.meta = {
            name: libData.name,
            desc: libData.desc,
          };
          Object.assign(libRecord.exports, libData.exports);
        };

        return loadScript(`${Constants.CDN}/tilab/libs/${libName}.js`)
          .then(() => {
            delete window.TiLabExport;

            libRecord.isLoaded = true;
            libRecord.isLoading = false;
            libRecord.loadedAt = now();

            if (typeof callback === "function") {
              callback(...Object.values(libRecord.exports));
            }

            return libRecord.exports;
          })
          .catch((error) => {
            delete window.TiLabExport;

            libRecord.isLoaded = false;
            libRecord.isLoading = false;
            libRecord.error = error.message;

            TiLab.console.error(
              "TiLab",
              `Ошибка загрузки библиотеки ${libName}:`,
              error,
            );
            throw error;
          });
      };

      const lib = {
        storage,
        init,
      };
      return lib;
    };

    const JSXModule = (queryModule) => {
      const storage = [];

      const jsxWrapper = (callback) => {
        return import(`${Constants.CDN}/tilab/services/preact.module.js`)
          .then((module) => {
            const {
              html,
              render,
              Component,
              h,
              useState,
              useEffect,
              useRef,
              useMemo,
              useCallback,
              useContext,
              createContext,
            } = module;

            if (!html || !render) {
              throw new Error("htm/preact не загружен или функции недоступны");
            }

            window.TiLab.jsx._hooks = {
              useState,
              useEffect,
              useRef,
              useMemo,
              useCallback,
              useContext,
              createContext,
            };

            callback({
              html,
              render,
              Component,
              h,
              useState,
              useEffect,
              useRef,
              useMemo,
              useCallback,
              useContext,
              createContext,
              useQuery: queryModule?.useQuery,
              useMutation: queryModule?.useMutation,
            });

            const componentRecord = {
              id: now() + Math.random(),
              name: callback.name || "Anonymous",
              createdAt: now(),
            };
            storage.push(componentRecord);
          })
          .catch((error) => {
            console.error("Ошибка загрузки Preact:", error);
            throw error;
          });
      };

      const jsx = {
        storage,
        create: jsxWrapper,
      };

      return jsx;
    };

    const QueryModule = () => {
      const queries = new Map();
      const subscribers = new Map();
      let listenersAttached = false;

      const defaultOptions = {
        staleTime: 0,
        cacheTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (attempt) => Math.min(1000 * 2 ** (attempt - 1), 30000),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
      };

      const createQueryKey = (key) => {
        return typeof key === "string" ? key : JSON.stringify(key);
      };

      const delay = (ms) =>
        new Promise((resolve) => {
          setTimeout(resolve, ms);
        });

      const resolveOptions = (options) => ({
        ...defaultOptions,
        ...options,
      });

      const notifySubscribers = (queryKey) => {
        const query = queries.get(queryKey);
        const querySubscribers = subscribers.get(queryKey) || [];
        querySubscribers.forEach((callback) => callback(query));
      };

      const ensureEntry = (queryKey) => {
        if (!queries.has(queryKey)) {
          queries.set(queryKey, {
            data: undefined,
            error: null,
            status: "idle",
            isLoading: false,
            isFetching: false,
            updatedAt: 0,
            options: null,
            queryFn: null,
            cacheTimeoutId: null,
          });
        }
        return queries.get(queryKey);
      };

      const setQueryState = (queryKey, patch) => {
        const current = ensureEntry(queryKey);
        const next = { ...current, ...patch };
        queries.set(queryKey, next);
        notifySubscribers(queryKey);
      };

      const setQueryData = (queryKey, updater) => {
        const current = ensureEntry(queryKey);
        const nextData =
          typeof updater === "function" ? updater(current.data) : updater;
        setQueryState(queryKey, {
          data: nextData,
          error: null,
          status: "success",
          isLoading: false,
          isFetching: false,
          updatedAt: now(),
        });
      };

      const getQueryData = (queryKey) => {
        return queries.get(queryKey)?.data;
      };

      const cancelCacheCleanup = (queryKey) => {
        const entry = queries.get(queryKey);
        if (entry?.cacheTimeoutId) {
          clearTimeout(entry.cacheTimeoutId);
          entry.cacheTimeoutId = null;
        }
      };

      const scheduleCacheCleanup = (queryKey) => {
        const entry = queries.get(queryKey);
        if (!entry) return;

        const cacheTime = entry.options?.cacheTime ?? defaultOptions.cacheTime;
        if (cacheTime === Infinity) return;

        cancelCacheCleanup(queryKey);
        if (cacheTime <= 0) {
          queries.delete(queryKey);
          notifySubscribers(queryKey);
          return;
        }

        entry.cacheTimeoutId = setTimeout(() => {
          queries.delete(queryKey);
          notifySubscribers(queryKey);
        }, cacheTime);
      };

      const isStale = (entry, options) => {
        const staleTime = options?.staleTime ?? defaultOptions.staleTime;
        if (staleTime === Infinity) return false;
        return now() - entry.updatedAt > staleTime;
      };

      const shouldRetry = (retry, attempt, error) => {
        if (retry === false || retry === 0) return false;
        if (typeof retry === "function") return retry(attempt, error);
        if (typeof retry === "number") return attempt <= retry;
        return attempt <= defaultOptions.retry;
      };

      const getRetryDelay = (retryDelay, attempt) => {
        if (typeof retryDelay === "function") return retryDelay(attempt);
        if (typeof retryDelay === "number") return retryDelay;
        return defaultOptions.retryDelay(attempt);
      };

      const fetchQuery = async (queryKey, options, force = false) => {
        const entry = ensureEntry(queryKey);
        const mergedOptions = resolveOptions(options);

        entry.options = mergedOptions;
        entry.queryFn = options.queryFn;

        const hasData = entry.data !== undefined;

        if (!force && hasData && !isStale(entry, mergedOptions) && !entry.error)
          return entry.data;

        setQueryState(queryKey, {
          isFetching: true,
          isLoading: !hasData,
          status: !hasData ? "loading" : entry.status,
          error: null,
        });

        const run = async (attempt = 1) => {
          try {
            const data = await Promise.resolve(entry.queryFn());
            setQueryState(queryKey, {
              data,
              error: null,
              status: "success",
              isLoading: false,
              isFetching: false,
              updatedAt: now(),
            });
            return data;
          } catch (error) {
            if (shouldRetry(mergedOptions.retry, attempt, error)) {
              const wait = getRetryDelay(mergedOptions.retryDelay, attempt);
              await delay(wait);
              return run(attempt + 1);
            }
            setQueryState(queryKey, {
              error,
              status: "error",
              isLoading: false,
              isFetching: false,
              updatedAt: now(),
            });
            throw error;
          }
        };

        return run();
      };

      const subscribe = (queryKey, callback) => {
        if (!subscribers.has(queryKey)) {
          subscribers.set(queryKey, []);
        }
        subscribers.get(queryKey).push(callback);

        cancelCacheCleanup(queryKey);

        const query = queries.get(queryKey);
        if (query) {
          callback(query);
        }

        return () => {
          const querySubscribers = subscribers.get(queryKey) || [];
          const index = querySubscribers.indexOf(callback);
          if (index > -1) {
            querySubscribers.splice(index, 1);
          }
          if (querySubscribers.length === 0) {
            scheduleCacheCleanup(queryKey);
          }
        };
      };

      const refetchActiveQueries = (eventType) => {
        for (const [key, entry] of queries) {
          const active = (subscribers.get(key) || []).length > 0;
          if (!active || entry.isFetching) continue;
          if (entry.options?.enabled === false) continue;

          if (
            eventType === "focus" &&
            entry.options?.refetchOnWindowFocus === false
          ) {
            continue;
          }
          if (
            eventType === "reconnect" &&
            entry.options?.refetchOnReconnect === false
          ) {
            continue;
          }
          fetchQuery(key, entry.options, true).catch(() => {});
        }
      };

      const attachListeners = () => {
        if (listenersAttached) return;
        listenersAttached = true;

        window.addEventListener("focus", () => {
          refetchActiveQueries("focus");
        });
        document.addEventListener("visibilitychange", () => {
          if (!document.hidden) refetchActiveQueries("focus");
        });
        window.addEventListener("online", () => {
          refetchActiveQueries("reconnect");
        });
      };

      const useQuery = (options) => {
        const {
          queryKey,
          queryFn,
          enabled = true,
          staleTime,
          cacheTime,
          retry,
          retryDelay,
          refetchOnWindowFocus,
          refetchOnReconnect,
        } = options;

        const { useState, useEffect } = window.TiLab.jsx._hooks || {};

        if (!useState || !useEffect) {
          console.error(
            "useQuery: хуки недоступны. Используйте внутри TiLab.jsx",
          );
          return { data: undefined, isLoading: false, error: null };
        }

        const [state, setState] = useState({
          data: undefined,
          isLoading: false,
          error: null,
          isSuccess: false,
          isError: false,
          isFetching: false,
          status: "idle",
        });

        const fullQueryKey = createQueryKey(queryKey);

        useEffect(() => {
          attachListeners();
          if (!enabled) return;

          const mergedOptions = resolveOptions({
            queryKey: fullQueryKey,
            queryFn,
            enabled,
            staleTime,
            cacheTime,
            retry,
            retryDelay,
            refetchOnWindowFocus,
            refetchOnReconnect,
          });

          const unsubscribe = subscribe(fullQueryKey, (query) => {
            if (!query) return;

            setState({
              data: query.data,
              isLoading: query.isLoading,
              error: query.error,
              isSuccess: query.status === "success",
              isError: query.status === "error",
              isFetching: query.isFetching,
              status: query.status,
            });
          });

          const current = ensureEntry(fullQueryKey);
          current.options = mergedOptions;
          current.queryFn = queryFn;

          if (
            !current.isFetching &&
            (current.data === undefined || isStale(current, mergedOptions))
          ) {
            fetchQuery(fullQueryKey, current.options).catch(() => {});
          }

          return unsubscribe;
        }, [
          fullQueryKey,
          queryFn,
          enabled,
          staleTime,
          cacheTime,
          retry,
          retryDelay,
          refetchOnWindowFocus,
          refetchOnReconnect,
        ]);

        return state;
      };

      const useMutation = (options) => {
        const {
          mutationFn,
          onMutate,
          onSuccess,
          onError,
          onSettled,
          retry,
          retryDelay,
        } = options;

        const { useState, useCallback } = window.TiLab.jsx._hooks || {};

        if (!useState || !useCallback) {
          console.error(
            "useMutation: хуки недоступны. Используйте внутри TiLab.jsx",
          );
          return { mutate: () => {}, isLoading: false, error: null };
        }

        const [state, setState] = useState({
          data: undefined,
          isLoading: false,
          error: null,
          isSuccess: false,
          isError: false,
          status: "idle",
        });

        const mutate = useCallback(
          async (variables) => {
            setState((prev) => ({
              ...prev,
              isLoading: true,
              isError: false,
              error: null,
              status: "loading",
            }));

            let context;
            if (onMutate) {
              context = onMutate(variables, {
                getQueryData: (key) => getQueryData(createQueryKey(key)),
                setQueryData: (key, updater) =>
                  setQueryData(createQueryKey(key), updater),
              });
              if (typeof context === "function") {
                context = { rollback: context };
              }
            }

            const retryOption = retry ?? defaultOptions.retry;
            const retryDelayOption = retryDelay ?? defaultOptions.retryDelay;

            const run = async (attempt = 1) => {
              try {
                const data = await Promise.resolve(mutationFn(variables));
                setState({
                  data,
                  isLoading: false,
                  error: null,
                  isSuccess: true,
                  isError: false,
                  status: "success",
                });
                if (onSuccess) onSuccess(data, variables, context);
                if (onSettled) onSettled(data, null, variables, context);
                return data;
              } catch (error) {
                if (shouldRetry(retryOption, attempt, error)) {
                  const wait = getRetryDelay(retryDelayOption, attempt);
                  await delay(wait);
                  return run(attempt + 1);
                }
                if (context?.rollback) {
                  context.rollback();
                }
                setState({
                  data: undefined,
                  isLoading: false,
                  error,
                  isSuccess: false,
                  isError: true,
                  status: "error",
                });
                if (onError) onError(error, variables, context);
                if (onSettled) onSettled(undefined, error, variables, context);
                throw error;
              }
            };

            return run();
          },
          [
            mutationFn,
            onMutate,
            onSuccess,
            onError,
            onSettled,
            retry,
            retryDelay,
          ],
        );

        const reset = useCallback(() => {
          setState({
            data: undefined,
            isLoading: false,
            error: null,
            isSuccess: false,
            isError: false,
            status: "idle",
          });
        }, []);

        return { ...state, mutate, reset };
      };

      return {
        useQuery,
        useMutation,
      };
    };

    const createTiLab = () => {
      const query = QueryModule();
      return {
        version: "0.6 (alpha)",
        copyright: "© 2025 Daniel Abros",
        site: "https://abros.dev",
        console: ConsoleModule(),
        lib: LibraryModule(),
        jsx: JSXModule(query).create,
      };
    };

    window.TiLab = createTiLab();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("tilab") === "") {
      loadScript(`${Constants.CDN}/tilab/services/panel.js`);
    }
  }
})(window);
