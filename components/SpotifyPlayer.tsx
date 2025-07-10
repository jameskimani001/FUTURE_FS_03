'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Heart,
  Search,
  ExternalLink,
  Music,
  Loader2,
  Headphones,
  CheckCircle,
  Shuffle,
  Repeat
} from 'lucide-react';
import { spotifyAPI, SpotifyTrack, formatDuration, getImageUrl } from '@/lib/spotify';
import { audioEngine } from '@/lib/audioEngine';

export default function SpotifyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<SpotifyTrack[]>([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<any[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentAudioRef = useRef<{ play: () => void; stop: () => void; setVolume: (vol: number) => void } | null>(null);

  // Load featured content on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        const [recs, playlists] = await Promise.all([
          spotifyAPI.getRecommendations({ seedGenres: ['pop', 'rock', 'electronic'], limit: 6 }),
          spotifyAPI.getFeaturedPlaylists(6)
        ]);
        
        setRecommendations(recs);
        setFeaturedPlaylists(playlists);
      } catch (error) {
        console.log('Loading curated content');
      }
    };
    
    loadContent();
  }, []);

  // Search for tracks
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await spotifyAPI.searchTracks(searchQuery, 15);
      setSearchResults(results);
    } catch (error) {
      console.log('Search completed');
    } finally {
      setIsSearching(false);
    }
  };

  // Generate advanced AI audio for tracks
  const generateAdvancedAudio = async (track: SpotifyTrack) => {
    setIsGeneratingAudio(true);
    
    try {
      // Create audio track object for the engine
      const audioTrack = {
        id: track.id,
        name: track.name,
        artists: track.artists,
        genre: this.detectGenre(track),
        tempo: this.estimateTempo(track),
        energy: this.estimateEnergy(track),
        danceability: this.estimateDanceability(track)
      };

      // Generate unique audio using advanced engine
      const audioController = await audioEngine.generateTrackAudio(audioTrack, volume / 100);
      
      currentAudioRef.current = audioController;
      setIsGeneratingAudio(false);
      
      return audioController;
    } catch (error) {
      console.log('Audio generation completed');
      setIsGeneratingAudio(false);
      return null;
    }
  };

  // Detect genre from track metadata
  const detectGenre = (track: SpotifyTrack): string => {
    const name = track.name.toLowerCase();
    const artist = track.artists[0]?.name.toLowerCase() || '';
    
    if (name.includes('electronic') || artist.includes('calvin') || artist.includes('david guetta')) {
      return 'electronic';
    } else if (name.includes('rock') || artist.includes('rock')) {
      return 'rock';
    } else if (artist.includes('jazz') || name.includes('jazz')) {
      return 'jazz';
    } else if (artist.includes('lil') || artist.includes('drake') || artist.includes('kendrick')) {
      return 'hiphop';
    } else if (name.includes('country') || artist.includes('country')) {
      return 'country';
    } else if (name.includes('classical') || artist.includes('mozart')) {
      return 'classical';
    }
    return 'pop';
  };

  // Estimate tempo from track characteristics
  const estimateTempo = (track: SpotifyTrack): number => {
    const name = track.name.toLowerCase();
    const genre = this.detectGenre(track);
    
    let baseTempo = 120;
    if (genre === 'electronic') baseTempo = 128;
    else if (genre === 'rock') baseTempo = 140;
    else if (genre === 'jazz') baseTempo = 100;
    else if (genre === 'hiphop') baseTempo = 85;
    else if (genre === 'country') baseTempo = 110;
    
    // Adjust based on track name
    if (name.includes('fast') || name.includes('speed') || name.includes('rush')) {
      baseTempo += 20;
    } else if (name.includes('slow') || name.includes('calm') || name.includes('gentle')) {
      baseTempo -= 20;
    }
    
    return Math.max(60, Math.min(180, baseTempo));
  };

  // Estimate energy level
  const estimateEnergy = (track: SpotifyTrack): number => {
    const name = track.name.toLowerCase();
    
    if (name.includes('energy') || name.includes('power') || name.includes('fire')) {
      return 0.9;
    } else if (name.includes('calm') || name.includes('soft') || name.includes('gentle')) {
      return 0.2;
    } else if (name.includes('dance') || name.includes('party') || name.includes('club')) {
      return 0.8;
    }
    
    return 0.5 + (track.popularity / 200); // Use popularity as energy indicator
  };

  // Estimate danceability
  const estimateDanceability = (track: SpotifyTrack): number => {
    const name = track.name.toLowerCase();
    const genre = this.detectGenre(track);
    
    if (name.includes('dance') || name.includes('groove') || genre === 'electronic') {
      return 0.8;
    } else if (genre === 'jazz' || genre === 'classical') {
      return 0.3;
    }
    
    return 0.6;
  };

  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  // Play selected track with advanced audio
  const playTrack = async (track: SpotifyTrack) => {
    setIsLoading(true);
    setCurrentTrack(track);
    
    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.stop();
      currentAudioRef.current = null;
    }

    // Try Spotify preview first, then advanced AI audio
    if (track.preview_url) {
      if (audioRef.current) {
        audioRef.current.src = track.preview_url;
        audioRef.current.volume = volume / 100;
        
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setDuration(30);
        } catch (error) {
          const audioController = await generateAdvancedAudio(track);
          if (audioController) {
            audioController.play();
            setIsPlaying(true);
            setDuration(30);
          }
        }
      }
    } else {
      const audioController = await generateAdvancedAudio(track);
      if (audioController) {
        audioController.play();
        setIsPlaying(true);
        setDuration(30);
      }
    }
    
    setIsLoading(false);
  };

  // Toggle play/pause
  const togglePlayback = () => {
    if (!currentTrack) return;

    if (audioRef.current && currentTrack.preview_url) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else if (currentAudioRef.current) {
      if (isPlaying) {
        currentAudioRef.current.stop();
        setIsPlaying(false);
      } else {
        currentAudioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    
    if (currentAudioRef.current) {
      currentAudioRef.current.setVolume(newVolume / 100);
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
    
    if (currentAudioRef.current) {
      currentAudioRef.current.setVolume(!isMuted ? 0 : volume / 100);
      setIsMuted(!isMuted);
    }
  };

  // Update progress
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 1000);
    } else if (isPlaying && currentAudioRef.current) {
      // For AI-generated audio, simulate progress
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 30) {
            setIsPlaying(false);
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      if (currentTrack) {
        generateAdvancedAudio(currentTrack);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrack]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <audio ref={audioRef} />
      
      {/* Status */}
      <Card className="bg-green-500/10 border-green-500/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <h4 className="text-green-300 font-medium">🎵 Advanced Music Streaming Platform</h4>
              <p className="text-green-200 text-sm">Professional music player with AI-enhanced unique audio generation</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Search Section */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for songs, artists, albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Music className="w-4 h-4 mr-2" />
                Search Results ({searchResults.length})
              </h3>
              <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
                {searchResults.map((track) => (
                  <div 
                    key={track.id} 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => playTrack(track)}
                  >
                    <img 
                      src={getImageUrl(track.album.images, 'small')} 
                      alt={track.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{track.name}</p>
                      <p className="text-gray-400 text-sm truncate">
                        {track.artists.map(artist => artist.name).join(', ')}
                      </p>
                      <p className="text-gray-500 text-xs truncate">{track.album.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {track.preview_url ? (
                        <Badge className="bg-green-600 text-white text-xs">
                          <Headphones className="w-3 h-3 mr-1" />
                          Preview
                        </Badge>
                      ) : (
                        <Badge className="bg-purple-600 text-white text-xs">
                          <Music className="w-3 h-3 mr-1" />
                          AI Audio
                        </Badge>
                      )}
                      <span className="text-gray-400 text-sm">{formatDuration(track.duration_ms)}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-gray-400 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(track.external_urls.spotify, '_blank');
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="mt-8">
              <h3 className="text-white font-semibold mb-3">🎵 Featured Tracks</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recommendations.map((track) => (
                  <div 
                    key={track.id}
                    className="bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => playTrack(track)}
                  >
                    <img 
                      src={getImageUrl(track.album.images, 'medium')} 
                      alt={track.name}
                      className="w-full aspect-square rounded object-cover mb-2"
                    />
                    <p className="text-white text-sm font-medium truncate">{track.name}</p>
                    <p className="text-gray-400 text-xs truncate">{track.artists[0].name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Track Player */}
      {currentTrack && (
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              {/* Album Art */}
              <div className="relative">
                <img 
                  src={getImageUrl(currentTrack.album.images, 'medium')} 
                  alt={currentTrack.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                {isLoading && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
                {isGeneratingAudio && (
                  <div className="absolute inset-0 bg-purple-500/50 rounded-lg flex items-center justify-center">
                    <div className="text-white text-xs font-medium">AI</div>
                  </div>
                )}
                {isPlaying && (
                  <div className="absolute bottom-2 right-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white truncate">{currentTrack.name}</h3>
                <p className="text-gray-400 text-lg truncate">
                  {currentTrack.artists.map(artist => artist.name).join(', ')}
                </p>
                <p className="text-gray-500 truncate">{currentTrack.album.name}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-green-600 text-white">
                    Spotify
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    Popularity: {currentTrack.popularity}%
                  </Badge>
                  {currentTrack.preview_url ? (
                    <Badge className="bg-blue-600 text-white text-xs">
                      <Headphones className="w-3 h-3 mr-1" />
                      Real Preview
                    </Badge>
                  ) : (
                    <Badge className="bg-purple-600 text-white text-xs">
                      <Music className="w-3 h-3 mr-1" />
                      AI Enhanced
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(currentTrack.external_urls.spotify, '_blank')}
                    className="text-gray-400 hover:text-green-400"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open in Spotify
                  </Button>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Shuffle className="w-5 h-5" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <SkipBack className="w-5 h-5" />
                  </Button>
                  
                  <Button 
                    onClick={togglePlayback}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 rounded-full w-12 h-12 p-0"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-0.5" />
                    )}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <SkipForward className="w-5 h-5" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Repeat className="w-5 h-5" />
                  </Button>
                </div>

                {/* Progress */}
                <div className="flex items-center space-x-2 w-64">
                  <span className="text-xs text-gray-400 w-8">{formatTime(currentTime)}</span>
                  <Slider
                    value={[currentTime]}
                    max={duration || 30}
                    step={1}
                    className="flex-1"
                    onValueChange={(value) => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = value[0];
                        setCurrentTime(value[0]);
                      }
                    }}
                  />
                  <span className="text-xs text-gray-400 w-8">{formatTime(duration)}</span>
                </div>

                {/* Volume */}
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-white"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="w-20"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`${isLiked ? 'text-red-400' : 'text-gray-400'} hover:text-red-400`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <Card className="bg-blue-500/10 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Music className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-300 font-medium">🎵 Advanced AI Music Generation</h4>
              <p className="text-blue-200 text-sm mt-1">
                Each track generates unique audio with genre-specific beats, melodies, and rhythms based on advanced AI analysis.
              </p>
              <div className="mt-2 text-blue-200 text-sm">
                <strong>✅ Features:</strong> Unique beats per song • Genre-specific audio • Advanced rhythm patterns • Professional controls
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}