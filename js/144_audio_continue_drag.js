/* 144_audio_continue_drag.js production2
 * mvp_last + production143 専用
 *
 * 右下▶
 * - 短押し: 現在/最後の音楽・会議を再生/一時停止
 * - 長押し: ミニプレイヤー表示
 *
 * ミニプレイヤー
 * - ドラッグで自由移動
 * - 素早く上下へフリックで非表示
 * - 位置・表示状態をlocalStorageへ保存
 * - 再起動／外部検索からの復帰でも再表示
 * - ドラッグ終了時に左右端へ吸着
 *
 * 軽量設計
 * - MutationObserverなし
 * - setIntervalなし
 * - DOM再帰renderなし
 */
(function(){
  "use strict";

  var BAR_ID = "meganeMiniPlayer144";
  var STYLE_ID = "meganeMiniPlayer144Style";
  var STORE = "megane_audio_continue_144_v1";
  var UI_STORE = "megane_audio_continue_144_ui_v2";
  var LONG_MS = 520;
  var SNAP_MARGIN = 12;
  var SNAP_NEAR = 42;

  var activeAudio = null;
  var activeType = "";
  var pressTimer = 0;
  var longFired = false;
  var suppressClickUntil = 0;
  var saveAt = 0;

  function q(id){ return document.getElementById(id); }

  function musicAudio(){ return q("musicAudio"); }
  function confAudio(){ return q("mangaAudio") || q("confNativeAudio"); }

  function readJSON(key,fallback){
    try{
      var v=JSON.parse(localStorage.getItem(key) || "");
      return v && typeof v==="object" ? v : fallback;
    }catch(_){ return fallback; }
  }

  function writeJSON(key,value){
    try{ localStorage.setItem(key,JSON.stringify(value)); }catch(_){}
  }

  function readUI(){
    var state=readJSON(UI_STORE,null);
    if(!state){
      return {
        visible:false,
        xRatio:null,
        yRatio:null,
        snapX:"left",
        snapY:""
      };
    }
    return {
      visible:state.visible===true,
      xRatio:Number.isFinite(Number(state.xRatio)) ? Number(state.xRatio) : null,
      yRatio:Number.isFinite(Number(state.yRatio)) ? Number(state.yRatio) : null,
      snapX:state.snapX==="right" ? "right" : "left",
      snapY:state.snapY==="top" || state.snapY==="bottom" ? state.snapY : ""
    };
  }

  function writeUI(patch){
    var state=readUI();
    Object.keys(patch || {}).forEach(function(key){ state[key]=patch[key]; });
    writeJSON(UI_STORE,state);
  }

  function isAudioUsable(a){
    return !!(a && (a.currentSrc || a.src || a.getAttribute("src")));
  }

  function detectAudio(){
    var ma=musicAudio();
    var ca=confAudio();

    if(isAudioUsable(ma) && !ma.paused && !ma.ended) return {audio:ma,type:"music"};
    if(isAudioUsable(ca) && !ca.paused && !ca.ended) return {audio:ca,type:"conference"};

    if(activeAudio && isAudioUsable(activeAudio)){
      return {audio:activeAudio,type:activeType};
    }

    var saved=readJSON(STORE,null);
    if(saved){
      if(saved.type==="music" && isAudioUsable(ma)) return {audio:ma,type:"music"};
      if(saved.type==="conference" && isAudioUsable(ca)) return {audio:ca,type:"conference"};
    }

    if(isAudioUsable(ma)) return {audio:ma,type:"music"};
    if(isAudioUsable(ca)) return {audio:ca,type:"conference"};
    return null;
  }

  function mediaMeta(type){
    var title="";
    var subtitle="";
    var artwork="";

    if(type==="music" && typeof window.MEGANE_MUSIC_V7_NOW==="function"){
      try{
        var m=window.MEGANE_MUSIC_V7_NOW();
        if(m){
          title=m.title || "";
          subtitle=m.subtitle || "";
          artwork=m.artwork || "";
        }
      }catch(_){}
    }

    try{
      var md=navigator.mediaSession && navigator.mediaSession.metadata;
      if(md){
        title=title || md.title || "";
        subtitle=subtitle || md.album || md.artist || "";
        if(!artwork && md.artwork && md.artwork[0]) artwork=md.artwork[0].src || "";
      }
    }catch(_){}

    if(type==="conference"){
      title=title ||
        textOf(".conf-title") ||
        textOf(".manga-title") ||
        textOf("#mangaTitle") ||
        "Syntax Conference";
      subtitle=subtitle || "Syntax Conference";
      if(!artwork){
        var img=document.querySelector(".conf-stage img,.manga-reader-image,.conf-cover");
        if(img) artwork=img.currentSrc || img.src || "";
      }
    }

    return {
      title:title || (type==="music" ? "MEGANE MUSIC" : "Syntax Conference"),
      subtitle:subtitle || (type==="music" ? "Music" : "Conference"),
      artwork:artwork
    };
  }

  function textOf(sel){
    var el=document.querySelector(sel);
    return el ? String(el.textContent || "").trim() : "";
  }

  function snapshot(a,type){
    if(!isAudioUsable(a)) return null;
    var meta=mediaMeta(type);
    return {
      type:type,
      src:a.currentSrc || a.src || a.getAttribute("src") || "",
      time:Number(a.currentTime || 0),
      title:meta.title,
      subtitle:meta.subtitle,
      artwork:meta.artwork,
      savedAt:Date.now()
    };
  }

  function save(a,type,force){
    var now=Date.now();
    if(!force && now-saveAt<2500) return;
    saveAt=now;
    var data=snapshot(a,type);
    if(data) writeJSON(STORE,data);
  }

  function ensureStyle(){
    if(q(STYLE_ID)) return;
    var st=document.createElement("style");
    st.id=STYLE_ID;
    st.textContent=`
      #${BAR_ID}{
        position:fixed;
        left:46px;
        top:calc(100dvh - 230px);
        z-index:8990;
        width:min(86vw,390px);
        height:62px;
        box-sizing:border-box;
        display:grid;
        grid-template-columns:46px minmax(0,1fr) 48px;
        align-items:center;
        gap:10px;
        padding:8px 9px;
        border:1px solid rgba(255,255,255,.16);
        border-radius:21px;
        background:rgba(10,13,22,.93);
        color:#fff;
        box-shadow:0 16px 45px rgba(0,0,0,.46);
        -webkit-backdrop-filter:blur(16px);
        backdrop-filter:blur(16px);
        touch-action:none;
        user-select:none;
        -webkit-user-select:none;
        transform:translate3d(0,0,0);
      }
      #${BAR_ID}[hidden]{display:none!important}
      .mp144-art{
        width:46px;height:46px;border-radius:13px;overflow:hidden;
        background:rgba(255,255,255,.08);
        display:grid;place-items:center;font-size:19px;
      }
      .mp144-art img{width:100%;height:100%;display:block;object-fit:cover;pointer-events:none}
      .mp144-text{min-width:0;display:grid;gap:3px;pointer-events:none}
      .mp144-title,.mp144-sub{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .mp144-title{font-size:14px;font-weight:900}
      .mp144-sub{font-size:11px;font-weight:750;color:rgba(255,255,255,.58)}
      .mp144-toggle{
        width:44px;height:44px;border:0;border-radius:50%;
        display:grid;place-items:center;
        background:rgba(255,255,255,.10);color:#fff;
        font-size:20px;font-weight:900;
        touch-action:manipulation;
      }
      #${BAR_ID}.mp144-dragging{transition:none}
      #${BAR_ID}.mp144-snapping{
        transition:left .18s cubic-bezier(.2,.8,.2,1),
                   top .18s cubic-bezier(.2,.8,.2,1);
      }
      #${BAR_ID}.mp144-hide{
        transition:opacity .16s ease,transform .16s ease;
        opacity:0;
        transform:translate3d(0,35px,0) scale(.94);
      }
    `;
    document.head.appendChild(st);
  }

  function ensureBar(){
    var bar=q(BAR_ID);
    if(bar) return bar;

    bar=document.createElement("section");
    bar.id=BAR_ID;
    bar.hidden=true;
    bar.innerHTML=
      '<div class="mp144-art">♪</div>'+
      '<div class="mp144-text">'+
        '<div class="mp144-title">最後の音声</div>'+
        '<div class="mp144-sub">長押しで呼び出しました</div>'+
      '</div>'+
      '<button type="button" class="mp144-toggle" aria-label="再生">▶</button>';

    document.body.appendChild(bar);

    var toggle=bar.querySelector(".mp144-toggle");
    toggle.addEventListener("pointerdown",function(e){ e.stopPropagation(); },true);
    toggle.addEventListener("click",function(e){
      e.preventDefault();
      e.stopPropagation();
      toggleAudio();
    },true);

    bindDrag(bar);
    restorePosition(bar);
    return bar;
  }

  function viewportBounds(bar){
    var w=bar.offsetWidth || 330;
    var h=bar.offsetHeight || 62;
    var vv=window.visualViewport;
    var viewW=vv ? vv.width : window.innerWidth;
    var viewH=vv ? vv.height : window.innerHeight;
    var offsetX=vv ? vv.offsetLeft : 0;
    var offsetY=vv ? vv.offsetTop : 0;

    return {
      minX:offsetX+SNAP_MARGIN,
      maxX:Math.max(offsetX+SNAP_MARGIN,offsetX+viewW-w-SNAP_MARGIN),
      minY:offsetY+SNAP_MARGIN,
      maxY:Math.max(offsetY+SNAP_MARGIN,offsetY+viewH-h-92)
    };
  }

  function clampPosition(bar,x,y){
    var b=viewportBounds(bar);
    return {
      x:Math.max(b.minX,Math.min(b.maxX,x)),
      y:Math.max(b.minY,Math.min(b.maxY,y))
    };
  }

  function positionFromState(bar,state){
    var b=viewportBounds(bar);
    var rangeX=Math.max(1,b.maxX-b.minX);
    var rangeY=Math.max(1,b.maxY-b.minY);

    var x;
    if(state.snapX==="right") x=b.maxX;
    else if(state.snapX==="left") x=b.minX;
    else x=b.minX+rangeX*Math.max(0,Math.min(1,Number(state.xRatio||0)));

    var y;
    if(state.snapY==="top") y=b.minY;
    else if(state.snapY==="bottom") y=b.maxY;
    else if(state.yRatio!==null) y=b.minY+rangeY*Math.max(0,Math.min(1,Number(state.yRatio)));
    else y=b.maxY;

    return clampPosition(bar,x,y);
  }

  function restorePosition(bar){
    var state=readUI();
    requestAnimationFrame(function(){
      var c=positionFromState(bar,state);
      bar.style.left=c.x+"px";
      bar.style.top=c.y+"px";
    });
  }

  function savePosition(bar,extra){
    var r=bar.getBoundingClientRect();
    var b=viewportBounds(bar);
    var rangeX=Math.max(1,b.maxX-b.minX);
    var rangeY=Math.max(1,b.maxY-b.minY);

    writeUI(Object.assign({
      xRatio:Math.max(0,Math.min(1,(r.left-b.minX)/rangeX)),
      yRatio:Math.max(0,Math.min(1,(r.top-b.minY)/rangeY))
    },extra || {}));
  }

  function snapPosition(bar){
    var r=bar.getBoundingClientRect();
    var b=viewportBounds(bar);

    var leftDistance=Math.abs(r.left-b.minX);
    var rightDistance=Math.abs(r.left-b.maxX);
    var topDistance=Math.abs(r.top-b.minY);
    var bottomDistance=Math.abs(r.top-b.maxY);

    var snapX=leftDistance<=rightDistance ? "left" : "right";
    var snapY="";
    var targetX=snapX==="left" ? b.minX : b.maxX;
    var targetY=Math.max(b.minY,Math.min(b.maxY,r.top));

    if(topDistance<=SNAP_NEAR){
      snapY="top";
      targetY=b.minY;
    }else if(bottomDistance<=SNAP_NEAR){
      snapY="bottom";
      targetY=b.maxY;
    }

    bar.classList.add("mp144-snapping");
    bar.style.left=targetX+"px";
    bar.style.top=targetY+"px";

    writeUI({
      visible:true,
      snapX:snapX,
      snapY:snapY,
      xRatio:snapX==="right" ? 1 : 0,
      yRatio:Math.max(0,Math.min(1,(targetY-b.minY)/Math.max(1,b.maxY-b.minY)))
    });

    setTimeout(function(){ bar.classList.remove("mp144-snapping"); },210);
  }

  function bindDrag(bar){
    var dragging=false;
    var sx=0,sy=0,startLeft=0,startTop=0,startTime=0,lastY=0,lastTime=0;
    var moved=false;

    bar.addEventListener("pointerdown",function(e){
      if(e.target.closest(".mp144-toggle")) return;
      dragging=true;
      moved=false;
      sx=e.clientX; sy=e.clientY;
      var r=bar.getBoundingClientRect();
      startLeft=r.left; startTop=r.top;
      startTime=Date.now();
      lastY=e.clientY; lastTime=startTime;
      bar.classList.add("mp144-dragging");
      try{ bar.setPointerCapture(e.pointerId); }catch(_){}
      e.preventDefault();
    });

    bar.addEventListener("pointermove",function(e){
      if(!dragging) return;
      var dx=e.clientX-sx;
      var dy=e.clientY-sy;
      if(Math.abs(dx)>4 || Math.abs(dy)>4) moved=true;

      var c=clampPosition(bar,startLeft+dx,startTop+dy);
      bar.style.left=c.x+"px";
      bar.style.top=c.y+"px";
      lastY=e.clientY;
      lastTime=Date.now();
      e.preventDefault();
    });

    function end(e){
      if(!dragging) return;
      dragging=false;
      bar.classList.remove("mp144-dragging");

      var totalY=e.clientY-sy;
      var elapsed=Math.max(1,Date.now()-startTime);
      var velocity=Math.abs(totalY)/elapsed;

      // 素早い上下フリックだけ収納。通常ドラッグは位置移動。
      if(moved && Math.abs(totalY)>=78 && velocity>=0.48){
        hideBar();
      }else{
        snapPosition(bar);
      }

      try{ bar.releasePointerCapture(e.pointerId); }catch(_){}
      e.preventDefault();
    }

    bar.addEventListener("pointerup",end);
    bar.addEventListener("pointercancel",end);
  }

  function renderBar(){
    var bar=ensureBar();
    var found=detectAudio();
    var saved=readJSON(STORE,null);
    var data=null;
    var playing=false;

    if(found){
      activeAudio=found.audio;
      activeType=found.type;
      data=snapshot(found.audio,found.type);
      playing=!found.audio.paused && !found.audio.ended;
    }else{
      data=saved;
    }

    if(!data) return false;

    var art=bar.querySelector(".mp144-art");
    var title=bar.querySelector(".mp144-title");
    var sub=bar.querySelector(".mp144-sub");
    var btn=bar.querySelector(".mp144-toggle");

    title.textContent=data.title || "最後の音声";
    sub.textContent=data.subtitle || (data.type==="music" ? "Music" : "Conference");
    btn.textContent=playing ? "Ⅱ" : "▶";
    btn.setAttribute("aria-label",playing ? "一時停止" : "続きから再生");

    if(data.artwork){
      art.innerHTML='<img src="'+String(data.artwork).replace(/"/g,"&quot;")+'" alt="">';
    }else{
      art.textContent=data.type==="conference" ? "🎙" : "♪";
    }

    return true;
  }

  function showBar(options){
    var bar=ensureBar();
    if(!renderBar()) return false;

    writeUI({visible:true});
    bar.classList.remove("mp144-hide");
    bar.hidden=false;
    restorePosition(bar);

    if(options && options.pulse){
      bar.animate(
        [
          {transform:"scale(.97)",opacity:.72},
          {transform:"scale(1.015)",opacity:1},
          {transform:"scale(1)",opacity:1}
        ],
        {duration:220,easing:"cubic-bezier(.2,.8,.2,1)"}
      );
    }
    return true;
  }

  function hideBar(){
    var bar=ensureBar();
    writeUI({visible:false});
    bar.classList.add("mp144-hide");
    setTimeout(function(){
      bar.hidden=true;
      bar.classList.remove("mp144-hide");
    },170);
  }

  function restoreVisibility(){
    var state=readUI();
    if(!state.visible) return false;
    return showBar();
  }

  function restoreSaved(){
    var saved=readJSON(STORE,null);
    if(!saved) return false;

    var a=saved.type==="music" ? musicAudio() : confAudio();
    if(!a) return false;

    activeAudio=a;
    activeType=saved.type;

    try{
      var current=a.currentSrc || a.src || a.getAttribute("src") || "";
      if(saved.src && (!current || current!==saved.src)){
        a.src=saved.src;
        a.load();
      }

      var playNow=function(){
        try{
          if(saved.time>0 && Math.abs((a.currentTime||0)-saved.time)>2){
            a.currentTime=saved.time;
          }
        }catch(_){}
        try{
          var p=a.play();
          if(p && p.catch) p.catch(function(){});
        }catch(_){}
        renderBar();
      };

      if(a.readyState>=1) playNow();
      else a.addEventListener("loadedmetadata",playNow,{once:true});
      return true;
    }catch(_){
      return false;
    }
  }

  function toggleAudio(){
    var found=detectAudio();
    if(!found) return restoreSaved();

    activeAudio=found.audio;
    activeType=found.type;

    if(found.type==="music" &&
       typeof window.MEGANE_MUSIC_V7_TOGGLE_CURRENT==="function"){
      var ok=window.MEGANE_MUSIC_V7_TOGGLE_CURRENT();
      setTimeout(renderBar,40);
      return ok;
    }

    try{
      if(!found.audio.paused){
        found.audio.pause();
      }else{
        var p=found.audio.play();
        if(p && p.catch) p.catch(function(){ restoreSaved(); });
      }
      setTimeout(renderBar,40);
      return true;
    }catch(_){
      return restoreSaved();
    }
  }

  function bindAudio(a,type){
    if(!a || a.dataset.mini144Bound==="1") return;
    a.dataset.mini144Bound="1";

    ["play","playing"].forEach(function(ev){
      a.addEventListener(ev,function(){
        activeAudio=a;
        activeType=type;
        save(a,type,true);
        if(!q(BAR_ID).hidden) renderBar();
      });
    });

    ["pause","ended","loadedmetadata"].forEach(function(ev){
      a.addEventListener(ev,function(){
        if(isAudioUsable(a)) save(a,type,true);
        if(!q(BAR_ID).hidden) renderBar();
      });
    });

    a.addEventListener("timeupdate",function(){
      activeAudio=a;
      activeType=type;
      save(a,type,false);
    });
  }

  function bindAudios(){
    bindAudio(musicAudio(),"music");
    bindAudio(confAudio(),"conference");
  }

  function beginRightPress(e){
    if(!(e.target && e.target.closest && e.target.closest("#shareCurrent"))) return;
    longFired=false;
    clearTimeout(pressTimer);
    pressTimer=setTimeout(function(){
      longFired=true;
      suppressClickUntil=Date.now()+650;
      showBar({pulse:true});
      try{ if(navigator.vibrate) navigator.vibrate(12); }catch(_){}
    },LONG_MS);
  }

  function cancelRightPress(e){
    if(!(e.target && e.target.closest && e.target.closest("#shareCurrent"))) return;
    clearTimeout(pressTimer);
  }

  // 99_nav_real_fix.jsから短押しclick時に呼ばれる。
  window.MEGANE_AUDIO_CONTINUE_BUTTON=function(e){
    if(longFired || Date.now()<suppressClickUntil){
      stopEvent(e);
      longFired=false;
      return true;
    }

    stopEvent(e);
    toggleAudio();
    return true;
  };

  function stopEvent(e){
    if(!e) return;
    try{ if(e.cancelable!==false) e.preventDefault(); }catch(_){}
    try{ e.stopPropagation(); }catch(_){}
    try{ if(e.stopImmediatePropagation) e.stopImmediatePropagation(); }catch(_){}
  }

  function boot(){
    ensureStyle();
    ensureBar();
    bindAudios();

    window.addEventListener("pointerdown",beginRightPress,true);
    window.addEventListener("pointerup",cancelRightPress,true);
    window.addEventListener("pointercancel",cancelRightPress,true);

    function resumeUI(){
      bindAudios();

      var found=detectAudio();
      if(found){
        activeAudio=found.audio;
        activeType=found.type;
        save(found.audio,found.type,true);
      }

      // Safari内ブラウザや外部検索から復帰した時も、
      // 前回表示中なら同じ位置へ復元する。
      if(readUI().visible){
        requestAnimationFrame(function(){ restoreVisibility(); });
        setTimeout(restoreVisibility,120);
      }
    }

    window.addEventListener("pageshow",resumeUI);
    window.addEventListener("focus",resumeUI);

    document.addEventListener("visibilitychange",function(){
      if(!document.hidden) resumeUI();
    });

    window.addEventListener("resize",function(){
      var bar=q(BAR_ID);
      if(!bar || bar.hidden) return;
      var r=bar.getBoundingClientRect();
      var c=clampPosition(bar,r.left,r.top);
      bar.style.left=c.x+"px";
      bar.style.top=c.y+"px";
      savePosition(bar,{visible:true});
    },{passive:true});

    if(window.visualViewport){
      window.visualViewport.addEventListener("resize",function(){
        var bar=q(BAR_ID);
        if(!bar || bar.hidden) return;
        restorePosition(bar);
      },{passive:true});
    }

    // アプリ再起動時も、前回表示中なら同じ位置へ戻す。
    requestAnimationFrame(restoreVisibility);
    setTimeout(restoreVisibility,180);
    setTimeout(restoreVisibility,700);

    // 後からaudioが生成される構成への限定リトライ。常時監視ではない。
    setTimeout(bindAudios,500);
    setTimeout(bindAudios,1500);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",boot,{once:true});
  }else{
    boot();
  }
})();