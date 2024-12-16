'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { Settings, Info } from 'lucide-react'
import GamificationHub from '../components/GamificationHub'

const LEADERBOARD_COLORS = [
  'bg-yellow-100',
  'bg-gray-100',
  'bg-orange-100',
  'bg-blue-100',
  'bg-green-100',
]

export default function Account() {
  const { user, leaderboard, notifications } = useAuth()
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
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <img src="/placeholder.svg?height=100&width=100" alt={user.username} className="w-20 h-20 rounded-full mr-4" />
            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              <p className="text-lg font-semibold mt-2">Level: {user.level}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link href="/settings" className="btn-primary flex items-center">
              <Settings className="mr-2" size={20} />
              Settings
            </Link>
            <Link href="/info" className="btn-primary flex items-center">
              <Info className="mr-2" size={20} />
              App Info
            </Link>
          </div>
        </div>
        <GamificationHub />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Rank</th>
                <th className="text-left">Username</th>
                <th className="text-left">Level</th>
                <th className="text-left">XP</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index} className={`${LEADERBOARD_COLORS[index] || ''} ${user.username === entry.username ? 'font-bold' : ''}`}>
                  <td>{index + 1}</td>
                  <td>{entry.username}</td>
                  <td>{entry.level}</td>
                  <td>{entry.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Notifications</h2>
          <ul className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {notifications.map((notification, index) => (
              <li key={index} className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">{notification}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

