const { routeMarkup } = window.PerfBookShared;

const chapterGroups = [
  {
    title: "Часть I. Как работает реклама",
    text: "База: рынок внимания, что покупает рекламодатель, почему реклама дорожает, как работают сигналы и аукцион.",
    route: ["Глава 1", "Глава 2", "Глава 3", "Глава 4", "Глава 5", "Глава 6", "Глава 7"],
  },
  {
    title: "Часть II. Медийная реклама",
    text: "Роль медийки, механика контакта, измерение без самообмана и связь с performance.",
    route: ["Глава 8", "Глава 9", "Глава 10"],
  },
  {
    title: "Часть III. Экономика клиента",
    text: "Юнит-экономика, допустимый CAC, пределы стоимости привлечения и связь с реальной ценностью клиента.",
    route: ["Глава 11", "Глава 12"],
  },
  {
    title: "Часть IV. Performance как система",
    text: "Что такое performance, как устроена architecture performance, как ей управлять и где у бизнеса реальные пределы роста.",
    route: ["Глава 13", "Глава 14", "Глава 15", "Глава 16"],
  },
];

const assets = [
  {
    title: "Шпаргалка: weekly review",
    text: "Короткий шаблон еженедельного performance-review без воды.",
    href: "./assets/weekly-review-template.txt",
    action: "Скачать TXT",
  },
  {
    title: "Шпаргалка: карта сбоев",
    text: "Текстовая версия диагностической карты performance-системы.",
    href: "./assets/performance-failure-map.txt",
    action: "Скачать TXT",
  },
  {
    title: "Шпаргалка: CAC",
    text: "Что проверить перед разговором о рабочем и предельном CAC.",
    href: "./assets/cac-checklist.txt",
    action: "Скачать TXT",
  },
];

document.getElementById("chapter-nav").innerHTML = chapterGroups
  .map(
    (group) => `
      <article class="path-card">
        <h4>${group.title}</h4>
        <p>${group.text}</p>
        ${routeMarkup(group.route)}
        <div class="inline-actions">
          <a class="button secondary small" href="./reader.html">Открыть в ридере</a>
        </div>
      </article>
    `,
  )
  .join("");

document.getElementById("asset-grid").innerHTML = assets
  .map(
    (asset) => `
      <article class="path-card">
        <h4>${asset.title}</h4>
        <p>${asset.text}</p>
        <div class="inline-actions">
          <a class="button secondary small" href="${asset.href}">${asset.action}</a>
        </div>
      </article>
    `,
  )
  .join("");
