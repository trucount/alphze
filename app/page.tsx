'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from './components/Header'
import VideoSection from './components/VideoSection'
import videos from '../data/videos.json'
import { useAuth } from './context/AuthContext'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) return null

  const spotlightVideo = videos.find(video => video.category === 'spotlight')
  const watchNextVideos = videos.filter(video => video.category === 'watchNext')
  const continueWatchingVideos = videos.filter(video => video.category === 'continueWatching')
  const recentUploads = videos.filter(video => video.category === 'recentUploads')
  const trailers = videos.filter(video => video.category === 'trailers')

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <VideoSection title="Spotlight" videos={[spotlightVideo]} spotlight={true} />
        <VideoSection title="Watch Next" videos={watchNextVideos} />
        <VideoSection title="Continue Watching" videos={continueWatchingVideos} />
        <VideoSection title="Recent Uploads" videos={recentUploads} />
        <VideoSection title="Trailers" videos={trailers} />
      </div>
    </main>
  )
}

