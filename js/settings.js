document.addEventListener('DOMContentLoaded', function() {
  const themeToggleButton = document.getElementById('theme-toggle');
  function updateThemeIcon(theme) {
    if (themeToggleButton) {
      themeToggleButton.src = theme === 'light' ? 'img/sun.png' : 'img/moon.png';
    }
  }
  const savedTheme = localStorage.getItem('user-theme');
  const initialTheme = savedTheme || 'light';
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeIcon(initialTheme);
  themeToggleButton?.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('user-theme', newTheme);
    updateThemeIcon(newTheme);
  });
});