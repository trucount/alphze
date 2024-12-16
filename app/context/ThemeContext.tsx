'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { useAuth } from './AuthContext'

type Theme = 'light' | 'dark'
type ColorScheme = 'default' | 'ocean' | 'forest' | 'sunset' | 'lavender' | 'midnight' | 'sunshine' | 'cherry-blossom' | 'mint' | 'autumn' | 'sky' | 'grape' | 'coral' | 'teal' | 'slate' | 'lime' | 'fuchsia' | 'aqua' | 'crimson' | 'olive' | 'maroon'

interface ThemeContextType {
  theme: Theme
  colorScheme: ColorScheme
  toggleTheme: () => void
  setColorScheme: (scheme: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light')
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default')
  const { user, updateUser } = useAuth()

  useEffect(() => {
    if (user) {
      const [scheme, themePreference] = user.preferences.colorScheme.split('-') as [ColorScheme, Theme]
      setTheme(themePreference)
      setColorScheme(scheme)
    }
  }, [user])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.setAttribute('data-color-scheme', colorScheme)
  }, [theme, colorScheme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    updateUser({ preferences: { ...user?.preferences, colorScheme: `${colorScheme}-${newTheme}` } })
  }

  const changeColorScheme = (scheme: ColorScheme) => {
    setColorScheme(scheme)
    updateUser({ preferences: { ...user?.preferences, colorScheme: `${scheme}-${theme}` } })
  }

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, toggleTheme, setColorScheme: changeColorScheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

