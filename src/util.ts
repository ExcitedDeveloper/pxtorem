import { ThemeType } from "./contexts/Theme/Theme.model"

export const CURRENT_THEME_LOCAL_STORAGE = "currentTheme"

export const getCurrentThemeFromLocalStorage = (): ThemeType => {
  try {
    const currentTheme = localStorage.getItem(
      CURRENT_THEME_LOCAL_STORAGE
    ) as ThemeType

    return currentTheme || ThemeType.Light
  } catch (error) {
    console.error("getCurrentThemeFromLocalStorage", error)
    return ThemeType.Light
  }
}
