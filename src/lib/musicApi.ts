// Music API integration utilities
const MUSIC_API_BASE_URL = 'https://api.example-music-service.com/v1'

interface MusicApiConfig {
  clientId: string
  clientSecret: string
}

class MusicApiClient {
  private config: MusicApiConfig
  private accessToken: string | null = null

  constructor(config: MusicApiConfig) {
    this.config = config
  }

  async authenticate(): Promise<string> {
    try {
      const response = await fetch(`${MUSIC_API_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        }),
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      const data = await response.json()
      this.accessToken = data.access_token
      return this.accessToken
    } catch (error) {
      console.error('Music API authentication error:', error)
      throw error
    }
  }

  async searchTracks(query: string, limit: number = 20) {
    if (!this.accessToken) {
      await this.authenticate()
    }

    try {
      const response = await fetch(
        `${MUSIC_API_BASE_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Search request failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Music API search error:', error)
      throw error
    }
  }

  async getTrack(trackId: string) {
    if (!this.accessToken) {
      await this.authenticate()
    }

    try {
      const response = await fetch(`${MUSIC_API_BASE_URL}/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Track request failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Music API track error:', error)
      throw error
    }
  }

  async getArtist(artistId: string) {
    if (!this.accessToken) {
      await this.authenticate()
    }

    try {
      const response = await fetch(`${MUSIC_API_BASE_URL}/artists/${artistId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Artist request failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Music API artist error:', error)
      throw error
    }
  }

  async getAlbum(albumId: string) {
    if (!this.accessToken) {
      await this.authenticate()
    }

    try {
      const response = await fetch(`${MUSIC_API_BASE_URL}/albums/${albumId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Album request failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Music API album error:', error)
      throw error
    }
  }
}

// Initialize the music API client
export const musicApiClient = new MusicApiClient({
  clientId: process.env.MUSIC_CLIENT_ID || '',
  clientSecret: process.env.MUSIC_CLIENT_SECRET || '',
})

export default musicApiClient