/* 140_world_search.js v4
 * メガネ辞書 → 外の世界へ
 * 検索ボタンをカードDOMの外側へ置き、カード音声タップと完全分離する。
 */
(() => {
  "use strict";

  const BUTTON_ID = "worldSearchButton";
  const STYLE_ID = "worldSearchStyleV4";
  let lastOpenAt = 0;
  let rafId = 0;

  const TARGETS = {
    gag: { icon: "🔍", label: "世間を見る", destination: "Google", buildUrl: word => `https://www.google.com/search?q=${encodeURIComponent(word)}` },
    happy: { icon: "📷", label: "表現を見る", destination: "画像検索", buildUrl: word => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(word)}` },
    math: { icon: "📖", label: "定義を読む", destination: "Wikipedia", buildUrl: word => `https://ja.wikipedia.org/w/index.php?search=${encodeURIComponent(word)}` },
    hacker: { icon: "🌐", label: "構造を探る", destination: "Google", buildUrl: word => `https://www.google.com/search?q=${encodeURIComponent(word + " 仕組み 技術")}` }
  };

  function addStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${BUTTON_ID} {
        position: fixed;
        z-index: 2147483000;
        width: 46px; height: 46px; padding: 0;
        border: 1px solid rgba(255,255,255,.18);
        border-radius: 50%; display: grid; place-items: center;
        background: rgba(6,8,13,.34); color: #fff;
        font-size: 22px; line-height: 1;
        box-shadow: 0 10px 26px rgba(0,0,0,.22);
        backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        touch-action: manipulation !important;
        -webkit-tap-highlight-color: transparent;
        user-select: none; cursor: pointer;
      }
      #${BUTTON_ID}:active { transform: scale(.92); }
      #${BUTTON_ID}[hidden] { display: none !important; }
      #${BUTTON_ID}::after {
        content: attr(data-label); position: absolute; left: 52px; top: 50%;
        transform: translateY(-50%); width: max-content; max-width: 145px;
        padding: 6px 9px; border-radius: 999px;
        background: rgba(8,10,16,.72); color: rgba(255,255,255,.78);
        font-size: 10px; font-weight: 700; letter-spacing: .04em;
        opacity: 0; pointer-events: none; transition: opacity .16s ease;
      }
      #${BUTTON_ID}:focus-visible::after, #${BUTTON_ID}:hover::after { opacity: 1; }
      @media (max-width: 420px) { #${BUTTON_ID} { width: 43px; height: 43px; font-size: 20px; } }
    `;
    document.head.appendChild(style);
  }

  function getWordText() {
    try {
      if (typeof window.currentWord === "function") {
        const word = window.currentWord();
        if (word && word.word) return String(word.word).trim();
      }
    } catch (_) {}
    const el = document.getElementById("word");
    return el ? String(el.textContent || "").trim() : "";
  }

  function getGlassId() {
    try {
      if (typeof window.currentGlass === "function") {
        const glass = window.currentGlass();
        if (glass && glass.id) return String(glass.id);
      }
    } catch (_) {}
    const themeClass = Array.from(document.body.classList).find(name => name.startsWith("theme-"));
    return themeClass ? themeClass.slice(6) : "";
  }

  function isDictionaryVisible() {
    const bodyModeIsDictionary = document.body.classList.contains("mode-dictionary");
    const selfActive = document.body.classList.contains("self-glass-active") ||
      (typeof window.MEGANE_SELF_GLASS_IS_ACTIVE === "function" && window.MEGANE_SELF_GLASS_IS_ACTIVE());
    return bodyModeIsDictionary && !selfActive;
  }

  function positionButton() {
    const button = document.getElementById(BUTTON_ID);
    const card = document.getElementById("card") || document.querySelector(".card");
    if (!button || !card || button.hidden) return;
    const rect = card.getBoundingClientRect();
    const compact = window.matchMedia("(max-width: 420px)").matches;
    const size = compact ? 43 : 46;
    const insetX = compact ? 12 : 16;
    const insetY = compact ? 11 : 14;
    button.style.left = `${Math.round(rect.left + insetX)}px`;
    button.style.top = `${Math.round(rect.bottom - insetY - size)}px`;
  }

  function schedulePosition() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(positionButton);
  }

  function updateButton() {
    const button = document.getElementById(BUTTON_ID);
    if (!button) return;
    const glassId = getGlassId();
    const target = TARGETS[glassId];
    const word = getWordText();
    const visible = Boolean(target && word && isDictionaryVisible());
    button.hidden = !visible;
    if (!visible) return;
    button.textContent = target.icon;
    button.dataset.glass = glassId;
    button.dataset.label = target.label;
    button.dataset.destination = target.destination;
    button.setAttribute("aria-label", `${word}を${target.destination}で${target.label}`);
    button.title = `${word}｜${target.label}`;
    schedulePosition();
  }

  function stopEvent(event) {
    if (!event) return;
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
  }

  function openCurrentWorld(event) {
    stopEvent(event);
    const now = Date.now();
    if (now - lastOpenAt < 700) return;
    lastOpenAt = now;
    const glassId = getGlassId();
    const word = getWordText();
    const target = TARGETS[glassId];
    if (!target || !word) return;
    const url = target.buildUrl(word);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.assign(url);
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", "world_search", { search_term: word, glass_id: glassId, destination: target.destination });
      }
    } catch (_) {}
  }

  function createButton() {
    if (document.getElementById(BUTTON_ID)) return;
    const button = document.createElement("button");
    button.id = BUTTON_ID;
    button.type = "button";
    button.hidden = true;
    document.body.appendChild(button);
    // モバイルのタッチ操作では touchstart の preventDefault により click が発火しないことがある。
    // そのため「離した瞬間」で直接検索を開き、click はPC用の予備として残す。
    ["pointerdown", "touchstart", "mousedown"].forEach(type => {
      button.addEventListener(type, stopEvent, { capture: true, passive: false });
    });
    button.addEventListener("pointerup", openCurrentWorld, { capture: true, passive: false });
    button.addEventListener("touchend", openCurrentWorld, { capture: true, passive: false });
    button.addEventListener("mouseup", openCurrentWorld, { capture: true, passive: false });
    button.addEventListener("click", openCurrentWorld, { capture: true, passive: false });
    updateButton();
  }

  function observeChanges() {
    const observer = new MutationObserver(() => { updateButton(); schedulePosition(); });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    const word = document.getElementById("word");
    const glassName = document.getElementById("glassName");
    if (word) observer.observe(word, { childList: true, characterData: true, subtree: true });
    if (glassName) observer.observe(glassName, { childList: true, characterData: true, subtree: true });
    ["resize", "orientationchange", "scroll", "pageshow", "focus"].forEach(type => {
      window.addEventListener(type, () => { updateButton(); schedulePosition(); }, { passive: true });
    });
    setInterval(updateButton, 500);
  }

  function initWorldSearch() {
    addStyle(); createButton(); observeChanges(); updateButton();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initWorldSearch, { once: true });
  else initWorldSearch();
})();
