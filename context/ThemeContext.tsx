import React, { createContext, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { darkTheme, themeStrings } from '../themes/themes'

export type Theme = typeof darkTheme

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(darkTheme)
  const setTheme = (themeName: string): void => {
    if (Object.keys(themeStrings).includes(themeName)) setThemeState(themeStrings[themeName])
    else setThemeState(darkTheme)
    storeTheme(themeName).catch(e => { console.error('Error storing theme:', e) })
  }

  const storeTheme = async (themeName: string): Promise<void> => {
    await SecureStore.setItemAsync('theme', themeName)
  }

  useEffect(() => {
    const loadTheme = async (): Promise<void> => {
      const storedTheme = await SecureStore.getItemAsync('theme')
      setTheme(storedTheme ?? 'dark')
    }
    loadTheme().catch(e => { console.error('Error loading theme:', e) })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  if (context == null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
