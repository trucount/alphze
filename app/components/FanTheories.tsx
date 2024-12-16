'use client'

import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'

interface Theory {
  id: number
  username: string
  content: string
  likes: number
  dislikes: number
}

export default function FanTheories() {
  const { user, updateUser } = useAuth()
  const [theories, setTheories] = useState<Theory[]>([
    { id: 1, username: 'user1', content: 'I think the main character is actually a time traveler!', likes: 5, dislikes: 2 },
    { id: 2, username: 'user2', content: 'The entire story is happening in a simulation.', likes: 3, dislikes: 1 },
  ])
  const [newTheory, setNewTheory] = useState('')

  if (!user) return null

  const submitTheory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTheory.trim()) {
      const theory: Theory = {
        id: theories.length + 1,
        username: user.username,
        content: newTheory,
        likes: 0,
        dislikes: 0,
      }
      setTheories([...theories, theory])
      setNewTheory('')
      updateUser({ fanTheories: [...user.fanTheories, newTheory] })
    }
  }

  const vote = (id: number, isLike: boolean) => {
    setTheories(theories.map(theory => {
      if (theory.id === id) {
        if (isLike) {
          return { ...theory, likes: theory.likes + 1 }
        } else {
          return { ...theory, dislikes: theory.dislikes + 1 }
        }
      }
      return theory
    }))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Fan Theories</h2>
      <form onSubmit={submitTheory} className="mb-4">
        <textarea
          value={newTheory}
          onChange={(e) => setNewTheory(e.target.value)}
          placeholder="Share your theory..."
          className="w-full p-2 mb-2 rounded border"
        />
        <button type="submit" className="btn-primary">
          <MessageSquare className="w-4 h-4 mr-2" />
          Submit Theory
        </button>
      </form>
      <div>
        {theories.map(theory => (
          <div key={theory.id} className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
            <p className="font-bold">{theory.username}</p>
            <p>{theory.content}</p>
            <div className="flex mt-2">
              <button onClick={() => vote(theory.id, true)} className="mr-2 flex items-center">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {theory.likes}
              </button>
              <button onClick={() => vote(theory.id, false)} className="flex items-center">
                <ThumbsDown className="w-4 h-4 mr-1" />
                {theory.dislikes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

