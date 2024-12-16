'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../components/Header'
import VideoSection from '../components/VideoSection'
import videos from '../../data/videos.json'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (query) {
      const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filteredVideos)
    }
  }, [query])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
        {results.length > 0 ? (
          <VideoSection title="Results" videos={results} />
        ) : (
          <p>No results found.</p>
        )}
      </main>
    </div>
  )
}

