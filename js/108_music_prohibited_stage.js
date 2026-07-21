/* 108_music_prohibited_stage_designed_svg_poster.js
   LOOKING BEAR 初回ロック専用タイポグラフィポスター
   SVGで一枚の紙面として手組み。文字同士を重ねず、大小と90度回転で密度を作る。
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

    .music-v7-unlock-mask.lb-svg-poster-mask{
      position:absolute!important;
      inset:0!important;
      display:block!important;
      padding:0!important;
      overflow:hidden!important;
      border-radius:inherit!important;
      pointer-events:none!important;
      background:
        linear-gradient(180deg,rgba(0,0,0,.03),rgba(0,0,0,.30)),
        linear-gradient(90deg,rgba(0,0,0,.14),transparent 45%,rgba(0,0,0,.12))!important;
    }

    .lb-svg-poster{
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      display:block;
      overflow:hidden;
      color:#efe5b3;
      filter:drop-shadow(0 2px 2px rgba(0,0,0,.55));
    }

    .lb-svg-poster text{
      fill:currentColor;
      font-family:
        "Arial Black",
        "Helvetica Neue",
        "Hiragino Kaku Gothic ProN",
        "Yu Gothic",
        sans-serif;
      font-weight:900;
    }

    .lb-svg-poster .jp{
      letter-spacing:-.075em;
    }

    .lb-svg-poster .en{
      font-family:"Helvetica Neue",Arial,sans-serif;
      font-weight:800;
      letter-spacing:.08em;
    }

    .lb-svg-poster .rule{
      stroke:currentColor;
      stroke-width:5;
      opacity:.86;
    }

    .lb-svg-poster .thin{
      stroke-width:2.5;
      opacity:.72;
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
  <svg class="lb-svg-poster" viewBox="0 0 1000 1000"
       preserveAspectRatio="none" aria-hidden="true">

    <!-- 上段：数字を最優先で見せる -->
    <text class="jp" x="-18" y="226" font-size="278">3</text>
    <text class="jp" x="255" y="198" font-size="154"
          textLength="515" lengthAdjust="spacingAndGlyphs">種類</text>

    <line class="rule" x1="258" y1="226" x2="760" y2="226"/>
    <text class="en" x="273" y="257" font-size="24"
          textLength="473" lengthAdjust="spacingAndGlyphs">THREE DIFFERENT CARDS</text>

    <!-- 右端：一行のまま90度回転 -->
    <g transform="translate(947 252) rotate(90)">
      <text class="jp" x="0" y="0" font-size="86"
            textLength="560" lengthAdjust="spacingAndGlyphs">観測すると</text>
      <line class="thin" x1="0" y1="22" x2="560" y2="22"/>
    </g>

    <!-- 中段上：条件 -->
    <text class="jp" x="32" y="362" font-size="92"
          textLength="690" lengthAdjust="spacingAndGlyphs">異なるカード</text>

    <text class="jp" x="25" y="510" font-size="176"
          textLength="340" lengthAdjust="spacingAndGlyphs">三種</text>

    <text class="jp" x="390" y="500" font-size="100"
          textLength="350" lengthAdjust="spacingAndGlyphs">集める</text>

    <text class="en" x="402" y="538" font-size="24"
          textLength="330" lengthAdjust="spacingAndGlyphs">COLLECT / OBSERVE / OPEN</text>

    <!-- 中段下：解放内容 -->
    <line class="rule" x1="31" y1="574" x2="744" y2="574"/>

    <text class="jp" x="25" y="745" font-size="196"
          textLength="344" lengthAdjust="spacingAndGlyphs">6曲</text>

    <text class="jp" x="390" y="724" font-size="148"
          textLength="350" lengthAdjust="spacingAndGlyphs">解放</text>

    <text class="en" x="403" y="762" font-size="23"
          textLength="325" lengthAdjust="spacingAndGlyphs">TRACK 01—06 UNLOCKED</text>

    <!-- 紙面密度を作る小情報。重ねず、空き領域に詰める -->
    <text class="en" x="31" y="806" font-size="27"
          textLength="320" lengthAdjust="spacingAndGlyphs">FIRST OBSERVATION GATE</text>

    <text class="en" x="390" y="805" font-size="27"
          textLength="350" lengthAdjust="spacingAndGlyphs">THE LOOKING BEAR LAND</text>

    <line class="thin" x1="31" y1="827" x2="740" y2="827"/>

    <text class="jp" x="31" y="864" font-size="35"
          textLength="330" lengthAdjust="spacingAndGlyphs">入口封鎖中</text>

    <text class="en" x="390" y="863" font-size="25"
          textLength="350" lengthAdjust="spacingAndGlyphs">RESTRICTED OBSERVATION</text>

    <!-- 最下段：結果を強く -->
    <text class="jp" x="16" y="1012" font-size="190"
          textLength="720" lengthAdjust="spacingAndGlyphs">出現</text>

    <!-- 左端の縦情報 -->
    <g transform="translate(17 812) rotate(-90)">
      <text class="en" x="0" y="0" font-size="22"
            textLength="390" lengthAdjust="spacingAndGlyphs">CARD 03 / MUSIC 06 / ENTRY CONDITION</text>
    </g>
  </svg>`;
}

function applyPoster(root){
  root=root||document;

  root.querySelectorAll(".music-v7-unlock-mask").forEach(function(mask){
    if(mask.dataset.lbSvgPoster==="1") return;

    var raw=(mask.textContent||"").replace(/\s+/g,"");
    var target=
      raw.indexOf("3種類")>=0 ||
      raw.indexOf("3種")>=0 ||
      (raw.indexOf("観測すると")>=0 && raw.indexOf("出現")>=0);

    if(!target) return;

    mask.dataset.lbSvgPoster="1";
    mask.classList.add("lb-svg-poster-mask");
    mask.setAttribute("aria-label","異なる3種類のカードを観測すると6曲解放");
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