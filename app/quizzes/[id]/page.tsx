'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import quizzes from '../../../data/quizzes.json'
import { useAuth } from '../../context/AuthContext'
import confetti from 'canvas-confetti'
import { Trophy, Zap } from 'lucide-react'

export default function Quiz({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, updateQuizScore, addAchievement, addXP } = useAuth()
  const quiz = quizzes.find(q => q.id === parseInt(params.id))
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [timer, setTimer] = useState(30)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    if (!showResult && timer > 0) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(timerId)
    } else if (timer === 0) {
      handleAnswer('')
    }
  }, [timer, showResult])

  if (!quiz) {
    router.push('/quizzes')
    return null
  }

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === quiz.questions[currentQuestion].correctAnswer
    if (isCorrect) {
      const timeBonus = Math.floor(timer / 3)
      const streakBonus = streak * 2
      const questionScore = 10 + timeBonus + streakBonus
      setScore(score + questionScore)
      setStreak(streak + 1)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      setStreak(0)
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setTimer(30)
    } else {
      setShowResult(true)
      updateQuizScore(quiz.id, score)
      if (score > 80) {
        addAchievement('Quiz Master')
      }
      // Remove this line: addXP(score)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{quiz.title}</h1>
        {!showResult ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Question {currentQuestion + 1} of {quiz.questions.length}</h2>
              <div className="text-xl font-bold">Time: {timer}s</div>
            </div>
            <p className="text-lg mb-4">{quiz.questions[currentQuestion].question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="btn-primary"
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-4 text-xl">Current Score: {score}</div>
            <div className="mt-2 text-xl">Streak: {streak}</div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-xl mb-4">Your final score: {score}</p>
            <div className="flex justify-center items-center mb-4">
              <Zap className="text-yellow-500 mr-2" />
              <p className="text-lg">+{score} XP</p>
            </div>
            {score > 80 && (
              <div className="flex justify-center items-center mb-4">
                <Trophy className="text-yellow-500 mr-2" />
                <p className="text-lg">Achievement Unlocked: Quiz Master</p>
              </div>
            )}
            <button onClick={() => router.push('/quizzes')} className="btn-primary">
              Back to Quizzes
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

