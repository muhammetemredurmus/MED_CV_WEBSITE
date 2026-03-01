(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var themeBtn = document.querySelector('.theme-btn');

        if (!themeBtn) return;

        updateButtonText(themeBtn, document.documentElement.getAttribute('data-theme') || 'dark');

        themeBtn.addEventListener('click', function () {
            var newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateButtonText(themeBtn, newTheme);
        });
    });

    function updateButtonText(btn, theme) {
        btn.textContent = theme === 'dark' ? '☀️ Theme' : '🌙 Theme';
    }
})();
