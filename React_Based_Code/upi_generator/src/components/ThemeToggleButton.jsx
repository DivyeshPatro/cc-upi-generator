import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggleButton = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: isDarkMode ? '#FFD700' : '#1E1E1E'
            }}
            aria-label="Toggle theme"
        >
            {isDarkMode ? <Sun /> : <Moon />}
        </button>
    );
};

export default ThemeToggleButton;