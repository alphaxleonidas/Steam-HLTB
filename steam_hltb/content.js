function getGameName() {
  const el = document.getElementById("appHubAppName");
  if (el) return el.textContent.trim();
  const n = document.title;
  if (n && n.includes(" on Steam")) return n.replace(" on Steam", "").trim();
  return null;
}

const CONTAINER_ID = "hltb-container";
const HLTB_BASE = "https://howlongtobeat.com";

const STYLES = {
  container: `
    background: linear-gradient(135deg, #1b2838 0%, #2a475e 100%);
    border-bottom: 2px solid #66c0f4;
    padding: 12px 20px;
    font-family: Arial, sans-serif;
    color: #c7d5e0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    position: relative;
    z-index: 1000;
  `,
  link: `
    color: #66c0f4;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
  `,
  separator: `
    color: #4a6572;
    margin: 0 8px;
  `,
  error: `
    font-size: 14px;
    color: #ff6b6b;
  `,
  text: `
    font-size: 14px;
  `,
  highlight: `
    color: #66c0f4;
  `
};

function alreadyInjected() {
  return !!document.getElementById(CONTAINER_ID);
}

function createContainer() {
  const el = document.createElement("div");
  el.id = CONTAINER_ID;
  el.style.cssText = STYLES.container;
  const parent = document.querySelector(".responsive_page_content") || document.body;
  parent.insertBefore(el, parent.firstChild);
  return el;
}

function showSearching(el, name) {
  el.textContent = "";
  const span = document.createElement("span");
  span.style.cssText = STYLES.text;
  const strong = document.createElement("strong");
  strong.style.cssText = STYLES.highlight;
  strong.textContent = "HowLongToBeat:";
  span.appendChild(strong);
  span.appendChild(document.createTextNode(` Searching for "${name}"...`));
  el.appendChild(span);
}

function showError(el, message) {
  el.textContent = "";
  const span = document.createElement("span");
  span.style.cssText = STYLES.error;
  const strong = document.createElement("strong");
  strong.textContent = "HowLongToBeat:";
  span.appendChild(strong);
  span.appendChild(document.createTextNode(` Error: ${message}`));
  el.appendChild(span);
}

function showNoData(el, name) {
  el.textContent = "";
  const span = document.createElement("span");
  span.style.cssText = STYLES.text;
  const strong = document.createElement("strong");
  strong.style.cssText = STYLES.highlight;
  strong.textContent = "HowLongToBeat:";
  span.appendChild(strong);
  span.appendChild(document.createTextNode(` No data found for "${name}"`));
  el.appendChild(span);
}

function makeStat(label, value) {
  const span = document.createElement("span");
  const strong = document.createElement("strong");
  strong.textContent = `${label}:`;
  span.appendChild(strong);
  span.appendChild(document.createTextNode(` ${value}`));
  return span;
}

function makeSeparator() {
  const span = document.createElement("span");
  span.style.cssText = STYLES.separator;
  span.textContent = "|";
  return span;
}

function showResult(el, game) {
  const stats = [];
  if (game.mainStory) stats.push({ label: "Main Story", value: game.mainStory });
  if (game.mainExtra) stats.push({ label: "Main + Extra", value: game.mainExtra });
  if (game.completionist) stats.push({ label: "Completionist", value: game.completionist });

  el.textContent = "";

  if (stats.length === 0) {
    const span = document.createElement("span");
    span.style.cssText = STYLES.text;
    const strong = document.createElement("strong");
    strong.style.cssText = STYLES.highlight;
    strong.textContent = "HowLongToBeat:";
    span.appendChild(strong);
    span.appendChild(document.createTextNode(` No time data available for "${game.name}"`));
    el.appendChild(span);
    return;
  }

  const link = document.createElement("a");
  link.href = `${HLTB_BASE}/game/${game.id}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.cssText = STYLES.link;
  link.textContent = "HowLongToBeat";
  el.appendChild(link);

  stats.forEach((s) => {
    el.appendChild(makeSeparator());
    el.appendChild(makeStat(s.label, s.value));
  });
}

(async function () {
  if (alreadyInjected()) return;
  const name = getGameName();
  if (!name) return;
  const container = createContainer();
  showSearching(container, name);
  try {
    const response = await chrome.runtime.sendMessage({ type: "searchHLTB", gameName: name });
    if (response.error) {
      showError(container, response.error);
    } else if (response.found) {
      showResult(container, response.game);
    } else {
      showNoData(container, name);
    }
  } catch (err) {
    showError(container, err.message);
  }
})();
