function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function headingId(text, level, counters) {
  if (level === 1) {
    const chapterMatch = text.match(/^Глава\s+(\d+)/);
    if (chapterMatch) {
      return `chapter-${chapterMatch[1]}`;
    }

    if (text === "Перформанс-маркетинг для начинающих") {
      return "book-top";
    }
  }

  if (level === 2 && text === "Вступление") {
    return "introduction";
  }

  if (level === 2 && text === "Заключение") {
    return "conclusion";
  }

  counters.section += 1;
  return `section-${counters.section}`;
}

function parseMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const toc = [];
  const html = [];
  const counters = { section: 0 };
  let paragraph = [];
  let listItems = [];

  function flushParagraph() {
    if (!paragraph.length) {
      return;
    }

    html.push(`<p>${escapeHtml(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!listItems.length) {
      return;
    }

    html.push(`<ul>${listItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`);
    listItems = [];
  }

  lines.forEach((line) => {
    if (!line.trim()) {
      flushParagraph();
      flushList();
      return;
    }

    if (line.trim() === "---") {
      flushParagraph();
      flushList();
      html.push("<hr />");
      return;
    }

    const headingMatch = line.match(/^(#{1,2})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();

      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = headingId(text, level, counters);
      const tag = level === 1 ? "h2" : "h3";
      html.push(`<${tag} id="${id}">${escapeHtml(text)}</${tag}>`);

      const isBookTitle = level === 1 && text === "Перформанс-маркетинг для начинающих";
      if (!isBookTitle) {
        const includeInToc = level === 1 || text === "Вступление" || text === "Заключение";
        if (includeInToc) {
          toc.push({ id, text, level: level === 1 ? 1 : 2 });
        }
      }

      return;
    }

    const listMatch = line.match(/^- (.*)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1].trim());
      return;
    }

    paragraph.push(line.trim());
  });

  flushParagraph();
  flushList();

  return { html: html.join("\n"), toc };
}

function renderToc(items) {
  const tocNode = document.getElementById("reader-toc");
  tocNode.innerHTML = items
    .map(
      (item) => `
        <a class="toc-link level-${item.level}" href="#${item.id}">
          ${escapeHtml(item.text)}
        </a>
      `,
    )
    .join("");
}

async function initReader() {
  const statusNode = document.getElementById("reader-status");
  const contentNode = document.getElementById("book-content");

  try {
    const response = await fetch("./manuscript.md");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const markdown = await response.text();
    const { html, toc } = parseMarkdown(markdown);
    renderToc(toc);
    contentNode.innerHTML = html;
    statusNode.remove();
  } catch (error) {
    statusNode.textContent = "Не удалось загрузить книгу. Проверьте, что manuscript.md опубликован вместе с сайтом.";
    console.error(error);
  }
}

initReader();
