namespace JournalApp.Services
{
    public class ThemeService
    {
        public event Action? OnThemeChanged;
        
        private bool _isDarkMode = false;
        
        public bool IsDarkMode 
        { 
            get => _isDarkMode;
            set
            {
                if (_isDarkMode != value)
                {
                    _isDarkMode = value;
                    OnThemeChanged?.Invoke();
                }
            }
        }

        public void ToggleTheme()
        {
            IsDarkMode = !IsDarkMode;
        }

        public string GetThemeClass()
        {
            return IsDarkMode ? "dark-theme" : "light-theme";
        }
    }
}
