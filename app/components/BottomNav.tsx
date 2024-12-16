'use client'

import Link from 'next/link'
import { Home, Film, BookOpen, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16">
      <Link href="/" className={`flex flex-col items-center ${pathname === '/' ? 'text-orange-500' : 'text-gray-500'}`}>
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link href="/trailers" className={`flex flex-col items-center ${pathname === '/trailers' ? 'text-orange-500' : 'text-gray-500'}`}>
        <Film size={24} />
        <span className="text-xs mt-1">Trailers</span>
      </Link>
      <Link href="/quizzes" className={`flex flex-col items-center ${pathname === '/quizzes' ? 'text-orange-500' : 'text-gray-500'}`}>
        <BookOpen size={24} />
        <span className="text-xs mt-1">Quizzes</span>
      </Link>
      <Link href="/account" className={`flex flex-col items-center ${pathname === '/account' ? 'text-orange-500' : 'text-gray-500'}`}>
        <User size={24} />
        <span className="text-xs mt-1">Account</span>
      </Link>
    </nav>
  )
}

