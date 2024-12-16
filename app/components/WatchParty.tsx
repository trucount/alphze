'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Users, Play, Pause, MessageSquare } from 'lucide-react'

interface WatchPartyProps {
  videoId: number
}

export default function WatchParty({ videoId }: WatchPartyProps) {
  const { user, updateUser, leaderboard, addNotification } = useAuth()
  const [isPlaying, setIsPlaying] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [inviteUsername, setInviteUsername] = useState('')
  const [partyMembers, setPartyMembers] = useState<string[]>([])

  useEffect(() => {
    if (user) {
      setPartyMembers([user.username])
    }
  }, [user])

  if (!user) return null

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    // Here you would typically sync this state with other users in the watch party
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, `${user.username}: ${newMessage}`])
      setNewMessage('')
    }
  }

  const inviteUser = () => {
    const invitedUser = leaderboard.find(u => u.username === inviteUsername)
    if (invitedUser) {
      setPartyMembers([...partyMembers, invitedUser.username])
      addNotification(`${invitedUser.username} has been invited to your watch party!`)
      setInviteUsername('')
    } else {
      addNotification(`User ${inviteUsername} not found.`)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Watch Party</h2>
      <div className="flex justify-between items-center mb-4">
        <button onClick={togglePlayPause} className="btn-primary">
          {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="flex items-center">
          <input
            type="text"
            value={inviteUsername}
            onChange={(e) => setInviteUsername(e.target.value)}
            placeholder="Enter username"
            className="mr-2 p-2 border rounded"
          />
          <button onClick={inviteUser} className="btn-primary">
            <Users className="w-4 h-4 mr-2" />
            Invite User
          </button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Party Members:</h3>
        <ul className="list-disc list-inside">
          {partyMembers.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
      <div className="h-40 overflow-y-auto mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
        {messages.map((message, index) => (
          <p key={index} className="mb-1">{message}</p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow mr-2 p-2 border rounded"
        />
        <button type="submit" className="btn-primary">
          <MessageSquare className="w-4 h-4 mr-2" />
          Send
        </button>
      </form>
    </div>
  )
}

