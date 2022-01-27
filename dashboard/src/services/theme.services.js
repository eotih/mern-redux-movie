import { useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const saveTheme = () => {
    const themeString = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', themeString);
    setTheme(themeString);
  };
  return {
    setTheme: saveTheme,
    themeColor: theme
  };
}
