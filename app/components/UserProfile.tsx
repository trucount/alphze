'use client'

import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserProfile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Subscription</h3>
            <p>{user.subscriptionTier}</p>
          </div>
          <div>
            <h3 className="font-semibold">Watch Time</h3>
            <p>{user.watchTime} hours</p>
          </div>
          <div>
            <h3 className="font-semibold">Favorite Genres</h3>
            <p>{user.preferences.favoriteGenres.join(', ')}</p>
          </div>
          <div>
            <h3 className="font-semibold">Reviews Written</h3>
            <p>{user.reviewsWritten}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

