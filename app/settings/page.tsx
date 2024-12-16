'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useRouter } from 'next/navigation'

const colorCombinations = [
  { name: 'Default', scheme: 'default' },
  { name: 'Ocean', scheme: 'ocean' },
  { name: 'Forest', scheme: 'forest' },
  { name: 'Sunset', scheme: 'sunset' },
  { name: 'Lavender', scheme: 'lavender' },
  { name: 'Midnight', scheme: 'midnight' },
  { name: 'Sunshine', scheme: 'sunshine' },
  { name: 'Cherry Blossom', scheme: 'cherry-blossom' },
  { name: 'Mint', scheme: 'mint' },
  { name: 'Autumn', scheme: 'autumn' },
  { name: 'Sky', scheme: 'sky' },
  { name: 'Grape', scheme: 'grape' },
  { name: 'Coral', scheme: 'coral' },
  { name: 'Teal', scheme: 'teal' },
  { name: 'Slate', scheme: 'slate' },
  { name: 'Lime', scheme: 'lime' },
  { name: 'Fuchsia', scheme: 'fuchsia' },
  { name: 'Aqua', scheme: 'aqua' },
  { name: 'Crimson', scheme: 'crimson' },
  { name: 'Olive', scheme: 'olive' },
  { name: 'Maroon', scheme: 'maroon' },
];

export default function Settings() {
  const { user } = useAuth()
  const { theme, colorScheme, toggleTheme, setColorScheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Appearance</h2>
          <div className="flex items-center justify-between mb-4">
            <span>Theme</span>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-80 transition-colors duration-200"
            >
              {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </button>
          </div>
          <h3 className="text-xl font-semibold mb-2">Color Scheme</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {colorCombinations.map((scheme) => (
              <button
                key={scheme.scheme}
                onClick={() => setColorScheme(scheme.scheme)}
                className={`p-4 rounded-md text-center transition-all duration-200 ${
                  colorScheme === scheme.scheme ? 'ring-2 ring-primary' : ''
                }`}
                style={{
                  backgroundColor: `var(--color-background)`,
                  color: `var(--color-text)`,
                }}
              >
                <div
                  className="w-full h-8 mb-2 rounded"
                  style={{ backgroundColor: `var(--color-primary)` }}
                ></div>
                {scheme.name}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

