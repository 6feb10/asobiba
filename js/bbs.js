// ★なんちゃってレンタルBBS★
// localStorageに保存するだけの平和なゲストブックだよ

(function () {
  var KEY = "yumekawa-moon-bbs";

  // 最初から入ってる常連さんのカキコ
  var DEFAULT_POSTS = [
    {
      name: "あっちゃん",
      date: "2004/6/11(金) 21:43",
      msg: "みゅうちん今日もおつかれ～！！ポスターの件、進展あったら速攻報告してよねw あと数学のノート貸して(´；ω；｀)"
    },
    {
      name: "ちょこみんと姫",
      date: "2004/6/10(木) 19:02",
      msg: "相互リンクありがとうございました(●´ω｀●) こちらも貼らせていただきました☆ これからも仲良くしてくださいねっ"
    },
    {
      name: "通りすがりの旅人",
      date: "2004/6/8(火) 23:15",
      msg: "検索から来ました。ぽえむ良かったです。また来ます。"
    },
    {
      name: "みゅう☆(管理人)",
      date: "2004/6/5(土) 20:30",
      msg: "＞＞みんなへ　いつもカキコありがとぉ！！レス遅くなってごめんね(>_<) 文化祭おわったらいっぱい更新するから待っててね♪"
    }
  ];

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      return saved.concat(DEFAULT_POSTS);
    } catch (e) {
      return DEFAULT_POSTS;
    }
  }

  function save(post) {
    var saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    saved.unshift(post);
    localStorage.setItem(KEY, JSON.stringify(saved));
  }

  function render() {
    var container = document.getElementById("bbs-posts");
    container.textContent = "";
    load().forEach(function (p) {
      var div = document.createElement("div");
      div.className = "bbs-post";

      var meta = document.createElement("p");
      meta.className = "meta";
      var name = document.createElement("span");
      name.className = "name";
      name.textContent = "♪ " + p.name + " さん";
      meta.appendChild(name);
      meta.appendChild(document.createTextNode("　投稿日：" + p.date));

      var body = document.createElement("p");
      body.textContent = p.msg;

      div.appendChild(meta);
      div.appendChild(body);
      container.appendChild(div);
    });
  }

  function nowStr() {
    var d = new Date();
    var youbi = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
    function z(n) { return ("0" + n).slice(-2); }
    return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() +
      "(" + youbi + ") " + z(d.getHours()) + ":" + z(d.getMinutes());
  }

  document.getElementById("bbs-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("bbs-name").value.trim();
    var msg = document.getElementById("bbs-msg").value.trim();
    if (!name) { alert("おなまえ入れてね！(>_<)"); return; }
    if (!msg) { alert("メッセージが空っぽだよ～(´；ω；｀)"); return; }

    save({ name: name, date: nowStr(), msg: msg });
    document.getElementById("bbs-msg").value = "";
    render();
    alert("カキコありがとぉ(*´∇｀*)♪");
  });

  document.querySelectorAll(".kao-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var ta = document.getElementById("bbs-msg");
      ta.value += btn.getAttribute("data-kao");
      ta.focus();
    });
  });

  render();
})();
