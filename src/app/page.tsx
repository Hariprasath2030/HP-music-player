import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Music, Play, Users, Headphones } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Music className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">HP Music</span>
        </div>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <Link href="/sign-in" className="text-white hover:text-purple-300 transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              Sign Up
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="text-white hover:text-purple-300 transition-colors">
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Your Music, <span className="text-purple-400">Your Way</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover, create, and share your favorite playlists with HP Music Player. 
            Stream millions of songs and create the perfect soundtrack for your life.
          </p>
          <SignedOut>
            <Link href="/sign-up" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Get Started Free</span>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Go to Dashboard</span>
            </Link>
          </SignedIn>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
            <Headphones className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">High Quality Audio</h3>
            <p className="text-gray-300">Experience crystal clear sound with our premium audio streaming.</p>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
            <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Social Playlists</h3>
            <p className="text-gray-300">Create and share playlists with friends and discover new music.</p>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
            <Music className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Unlimited Library</h3>
            <p className="text-gray-300">Access millions of songs from your favorite artists and genres.</p>
          </div>
        </div>
      </div>
    </div>
  )
}