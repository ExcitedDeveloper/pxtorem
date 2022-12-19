import { ThemeType } from './contexts/Theme/Theme.model'

export const CURRENT_THEME_LOCAL_STORAGE = 'currentTheme'

export const getCurrentThemeFromLocalStorage = (): ThemeType => {
  try {
    const currentTheme = localStorage.getItem(
      CURRENT_THEME_LOCAL_STORAGE
    ) as ThemeType

    return currentTheme || ThemeType.Light
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('getCurrentThemeFromLocalStorage', error)
    return ThemeType.Light
  }
}

export enum WhichSide {
  Left,
  Right,
}

export const ROOT_FONT_SIZE = 'root-font-size'
export const DFLT_ROOT_FONT_SIZE = 16

export const getRootFontSizeFromLocalStorage = () => {
  let initRootFontSize = DFLT_ROOT_FONT_SIZE

  const storageRootFontSize = localStorage.getItem(ROOT_FONT_SIZE)

  if (storageRootFontSize) {
    initRootFontSize = Number(storageRootFontSize)
  }

  return initRootFontSize
}
