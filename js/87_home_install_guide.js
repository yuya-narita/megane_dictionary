/*
  87_home_install_guide.js
  メガネ辞書：ホーム画面追加案内

  仕様
  - Safari等のブラウザで「辞書のお気に入り」を初めて追加した時だけ案内
  - ホーム画面から初めて起動した時だけクエリナが歓迎
  - 既存の notice-modal と同じ見た目を流用

  想定音声ファイル
  - audio/notice/nyx_home_install_01.mp3
  - audio/notice/quelina_home_welcome_01.mp3

  MP3がまだ無い場合は端末の読み上げへ自動フォールバックします。
*/
(function () {
  "use strict";

  if (window.__MEGANE_HOME_INSTALL_GUIDE_87__) return;
  window.__MEGANE_HOME_INSTALL_GUIDE_87__ = true;

  const FAVORITES_KEY = "meganeFavoritesV65";
  const GUIDE_SHOWN_KEY = "meganeHomeGuideShownV87";
  const WELCOME_SHOWN_KEY = "meganeHomeWelcomeShownV87";

  const GUIDE_AUDIO = "audio/notice/nyx_home_install_01.mp3";
  const WELCOME_AUDIO = "audio/notice/quelina_home_welcome_01.mp3";

  const GUIDE_CONFIG = {
    title: "【運営からのお知らせ】",
    text:
      "お気に入りありがとうございます。\n\n" +
      "ホーム画面に追加すると、\n" +
      "アプリのように起動できます。\n\n" +
      "iPhoneでは\n" +
      "共有 → ホーム画面に追加",
    audio: GUIDE_AUDIO,
    fallbackText:
      "現在、ブラウザ経由で侵入中。ホーム画面へ配置すると、最短ルートを確保できる。"
  };

  const WELCOME_CONFIG = {
    title: "【メガネ辞書へようこそ】",
    text:
      "ホーム画面への配置を確認しました。\n\n" +
      "これからは、ここが\n" +
      "メガネ辞書のおうちです。",
    audio: WELCOME_AUDIO,
    fallbackText:
      "わーい。おうち作ってくれたんだね。これからもよろしくね。"
  };

  let activeAudio = null;
  let pendingModal = null;
  let recentFavoriteIntent = null;
  let lastDictFavoriteCount = getDictFavoriteCount();

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) {}
  }

  function storageRemove(key) {
    try { localStorage.removeItem(key); } catch (_) {}
  }

  function isStandalone() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  function isDictionaryMode() {
    try {
      return typeof appMode === "undefined" || appMode === "dictionary";
    } catch (_) {
      return document.body.classList.contains("mode-dictionary");
    }
  }

  function readFavorites() {
    try {
      const list = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
      return Array.isArray(list) ? list : [];
    } catch (_) {
      return [];
    }
  }

  function getDictFavoriteCount() {
    return readFavorites().filter(function (item) {
      return item && item.type === "dict";
    }).length;
  }

  function stopAudio() {
    try {
      if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
      }
    } catch (_) {}
    activeAudio = null;

    try {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    } catch (_) {}
  }

  function speakFallback(text, button) {
    if (!text || !("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      utterance.onend = function () {
        if (button) {
          button.disabled = false;
          button.textContent = "▶ 音声";
        }
      };
      window.speechSynthesis.speak(utterance);
    } catch (_) {
      if (button) {
        button.disabled = false;
        button.textContent = "▶ 音声";
      }
    }
  }

  function playVoice(config, button) {
    stopAudio();

    if (button) {
      button.disabled = true;
      button.textContent = "再生中";
    }

    try {
      const audio = new Audio(config.audio);
      activeAudio = audio;
      audio.preload = "auto";

      audio.onended = function () {
        if (button) {
          button.disabled = false;
          button.textContent = "▶ 音声";
        }
      };

      audio.onerror = function () {
        activeAudio = null;
        speakFallback(config.fallbackText, button);
      };

      audio.play().catch(function () {
        activeAudio = null;
        speakFallback(config.fallbackText, button);
      });
    } catch (_) {
      speakFallback(config.fallbackText, button);
    }
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[char];
    });
  }

  function existingNoticeIsOpen() {
    return !!document.getElementById("noticeModalBg");
  }

  function showModal(config, onClose) {
    if (existingNoticeIsOpen()) {
      pendingModal = { config: config, onClose: onClose };
      return;
    }

    const background = document.createElement("div");
    background.id = "noticeModalBg";
    background.dataset.homeGuideV87 = "1";

    background.innerHTML =
      '<div id="noticeModalCard">' +
        '<div class="ttl">' + escapeHtml(config.title) + '</div>' +
        '<div class="txt">' + escapeHtml(config.text).replace(/\n/g, "<br>") + '</div>' +
        '<div class="btns">' +
          '<button id="noticePlay" type="button">▶ 音声</button>' +
          '<button id="noticeClose" type="button">閉じる</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(background);

    const playButton = background.querySelector("#noticePlay");
    const closeButton = background.querySelector("#noticeClose");

    playButton.addEventListener("click", function () {
      playVoice(config, playButton);
    });

    closeButton.addEventListener("click", function () {
      stopAudio();
      background.remove();
      if (typeof onClose === "function") onClose();
      flushPendingModal();
    });
  }

  function flushPendingModal() {
    if (!pendingModal || existingNoticeIsOpen()) return;
    const next = pendingModal;
    pendingModal = null;
    setTimeout(function () {
      showModal(next.config, next.onClose);
    }, 220);
  }

  function waitForNoticeSpace(callback, attempts) {
    const remaining = typeof attempts === "number" ? attempts : 80;
    if (!existingNoticeIsOpen()) {
      callback();
      return;
    }
    if (remaining <= 0) return;
    setTimeout(function () {
      waitForNoticeSpace(callback, remaining - 1);
    }, 250);
  }

  function showGuideOnce() {
    if (isStandalone()) return;
    if (storageGet(GUIDE_SHOWN_KEY) === "1") return;

    // 表示決定時点で保存。連打や再描画による二重表示を防ぐ。
    storageSet(GUIDE_SHOWN_KEY, "1");

    waitForNoticeSpace(function () {
      showModal(GUIDE_CONFIG);
    });
  }

  function showWelcomeOnce() {
    if (!isStandalone()) return;
    if (storageGet(WELCOME_SHOWN_KEY) === "1") return;

    storageSet(WELCOME_SHOWN_KEY, "1");

    waitForNoticeSpace(function () {
      showModal(WELCOME_CONFIG);
    });
  }

  function markFavoriteIntent(event) {
    const target = event.target && event.target.closest
      ? event.target.closest("#favoriteToggle")
      : null;

    if (!target || !isDictionaryMode() || isStandalone()) return;
    if (storageGet(GUIDE_SHOWN_KEY) === "1") return;

    recentFavoriteIntent = {
      beforeCount: getDictFavoriteCount(),
      at: Date.now()
    };
  }

  function watchFavoriteChanges() {
    const currentCount = getDictFavoriteCount();

    if (
      recentFavoriteIntent &&
      Date.now() - recentFavoriteIntent.at < 2200 &&
      currentCount > recentFavoriteIntent.beforeCount
    ) {
      recentFavoriteIntent = null;
      lastDictFavoriteCount = currentCount;
      setTimeout(showGuideOnce, 450);
      return;
    }

    if (recentFavoriteIntent && Date.now() - recentFavoriteIntent.at >= 2200) {
      recentFavoriteIntent = null;
    }

    lastDictFavoriteCount = currentCount;
  }

  function boot() {
    // documentのcapture段階で拾うため、既存パッチがstopImmediatePropagationしても検知できる。
    document.addEventListener("pointerdown", markFavoriteIntent, true);
    document.addEventListener("touchstart", markFavoriteIntent, true);
    document.addEventListener("click", markFavoriteIntent, true);

    setInterval(watchFavoriteChanges, 180);

    // ホーム画面からの初回起動時だけ歓迎。
    if (isStandalone()) {
      setTimeout(showWelcomeOnce, 900);
    }
  }

  // 開発者向けリセット。
  window.resetMeganeHomeGuideV87 = function () {
    storageRemove(GUIDE_SHOWN_KEY);
    recentFavoriteIntent = null;
  };

  window.resetMeganeHomeWelcomeV87 = function () {
    storageRemove(WELCOME_SHOWN_KEY);
  };

  window.showMeganeHomeGuideV87 = function () {
    storageRemove(GUIDE_SHOWN_KEY);
    showGuideOnce();
  };

  window.showMeganeHomeWelcomeV87 = function () {
    storageRemove(WELCOME_SHOWN_KEY);
    waitForNoticeSpace(function () {
      showModal(WELCOME_CONFIG, function () {
        storageSet(WELCOME_SHOWN_KEY, "1");
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
