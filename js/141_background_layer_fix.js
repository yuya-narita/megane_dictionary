/* 141_background_layer_fix.js
 * Phase 1: 背景レイヤーだけを安定化
 *
 * レイアウト、カード寸法、音楽プレイヤー、各ボタン位置には触れない。
 * Safari / PWA の可変ビューポートでも、背景だけを画面最下部まで固定する。
 */
(() => {
  "use strict";

  const LAYER_ID = "meganeViewportBackground";
  const STYLE_ID = "meganeViewportBackgroundStyle";

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      html {
        min-height: 100%;
        background: #08090d !important;
      }

      body {
        position: relative !important;
        min-height: 100svh !important;
        min-height: 100dvh !important;
        background: transparent !important;
        isolation: isolate;
      }

      #${LAYER_ID} {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        height: 100svh;
        height: 100dvh;
        min-height: 100%;
        z-index: -1;
        pointer-events: none;
        background:
          radial-gradient(
            circle at 50% 20%,
            rgba(120,160,255,.16),
            transparent 35%
          ),
          radial-gradient(
            circle at 20% 80%,
            rgba(255,180,210,.10),
            transparent 30%
          ),
          #08090d;
        transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }

      /* MUSIC側の既存背景は透過のまま、固定背景を見せる。
         高さ・top・bottom・paddingなどのレイアウト値は変更しない。 */
      body.mode-music #app,
      body.mode-music #musicView,
      body.mode-music .music-view {
        background-color: transparent !important;
      }
    `;
    document.head.appendChild(style);
  }

  function ensureLayer() {
    let layer = document.getElementById(LAYER_ID);
    if (layer) return layer;

    layer = document.createElement("div");
    layer.id = LAYER_ID;
    layer.setAttribute("aria-hidden", "true");

    // bodyの最初に置き、全モード共通の最背面として使う。
    document.body.insertBefore(layer, document.body.firstChild);
    return layer;
  }

  function syncViewportHeight() {
    const layer = document.getElementById(LAYER_ID);
    if (!layer) return;

    // visualViewportが取れるSafariでは、現在見えている実画面高へ追従。
    const vv = window.visualViewport;
    const height = vv && vv.height ? Math.ceil(vv.height) : window.innerHeight;

    if (height > 0) {
      layer.style.height = `${height}px`;
      layer.style.minHeight = `${height}px`;
    }
  }

  function boot() {
    ensureStyle();
    ensureLayer();
    syncViewportHeight();

    window.addEventListener("resize", syncViewportHeight, { passive: true });
    window.addEventListener("orientationchange", syncViewportHeight, { passive: true });
    window.addEventListener("pageshow", syncViewportHeight, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", syncViewportHeight, { passive: true });
      window.visualViewport.addEventListener("scroll", syncViewportHeight, { passive: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
