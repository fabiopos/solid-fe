import { useCallback, useEffect, useMemo, useState } from "react";

export const useSettings = () => {};

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const isDarkModeEnabled = useMemo(() => {
    const currtheme = localStorage.getItem("sm-theme");
    return !!currtheme;
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    const currtheme = localStorage.getItem("sm-theme");
    setDarkMode(!!currtheme);
  }, []);

  const toggleDarkMode = useCallback((checked: boolean) => {
    localStorage.setItem("sm-theme", String(checked));
    setDarkMode(checked);
  }, []);

  return {
    darkMode,
    toggleDarkMode,
    isDarkModeEnabled,
  };
};
