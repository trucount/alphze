'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import Header from '../../components/Header'
import VideoPlayer from '../../components/VideoPlayer'
import RecommendedVideos from '../../components/RecommendedVideos'
import WatchParty from '../../components/WatchParty'
import FanTheories from '../../components/FanTheories'
import { useAuth } from '../../context/AuthContext'
import videos from '../../../data/videos.json'

export default function VideoDetail({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const video = videos.find(v => v.id === parseInt(params.id))

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!video) {
    notFound()
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoPlayer videoUrl={video.videoUrl} videoId={video.id} />
            <p className="mt-4 text-lg">{video.description}</p>
            <FanTheories />
          </div>
          <div>
            <WatchParty videoId={video.id} />
          </div>
        </div>
        <RecommendedVideos currentVideoId={video.id} />
      </main>
    </div>
  )
}

