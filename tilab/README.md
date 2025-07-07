# TiLab.js v0.6a

Компонентная система с реактивностью и JSX-подобным синтаксисом для веб-разработки.

## Установка

```html
<script src="https://cdn.abros.dev/tilab/tilab.js"></script>
```

## Быстрый старт

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.abros.dev/tilab/tilab.js"></script>
  </head>
  <body>
    <div id="app">
      <div class="my-component"></div>
    </div>

    <script>
      tlc.create(".my-component", function MyComponent() {
        const data = tlc.get("user");
        return `
                <div class="user-card">
                    <h2>${data.name}</h2>
                    <p>Email: ${data.email}</p>
                </div>
            `;
      });

      tlc.share("user", {
        name: "Иван",
        email: "ivan@example.com",
      });
    </script>
  </body>
</html>
```

## Основные возможности

### 1. Создание компонентов

```javascript
tlc.create(".target", function ComponentName() {
  return `<div>Содержимое компонента</div>`;
});
```

### 2. Реактивные данные

```javascript
// Поделиться данными
tlc.share("user", { name: "Иван", age: 25 });

// Получить данные
const user = tlc.get("user");
```

### 3. JSX-подобный синтаксис

```javascript
tlc.create(".component", function Component() {
  const items = ["Один", "Два", "Три"];

  return `
        <div class="container">
            <h2>Список</h2>
            <ul>
                ${items.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        </div>
    `;
});
```

### 4. Условная логика

```javascript
tlc.create(".component", function Component() {
  const isVisible = tlc.get("isVisible");

  return `
        <div>
            ${isVisible ? "<p>Видимый контент</p>" : "<p>Скрытый контент</p>"}
        </div>
    `;
});
```

### 5. Загрузка внешних данных

```javascript
tlc.create(".component", function Component() {
  const data = tlc.get("https://api.example.com/data");

  return `
        <div>
            <h2>${data.title}</h2>
            <p>${data.description}</p>
        </div>
    `;
});
```

## API

### tlc.create(target, component)

Создает компонент и привязывает его к элементу.

- `target` - CSS селектор элемента
- `component` - функция компонента

### tlc.share(name, data)

Делится реактивными данными.

- `name` - имя данных
- `data` - данные для совместного использования

### tlc.get(name, interval)

Получает реактивные данные.

- `name` - имя данных или URL
- `interval` - интервал обновления в секундах (опционально)

### jsx(tag, props, ...children)

Создает JSX элементы программно.

### Fragment(props, ...children)

Создает фрагмент без обертки.

## Примеры

### Простой счетчик

```javascript
tlc.create(".counter", function Counter() {
  const count = tlc.get("count") || 0;

  return `
        <div>
            <h3>Счетчик: ${count}</h3>
            <button onclick="increment()">+1</button>
        </div>
    `;
});

function increment() {
  const current = tlc.get("count") || 0;
  tlc.share("count", current + 1);
}

tlc.share("count", 0);
```

### Список с фильтрацией

```javascript
tlc.create(".list", function List() {
  const items = tlc.get("items") || [];
  const filter = tlc.get("filter") || "";

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return `
        <div>
            <input 
                type="text" 
                placeholder="Фильтр..."
                oninput="updateFilter(this.value)"
            />
            <ul>
                ${filtered.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        </div>
    `;
});

function updateFilter(value) {
  tlc.share("filter", value);
}

tlc.share("items", ["Яблоко", "Банан", "Апельсин"]);
```

## Отладка

Для включения панели отладки добавьте параметр `?tilab=` к URL:

```
http://localhost:3000/?tilab=
```

## Лицензия

MIT License © 2025 Daniel Abros
