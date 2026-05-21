import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type PrimaryColor = { h: number; s: string; l: string };

type Ctx = { 
  theme: Theme; 
  toggle: () => void; 
  primaryColor: PrimaryColor;
  setPrimaryColor: (color: PrimaryColor) => void;
};

const defaultColor: PrimaryColor = { h: 18, s: "95%", l: "52%" };

const ThemeContext = createContext<Ctx>({ 
  theme: "light", 
  toggle: () => {},
  primaryColor: defaultColor,
  setPrimaryColor: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>(() => {
    if (typeof window === "undefined") return defaultColor;
    const saved = localStorage.getItem("primaryColor");
    return saved ? JSON.parse(saved) : defaultColor;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary-h", primaryColor.h.toString());
    root.style.setProperty("--primary-s", primaryColor.s);
    root.style.setProperty("--primary-l", primaryColor.l);
    localStorage.setItem("primaryColor", JSON.stringify(primaryColor));
  }, [primaryColor]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      primaryColor,
      setPrimaryColor,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
