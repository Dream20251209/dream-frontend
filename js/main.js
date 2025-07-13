console.log('✅ Dream 平台前端 JS 啟動');

// ✅ 後端 API 網址（Cloudflare Tunnel 或正式部署位址）
const BACKEND_BASE_URL = "https://tractor-guaranteed-abroad-prescribed.trycloudflare.com";

// ✅ 語言設定（預設英文）
const lang = localStorage.getItem('lang') || 'en';
const langSelect = document.getElementById('lang-select');

// === 載入翻譯檔並渲染頁面 ===
function loadTranslation(lang) {
  fetch(`${BACKEND_BASE_URL}/api/translations/${lang}`)
    .then(res => res.json())
    .then(data => {
      // ✅ 更新網站標題
      document.title = data.site_title || 'Dream Platform';
      const siteTitle = document.getElementById('site-title');
      if (siteTitle) siteTitle.textContent = data.site_title;

      // ✅ 語言標籤
      const langLabel = document.getElementById('lang-label');
      if (langLabel) langLabel.textContent = data.language || 'Language';

      // ✅ 動態導覽列
      const nav = document.getElementById('nav-links');
      if (nav) {
        nav.innerHTML = `
          <li><a href="/create-post.html">${data.create_post}</a></li>
          <li><a href="/feed.html">${data.post_feed}</a></li>
          <li><a href="/login.html">${data.login}</a></li>
          <li><a href="/register.html">${data.register}</a></li>
        `;
      }
    })
    .catch(err => {
      console.error('🌐 語言載入失敗:', err);
    });
}

// === DOM 載入後執行 ===
document.addEventListener('DOMContentLoaded', () => {
  // ✅ 設定語言選單初始值
  if (langSelect) langSelect.value = lang;

  // ✅ 載入目前語言的翻譯文字
  loadTranslation(lang);

  // ✅ 語言切換事件監聽
  if (langSelect) {
    langSelect.addEventListener('change', () => {
      const selectedLang = langSelect.value;
      localStorage.setItem('lang', selectedLang);

      // ✅ 通知後端語言變更（非必要，可忽略失敗）
      fetch(`${BACKEND_BASE_URL}/api/set-lang`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: selectedLang })
      }).catch(err => {
        console.warn('⚠️ 後端語言設定失敗（可忽略）:', err);
      });

      // ✅ 重新載入翻譯並更新畫面（不重整頁面）
      loadTranslation(selectedLang);
    });
  }
});
