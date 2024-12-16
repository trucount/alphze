'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import SearchBar from './SearchBar'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="bg-orange-500 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">ALPHZE</Link>
        <div className="hidden md:block flex-grow mx-4">
          <SearchBar />
        </div>
        <nav className="hidden md:flex space-x-4">
          {user ? (
            <>
              <Link href="/account" className="hover:text-orange-200 transition-colors duration-200">Account</Link>
              <button onClick={logout} className="hover:text-orange-200 transition-colors duration-200">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-orange-200 transition-colors duration-200">Login</Link>
              <Link href="/signup" className="hover:text-orange-200 transition-colors duration-200">Sign Up</Link>
            </>
          )}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center py-4">
            {user ? (
              <>
                <Link href="/account" className="py-2 hover:text-orange-200 transition-colors duration-200">Account</Link>
                <button onClick={logout} className="py-2 hover:text-orange-200 transition-colors duration-200">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="py-2 hover:text-orange-200 transition-colors duration-200">Login</Link>
                <Link href="/signup" className="py-2 hover:text-orange-200 transition-colors duration-200">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

