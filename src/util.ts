import { ThemeType } from "./contexts/Theme/Theme.model"

export const PXTOREM_LOCAL_STORAGE = "pxtorem"

export interface AppStorage {
  currentTheme?: ThemeType
}

export const getInfoFromLocalStorage = (): AppStorage => {
  let info = {}

  try {
    const loc = localStorage.getItem(PXTOREM_LOCAL_STORAGE)

    if (loc) {
      info = JSON.parse(loc) || {}
    }
  } catch (error) {
    console.error(`getInfoFromLocalStorage`, error)
    info = {}
  }

  return info
}
