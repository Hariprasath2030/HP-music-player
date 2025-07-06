import { SignUp } from '@clerk/nextjs'
import { Music } from 'lucide-react'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 text-white hover:text-purple-300 transition-colors">
            <Music className="h-8 w-8" />
            <span className="text-2xl font-bold">HP Music</span>
          </Link>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Join HP Music</h1>
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-purple-600 hover:bg-purple-700 text-sm normal-case',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-300',
                socialButtonsBlockButton: 'bg-white/20 border-white/30 text-white hover:bg-white/30',
                formFieldInput: 'bg-white/20 border-white/30 text-white placeholder:text-gray-400',
                formFieldLabel: 'text-white',
                footerActionLink: 'text-purple-400 hover:text-purple-300',
                identityPreviewText: 'text-white',
                formButtonReset: 'text-purple-400 hover:text-purple-300',
              }
            }}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-300">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}