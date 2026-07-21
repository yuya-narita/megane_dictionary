/* 108_music_prohibited_stage_designer_poster.js
   LOOKING BEAR 初回ロック専用・手組みタイポグラフィポスター
   対象: 「3種類 観測すると 出現」の最初のロックだけ
*/
(function(){
"use strict";

function usingV7(){
  return !!document.querySelector(".music-v7-restricted-grid");
}

function removeLegacy(){
  var old=document.querySelector(".music-prohibited-stage");
  if(old) old.remove();
}

function injectStyle(){
  var old=document.getElementById("musicProhibitedStageStyle");
  if(old) old.remove();

  var s=document.createElement("style");
  s.id="musicProhibitedStageStyle";
  s.textContent=`
    .music-prohibited-stage{
      grid-column:1/-1;
      width:100%;
      display:flex;
      justify-content:center;
      padding:34px 18px 90px
    }
    .music-prohibited-stage-inner{
      width:min(250px,72vw);
      text-align:center
    }
    .music-v7-unlock-mask b:empty{display:none!important}

    /* ===== LOOKING BEAR / FIRST GATE POSTER ===== */
    .music-v7-unlock-mask.lb-designer-poster-mask{
      position:absolute!important;
      inset:0!important;
      display:block!important;
      padding:0!important;
      overflow:hidden!important;
      border-radius:inherit!important;
      background:
        linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.36)),
        linear-gradient(90deg,rgba(0,0,0,.16),transparent 38%,rgba(0,0,0,.12))!important;
      color:#efe5b3!important;
      pointer-events:none!important;
      container-type:inline-size;
    }

    .lb-designer-poster{
      position:absolute;
      inset:0;
      overflow:hidden;
      color:#efe5b3;
      font-family:
        "Arial Black",
        "Helvetica Neue",
        "Hiragino Kaku Gothic ProN",
        "Yu Gothic",
        sans-serif;
      font-weight:950;
      line-height:.9;
      letter-spacing:-.075em;
      text-shadow:
        0 .45cqw .8cqw rgba(0,0,0,.58),
        0 0 .35cqw rgba(0,0,0,.45);
      isolation:isolate;
    }

    .lb-designer-poster .p{
      position:absolute;
      margin:0;
      padding:0;
      white-space:nowrap;
      transform-origin:center;
    }

    /* 主役4要素 */
    .lb-designer-poster .p-three{
      left:-1.5cqw;
      top:-2cqw;
      font-size:39cqw;
      line-height:.82;
      z-index:5;
    }

    .lb-designer-poster .p-kinds{
      left:34cqw;
      top:7cqw;
      font-size:20cqw;
      letter-spacing:-.11em;
      z-index:5;
    }

    /* 一行を90度回転 */
    .lb-designer-poster .p-observe{
      right:-28cqw;
      top:40cqw;
      width:82cqw;
      text-align:center;
      font-size:12.8cqw;
      letter-spacing:-.12em;
      transform:rotate(90deg);
      z-index:6;
    }

    .lb-designer-poster .p-appear{
      left:-2cqw;
      bottom:-1.5cqw;
      font-size:27cqw;
      letter-spacing:-.12em;
      z-index:5;
    }

    /* 中央の情報ブロック。重ねず、余白に配置 */
    .lb-designer-poster .p-six{
      left:5cqw;
      top:41cqw;
      font-size:13cqw;
      letter-spacing:-.05em;
      z-index:5;
    }

    .lb-designer-poster .p-unlock{
      left:5cqw;
      top:54cqw;
      font-size:8.8cqw;
      letter-spacing:-.07em;
      z-index:5;
    }

    .lb-designer-poster .p-card{
      left:5.5cqw;
      top:65cqw;
      font-size:5.2cqw;
      letter-spacing:.02em;
      z-index:4;
    }

    .lb-designer-poster .p-first{
      left:5.5cqw;
      top:72cqw;
      font-size:3.4cqw;
      letter-spacing:.12em;
      z-index:4;
    }

    /* 紙面の端に置く小さな情報 */
    .lb-designer-poster .p-meta1{
      left:38cqw;
      top:30cqw;
      font-size:3.15cqw;
      letter-spacing:.04em;
      z-index:4;
    }

    .lb-designer-poster .p-meta2{
      left:38cqw;
      top:34.5cqw;
      font-size:3.15cqw;
      letter-spacing:.02em;
      z-index:4;
    }

    .lb-designer-poster .p-meta3{
      left:39cqw;
      top:77cqw;
      font-size:3.15cqw;
      letter-spacing:.01em;
      z-index:4;
    }

    .lb-designer-poster .p-meta4{
      left:39cqw;
      top:81.5cqw;
      font-size:3.15cqw;
      letter-spacing:.04em;
      z-index:4;
    }

    .lb-designer-poster .p-side{
      left:-18cqw;
      top:57cqw;
      width:60cqw;
      text-align:center;
      font-size:3cqw;
      letter-spacing:.12em;
      transform:rotate(-90deg);
      z-index:3;
    }

    /* 罫線 */
    .lb-designer-poster .rule-a,
    .lb-designer-poster .rule-b{
      position:absolute;
      display:block;
      background:currentColor;
      opacity:.85;
      z-index:2;
    }

    .lb-designer-poster .rule-a{
      left:5cqw;
      top:38.5cqw;
      width:43cqw;
      height:.65cqw;
    }

    .lb-designer-poster .rule-b{
      left:36cqw;
      top:29cqw;
      width:.55cqw;
      height:57cqw;
    }

    /* 画像が小さい環境向け */
    @supports not (font-size:1cqw){
      .lb-designer-poster .p-three{font-size:120px}
      .lb-designer-poster .p-kinds{font-size:62px}
      .lb-designer-poster .p-observe{font-size:40px}
      .lb-designer-poster .p-appear{font-size:82px}
      .lb-designer-poster .p-six{font-size:40px}
      .lb-designer-poster .p-unlock{font-size:27px}
      .lb-designer-poster .p-card{font-size:16px}
      .lb-designer-poster .p-first,
      .lb-designer-poster .p-meta1,
      .lb-designer-poster .p-meta2,
      .lb-designer-poster .p-meta3,
      .lb-designer-poster .p-meta4,
      .lb-designer-poster .p-side{font-size:10px}
    }
  `;
  document.head.appendChild(s);
}

function scrubDefaultLabels(root){
  root=root||document;
  root.querySelectorAll(
    ".music-v7-restricted-grid .music-v7-unlock-mask b,"+
    ".music-v7-restricted-album .music-v7-unlock-mask b"
  ).forEach(function(el){
    var t=(el.textContent||"").replace(/\s+/g,"").trim();
    if(t.indexOf("未観測")>=0 || t.indexOf("👁")>=0 || t.indexOf("👁️")>=0){
      el.textContent="";
      el.style.display="none";
    }
  });
}

function posterHTML(){
  return `
    <div class="lb-designer-poster" aria-hidden="true">
      <span class="rule-a"></span>
      <span class="rule-b"></span>

      <span class="p p-three">3</span>
      <span class="p p-kinds">種類</span>
      <span class="p p-observe">観測すると</span>
      <span class="p p-appear">出現</span>

      <span class="p p-six">6曲</span>
      <span class="p p-unlock">解放</span>
      <span class="p p-card">CARD COLLECT</span>
      <span class="p p-first">FIRST OBSERVATION GATE</span>

      <span class="p p-meta1">03 DIFFERENT CARDS</span>
      <span class="p p-meta2">TRACK 01—06 OPEN</span>
      <span class="p p-meta3">LOOKING BEAR LAND</span>
      <span class="p p-meta4">OBSERVATION REQUIRED</span>
      <span class="p p-side">ENTRY CONDITION / CARD 03</span>
    </div>
  `;
}

function applyPoster(root){
  root=root||document;

  root.querySelectorAll(".music-v7-unlock-mask").forEach(function(mask){
    if(mask.dataset.lbDesignerPoster==="1") return;

    var raw=(mask.textContent||"").replace(/\s+/g,"");
    var target=
      raw.indexOf("3種類")>=0 ||
      raw.indexOf("3種")>=0 ||
      (raw.indexOf("観測すると")>=0 && raw.indexOf("出現")>=0);

    if(!target) return;

    mask.dataset.lbDesignerPoster="1";
    mask.classList.add("lb-designer-poster-mask");
    mask.setAttribute("aria-label","3種類のカードを観測すると6曲解放");
    mask.innerHTML=posterHTML();
  });
}

function isProhibited(el){
  var t=(el.textContent||"").toLowerCase();
  return t.indexOf("prohibited")>=0 || t.indexOf("禁止")>=0;
}

function stage(list){
  var w=list.querySelector(".music-prohibited-stage");
  if(w) return w;
  w=document.createElement("section");
  w.className="music-prohibited-stage";
  w.innerHTML='<div class="music-prohibited-stage-inner"><div>RESTRICTED OBSERVATION</div></div>';
  list.appendChild(w);
  return w;
}

function arrange(){
  injectStyle();
  scrubDefaultLabels();
  applyPoster();

  if(usingV7()){
    removeLegacy();
    return;
  }

  var list=document.getElementById("musicList");
  if(!list) return;

  var cards=[].slice.call(
    list.querySelectorAll(".music-v7-album-art[data-album],.music-v7-single-card[data-album]")
  );
  var target=cards.find(isProhibited);
  if(!target) return;

  var inner=stage(list).querySelector(".music-prohibited-stage-inner");
  if(target.parentNode!==inner) inner.appendChild(target);
}

function boot(){
  injectStyle();
  arrange();

  var list=document.getElementById("musicList");
  if(!list) return;

  var observer=new MutationObserver(function(){
    clearTimeout(window.__musicProhibitedStageTimer);
    window.__musicProhibitedStageTimer=setTimeout(arrange,40);
  });
  observer.observe(list,{childList:true,subtree:true,characterData:true});
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",boot);
}else{
  boot();
}
})();