# perf-book

Статический GitHub Pages-сайт с интерактивной экосистемой вокруг книги
`Перформанс-маркетинг для начинающих`.

## Что уже есть

- тест зрелости performance-маркетинга;
- CAC-калькулятор;
- карта сбоев performance-системы;
- workbook с прогрессом в браузере;
- маршруты чтения книги.

## Структура

- `index.html` — хаб и основные интерактивные модули;
- `book.html` — навигатор по книге и downloadable assets;
- `workbook.html` — отдельная workbook-страница;
- `routes.html` — маршруты чтения и сценарии;
- `styles.css` — общие стили;
- `data.js` — общий слой данных;
- `shared.js` — общие форматтеры и утилиты;
- `app.js`, `workbook.js`, `routes.js` — логика страниц.
- `book.js` — логика страницы книги и assets.

## Как включить GitHub Pages

1. Откройте настройки репозитория.
2. Перейдите в `Pages`.
3. В `Build and deployment` выберите:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
4. Сохраните.

После этого сайт будет доступен по адресу вида:

`https://evstygney.github.io/perf-book/`

## Следующие шаги

- добавить страницы под главы книги и deep-linking;
- добавить PDF/workbook download;
- добавить экспорт результатов теста в URL или файл;
- добавить landing под книгу и email capture при необходимости;
- подключить аналитику Pages, если она нужна.
