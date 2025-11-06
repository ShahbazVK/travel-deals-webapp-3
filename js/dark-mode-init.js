// Dark mode initialization script
// This script runs immediately to prevent flash of light mode
(function() {
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'true') {
    document.documentElement.classList.add('dark-mode');
  }
})();
