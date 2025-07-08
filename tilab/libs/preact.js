/*!
 * Preact for TiLab
 * Lightweight React alternative with JSX support
 */

(function (window) {
  // JSX трансформация
  const transformJSX = (jsxString) => {
    if (typeof jsxString !== "string") return jsxString;

    return jsxString
      .replace(/\s*<>\s*/g, "")
      .replace(/\s*<\/>\s*/g, "")
      .replace(/\n\s*/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\$\{([^}]+)\}/g, (match, expression) => {
        try {
          return eval(expression);
        } catch (error) {
          console.error("Ошибка интерполяции JSX:", error);
          return "";
        }
      });
  };

  // Минимальная реализация Preact для TiLab
  const h = (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props || {}, children);
    }

    const element = document.createElement(tag);

    if (props) {
      Object.keys(props).forEach((key) => {
        if (key === "className") {
          element.className = props[key];
        } else if (key.startsWith("on")) {
          element.addEventListener(key.toLowerCase().substring(2), props[key]);
        } else {
          element.setAttribute(key, props[key]);
        }
      });
    }

    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        element.appendChild(child);
      }
    });

    return element;
  };

  // JSX функция для создания элементов
  const jsx = (tag, props, ...children) => {
    if (tag === "") return children.join("");

    const attributes = [];
    if (props) {
      Object.keys(props).forEach((key) => {
        if (key !== "children") {
          const value = props[key];
          if (typeof value === "boolean") {
            if (value) attributes.push(key);
          } else {
            attributes.push(`${key}="${value}"`);
          }
        }
      });
    }

    const attrString = attributes.length > 0 ? " " + attributes.join(" ") : "";
    return `<${tag}${attrString}>${children.join("")}</${tag}>`;
  };

  // Экспорт через TiLabExport
  if (window.TiLabExport) {
    window.TiLabExport({
      h,
      jsx,
      transformJSX,
    });
  }

  // Глобальный экспорт для совместимости
  window.preact = { h, jsx, transformJSX };
  window.h = h;
  window.jsx = jsx;
})(window);
