// https://hello-js.com/articles/themes-in-react-with-typescript-context-hooks/

import React, { FC, ReactNode, useMemo } from 'react'
import { THEMES } from './Theme.config'
import { ThemeType, Theme } from './Theme.model'
import useLocalStorage from '../../hooks/useLocalStorage'
import { CURRENT_THEME_LOCAL_STORAGE } from '../../util'

interface ThemeContextProps {
  readonly themeType: ThemeType
  readonly theme: Theme
  readonly setCurrentTheme: (
    value: ThemeType | ((val: ThemeType) => ThemeType)
  ) => void
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: ThemeType.Light,
  theme: THEMES[ThemeType.Light],
} as ThemeContextProps)

export interface ThemeProviderProps {
  readonly children?: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useLocalStorage<ThemeType>(
    CURRENT_THEME_LOCAL_STORAGE,
    ThemeType.Light
  )

  const value = useMemo(
    () => ({
      themeType: currentTheme,
      theme: THEMES[currentTheme],
      setCurrentTheme,
    }),
    [currentTheme, setCurrentTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => React.useContext(ThemeContext)
