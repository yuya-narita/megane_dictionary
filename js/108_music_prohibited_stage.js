/* 108_music_prohibited_stage.js
   ISOLATION ALBUM — HYBRID EVIDENCE ARCHIVE
   CSS typography + lightweight image texture.
*/
(function () {
  "use strict";

  var STYLE_ID = "musicProhibitedHybridStyle";
  var POSTER_CLASS = "prohibited-hybrid-poster";
  var TIMER = 0;

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .music-v7-restricted-grid .music-v7-album-art.prohibited-hybrid-card
      .music-v7-jacket{
        position:relative !important;
        overflow:hidden !important;
        background:#080808 !important;
        border:1px solid rgba(216,203,174,.34) !important;
        box-shadow:
          inset 0 0 0 1px rgba(255,255,255,.025),
          inset 0 0 42px rgba(0,0,0,.92),
          0 17px 38px rgba(0,0,0,.42) !important;
      }

      .music-v7-restricted-grid .music-v7-album-art.prohibited-hybrid-card
      .music-v7-jacket > img,
      .music-v7-restricted-grid .music-v7-album-art.prohibited-hybrid-card
      .music-v7-jacket > span{
        opacity:0 !important;
        pointer-events:none !important;
      }

      .music-v7-restricted-grid .music-v7-album-art.prohibited-hybrid-card
      .music-v7-unlock-mask{
        display:none !important;
      }

      .${POSTER_CLASS}{
        --paper:#d1c5a9;
        --dim:#9b917c;
        --red:#8f2721;
        position:absolute;
        inset:0;
        z-index:5;
        overflow:hidden;
        color:var(--paper);
        background:
          linear-gradient(rgba(5,5,5,.38),rgba(5,5,5,.62)),
          url("./prohibited_texture.webp") center/cover no-repeat,
          #090909;
        font-family:
          "Arial Narrow","DIN Condensed","Helvetica Neue",
          "Noto Sans JP","Hiragino Kaku Gothic ProN",sans-serif;
        isolation:isolate;
      }

      .${POSTER_CLASS}::before{
        content:"";
        position:absolute;
        inset:7px;
        border:1px solid rgba(209,197,169,.25);
        box-shadow:inset 0 0 24px rgba(0,0,0,.65);
        pointer-events:none;
      }

      .${POSTER_CLASS}::after{
        content:"";
        position:absolute;
        inset:0;
        opacity:.34;
        pointer-events:none;
        background:
          radial-gradient(circle at 14% 16%,rgba(255,255,255,.05),transparent 27%),
          radial-gradient(circle at 83% 70%,rgba(255,255,255,.035),transparent 31%),
          repeating-linear-gradient(0deg,transparent 0 3px,rgba(255,255,255,.012) 4px),
          linear-gradient(105deg,transparent 0 48%,rgba(255,255,255,.045) 48.2%,transparent 48.8%);
        mix-blend-mode:screen;
      }

      .${POSTER_CLASS} *{box-sizing:border-box}

      .pep-top{
        position:absolute;top:7%;left:8%;right:8%;
        display:flex;justify-content:space-between;align-items:flex-start;
        font-size:clamp(7px,2.6vw,11px);
        line-height:1.12;letter-spacing:.19em;font-weight:800;color:var(--dim);
      }
      .pep-top small{
        display:block;margin-top:4px;font-size:.7em;letter-spacing:.23em;font-weight:600;opacity:.76;
      }
      .pep-level{
        border:1px solid rgba(209,197,169,.35);
        padding:5px 6px 4px;text-align:center;min-width:40px;
      }
      .pep-level b{
        display:block;margin-top:2px;color:var(--red);
        font-size:2.2em;line-height:.9;letter-spacing:0;
      }

      .pep-side{
        position:absolute;top:22%;bottom:18%;width:9.5%;
        display:flex;align-items:center;justify-content:center;
        font-size:clamp(8px,3vw,12px);font-weight:900;letter-spacing:.08em;
        color:rgba(209,197,169,.72);writing-mode:vertical-rl;text-orientation:mixed;
      }
      .pep-side-left{left:1.7%;transform:rotate(180deg);border-left:1px solid rgba(209,197,169,.18)}
      .pep-side-right{right:1.7%;border-left:1px solid rgba(209,197,169,.18)}

      .pep-kicker{
        position:absolute;top:25.7%;left:15%;right:15%;
        display:flex;align-items:center;gap:8px;
        color:var(--dim);font-size:clamp(7px,2.4vw,10px);
        font-weight:800;letter-spacing:.28em;white-space:nowrap;
      }
      .pep-kicker::before,.pep-kicker::after{
        content:"";height:1px;flex:1;background:rgba(209,197,169,.35);
      }

      .pep-main{
        position:absolute;top:31%;left:10%;right:10%;text-align:center;
        font-family:"Arial Black","Noto Sans JP","Hiragino Kaku Gothic StdN",sans-serif;
        font-size:clamp(36px,16vw,74px);font-weight:1000;
        line-height:.94;letter-spacing:-.09em;color:#cabfa7;
        text-shadow:1px 0 rgba(255,255,255,.08),-1px 0 rgba(0,0,0,.85);
      }
      .pep-main::after{
        content:"";position:absolute;left:4%;right:4%;bottom:-11px;height:1px;
        background:rgba(209,197,169,.34);
      }

      .pep-archive{
        position:absolute;top:57%;left:15%;right:15%;text-align:center;
        color:var(--dim);font-size:clamp(7px,2.5vw,11px);
        font-weight:800;letter-spacing:.42em;white-space:nowrap;
      }

      .pep-ban{
        position:absolute;top:65.6%;left:50%;transform:translateX(-50%);
        min-width:50%;padding:5px 8px 4px;
        border:1px solid rgba(143,39,33,.9);color:#a02d27;text-align:center;
        font-size:clamp(10px,4vw,17px);line-height:1;letter-spacing:.21em;font-weight:950;
        background:rgba(5,5,5,.18);
      }
      .pep-ban small{
        display:block;margin-top:5px;font-size:.42em;letter-spacing:.24em;font-weight:800;
      }

      .pep-stamp{
        position:absolute;right:7%;bottom:17.5%;transform:rotate(-9deg);
        border:2px solid rgba(143,39,33,.82);padding:5px 7px 3px;
        color:rgba(159,44,36,.9);font-size:clamp(9px,3.5vw,15px);
        font-weight:1000;letter-spacing:.04em;line-height:1;
        background:rgba(5,5,5,.14);
      }

      .pep-lookback{
        position:absolute;left:9.5%;bottom:17.2%;
        color:rgba(209,197,169,.36);
        font-size:clamp(5px,1.8vw,8px);letter-spacing:.31em;font-weight:800;
      }

      .pep-footer{
        position:absolute;left:7.5%;right:7.5%;bottom:6.4%;
        display:flex;justify-content:space-between;align-items:flex-end;gap:8px;
        color:rgba(209,197,169,.58);
        font-size:clamp(5px,1.9vw,8px);line-height:1.35;letter-spacing:.15em;font-weight:700;
      }
      .pep-barcode{
        width:31%;height:16px;opacity:.62;
        background:repeating-linear-gradient(
          90deg,var(--paper) 0 1px,transparent 1px 3px,
          var(--paper) 3px 5px,transparent 5px 7px,
          var(--paper) 7px 8px,transparent 8px 11px
        );
      }
      .pep-file{text-align:right}
      .pep-file strong{
        display:block;color:rgba(209,197,169,.76);
        font-size:1.12em;letter-spacing:.23em;
      }
    `;
    document.head.appendChild(style);
  }

  function posterHTML() {
    return '' +
      '<div class="' + POSTER_CLASS + '" aria-hidden="true">' +
        '<div class="pep-top">' +
          '<div>ISOLATION ARCHIVE<small>MUSIC / RESTRICTED MATERIAL</small></div>' +
          '<div class="pep-level">LEVEL<b>7</b></div>' +
        '</div>' +
        '<div class="pep-side pep-side-left">RESTRICTED</div>' +
        '<div class="pep-side pep-side-right">DO NOT OPEN</div>' +
        '<div class="pep-kicker">隔離アルバム</div>' +
        '<div class="pep-main">押収品</div>' +
        '<div class="pep-archive">EVIDENCE ARCHIVE</div>' +
        '<div class="pep-ban">閲覧禁止<small>AUTHORIZED ACCESS ONLY</small></div>' +
        '<div class="pep-lookback">LOOK BACK.</div>' +
        '<div class="pep-stamp">QUARANTINE</div>' +
        '<div class="pep-footer">' +
          '<div class="pep-barcode"></div>' +
          '<div class="pep-file"><strong>CASE FILE 0001</strong>SEALED / CONFISCATED</div>' +
        '</div>' +
      '</div>';
  }

  function getTitle(card) {
    var copy = card.querySelector(".music-v7-album-copy strong");
    return (copy ? copy.textContent : card.textContent || "").trim().toLowerCase();
  }

  function isTarget(card) {
    var title = getTitle(card);
    return title.indexOf("poem:prohibited") >= 0 ||
           title.indexOf("poem prohibited") >= 0 ||
           title.indexOf("禁止") >= 0;
  }

  function decorate(card) {
    if (!card || !isTarget(card)) return;

    var locked = card.classList.contains("locked") ||
                 card.getAttribute("data-locked") === "1";

    card.classList.toggle("prohibited-hybrid-card", locked);

    var jacket = card.querySelector(".music-v7-jacket");
    if (!jacket) return;

    var existing = jacket.querySelector("." + POSTER_CLASS);

    if (!locked) {
      if (existing) existing.remove();
      return;
    }

    if (!existing) jacket.insertAdjacentHTML("beforeend", posterHTML());

    var mask = jacket.querySelector(".music-v7-unlock-mask");
    if (mask) mask.setAttribute("aria-hidden", "true");
  }

  function apply() {
    injectStyle();
    document.querySelectorAll(
      ".music-v7-restricted-grid .music-v7-album-art[data-album]," +
      ".music-v7-album-art.music-v7-restricted-album[data-album]"
    ).forEach(decorate);
  }

  function schedule() {
    clearTimeout(TIMER);
    TIMER = setTimeout(apply, 40);
  }

  function boot() {
    injectStyle();
    apply();

    var root = document.getElementById("musicView") ||
               document.getElementById("musicList") ||
               document.body;

    new MutationObserver(schedule).observe(root, {
      childList:true,
      subtree:true,
      attributes:true,
      attributeFilter:["class","data-locked"]
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }
})();