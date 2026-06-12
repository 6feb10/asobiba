// ☆キラキラすくりぷと☆
// マウスにキラキラがついてくるよ(*ﾟ▽ﾟ*)
// 昔は「素材屋さん」からお借りしてたやつの再現です

(function () {
  var SPARKLES = ["☆", "★", "✧", "✦", "♡", "･ﾟ"];
  var COLORS = ["#ff99cc", "#ffff99", "#99ffff", "#cc99ff", "#ffffff", "#99ff99"];
  var last = 0;

  document.addEventListener("mousemove", function (e) {
    var now = Date.now();
    if (now - last < 50) return; // 出しすぎ防止
    last = now;

    var s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
    s.style.left = (e.clientX + (Math.random() * 20 - 10)) + "px";
    s.style.top = (e.clientY + (Math.random() * 20 - 10)) + "px";
    s.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 1000);
  });

  // ===== アクセスカウンター =====
  // 本当はCGIレンタルだったけどlocalStorageでなんちゃって再現☆
  var el = document.getElementById("counter");
  if (el) {
    var KEY = "yumekawa-moon-counter";
    var n = parseInt(localStorage.getItem(KEY) || "77738", 10) + 1;
    localStorage.setItem(KEY, String(n));
    el.textContent = String(n).padStart(7, "0");

    if (n % 1000 === 0 || /^(\d)\1+$/.test(String(n))) {
      setTimeout(function () {
        alert("☆†キリ番GET†☆\nあなたは" + n + "人目！！\nBBSで報告してくれたらイラスト描くね(●´ω｀●)\n踏み逃げはダメだよっ！");
      }, 300);
    }
  }

  // ===== 今日の日付（平成表記）=====
  var dateEl = document.getElementById("heisei-date");
  if (dateEl) {
    var d = new Date();
    var heisei = d.getFullYear() - 1988;
    dateEl.textContent = "平成" + heisei + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
  }
})();
