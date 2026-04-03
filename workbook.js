const { workbookSections } = window.PerfBookData;
const { copyText, loadWorkbookState, saveWorkbookState, workbookProgress, workbookExportText } = window.PerfBookShared;

function initFullWorkbook() {
  const appNode = document.getElementById("full-workbook-app");
  const summaryNode = document.getElementById("full-workbook-summary");
  const state = loadWorkbookState();

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
        saveWorkbookState(state);
        renderSummary();
      });
    });
  }

  function renderSummary() {
    const progress = workbookProgress(workbookSections, state);
    const exportText = workbookExportText(workbookSections, state);
    let headline = "Система еще не собрана";
    let advice = "Сначала доберите базовый контур: результат, сигнал, обратную связь и экономику.";

    if (progress.percent >= 75) {
      headline = "У вас уже есть рабочая performance-база";
      advice = "Теперь стоит усиливать payback-модель, портфель каналов и межфункциональную архитектуру.";
    } else if (progress.percent >= 45) {
      headline = "Есть контур, но он еще рыхлый";
      advice = "Главная задача — убрать слабые сигналы и связать маркетинг, продажи и экономику одной логикой.";
    }

    summaryNode.innerHTML = `
      <div class="summary-list">
        <div class="summary-item"><strong>Прогресс</strong><p>${progress.done} из ${progress.total} пунктов. Это ${progress.percent}% готовности.</p></div>
        <div class="summary-item"><strong>${headline}</strong><p>${advice}</p></div>
        <div class="summary-item"><strong>Что полезно сделать следующим</strong><p>Возьмите одну слабую секцию и доведите ее до рабочего состояния до того, как масштабировать бюджет.</p></div>
      </div>
      <div class="inline-actions">
        <button class="button primary small" id="copy-workbook">Скопировать workbook</button>
        <button class="button secondary small" id="reset-workbook">Сбросить отметки</button>
      </div>
    `;

    document.getElementById("copy-workbook").addEventListener("click", async () => {
      const success = await copyText(exportText);
      document.getElementById("copy-workbook").textContent = success ? "Скопировано" : "Не удалось";
    });

    document.getElementById("reset-workbook").addEventListener("click", () => {
      Object.keys(state).forEach((key) => delete state[key]);
      saveWorkbookState(state);
      renderChecklist();
      renderSummary();
    });
  }

  renderChecklist();
  renderSummary();
}

initFullWorkbook();
