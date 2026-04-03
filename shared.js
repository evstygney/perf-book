window.PerfBookShared = (() => {
  const currency = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });

  const percent = new Intl.NumberFormat("ru-RU", {
    style: "percent",
    maximumFractionDigits: 1,
  });

  const workbookStorageKey = "perf-book-workbook";

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "absolute";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    const success = document.execCommand("copy");
    document.body.removeChild(area);
    return success;
  }

  function saveWorkbookState(state) {
    localStorage.setItem(workbookStorageKey, JSON.stringify(state));
  }

  function loadWorkbookState() {
    return JSON.parse(localStorage.getItem(workbookStorageKey) || "{}");
  }

  function workbookProgress(sections, state) {
    const total = sections.reduce((sum, section) => sum + section.items.length, 0);
    const done = Object.values(state).filter(Boolean).length;
    return {
      total,
      done,
      percent: total ? Math.round((done / total) * 100) : 0,
    };
  }

  function workbookExportText(sections, state) {
    const lines = ["Perf Book Workbook", ""];
    sections.forEach((section, sectionIndex) => {
      lines.push(section.title);
      section.items.forEach((item, itemIndex) => {
        const key = `${sectionIndex}-${itemIndex}`;
        lines.push(`${state[key] ? "[x]" : "[ ]"} ${item}`);
      });
      lines.push("");
    });
    return lines.join("\n");
  }

  function chapterHref(label) {
    if (label === "Вступление") {
      return "./reader.html#introduction";
    }

    if (label === "Заключение") {
      return "./reader.html#conclusion";
    }

    const match = label.match(/Глава\s+(\d+)/);
    return match ? `./reader.html#chapter-${match[1]}` : null;
  }

  function routeMarkup(route) {
    return `<ol>${route
      .map((item) => {
        const href = chapterHref(item);
        return `<li>${href ? `<a href="${href}">${item}</a>` : item}</li>`;
      })
      .join("")}</ol>`;
  }

  function buildScenarioCard(scenario) {
    return `
      <article class="path-card">
        <p class="section-label">${scenario.role}</p>
        <h4>${scenario.problem}</h4>
        <p>${scenario.summary}</p>
        ${routeMarkup(scenario.route)}
      </article>
    `;
  }

  return {
    currency,
    percent,
    copyText,
    workbookStorageKey,
    saveWorkbookState,
    loadWorkbookState,
    workbookProgress,
    workbookExportText,
    chapterHref,
    routeMarkup,
    buildScenarioCard,
  };
})();
