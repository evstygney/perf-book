const { readingPaths, scenarios } = window.PerfBookData;
const { copyText } = window.PerfBookShared;

function initRoutesPage() {
  const pathsNode = document.getElementById("routes-reading-paths");
  const scenariosNode = document.getElementById("scenario-grid");

  pathsNode.innerHTML = readingPaths
    .map(
      (path, index) => `
        <article class="path-card">
          <h4>${path.title}</h4>
          <p>${path.text}</p>
          <ol>${path.route.map((item) => `<li>${item}</li>`).join("")}</ol>
          <div class="inline-actions">
            <button class="button secondary small route-copy" data-index="${index}">Скопировать маршрут</button>
          </div>
        </article>
      `,
    )
    .join("");

  scenariosNode.innerHTML = scenarios
    .map(
      (scenario, index) => `
        <article class="path-card">
          <p class="section-label">${scenario.role}</p>
          <h4>${scenario.problem}</h4>
          <p>${scenario.summary}</p>
          <ol>${scenario.route.map((item) => `<li>${item}</li>`).join("")}</ol>
          <div class="inline-actions">
            <button class="button secondary small scenario-copy" data-index="${index}">Скопировать сценарий</button>
          </div>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll(".route-copy").forEach((button) => {
    button.addEventListener("click", async () => {
      const path = readingPaths[Number(button.dataset.index)];
      const text = `${path.title}\n\n${path.text}\n\nМаршрут: ${path.route.join(" → ")}`;
      const success = await copyText(text);
      button.textContent = success ? "Скопировано" : "Не удалось";
    });
  });

  document.querySelectorAll(".scenario-copy").forEach((button) => {
    button.addEventListener("click", async () => {
      const scenario = scenarios[Number(button.dataset.index)];
      const text = `${scenario.role}: ${scenario.problem}\n\n${scenario.summary}\n\nМаршрут: ${scenario.route.join(" → ")}`;
      const success = await copyText(text);
      button.textContent = success ? "Скопировано" : "Не удалось";
    });
  });
}

initRoutesPage();
