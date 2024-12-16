'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import VideoCard from './VideoCard'

interface Video {
  id: number
  title: string
  thumbnailUrl: string
  description: string
}

export default function VideoRecommendations() {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState<Video[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchRecommendations = async () => {
      // Simulating an API call
      const response = await fetch('/api/recommendations')
      const data = await response.json()
      setRecommendations(data)
    }

    if (user) {
      fetchRecommendations()
    }
  }, [user])

  if (!user) return null

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendations.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}

