'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import videos from '../../data/videos.json'

interface Video {
  id: number
  title: string
  thumbnailUrl: string
  category: string
}

export default function RecommendedVideos({ currentVideoId }: { currentVideoId: number }) {
  const [recommendations, setRecommendations] = useState<Video[]>([])

  useEffect(() => {
    const currentVideo = videos.find(v => v.id === currentVideoId)
    if (currentVideo) {
      const sameCategory = videos.filter(v => v.category === currentVideo.category && v.id !== currentVideoId)
      const otherVideos = videos.filter(v => v.category !== currentVideo.category && v.id !== currentVideoId)
      const shuffled = [...sameCategory, ...otherVideos].sort(() => 0.5 - Math.random())
      setRecommendations(shuffled.slice(0, 5))
    }
  }, [currentVideoId])

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recommended Videos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recommendations.map(video => (
          <Link key={video.id} href={`/video/${video.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-32 object-cover" />
              <div className="p-2">
                <h3 className="font-bold text-sm truncate">{video.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

