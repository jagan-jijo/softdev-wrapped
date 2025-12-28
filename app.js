/* Software Engineer Wrap - simple data flow: load -> bind -> render -> save */

const STORAGE_KEY = "se-wrap-data-v1";
const MAX_APPS = 8;
const MAX_LANGUAGES = 6;

const themes = [
  { id: "noir", name: "Noir Pulse (dark)" },
  { id: "nebula", name: "Nebula Pop (dark)" },
  { id: "daylight", name: "Daylight Drift (light)" },
  { id: "paper", name: "Paper Forest (light)" }
];

// Badge selector options used in the profile section.
const badgeOptions = [
  "Latency whisperer",
  "Bug slayer",
  "CI/CD enjoyer",
  "API architect",
  "Refactor merchant",
  "Incident responder",
  "Ship it mode",
  "Query optimizer",
  "Custom"
];

const metricIconCatalog = {
  bolt: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M13 2 4 14h6l-1 8 9-12h-6l1-8z'/></svg>",
  terminal: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M4 5h16v14H4z'/><path d='m7 9 3 3-3 3M12 15h5'/></svg>",
  git: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M7 4 4 7l5 5 3-3 5 5-3 3 5 5 3-3-15-15z'/></svg>",
  coffee: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M4 8h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z'/><path d='M16 9h2a2 2 0 0 1 0 4h-2'/></svg>",
  chart: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M4 19h16'/><path d='M7 15v-5M12 19V5M17 19v-8'/></svg>",
  bug: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M8 8a4 4 0 1 1 8 0v8a4 4 0 1 1-8 0z'/><path d='M6 10h12M6 14h12M9 4l-2-2M15 4l2-2'/></svg>",
  rocket: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M5 19c2-4 6-7 10-10l4-4 1 1-4 4c-3 4-6 8-10 10l-4 1 1-4z'/><path d='M12 12l3 3'/></svg>",
  clock: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'><circle cx='12' cy='12' r='9'/><path d='M12 7v6l4 2'/></svg>",
  people: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'><circle cx='8' cy='9' r='3'/><circle cx='16' cy='10' r='3'/><path d='M3 20c1-3 3-5 5-5s4 2 5 5'/><path d='M13 20c.5-2 2-4 4-4 1.5 0 3 1 4 4'/></svg>",
  buddy: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M12 3c3 2 6 4 6 7a6 6 0 1 1-12 0c0-3 3-5 6-7z'/><path d='M9 14h6'/></svg>"
};

const metricIconOptions = Object.keys(metricIconCatalog);

const makeLetterIcon = (label, color) =>
  `<svg viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>
    <rect width='48' height='48' rx='14' fill='${color}' />
    <text x='24' y='30' text-anchor='middle' font-size='16' font-family='Arial, sans-serif' fill='#0a0a0a'>${label}</text>
  </svg>`;

const appCatalog = [
  { id: "vscode", name: "VS Code", svg: makeLetterIcon("VS", "#3aa0ff") },
  { id: "github", name: "GitHub", svg: makeLetterIcon("GH", "#c9d1d9") },
  { id: "docker", name: "Docker", svg: makeLetterIcon("DK", "#2496ed") },
  { id: "figma", name: "Figma", svg: makeLetterIcon("FG", "#f24e1e") },
  { id: "slack", name: "Slack", svg: makeLetterIcon("SL", "#ecb22e") },
  { id: "notion", name: "Notion", svg: makeLetterIcon("NO", "#eaecef") },
  { id: "postman", name: "Postman", svg: makeLetterIcon("PM", "#ff6c37") },
  { id: "jira", name: "Jira", svg: makeLetterIcon("JR", "#2684ff") },
  { id: "chrome", name: "Chrome", svg: makeLetterIcon("CH", "#34a853") },
  { id: "terminal", name: "Terminal", svg: makeLetterIcon(">_", "#9ae6b4") },
  { id: "npm", name: "NPM", svg: makeLetterIcon("NP", "#cb3837") },
  { id: "aws", name: "AWS", svg: makeLetterIcon("AW", "#f5a623") },
  { id: "gcp", name: "GCP", svg: makeLetterIcon("GC", "#4285f4") },
  { id: "azure", name: "Azure", svg: makeLetterIcon("AZ", "#0078d4") },
  { id: "gitlab", name: "GitLab", svg: makeLetterIcon("GL", "#fc6d26") },
  { id: "bitbucket", name: "Bitbucket", svg: makeLetterIcon("BB", "#0052cc") },
  { id: "linux", name: "Linux", svg: makeLetterIcon("LX", "#f6c915") },
  { id: "android", name: "Android Studio", svg: makeLetterIcon("AS", "#3ddc84") },
  { id: "xcode", name: "Xcode", svg: makeLetterIcon("XC", "#1e90ff") },
  { id: "intellij", name: "IntelliJ", svg: makeLetterIcon("IJ", "#ff007f") }
];

const languageCatalog = [
  { id: "js", name: "JavaScript", svg: makeLetterIcon("JS", "#f7df1e") },
  { id: "ts", name: "TypeScript", svg: makeLetterIcon("TS", "#3178c6") },
  { id: "py", name: "Python", svg: makeLetterIcon("PY", "#3572a5") },
  { id: "go", name: "Go", svg: makeLetterIcon("GO", "#00add8") },
  { id: "rs", name: "Rust", svg: makeLetterIcon("RS", "#f74c00") },
  { id: "java", name: "Java", svg: makeLetterIcon("JV", "#e76f00") },
  { id: "kt", name: "Kotlin", svg: makeLetterIcon("KT", "#7f52ff") },
  { id: "swift", name: "Swift", svg: makeLetterIcon("SW", "#f05138") },
  { id: "c", name: "C", svg: makeLetterIcon("C", "#a8b9cc") },
  { id: "cpp", name: "C++", svg: makeLetterIcon("C+", "#00599c") },
  { id: "cs", name: "C#", svg: makeLetterIcon("C#", "#512bd4") },
  { id: "ruby", name: "Ruby", svg: makeLetterIcon("RB", "#cc342d") },
  { id: "php", name: "PHP", svg: makeLetterIcon("PH", "#777bb4") },
  { id: "sql", name: "SQL", svg: makeLetterIcon("SQ", "#336791") },
  { id: "html", name: "HTML", svg: makeLetterIcon("HT", "#e34f26") },
  { id: "css", name: "CSS", svg: makeLetterIcon("CS", "#2965f1") },
  { id: "bash", name: "Bash", svg: makeLetterIcon("SH", "#4eaa25") },
  { id: "yaml", name: "YAML", svg: makeLetterIcon("YM", "#cbcbcb") },
  { id: "scala", name: "Scala", svg: makeLetterIcon("SC", "#dc322f") },
  { id: "dart", name: "Dart", svg: makeLetterIcon("DT", "#0175c2") },
  { id: "elixir", name: "Elixir", svg: makeLetterIcon("EX", "#4e2a8e") }
];

const defaultData = {
  year: 2025,
  title: "SOFTWARE ENGINEER WRAP",
  subtitle: "Your code year in review",
  tagline: "Built in flow state",
  metrics: [
    { id: "loc", label: "Lines of code", value: "184,220", icon: "terminal" },
    { id: "commits", label: "Commits", value: "1,204", icon: "git" },
    { id: "coffee", label: "Coffees consumed", value: "412", icon: "coffee" },
    { id: "hours", label: "Hours coded", value: "1,530", icon: "clock" },
    { id: "bugs", label: "Bugs fixed", value: "326", icon: "bug" },
    { id: "ships", label: "Projects shipped", value: "18", icon: "rocket" },
    { id: "meetings", label: "Hours in meetings", value: "240", icon: "people" },
    { id: "buddy", label: "Programmer buddy", value: "Cora the cat", icon: "buddy" }
  ],
  apps: ["vscode", "github", "docker", "slack", "notion", "postman", "chrome", "terminal"],
  languages: ["js", "ts", "py", "go", "sql", "css"],
  profile: {
    name: "Jagan Jijo",
    role: "Software Engineer",
    company: "AISOC",
    badge: "Latency whisperer",
    badgeCustom: "",
    photoDataUrl: ""
  },
  themeId: "noir",
  customIcons: {}
};

const state = {
  data: loadData()
};

const elements = {
  yearInput: document.getElementById("yearInput"),
  titleInput: document.getElementById("titleInput"),
  subtitleInput: document.getElementById("subtitleInput"),
  taglineInput: document.getElementById("taglineInput"),
  themeSelect: document.getElementById("themeSelect"),
  safeAreaToggle: document.getElementById("safeAreaToggle"),
  metricsList: document.getElementById("metricsList"),
  appsGrid: document.getElementById("appsGrid"),
  languagesGrid: document.getElementById("languagesGrid"),
  appsCount: document.getElementById("appsCount"),
  languagesCount: document.getElementById("languagesCount"),
  profilePhotoInput: document.getElementById("profilePhotoInput"),
  profileNameInput: document.getElementById("profileNameInput"),
  profileRoleInput: document.getElementById("profileRoleInput"),
  profileCompanyInput: document.getElementById("profileCompanyInput"),
  profileBadgeSelect: document.getElementById("profileBadgeSelect"),
  profileBadgeCustomInput: document.getElementById("profileBadgeCustomInput"),
  customBadgeRow: document.getElementById("customBadgeRow"),
  customAppInput: document.getElementById("customAppInput"),
  customLanguageInput: document.getElementById("customLanguageInput"),
  exportJsonBtn: document.getElementById("exportJsonBtn"),
  importJsonInput: document.getElementById("importJsonInput"),
  resetBtn: document.getElementById("resetBtn"),
  downloadPngBtn: document.getElementById("downloadPngBtn"),
  shareLinkedInBtn: document.getElementById("shareLinkedInBtn"),
  shareInstagramBtn: document.getElementById("shareInstagramBtn"),
  shareWhatsappBtn: document.getElementById("shareWhatsappBtn"),
  loadPresetBackend: document.getElementById("loadPresetBackend"),
  loadPresetFrontend: document.getElementById("loadPresetFrontend"),
  loadPresetDevops: document.getElementById("loadPresetDevops"),
  poster: document.getElementById("poster"),
  posterKicker: document.getElementById("posterKicker"),
  posterYear: document.getElementById("posterYear"),
  posterSubtitle: document.getElementById("posterSubtitle"),
  posterTagline: document.getElementById("posterTagline"),
  posterMetrics: document.getElementById("posterMetrics"),
  posterApps: document.getElementById("posterApps"),
  posterLanguages: document.getElementById("posterLanguages"),
  posterPhoto: document.getElementById("posterPhoto"),
  posterName: document.getElementById("posterName"),
  posterRole: document.getElementById("posterRole"),
  posterCompany: document.getElementById("posterCompany"),
  posterBadge: document.getElementById("posterBadge"),
  safeOverlay: document.getElementById("safeOverlay")
};

init();

function init() {
  renderThemeOptions();
  bindForm();
  renderAll();
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultData);
  try {
    return { ...defaultData, ...JSON.parse(saved) };
  } catch (error) {
    console.warn("Failed to parse saved data", error);
    return structuredClone(defaultData);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function renderThemeOptions() {
  elements.themeSelect.innerHTML = themes
    .map((theme) => `<option value='${theme.id}'>${theme.name}</option>`)
    .join("");
}

function renderBadgeOptions() {
  elements.profileBadgeSelect.innerHTML = badgeOptions
    .map((badge) => `<option value='${badge}'>${badge}</option>`)
    .join("");
}

function bindForm() {
  elements.yearInput.addEventListener("input", () => updateData("year", Number(elements.yearInput.value)));
  elements.titleInput.addEventListener("input", () => updateData("title", elements.titleInput.value));
  elements.subtitleInput.addEventListener("input", () => updateData("subtitle", elements.subtitleInput.value));
  elements.taglineInput.addEventListener("input", () => updateData("tagline", elements.taglineInput.value));
  elements.themeSelect.addEventListener("change", () => updateData("themeId", elements.themeSelect.value));
  elements.safeAreaToggle.addEventListener("change", () => {
    elements.safeOverlay.hidden = !elements.safeAreaToggle.checked;
  });

  elements.profileNameInput.addEventListener("input", () => updateProfile("name", elements.profileNameInput.value));
  elements.profileRoleInput.addEventListener("input", () => updateProfile("role", elements.profileRoleInput.value));
  elements.profileCompanyInput.addEventListener("input", () => updateProfile("company", elements.profileCompanyInput.value));
  elements.profileBadgeSelect.addEventListener("change", () => updateBadgeSelection());
  elements.profileBadgeCustomInput.addEventListener("input", () => updateProfile("badgeCustom", elements.profileBadgeCustomInput.value));

  elements.profilePhotoInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const dataUrl = await resizeImage(file, 320);
    updateProfile("photoDataUrl", dataUrl);
  });

  elements.customAppInput.addEventListener("change", (event) => addCustomIcon(event, "apps"));
  elements.customLanguageInput.addEventListener("change", (event) => addCustomIcon(event, "languages"));

  elements.exportJsonBtn.addEventListener("click", exportJson);
  elements.importJsonInput.addEventListener("change", importJson);
  elements.resetBtn.addEventListener("click", resetData);
  elements.downloadPngBtn.addEventListener("click", downloadPng);

  elements.shareLinkedInBtn.addEventListener("click", () => shareFlow("linkedin"));
  elements.shareInstagramBtn.addEventListener("click", () => shareFlow("instagram"));
  elements.shareWhatsappBtn.addEventListener("click", () => shareFlow("whatsapp"));

  elements.loadPresetBackend.addEventListener("click", () => applyPreset("backend"));
  elements.loadPresetFrontend.addEventListener("click", () => applyPreset("frontend"));
  elements.loadPresetDevops.addEventListener("click", () => applyPreset("devops"));
}

function renderAll() {
  renderBadgeOptions();
  elements.yearInput.value = state.data.year;
  elements.titleInput.value = state.data.title;
  elements.subtitleInput.value = state.data.subtitle;
  elements.taglineInput.value = state.data.tagline;
  elements.themeSelect.value = state.data.themeId;

  const badgeIsKnown = badgeOptions.includes(state.data.profile.badge);
  if (!badgeIsKnown && state.data.profile.badge) {
    state.data.profile.badgeCustom = state.data.profile.badge;
    state.data.profile.badge = "Custom";
  }

  elements.profileNameInput.value = state.data.profile.name;
  elements.profileRoleInput.value = state.data.profile.role;
  elements.profileCompanyInput.value = state.data.profile.company;
  elements.profileBadgeSelect.value = state.data.profile.badge;
  elements.profileBadgeCustomInput.value = state.data.profile.badgeCustom;
  toggleCustomBadge(state.data.profile.badge === "Custom");

  renderMetricsForm();
  renderCatalogGrid("apps");
  renderCatalogGrid("languages");
  renderPoster();
  saveData();
}

function updateData(key, value) {
  state.data[key] = value;
  renderPoster();
  saveData();
}

function updateProfile(key, value) {
  state.data.profile[key] = value;
  renderPoster();
  saveData();
}

function renderMetricsForm() {
  elements.metricsList.innerHTML = "";

  state.data.metrics.forEach((metric, index) => {
    const row = document.createElement("div");
    row.className = "metric-item";

    const labelInput = document.createElement("input");
    labelInput.value = metric.label;
    labelInput.addEventListener("input", () => {
      metric.label = labelInput.value;
      renderPoster();
      saveData();
    });

    const valueInput = document.createElement("input");
    valueInput.value = metric.value;
    valueInput.addEventListener("input", () => {
      metric.value = valueInput.value;
      renderPoster();
      saveData();
    });

    const iconSelect = document.createElement("select");
    metricIconOptions.forEach((id) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = id;
      iconSelect.appendChild(option);
    });
    iconSelect.value = metric.icon;
    iconSelect.addEventListener("change", () => {
      metric.icon = iconSelect.value;
      renderPoster();
      saveData();
    });

    row.append(labelInput, valueInput, iconSelect);
    elements.metricsList.appendChild(row);
  });
}

function getCatalog(type) {
  const base = type === "apps" ? appCatalog : languageCatalog;
  const custom = Object.entries(state.data.customIcons)
    .filter(([id, item]) => item.type === type)
    .map(([id, item]) => ({ id, name: item.name, img: item.dataUrl }));
  return [...base, ...custom];
}

function renderCatalogGrid(type) {
  const grid = type === "apps" ? elements.appsGrid : elements.languagesGrid;
  const selected = new Set(state.data[type]);
  const limit = type === "apps" ? MAX_APPS : MAX_LANGUAGES;
  const countEl = type === "apps" ? elements.appsCount : elements.languagesCount;

  grid.innerHTML = "";
  getCatalog(type).forEach((item) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "icon-tile";
    if (selected.has(item.id)) tile.classList.add("selected");

    if (item.svg) {
      tile.innerHTML = `${item.svg}<span>${item.name}</span>`;
    } else {
      tile.innerHTML = `<img src='${item.img}' alt='${item.name}' /><span>${item.name}</span>`;
    }

    tile.addEventListener("click", () => {
      const alreadySelected = selected.has(item.id);
      if (!alreadySelected && selected.size >= limit) {
        alert(`Limit reached: choose up to ${limit} ${type}.`);
        return;
      }
      if (alreadySelected) {
        selected.delete(item.id);
      } else {
        selected.add(item.id);
      }
      state.data[type] = Array.from(selected);
      renderCatalogGrid(type);
      renderPoster();
      saveData();
    });

    grid.appendChild(tile);
  });

  countEl.textContent = `${selected.size}/${limit} selected`;
}

function renderPoster() {
  document.body.dataset.theme = state.data.themeId;
  elements.posterKicker.textContent = state.data.title;
  elements.posterYear.textContent = state.data.year;
  elements.posterSubtitle.textContent = state.data.subtitle;
  elements.posterTagline.textContent = state.data.tagline;

  elements.posterName.textContent = state.data.profile.name || "";
  elements.posterRole.textContent = state.data.profile.role || "";
  elements.posterCompany.textContent = state.data.profile.company || "";
  elements.posterBadge.textContent = getBadgeText();

  elements.posterPhoto.innerHTML = state.data.profile.photoDataUrl
    ? `<img src='${state.data.profile.photoDataUrl}' alt='Profile photo' />`
    : "<span>+</span>";

  elements.posterMetrics.innerHTML = state.data.metrics
    .map((metric) => {
      const icon = metricIconCatalog[metric.icon] || metricIconCatalog.terminal;
      return `
        <div class='metric-card'>
          <div class='metric-icon'>${icon}</div>
          <div>
            <div class='metric-label'>${metric.label}</div>
            <div class='metric-value'>${metric.value}</div>
          </div>
        </div>
      `;
    })
    .join("");

  elements.posterApps.innerHTML = renderIconChips(state.data.apps, "apps");
  elements.posterLanguages.innerHTML = renderIconChips(state.data.languages, "languages");
}

function updateBadgeSelection() {
  const selected = elements.profileBadgeSelect.value;
  updateProfile("badge", selected);
  toggleCustomBadge(selected === "Custom");
}

function toggleCustomBadge(show) {
  elements.customBadgeRow.hidden = !show;
  if (!show) {
    elements.profileBadgeCustomInput.value = "";
    updateProfile("badgeCustom", "");
  }
}

function getBadgeText() {
  // The poster always renders a single badge pill.
  if (state.data.profile.badge === "Custom") {
    return state.data.profile.badgeCustom || "Custom badge";
  }
  return state.data.profile.badge || "";
}

function renderIconChips(ids, type) {
  const catalog = getCatalog(type);
  return ids
    .map((id) => catalog.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => {
      if (item.svg) {
        return `<div class='icon-chip'>${item.svg}</div>`;
      }
      return `<div class='icon-chip'><img src='${item.img}' alt='${item.name}' /></div>`;
    })
    .join("");
}

function addCustomIcon(event, type) {
  const file = event.target.files[0];
  if (!file) return;
  const limit = type === "apps" ? MAX_APPS : MAX_LANGUAGES;
  if (state.data[type].length >= limit) {
    alert(`Limit reached: choose up to ${limit} ${type}.`);
    event.target.value = "";
    return;
  }
  const id = `custom-${type}-${Date.now()}`;
  resizeImage(file, 140).then((dataUrl) => {
    state.data.customIcons[id] = { type, name: file.name.replace(/\..+$/, ""), dataUrl };
    state.data[type].push(id);
    renderCatalogGrid(type);
    renderPoster();
    saveData();
    event.target.value = "";
  });
}

function resizeImage(file, size) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = size / Math.max(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
  downloadBlob(blob, "wrap-data.json");
}

function importJson(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      state.data = { ...structuredClone(defaultData), ...parsed };
      renderAll();
    } catch (error) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function resetData() {
  if (!confirm("Reset all data and clear local storage?")) return;
  state.data = structuredClone(defaultData);
  renderAll();
  saveData();
}

async function downloadPng() {
  const blob = await exportPosterBlob();
  if (blob) downloadBlob(blob, `wrap-${state.data.year}.png`);
}

async function shareFlow(platform) {
  const blob = await exportPosterBlob();
  const shareText = `${state.data.title} ${state.data.year} - ${state.data.subtitle}`;

  if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], "wrap.png", { type: "image/png" })] })) {
    const file = new File([blob], "wrap.png", { type: "image/png" });
    try {
      await navigator.share({ files: [file], text: shareText });
      return;
    } catch (error) {
      console.warn("Share cancelled", error);
    }
  }

  const shareUrls = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + location.href)}`,
    instagram: `https://www.instagram.com/`
  };

  const url = shareUrls[platform];
  window.open(url, "_blank", "noopener");
  alert("Download the PNG, then attach it in the share composer.");
}

async function exportPosterBlob() {
  const poster = elements.poster;
  const rect = poster.getBoundingClientRect();
  const targetWidth = 1080;
  const scale = targetWidth / rect.width;

  const clone = poster.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  clone.querySelectorAll("[data-no-export]").forEach((node) => node.remove());
  inlineStyles(poster, clone);

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${rect.width}' height='${rect.height}'>
      <foreignObject width='100%' height='100%'>
        ${new XMLSerializer().serializeToString(clone)}
      </foreignObject>
    </svg>
  `;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(rect.width * scale);
      canvas.height = Math.round(rect.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => resolve(blob), "image/png");
    };
    img.onerror = () => resolve(null);
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  });
}

function inlineStyles(sourceNode, targetNode) {
  const computed = getComputedStyle(sourceNode);
  let styleText = "";
  for (const prop of computed) {
    styleText += `${prop}:${computed.getPropertyValue(prop)};`;
  }
  targetNode.setAttribute("style", styleText);
  for (let i = 0; i < sourceNode.children.length; i += 1) {
    inlineStyles(sourceNode.children[i], targetNode.children[i]);
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function applyPreset(type) {
  const presets = {
    backend: {
      title: "SOFTWARE ENGINEER WRAP",
      subtitle: "API throughput chronicles",
      tagline: "Optimized for scale",
      metrics: [
        { id: "loc", label: "Lines of code", value: "210,400", icon: "terminal" },
        { id: "commits", label: "Commits", value: "1,420", icon: "git" },
        { id: "coffee", label: "Coffees consumed", value: "520", icon: "coffee" },
        { id: "hours", label: "Hours coded", value: "1,820", icon: "clock" },
        { id: "bugs", label: "Bugs fixed", value: "402", icon: "bug" },
        { id: "ships", label: "Services shipped", value: "26", icon: "rocket" },
        { id: "meetings", label: "Hours in meetings", value: "280", icon: "people" },
        { id: "buddy", label: "Programmer buddy", value: "Query optimizer", icon: "buddy" }
      ],
      apps: ["vscode", "github", "postman", "docker", "aws", "terminal", "linux", "jira"],
      languages: ["go", "py", "sql", "rs", "java", "bash"],
      themeId: "noir"
    },
    frontend: {
      title: "SOFTWARE ENGINEER WRAP",
      subtitle: "UI shipped with intent",
      tagline: "Pixel perfect & fast",
      metrics: [
        { id: "loc", label: "Lines of code", value: "156,700", icon: "terminal" },
        { id: "commits", label: "Commits", value: "980", icon: "git" },
        { id: "coffee", label: "Coffees consumed", value: "360", icon: "coffee" },
        { id: "hours", label: "Hours coded", value: "1,340", icon: "clock" },
        { id: "bugs", label: "Bugs fixed", value: "210", icon: "bug" },
        { id: "ships", label: "Experiences shipped", value: "33", icon: "rocket" },
        { id: "meetings", label: "Hours in meetings", value: "190", icon: "people" },
        { id: "buddy", label: "Programmer buddy", value: "Design partner", icon: "buddy" }
      ],
      apps: ["figma", "vscode", "chrome", "notion", "slack", "github", "jira", "npm"],
      languages: ["js", "ts", "css", "html", "dart", "swift"],
      themeId: "daylight"
    },
    devops: {
      title: "SOFTWARE ENGINEER WRAP",
      subtitle: "Uptime guardianship",
      tagline: "Infra that breathes",
      metrics: [
        { id: "loc", label: "Lines of code", value: "198,020", icon: "terminal" },
        { id: "commits", label: "Commits", value: "1,050", icon: "git" },
        { id: "coffee", label: "Coffees consumed", value: "460", icon: "coffee" },
        { id: "hours", label: "Hours coded", value: "1,610", icon: "clock" },
        { id: "bugs", label: "Incidents resolved", value: "112", icon: "bug" },
        { id: "ships", label: "Pipelines shipped", value: "42", icon: "rocket" },
        { id: "meetings", label: "Hours in meetings", value: "210", icon: "people" },
        { id: "buddy", label: "Programmer buddy", value: "Pager duty", icon: "buddy" }
      ],
      apps: ["docker", "aws", "gcp", "azure", "gitlab", "linux", "terminal", "slack"],
      languages: ["bash", "py", "go", "sql", "yaml", "rs"],
      themeId: "nebula"
    }
  };

  const preset = presets[type];
  if (!preset) return;

  state.data = {
    ...state.data,
    ...preset
  };
  renderAll();
}
