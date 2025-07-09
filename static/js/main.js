console.log('Dream 平台前端 JS 啟動');

document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('lang-select');
  if (!langSelect) return; // 頁面沒語言選單就不做事

  langSelect.addEventListener('change', () => {
    const selectedLang = langSelect.value;

    fetch('/api/set-lang', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang: selectedLang })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        // 切換語言後可以重新載入頁面，或者用 JS 動態更新頁面文字
        window.location.reload();
      })
      .catch(err => {
        console.error('語言切換失敗:', err);
      });
  });
});
