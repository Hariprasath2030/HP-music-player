'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react'

interface Song {
  id: string
  title: string
  artist: string
  preview_url?: string
  image: string
}

interface AudioPlayerProps {
  song: Song | null
  onNext?: () => void
  onPrevious?: () => void
}

export default function AudioPlayer({ song, onNext, onPrevious }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !song?.preview_url) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      if (onNext) onNext()
    })

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [song, onNext])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = parseFloat(e.target.value)
    audio.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!song) return null

  return (
    <div className="bg-black/90 backdrop-blur-sm border-t border-white/10 p-4">
      <audio
        ref={audioRef}
        src={song.preview_url}
        preload="metadata"
      />
      
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center space-x-4 flex-1">
            <img 
              src={song.image} 
              alt={song.title} 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <h4 className="font-medium text-white truncate">{song.title}</h4>
              <p className="text-gray-400 text-sm truncate">{song.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1">
            <div className="flex items-center space-x-4">
              <button
                onClick={onPrevious}
                className="text-white hover:text-purple-400 transition-colors"
                disabled={!onPrevious}
              >
                <SkipBack className="h-5 w-5" />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-colors"
                disabled={!song.preview_url}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              
              <button
                onClick={onNext}
                className="text-white hover:text-purple-400 transition-colors"
                disabled={!onNext}
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-2 w-full max-w-md">
              <span className="text-xs text-gray-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-xs text-gray-400 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <button
              onClick={toggleMute}
              className="text-white hover:text-purple-400 transition-colors"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    </div>
  )
}