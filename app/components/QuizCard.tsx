import Link from 'next/link'
import { motion } from 'framer-motion'

interface Quiz {
  id: number
  title: string
  description: string
}

interface QuizCardProps {
  quiz: Quiz
}

export default function QuizCard({ quiz }: QuizCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link href={`/quizzes/${quiz.id}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
          <p className="text-gray-600">{quiz.description}</p>
          <button className="mt-4 btn-primary">Start Quiz</button>
        </div>
      </Link>
    </motion.div>
  )
}

