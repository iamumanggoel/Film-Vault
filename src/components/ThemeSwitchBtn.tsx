import { useEffect, useState } from "react";
import { ThemeEnum } from "../models/Theme";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TheatersIcon from '@mui/icons-material/Theaters'; 

const ThemeSwitchBtn = () => {
    const themes = Object.values(ThemeEnum);

    const [selectedTheme, setSelectedTheme] = useState<ThemeEnum>(themes[0]); //auto select first theme

    useEffect(() => {
        const root = document.documentElement; //document.getElementById("root");

        // Remove any existing theme classes or attributes
        root.classList.remove('dark');
        root.removeAttribute('data-theme');

        if (selectedTheme === 'dark') {
        root.classList.add('dark');
        } else if (selectedTheme !== 'light') {
        root.setAttribute('data-theme', selectedTheme);
        }

    }, [selectedTheme]);

    const goToNextTheme = () => {
        const index = themes.indexOf(selectedTheme);
        const nextTheme = themes[(index + 1) % themes.length];
        setSelectedTheme(nextTheme);
    }

    const getIcon = () => {
    switch (selectedTheme) {
      case 'light':
        return <LightModeIcon />;
      case 'dark':
        return <DarkModeIcon />;
      case 'cinematic-warm':
        return <TheatersIcon />;
      default:
        return <LightModeIcon />;
    }
  };

  return (
    <button
      onClick={goToNextTheme}
      className="bg-inherit text-text"
      title={`Current: ${selectedTheme}`}
    >
      {getIcon()}
    </button>
  )
}

export default ThemeSwitchBtn;

