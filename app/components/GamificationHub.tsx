'use client'

import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Trophy, Star, Target, Zap, Award } from 'lucide-react'

const LEVELS = [
  { xp: 0, title: "Novice" },
  { xp: 1000, title: "Apprentice" },
  { xp: 2500, title: "Enthusiast" },
  { xp: 5000, title: "Expert" },
  { xp: 10000, title: "Master" },
  { xp: 20000, title: "Grandmaster" },
  { xp: 35000, title: "Legend" },
  { xp: 50000, title: "Mythic" },
  { xp: 75000, title: "Transcendent" },
  { xp: 100000, title: "Immortal" },
]

export default function GamificationHub() {
  const { user, updateUser, addNotification } = useAuth()

  useEffect(() => {
    if (user) {
      // Auto-detect completed challenges
      if (user.watchTime >= 18000 && !user.challenges.includes('watch5hours')) {
        completeChallenge('watch5hours')
      }
      if (user.reviewsWritten >= 3 && !user.challenges.includes('write3reviews')) {
        completeChallenge('write3reviews')
      }

      // Check for level up
      const currentLevel = LEVELS.findIndex(level => user.xp < level.xp)
      if (currentLevel !== user.level) {
        updateUser({ level: currentLevel })
        addNotification(`Congratulations! You've reached level ${currentLevel}: ${LEVELS[currentLevel - 1].title}`)
      }
    }
  }, [user])

  if (!user) return null

  const completeChallenge = (challenge: string) => {
    updateUser({
      challenges: [...user.challenges, challenge],
      xp: user.xp + 50,
      virtualCurrency: user.virtualCurrency + 10
    })
    addNotification(`Challenge completed: ${challenge}`)
  }

  const claimReward = (reward: string) => {
    updateUser({
      rewards: [...user.rewards, reward],
      virtualCurrency: user.virtualCurrency - 100
    })
    addNotification(`Reward claimed: ${reward}`)
  }

  const currentLevel = LEVELS[user.level - 1]
  const nextLevel = LEVELS[user.level]
  const progress = nextLevel ? (user.xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp) * 100 : 100

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Gamification Hub</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Challenges</h3>
          <ul>
            <li className="flex items-center justify-between mb-2">
              <span>Watch 5 hours of content</span>
              <span className={`${user.challenges.includes('watch5hours') ? 'text-green-500' : 'text-gray-500'}`}>
                {user.challenges.includes('watch5hours') ? 'Completed' : `${Math.min(user.watchTime / 180, 100).toFixed(0)}%`}
              </span>
            </li>
            <li className="flex items-center justify-between mb-2">
              <span>Write 3 reviews</span>
              <span className={`${user.challenges.includes('write3reviews') ? 'text-green-500' : 'text-gray-500'}`}>
                {user.challenges.includes('write3reviews') ? 'Completed' : `${Math.min(user.reviewsWritten / 3 * 100, 100).toFixed(0)}%`}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Rewards</h3>
          <ul>
            <li className="flex items-center justify-between mb-2">
              <span>1 month free subscription</span>
              <button onClick={() => claimReward('1monthfree')} className="btn-primary" disabled={user.virtualCurrency < 100}>
                <Award className="w-4 h-4 mr-2" />
                Claim (100 coins)
              </button>
            </li>
            <li className="flex items-center justify-between mb-2">
              <span>Exclusive avatar item</span>
              <button onClick={() => claimReward('exclusiveavatar')} className="btn-primary" disabled={user.virtualCurrency < 100}>
                <Zap className="w-4 h-4 mr-2" />
                Claim (100 coins)
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Progress</h3>
        <div className="flex items-center justify-between mb-2">
          <span>Level {user.level}: {currentLevel.title}</span>
          <span>XP: {user.xp}</span>
          <span>Virtual Currency: {user.virtualCurrency}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        {nextLevel && (
          <div className="text-right text-sm mt-1">
            Next level: {nextLevel.title} ({nextLevel.xp - user.xp} XP to go)
          </div>
        )}
      </div>
    </div>
  )
}

