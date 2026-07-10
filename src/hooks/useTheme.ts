import { useEffect, useState } from "react"

type Theme = "light" | "dark"

const STORAGE_KEY = "bioseq-theme"

function resolveInitialTheme(): Theme {
  const storedTheme = localStorage.getItem(STORAGE_KEY)

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(resolveInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))
  }

  return { theme, toggleTheme }
}
