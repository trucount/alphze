'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import videos from '../../data/videos.json'
import { useInView } from 'react-intersection-observer'

interface Trailer {
  id: number
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
}

function TrailerCard({ trailer }: { trailer: Trailer }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  useEffect(() => {
    if (inView) {
      videoRef.current?.play()
      setIsPlaying(true)
    } else {
      videoRef.current?.pause()
      setIsPlaying(false)
    }
  }, [inView])

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause()
    } else {
      videoRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div ref={ref} className="relative h-[calc(100vh-4rem)] snap-start">
      <video
        ref={videoRef}
        src={trailer.videoUrl}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        onClick={togglePlay}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <h2 className="text-white text-xl font-bold">{trailer.title}</h2>
        <p className="text-white">{trailer.description}</p>
      </div>
    </div>
  )
}

export default function Trailers() {
  const trailers = videos.filter(video => video.category === 'trailers')

  return (
    <div className="min-h-screen">
      <Header />
      <main className="snap-y snap-mandatory h-[calc(100vh-4rem)] overflow-y-scroll">
        {trailers.map(trailer => (
          <TrailerCard key={trailer.id} trailer={trailer} />
        ))}
      </main>
    </div>
  )
}

