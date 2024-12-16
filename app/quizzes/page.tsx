'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import QuizCard from '../components/QuizCard'
import quizzes from '../../data/quizzes.json'
import { useAuth } from '../context/AuthContext'

export default function Quizzes() {
  const { user } = useAuth()
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
        <h1 className="text-3xl font-bold mb-8">Quizzes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </main>
    </div>
  )
}

