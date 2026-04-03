const testQuestions = [
  {
    title: "Что вы реально считаете главным ориентиром в маркетинге?",
    answers: [
      { text: "Клики, CTR или стоимость трафика", note: "Маркетинг пока живет на уровне кабинета.", score: 1 },
      { text: "Лиды или заявки", note: "Есть performance, но сигнал еще слабый.", score: 2 },
      { text: "Качественные лиды, продажи или выручку", note: "Система уже привязана к бизнесу.", score: 3 },
      { text: "Вклад, payback, качество клиента и роль каналов в общей системе", note: "Это зрелый уровень управления ростом.", score: 4 },
    ],
  },
  {
    title: "Как вы понимаете, что канал реально полезен?",
    answers: [
      { text: "Если в кабинете красивый отчет", note: "Ориентация на интерфейс, а не на бизнес.", score: 1 },
      { text: "Если дает лиды по нормальной цене", note: "Полезный, но еще промежуточный взгляд.", score: 2 },
      { text: "Если доводит до продажи или качественного клиентского события", note: "Уже есть связь с деньгами.", score: 3 },
      { text: "Если понятна его роль в системе спроса, окупаемость и качество клиента", note: "Это уже уровень архитектуры, а не только канала.", score: 4 },
    ],
  },
  {
    title: "Что происходит после лида или заявки?",
    answers: [
      { text: "Маркетинг почти не видит, что там дальше", note: "Система слепнет после клика.", score: 1 },
      { text: "Иногда видим продажи вручную или кусками", note: "Есть обратная связь, но она слабая.", score: 2 },
      { text: "Есть CRM и более-менее понятный путь до оплаты", note: "Нормальная рабочая база для performance.", score: 3 },
      { text: "Есть чистая обратная связь до качества клиента, payback и повторной ценности", note: "Зрелый замкнутый контур.", score: 4 },
    ],
  },
  {
    title: "Как принимаются решения по бюджету?",
    answers: [
      { text: "По ощущениям или потому что так делали раньше", note: "Бюджет живет по инерции.", score: 1 },
      { text: "Туда, где дешевле лиды или понятнее отчет", note: "Решение есть, но оно еще узкое.", score: 2 },
      { text: "С учетом воронки, продаж и качества канала", note: "Это уже управленческий подход.", score: 3 },
      { text: "По ролям каналов: сбор спроса, возврат, расширение, тесты, медийка", note: "Это уже портфельное управление growth-системой.", score: 4 },
    ],
  },
  {
    title: "Что вы делаете, если реклама дорожает?",
    answers: [
      { text: "Ищем более дешевый трафик любой ценой", note: "Реакция понятная, но часто детская.", score: 1 },
      { text: "Пытаемся снизить CPL и быстро перепаковать кампании", note: "Тактика есть, системы еще мало.", score: 2 },
      { text: "Проверяем воронку, продажи, маржу и качество сигнала", note: "Хороший управленческий уровень.", score: 3 },
      { text: "Смотрим на экономику клиента, зрелость рынка и роль медийки/retention в масштабе", note: "Это взрослый взгляд на стоимость роста.", score: 4 },
    ],
  },
];

const testResults = [
  {
    max: 8,
    level: "Уровень 1",
    title: "Маркетинг на уровне кабинета",
    description: "Система пока живет на промежуточных метриках. Главная задача сейчас — перестать считать клик или лид финальной правдой.",
    route: ["Глава 1", "Глава 2", "Глава 11", "Глава 12", "Глава 13"],
    advice: [
      "Сначала привяжите маркетинг хотя бы к продажам или качественным лидам.",
      "Не принимайте решения только по CPL и CPC.",
      "Начните считать не трафик, а путь к деньгам.",
    ],
  },
  {
    max: 12,
    level: "Уровень 2",
    title: "Есть performance, но система еще рыхлая",
    description: "Вы уже видите маркетинг шире кабинета, но контур обратной связи и экономика пока не держатся достаточно жестко.",
    route: ["Глава 3", "Глава 4", "Глава 5", "Глава 7", "Глава 14"],
    advice: [
      "Усильте сигнал, на котором обучаются каналы.",
      "Почистите аналитику и CRM-связку.",
      "Проверьте, где реклама ломается на стыках.",
    ],
  },
  {
    max: 17,
    level: "Уровень 3",
    title: "Маркетинг как рабочая система",
    description: "У вас уже есть performance-подход, но следующий рост будет упираться в архитектуру, медийную роль и качество управленческого цикла.",
    route: ["Глава 8", "Глава 9", "Глава 10", "Глава 15", "Глава 16"],
    advice: [
      "Соберите портфельную логику каналов, а не только канальную.",
      "Усильте weekly/monthly rhythm управления.",
      "Начните смотреть на пределы роста до того, как упретесь в них бюджетом.",
    ],
  },
  {
    max: Infinity,
    level: "Уровень 4",
    title: "Управляемый контур роста",
    description: "У вас уже зрелый подход. Самый сильный следующий шаг — не тонкая настройка каналов, а улучшение межфункциональной системы и углубление экономики.",
    route: ["Глава 10", "Глава 11", "Глава 14", "Глава 15", "Глава 16"],
    advice: [
      "Углубляйте когортное мышление и payback-модель.",
      "Стройте диагностику пределов роста на квартальном горизонте.",
      "Смотрите, чему маркетинг должен учить не только каналы, но и бизнес.",
    ],
  },
];

const stages = [
  {
    name: "Трафик",
    short: "Проблемы сигнала, не тот спрос, плохой таргетинг.",
    risk: "Высокий шум и слабый коммерческий смысл трафика.",
    symptoms: ["Красивый CTR, но слабое качество лидов.", "Дешевый трафик без продаж.", "Ощущение, что реклама приводит не тех."],
    questions: ["На какой сигнал реально обучаются кампании?", "Это спрос или просто любопытство?", "Канал делает свою работу или от него ждут чужой роли?"],
    actions: ["Почистить цель оптимизации.", "Пересобрать сегменты по силе сигнала.", "Проверить, не обещает ли креатив лишнего."],
  },
  {
    name: "Оффер",
    short: "Человек не понимает, что вы предлагаете и зачем.",
    risk: "Хороший трафик не превращается в осмысленный интерес.",
    symptoms: ["Есть клики и лиды, но низкая конверсия в продажу.", "Пользователь долго ищет базовую информацию.", "Высокая чувствительность к цене и скидкам."],
    questions: ["В чем ясная причина выбрать вас?", "Оффер попадает в реальную задачу клиента?", "Что обещано в рекламе и что видно после клика?"],
    actions: ["Упростить и конкретизировать предложение.", "Убрать разрыв между рекламой и посадкой.", "Сделать следующий шаг очевидным."],
  },
  {
    name: "Посадка",
    short: "Плохая точка приема спроса: сайт, карточка, форма, чат.",
    risk: "Деньги теряются после клика, а виноватым кажется канал.",
    symptoms: ["Высокая доля отказов или брошенных шагов.", "Много лидов, мало адекватных диалогов.", "Трафик дорогой, но страница выглядит слабо."],
    questions: ["Человек быстро понимает, что делать дальше?", "Не слишком ли много трения после перехода?", "Посадка продолжает мысль креатива?"],
    actions: ["Упростить первый экран и призыв к действию.", "Усилить доказательства доверия.", "Проверить скорость, мобильную версию и форму."],
  },
  {
    name: "Продажи",
    short: "Слабая обработка лидов, задержка, плохая квалификация.",
    risk: "Маркетинг выглядит дорогим из-за плохого приема спроса.",
    symptoms: ["Лиды есть, но продажи жалуются на качество.", "Большая потеря между обращением и разговором.", "Нет единой обратной связи для маркетинга."],
    questions: ["Как быстро менеджеры реагируют?", "Какие лиды реально доходят до денег?", "Есть ли SLA и чистые статусы в CRM?"],
    actions: ["Ввести обязательную обратную связь по качеству.", "Сократить время реакции.", "Разделить мусорный и сильный поток в CRM."],
  },
  {
    name: "Экономика",
    short: "Юнит слабый, CAC живет по ощущениям, payback неясен.",
    risk: "Канал может быть нормальным, а бизнес — нет.",
    symptoms: ["Постоянное давление на CPL без разговора о клиенте.", "Рост оборота без чувства устойчивости.", "Маркетинг спорит с финансами на разных языках."],
    questions: ["Сколько реально стоит клиент для бизнеса?", "Есть ли рабочий и предельный CAC?", "Через сколько окупается привлечение?"],
    actions: ["Посчитать вклад и payback.", "Разделить предельный и рабочий CAC.", "Смотреть на когорты, а не только на средние."],
  },
  {
    name: "Удержание",
    short: "После первой покупки бизнес слишком мало успевает заработать.",
    risk: "Реклама кажется дорогой, потому что в системе нет повторной ценности.",
    symptoms: ["Повторные покупки слабые или случайные.", "LTV существует только на бумаге.", "Любой CAC кажется завышенным."],
    questions: ["Что происходит с клиентом после первой оплаты?", "Есть ли допродажи, retention, возврат?", "Не пытается ли маркетинг компенсировать слабую ценность клиента?"],
    actions: ["Добавить CRM-маркетинг и механику возврата.", "Посчитать повторную ценность по когортам.", "Усиливать не только привлечение, но и монетизацию базы."],
  },
];

const workbookSections = [
  { title: "Базовая система", items: ["Мы понимаем, что считаем главным результатом маркетинга.", "Мы не живем только на CPC и CPL.", "У нас есть хотя бы один честный бизнес-сигнал после лида."] },
  { title: "Экономика", items: ["Мы считаем рабочий и предельный CAC.", "Мы понимаем вклад клиента, а не только выручку.", "Мы хотя бы грубо видим срок окупаемости."] },
  { title: "Архитектура", items: ["Оффер в рекламе и на посадке не конфликтует.", "Есть понятная точка приема спроса.", "Продажи и маркетинг связаны обратной связью."] },
  { title: "Управление", items: ["У нас есть weekly review, который ведет к решениям.", "Гипотезы формулируются до запуска, а не после отчета.", "Мы различаем сбор спроса, возврат и расширение воронки."] },
];

const readingPaths = [
  { title: "Для собственника", text: "Если вам нужно понять, что реально происходит с маркетингом и почему дорогой лид не всегда означает плохой канал.", route: ["Глава 1", "Глава 2", "Глава 11", "Глава 12", "Глава 16"] },
  { title: "Для маркетолога-практика", text: "Если вы уже запускаете кампании и хотите перейти от кабинетного ремесла к системному performance.", route: ["Глава 3", "Глава 4", "Глава 5", "Глава 13", "Глава 14", "Глава 15"] },
  { title: "Для бизнеса с дорогим спросом", text: "Если реклама дорожает, а вы не понимаете, проблема в канале, в экономике или в самом бизнесе.", route: ["Глава 3", "Глава 7", "Глава 11", "Глава 12", "Глава 16"] },
  { title: "Для тех, кто хочет расти шире search", text: "Если вы уже выбрали теплый спрос и уперлись в потолок масштаба.", route: ["Глава 8", "Глава 9", "Глава 10", "Глава 15", "Глава 16"] },
];

const currency = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("ru-RU", { style: "percent", maximumFractionDigits: 1 });

function initTest() {
  const root = document.getElementById("test-app");
  let current = 0;
  let score = 0;

  function renderQuestion() {
    const question = testQuestions[current];
    const progressWidth = ((current + 1) / testQuestions.length) * 100;
    root.innerHTML = `
      <div class="test-step">
        <div class="test-meta"><span>Вопрос ${current + 1} из ${testQuestions.length}</span><span>${Math.round(progressWidth)}%</span></div>
        <div class="progress"><div class="progress-bar" style="width:${progressWidth}%"></div></div>
        <p class="question-title">${question.title}</p>
        <div class="option-list">
          ${question.answers.map((answer, index) => `<button class="option-button" data-index="${index}"><strong>${answer.text}</strong><span>${answer.note}</span></button>`).join("")}
        </div>
      </div>
    `;

    root.querySelectorAll(".option-button").forEach((button) => {
      button.addEventListener("click", () => {
        const answer = question.answers[Number(button.dataset.index)];
        score += answer.score;
        current += 1;
        current >= testQuestions.length ? renderResult() : renderQuestion();
      });
    });
  }

  function renderResult() {
    const result = testResults.find((entry) => score <= entry.max);
    root.innerHTML = `
      <div class="result-box">
        <span class="result-level">${result.level}</span>
        <h4>${result.title}</h4>
        <p>${result.description}</p>
        <div><strong>Что читать в первую очередь:</strong><p>${result.route.join(" → ")}</p></div>
        <div><strong>Что делать дальше:</strong><ul>${result.advice.map((item) => `<li>${item}</li>`).join("")}</ul></div>
        <div class="result-actions">
          <a class="button primary small" href="#calculator">Открыть CAC-калькулятор</a>
          <button class="button secondary small" id="restart-test">Пройти заново</button>
        </div>
      </div>
    `;

    document.getElementById("restart-test").addEventListener("click", () => {
      current = 0;
      score = 0;
      renderQuestion();
    });
  }

  renderQuestion();
}

function initCalculator() {
  const root = document.getElementById("cac-app");
  root.innerHTML = `
    <div class="calculator-grid">
      <div class="form-grid">
        <div class="field"><label for="avg-check">Средний чек, ₽</label><input id="avg-check" type="number" value="25000" min="0" /></div>
        <div class="field"><label for="gross-margin">Валовая маржа, %</label><input id="gross-margin" type="number" value="45" min="0" max="100" /></div>
        <div class="field"><label for="repeat-purchases">Среднее число покупок / оплат</label><input id="repeat-purchases" type="number" value="1.8" min="0" step="0.1" /></div>
        <div class="field"><label for="marketing-share">Допустимая доля вклада на привлечение, %</label><input id="marketing-share" type="number" value="35" min="0" max="100" /></div>
        <div class="field"><label for="lead-to-sale">Конверсия из лида в клиента, %</label><input id="lead-to-sale" type="number" value="18" min="0" max="100" /></div>
      </div>
      <div class="calc-results" id="calc-results"></div>
    </div>
  `;

  const resultNode = document.getElementById("calc-results");
  const fields = ["avg-check", "gross-margin", "repeat-purchases", "marketing-share", "lead-to-sale"];

  function renderCalc() {
    const avgCheck = Number(document.getElementById("avg-check").value || 0);
    const grossMargin = Number(document.getElementById("gross-margin").value || 0) / 100;
    const repeatPurchases = Number(document.getElementById("repeat-purchases").value || 0);
    const marketingShare = Number(document.getElementById("marketing-share").value || 0) / 100;
    const leadToSale = Number(document.getElementById("lead-to-sale").value || 0) / 100;
    const contributionPerClient = avgCheck * grossMargin * repeatPurchases;
    const maxCAC = contributionPerClient * marketingShare;
    const workingCAC = maxCAC * 0.78;
    const maxLeadCost = leadToSale > 0 ? maxCAC * leadToSale : 0;
    const paybackRevenue = avgCheck * repeatPurchases;

    resultNode.innerHTML = `
      <div class="metric"><span class="metric-label">Вклад на клиента</span><span class="metric-value">${currency.format(contributionPerClient)}</span><p class="metric-note">Грубая база для разговора о допустимом росте.</p></div>
      <div class="metric"><span class="metric-label">Рабочий CAC</span><span class="metric-value">${currency.format(workingCAC)}</span><p class="metric-note">Комфортный уровень, на котором бизнесу обычно легче масштабироваться.</p></div>
      <div class="metric"><span class="metric-label">Предельный CAC</span><span class="metric-value">${currency.format(maxCAC)}</span><p class="metric-note">Выше этой границы модель начинает жить в слишком тонком запасе.</p></div>
      <div class="metric"><span class="metric-label">Допустимая стоимость лида</span><span class="metric-value">${currency.format(maxLeadCost)}</span><p class="metric-note">При текущей конверсии из лида в клиента: ${percent.format(leadToSale)}</p></div>
      <div class="metric"><span class="metric-label">Потенциальная выручка на клиента</span><span class="metric-value">${currency.format(paybackRevenue)}</span><p class="metric-note">Это не прибыль, а верхняя линия. Не путайте ее с вкладом.</p></div>
    `;
  }

  fields.forEach((id) => document.getElementById(id).addEventListener("input", renderCalc));
  renderCalc();
}

function initStageMap() {
  const listNode = document.getElementById("stage-list");
  const detailNode = document.getElementById("stage-detail");
  let activeIndex = 0;

  function renderButtons() {
    listNode.innerHTML = stages
      .map(
        (stage, index) => `
          <button class="stage-button${index === activeIndex ? " active" : ""}" data-index="${index}">
            <span class="stage-name">${stage.name}</span>
            <span class="stage-short">${stage.short}</span>
          </button>
        `,
      )
      .join("");

    listNode.querySelectorAll(".stage-button").forEach((button) => {
      button.addEventListener("click", () => {
        activeIndex = Number(button.dataset.index);
        renderButtons();
        renderDetail();
      });
    });
  }

  function renderDetail() {
    const stage = stages[activeIndex];
    detailNode.innerHTML = `
      <div class="stage-detail-box">
        <div>
          <div class="chip-row">
            <span class="chip">Участок системы: ${stage.name}</span>
            <span class="chip">Главный риск: ${stage.risk}</span>
          </div>
          <h4>${stage.name}</h4>
          <p>${stage.short}</p>
        </div>
        <div class="bullet-block"><strong>Симптомы</strong><ul>${stage.symptoms.map((item) => `<li>${item}</li>`).join("")}</ul></div>
        <div class="bullet-block"><strong>Вопросы проверки</strong><ul>${stage.questions.map((item) => `<li>${item}</li>`).join("")}</ul></div>
        <div class="bullet-block"><strong>Что делать первым</strong><ul>${stage.actions.map((item) => `<li>${item}</li>`).join("")}</ul></div>
      </div>
    `;
  }

  renderButtons();
  renderDetail();
}

function initWorkbook() {
  const appNode = document.getElementById("workbook-app");
  const summaryNode = document.getElementById("next-steps");
  const storageKey = "perf-book-workbook";
  const state = JSON.parse(localStorage.getItem(storageKey) || "{}");

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function renderChecklist() {
    appNode.innerHTML = workbookSections
      .map(
        (section, sectionIndex) => `
          <div class="checklist-group">
            <strong>${section.title}</strong>
            <div class="checklist-list">
              ${section.items
                .map((item, itemIndex) => {
                  const key = `${sectionIndex}-${itemIndex}`;
                  return `<label class="check-item"><input type="checkbox" data-key="${key}" ${state[key] ? "checked" : ""} /><span>${item}</span></label>`;
                })
                .join("")}
            </div>
          </div>
        `,
      )
      .join("");

    appNode.querySelectorAll("input[type='checkbox']").forEach((input) => {
      input.addEventListener("change", () => {
        state[input.dataset.key] = input.checked;
        saveState();
        renderSummary();
      });
    });
  }

  function renderSummary() {
    const totalItems = workbookSections.reduce((sum, section) => sum + section.items.length, 0);
    const completed = Object.values(state).filter(Boolean).length;
    const completion = totalItems ? Math.round((completed / totalItems) * 100) : 0;

    let headline = "База еще не собрана";
    let advice = "Сначала соберите базовый контур: цель, сигнал после лида, связку с продажами и хотя бы грубую экономику.";

    if (completion >= 75) {
      headline = "У вас уже есть рабочий контур";
      advice = "Следующий шаг — углублять payback, роли каналов и межфункциональную обратную связь.";
    } else if (completion >= 45) {
      headline = "Система есть, но она еще рыхлая";
      advice = "Сфокусируйтесь на чистоте сигнала, weekly review и связке маркетинга с продажами и экономикой.";
    }

    summaryNode.innerHTML = `
      <div class="summary-list">
        <div class="summary-item"><strong>Прогресс</strong><p>${completed} из ${totalItems} пунктов отмечено. Это примерно ${completion}% готовности.</p></div>
        <div class="summary-item"><strong>${headline}</strong><p>${advice}</p></div>
        <div class="summary-item"><strong>Следующий шаг</strong><p>Возьмите один слабый участок системы и доведите его до рабочего состояния, а не пытайтесь чинить все сразу.</p></div>
      </div>
      <div class="inline-actions"><button class="button secondary small" id="reset-workbook">Сбросить отметки</button></div>
    `;

    document.getElementById("reset-workbook").addEventListener("click", () => {
      Object.keys(state).forEach((key) => delete state[key]);
      saveState();
      renderChecklist();
      renderSummary();
    });
  }

  renderChecklist();
  renderSummary();
}

function initReadingPaths() {
  const root = document.getElementById("reading-paths");
  root.innerHTML = readingPaths
    .map(
      (path) => `
        <article class="path-card">
          <h4>${path.title}</h4>
          <p>${path.text}</p>
          <ol>${path.route.map((item) => `<li>${item}</li>`).join("")}</ol>
        </article>
      `,
    )
    .join("");
}

initTest();
initCalculator();
initStageMap();
initWorkbook();
initReadingPaths();
