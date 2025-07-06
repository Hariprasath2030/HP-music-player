'use client'

import { UserButton } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { Music, Search, Play, Pause, SkipForward, SkipBack, Volume2, Heart, Plus, List } from 'lucide-react'
import Link from 'next/link'

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  image: string
  preview_url?: string
}

interface Playlist {
  id: string
  name: string
  songs: Song[]
  created_at: string
}

export default function Dashboard() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Song[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')

  // Mock data for demonstration
  const mockSongs: Song[] = [
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'Watermelon Sugar',
      artist: 'Harry Styles',
      album: 'Fine Line',
      duration: '2:54',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: '3:23',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '4',
      title: 'Good 4 U',
      artist: 'Olivia Rodrigo',
      album: 'SOUR',
      duration: '2:58',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ]

  useEffect(() => {
    // Initialize with mock playlists
    setPlaylists([
      {
        id: '1',
        name: 'My Favorites',
        songs: mockSongs.slice(0, 2),
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Chill Vibes',
        songs: mockSongs.slice(2),
        created_at: new Date().toISOString()
      }
    ])
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      // Filter mock songs based on search query
      const filtered = mockSongs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  const playSong = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: newPlaylistName,
        songs: [],
        created_at: new Date().toISOString()
      }
      setPlaylists([...playlists, newPlaylist])
      setNewPlaylistName('')
      setShowCreatePlaylist(false)
    }
  }

  const addToPlaylist = (song: Song, playlistId: string) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, songs: [...playlist.songs, song] }
        : playlist
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">HP Music</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search songs, artists, albums..."
                  className="bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-80"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Playlists</h2>
                <button
                  onClick={() => setShowCreatePlaylist(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {showCreatePlaylist && (
                <div className="mb-4 p-3 bg-white/10 rounded-lg">
                  <input
                    type="text"
                    placeholder="Playlist name"
                    className="w-full bg-white/20 border border-white/30 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={createPlaylist}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => setShowCreatePlaylist(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => setSelectedPlaylist(playlist)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      selectedPlaylist?.id === playlist.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <List className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{playlist.name}</div>
                      <div className="text-sm opacity-70">{playlist.songs.length} songs</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Search Results</h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="space-y-3">
                    {searchResults.map((song) => (
                      <div key={song.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <img src={song.image} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{song.title}</h3>
                          <p className="text-gray-400 text-sm">{song.artist} • {song.album}</p>
                        </div>
                        <span className="text-gray-400 text-sm">{song.duration}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => playSong(song)}
                            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors">
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Selected Playlist */}
            {selectedPlaylist && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{selectedPlaylist.name}</h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  {selectedPlaylist.songs.length > 0 ? (
                    <div className="space-y-3">
                      {selectedPlaylist.songs.map((song) => (
                        <div key={song.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                          <img src={song.image} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h3 className="font-medium text-white">{song.title}</h3>
                            <p className="text-gray-400 text-sm">{song.artist} • {song.album}</p>
                          </div>
                          <span className="text-gray-400 text-sm">{song.duration}</span>
                          <button
                            onClick={() => playSong(song)}
                            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">This playlist is empty. Search for songs to add them!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Trending Songs */}
            {!selectedPlaylist && searchResults.length === 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Trending Now</h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="space-y-3">
                    {mockSongs.map((song) => (
                      <div key={song.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <img src={song.image} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{song.title}</h3>
                          <p className="text-gray-400 text-sm">{song.artist} • {song.album}</p>
                        </div>
                        <span className="text-gray-400 text-sm">{song.duration}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => playSong(song)}
                            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors">
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Music Player */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/10 p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={currentSong.image} alt={currentSong.title} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="font-medium text-white">{currentSong.title}</h4>
                  <p className="text-gray-400 text-sm">{currentSong.artist}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-white hover:text-purple-400 transition-colors">
                  <SkipBack className="h-5 w-5" />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button className="text-white hover:text-purple-400 transition-colors">
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button className="text-white hover:text-purple-400 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="text-white hover:text-purple-400 transition-colors">
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}