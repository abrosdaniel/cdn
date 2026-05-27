# Directus: схема для BoneHead

API: `https://cms.abros.dev`

Singleton-коллекция `lampa` — один объект с двумя массивами:

```json
{
  "extensions": [],
  "news": []
}
```

Клиент (`store.js`) делает один запрос и читает `data.extensions` и `data.news`.

---

## Singleton `lampa`

В Directus: **Settings → Data Model → lampa → Treat as singleton**.

| Поле         | Тип Directus                              | Обязательное | Описание                      |
| ------------ | ----------------------------------------- | ------------ | ----------------------------- |
| `extensions` | JSON (array) или O2M → `lampa_extensions` | да           | Каталог плагинов и расширений |
| `news`       | JSON (array) или O2M → `lampa_news`       | да           | Новости магазина              |

### Вариант A — JSON-поля (проще всего)

Скопировать массивы из `data.json` как есть:

- `extensions` ← содержимое `plugins[]`
- `news` ← содержимое `news[]`

### Вариант B — O2M-связи

Дочерние коллекции с полями из таблиц ниже. При запросе Directus вернёт вложенные массивы в `extensions` и `news`.

---

## Элемент `extensions[]`

Структура как в `data.json` → `plugins[]`:

| Поле            | Тип    | Обязательное | Описание                                                            |
| --------------- | ------ | ------------ | ------------------------------------------------------------------- |
| `id`            | String | да           | UUID                                                                |
| `category`      | String | да           | `online`, `tv`, `torrent`, `interface`, `control`, `theme`, `other` |
| `name`          | String | да           | Название                                                            |
| `author`        | String | нет          | Автор                                                               |
| `description`   | Text   | нет          | Описание                                                            |
| `price`         | String | да           | `free`, `subscription`                                              |
| `url`           | String | да           | `"…"`                                                               |
| `compatibility` | JSON   | нет          | `{ "lampa": "any", "platforms": [], "requiresReboot": true }`       |

### Пример элемента

```json
{
  "id": "********************",
  "category": "online",
  "name": "Showy",
  "author": "Showy",
  "description": "Фильмы и сериалы в онлайн…",
  "price": { "type": "free", "label": "Бесплатный" },
  "url": "http://showy.online/m.js",
  "compatibility": {
    "lampa": "any",
    "platforms": ["web", "android", "tizen", "webos"],
    "requiresReboot": true
  }
}
```

---

## Элемент `news[]`

Структура как в `data.json` → `news[]`:

| Поле     | Тип                  | Обязательное | Описание             |
| -------- | -------------------- | ------------ | -------------------- |
| `id`     | String               | да           | UUID                 |
| `status` | String               | да           | `published`, `draft` |
| `date`   | DateTimeStamp / null | нет          | Дата                 |
| `title`  | String               | да           | Заголовок            |
| `text`   | Text                 | да           | Текст                |
| `image`  | String / null        | нет          | URL картинки         |
| `tags`   | JSON                 | нет          | []                   |

### Пример элемента

```json
{
  "id": "news_1",
  "title": "🦉 СОВетуем установить",
  "text": "Showy, Stream - для просмотра онлайн…",
  "image": null,
  "date": null,
  "tags": []
}
```

---

## Права доступа (Public role)

| Коллекция          | Read         |
| ------------------ | ------------ |
| `lampa`            | ✓            |
| `lampa_extensions` | ✓ (если O2M) |
| `lampa_news`       | ✓ (если O2M) |

CORS: разрешить origin `https://cdn.abros.dev`.

---

## REST API

```
GET /items/lampa?fields=*,extensions.*,news.*
```

Ответ:

```json
{
  "data": {
    "extensions": [ … ],
    "news": [ … ]
  }
}
```

---

## Категории

Не хранятся в Directus — заданы в `Config.defaultCategories` в `store.js`.

---

## Чеклист миграции из `data.json`

1. Создать singleton `lampa`.
2. Добавить поля `extensions` и `news` (JSON или O2M).
3. Скопировать `plugins[]` → `extensions`, `news[]` → `news`.
4. Выдать Public read на `lampa`.
5. Smoke-тест в Lampa.
6. `data.json` оставить как эталон.
