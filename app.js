const { testQuestions, testResults, stages, workbookSections, readingPaths } = window.PerfBookData;
const { currency, percent, copyText, loadWorkbookState, saveWorkbookState, workbookProgress, routeMarkup } = window.PerfBookShared;

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
    const summary = `${result.level}: ${result.title}\n\n${result.description}\n\nМаршрут: ${result.route.join(" → ")}`;

    root.innerHTML = `
      <div class="result-box">
        <span class="result-level">${result.level}</span>
        <h4>${result.title}</h4>
        <p>${result.description}</p>
        <div><strong>Что читать в первую очередь:</strong>${routeMarkup(result.route)}</div>
        <div><strong>Что делать дальше:</strong><ul>${result.advice.map((item) => `<li>${item}</li>`).join("")}</ul></div>
        <div class="result-actions">
          <a class="button secondary small" href="./reader.html">Читать книгу</a>
          <a class="button primary small" href="#calculator">Открыть CAC-калькулятор</a>
          <button class="button secondary small" id="copy-test-result">Скопировать результат</button>
          <button class="button secondary small" id="restart-test">Пройти заново</button>
        </div>
      </div>
    `;

    document.getElementById("restart-test").addEventListener("click", () => {
      current = 0;
      score = 0;
      renderQuestion();
    });

    document.getElementById("copy-test-result").addEventListener("click", async () => {
      const success = await copyText(summary);
      document.getElementById("copy-test-result").textContent = success ? "Скопировано" : "Не удалось";
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
    <div class="inline-actions">
      <button class="button secondary small" id="copy-calc-result">Скопировать расчет</button>
    </div>
  `;

  const resultNode = document.getElementById("calc-results");
  const copyButton = document.getElementById("copy-calc-result");
  const fields = ["avg-check", "gross-margin", "repeat-purchases", "marketing-share", "lead-to-sale"];
  let lastSummary = "";

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

    lastSummary = [
      "CAC calculator result",
      `Вклад на клиента: ${currency.format(contributionPerClient)}`,
      `Рабочий CAC: ${currency.format(workingCAC)}`,
      `Предельный CAC: ${currency.format(maxCAC)}`,
      `Допустимая стоимость лида: ${currency.format(maxLeadCost)}`,
      `Потенциальная выручка на клиента: ${currency.format(paybackRevenue)}`,
    ].join("\n");

    resultNode.innerHTML = `
      <div class="metric"><span class="metric-label">Вклад на клиента</span><span class="metric-value">${currency.format(contributionPerClient)}</span><p class="metric-note">Грубая база для разговора о допустимом росте.</p></div>
      <div class="metric"><span class="metric-label">Рабочий CAC</span><span class="metric-value">${currency.format(workingCAC)}</span><p class="metric-note">Комфортный уровень, на котором бизнесу обычно легче масштабироваться.</p></div>
      <div class="metric"><span class="metric-label">Предельный CAC</span><span class="metric-value">${currency.format(maxCAC)}</span><p class="metric-note">Выше этой границы модель начинает жить в слишком тонком запасе.</p></div>
      <div class="metric"><span class="metric-label">Допустимая стоимость лида</span><span class="metric-value">${currency.format(maxLeadCost)}</span><p class="metric-note">При текущей конверсии из лида в клиента: ${percent.format(leadToSale)}</p></div>
      <div class="metric"><span class="metric-label">Потенциальная выручка на клиента</span><span class="metric-value">${currency.format(paybackRevenue)}</span><p class="metric-note">Это не прибыль, а верхняя линия. Не путайте ее с вкладом.</p></div>
    `;
  }

  copyButton.addEventListener("click", async () => {
    const success = await copyText(lastSummary);
    copyButton.textContent = success ? "Скопировано" : "Не удалось";
  });

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

function initWorkbookPreview() {
  const appNode = document.getElementById("workbook-app");
  const summaryNode = document.getElementById("next-steps");
  const state = loadWorkbookState();

  function renderChecklist() {
    appNode.innerHTML = workbookSections
      .map(
        (section, sectionIndex) => `
          <div class="checklist-group">
            <strong>${section.title}</strong>
            <div class="checklist-list">
              ${section.items
                .slice(0, 3)
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
        saveWorkbookState(state);
        renderSummary();
      });
    });
  }

  function renderSummary() {
    const progress = workbookProgress(workbookSections, state);
    summaryNode.innerHTML = `
      <div class="summary-list">
        <div class="summary-item"><strong>Прогресс</strong><p>${progress.done} из ${progress.total} пунктов отмечено. Это примерно ${progress.percent}% готовности.</p></div>
        <div class="summary-item"><strong>Следующий шаг</strong><p>Откройте полную workbook-страницу, чтобы довести контур до нормальной рабочей сборки.</p></div>
      </div>
    `;
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
          ${routeMarkup(path.route)}
        </article>
      `,
    )
    .join("");
}

initTest();
initCalculator();
initStageMap();
initWorkbookPreview();
initReadingPaths();
