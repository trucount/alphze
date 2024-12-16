'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

export default function AdvancedSearch() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    if (query) searchParams.append('q', query)
    if (genre) searchParams.append('genre', genre)
    if (year) searchParams.append('year', year)
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos..."
      />
      <Select value={genre} onValueChange={setGenre}>
        <Select.Trigger>
          <Select.Value placeholder="Select genre" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="action">Action</Select.Item>
          <Select.Item value="comedy">Comedy</Select.Item>
          <Select.Item value="drama">Drama</Select.Item>
          <Select.Item value="scifi">Sci-Fi</Select.Item>
        </Select.Content>
      </Select>
      <Input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Release year"
        min="1900"
        max={new Date().getFullYear().toString()}
      />
      <Button type="submit" className="w-full">Search</Button>
    </form>
  )
}

