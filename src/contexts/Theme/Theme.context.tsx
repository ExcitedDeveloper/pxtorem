// https://hello-js.com/articles/themes-in-react-with-typescript-context-hooks/

import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  FC,
  ReactNode,
  useMemo,
} from 'react'
import { THEMES } from './Theme.config'
import { ThemeType, Theme } from './Theme.model'
import {
  getCurrentThemeFromLocalStorage,
  CURRENT_THEME_LOCAL_STORAGE,
} from '../../util'

interface ThemeContextProps {
  themeType: ThemeType
  theme: Theme
  setCurrentTheme: Dispatch<SetStateAction<ThemeType | undefined>>
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: ThemeType.Light,
  theme: THEMES[ThemeType.Light],
} as ThemeContextProps)

export interface ThemeProviderProps {
  children?: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>()

  // Reload the last theme from local storage
  // when app first runs
  useEffect(() => {
    const theme = getCurrentThemeFromLocalStorage()

    if (theme) {
      setCurrentTheme(theme)
      return
    }

    setCurrentTheme(ThemeType.Light)
  }, [])

  // Update local storage when theme changes
  useEffect(() => {
    try {
      if (!currentTheme) return

      localStorage.setItem(CURRENT_THEME_LOCAL_STORAGE, currentTheme)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Theme.context.tsx`, error)
    }
  }, [currentTheme])

  const value = useMemo(
    () => ({
      themeType: currentTheme || ThemeType.Light,
      theme: THEMES[currentTheme || ThemeType.Light],
      setCurrentTheme,
    }),
    [currentTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => React.useContext(ThemeContext)
