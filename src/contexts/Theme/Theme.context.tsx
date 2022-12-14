// https://hello-js.com/articles/themes-in-react-with-typescript-context-hooks/

import React, { Dispatch, SetStateAction } from "react"
import { THEMES } from "./Theme.config"
import { ThemeType, Theme } from "./Theme.model"

interface ThemeContextProps {
  themeType: ThemeType
  theme: Theme
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: ThemeType.Light,
  theme: THEMES[ThemeType.Light],
} as ThemeContextProps)

export interface ThemeProviderProps {
  children?: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeType>(
    ThemeType.Light
  )

  return (
    <ThemeContext.Provider
      value={{
        themeType: currentTheme,
        theme: THEMES[currentTheme],
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext)
