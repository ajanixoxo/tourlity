"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Video, Phone, MoreVertical, Mic, Paperclip, Send, X } from 'lucide-react'
import { useAuthStore } from '@/lib/stores/auth-store'

interface ChatConversation {
  id: string
  hostId: string
  hostName: string
  hostAvatar?: string
  tourTitle: string
  lastMessage: string
  timestamp: string
  unreadCount: number
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  isRead: boolean
}

export default function ChatPage() {
  const { user } = useAuthStore()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')

  // Mock data - Replace with actual API call
  const conversations: ChatConversation[] = [
    {
      id: '1',
      hostId: 'host1',
      hostName: 'John Marry',
      hostAvatar: '/images/default-avatar.png',
      tourTitle: 'Wine Tasting Tour',
      lastMessage: 'Sophia has rescheduled your Wine Tasting...',
      timestamp: '2 hours ago',
      unreadCount: 2
    }
    // Add more conversations from actual bookings
  ]

  const messages: Message[] = selectedConversation ? [
    {
      id: '1',
      senderId: user?.id || '',
      content: "How old is this building we're standing in front of?",
      timestamp: '2:34 PM',
      isRead: true
    }
    // Add more messages
  ] : []

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // TODO: Implement actual message sending
      console.log('Sending message:', messageInput)
      setMessageInput('')
    }
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden">
      {/* Left Sidebar - Chat List */}
      <div className="w-full lg:w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">All Messages</h2>
            <button className="text-[#F26457] text-sm font-medium hover:underline">
              Mark all as read
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <p className="text-gray-500 text-center">
                No conversations yet. Start booking tours to chat with hosts!
              </p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Host Avatar */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={conversation.hostAvatar || '/images/default-avatar.png'}
                      alt={conversation.hostName}
                      fill
                      className="object-cover"
                    />
                    {conversation.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#F26457] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.hostName} • {conversation.tourTitle}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Side - Active Chat */}
      <div className="w-full lg:w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {conversations.find(c => c.id === selectedConversation) && (
                  <>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={
                          conversations.find(c => c.id === selectedConversation)?.hostAvatar ||
                          '/images/default-avatar.png'
                        }
                        alt={
                          conversations.find(c => c.id === selectedConversation)?.hostName || ''
                        }
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {conversations.find(c => c.id === selectedConversation)?.hostName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {conversations.find(c => c.id === selectedConversation)?.tourTitle}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Phone size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center text-sm text-gray-500 mb-4">
                Today
              </div>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex justify-end"
                >
                  <div className="max-w-[70%] lg:max-w-[60%]">
                    <div className="bg-gray-100 rounded-2xl rounded-br-sm px-4 py-2">
                      <p className="text-gray-900 text-sm">{message.content}</p>
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                      {message.isRead && (
                        <span className="text-green-500 text-xs">✓✓</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                  placeholder="Type your message here"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F26457] focus:border-transparent"
                />
                <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                  <Mic size={20} className="text-gray-600" />
                </button>
                <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-3 bg-[#F26457] hover:bg-[#CA3F33] rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} className="text-white" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-lg">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

