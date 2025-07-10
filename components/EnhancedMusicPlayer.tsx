'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Shuffle,
  Heart,
  MoreHorizontal,
  Maximize2,
  Download,
  Share2,
  Music,
  Headphones
} from 'lucide-react';
import { realTracks } from '@/lib/musicData';
import { generateAudioForGenre } from '@/lib/audioSources';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function EnhancedMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [audioQuality, setAudioQuality] = useState('High');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = realTracks[currentTrackIndex];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const generateRealisticAudio = async (track: typeof currentTrack) => {
    setIsGeneratingAudio(true);
    
    // Simulate AI audio generation based on track metadata
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!audioContextRef.current) return null;
    
    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Generate audio based on genre and track characteristics
    const baseFreq = track.genre === 'Synthpop' ? 440 :
                     track.genre === 'Pop' ? 523 :
                     track.genre === 'Hip Hop' ? 349 :
                     track.genre === 'R&B' ? 293 : 440;
    
    const waveType = track.genre === 'Electronic' || track.genre === 'Synthpop' ? 'sawtooth' :
                     track.genre === 'Pop' ? 'sine' :
                     track.genre === 'Hip Hop' ? 'square' : 'triangle';
    
    oscillator.type = waveType as OscillatorType;
    oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
    
    // Create a melody pattern based on the track
    const melodyPattern = track.title.split('').map((char, index) => 
      1 + (char.charCodeAt(0) % 8) * 0.1
    ).slice(0, 8);
    
    let noteIndex = 0;
    const playMelody = () => {
      if (oscillator && audioContext) {
        const freq = baseFreq * melodyPattern[noteIndex % melodyPattern.length];
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        noteIndex++;
      }
    };
    
    // Set volume
    const volumeLevel = isMuted ? 0 : volume / 100 * 0.2;
    gainNode.gain.setValueAtTime(volumeLevel, audioContext.currentTime);
    
    oscillator.start();
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    
    // Play melody pattern
    const melodyInterval = setInterval(playMelody, 500);
    
    setIsGeneratingAudio(false);
    return { oscillator, gainNode, melodyInterval };
  };

  const togglePlay = async () => {
    if (isPlaying) {
      // Stop playback
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Start playback with AI-generated audio
      const audio = await generateRealisticAudio(currentTrack);
      if (audio) {
        setIsPlaying(true);
        setCurrentTime(0);
        setDuration(200); // 3:20 in seconds
        
        // Update progress
        intervalRef.current = setInterval(() => {
          setCurrentTime(prev => {
            if (prev >= 200) {
              togglePlay(); // Stop when finished
              return 200;
            }
            return prev + 1;
          });
        }, 1000);
      }
    }
  };

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (gainNodeRef.current) {
      const volumeLevel = isMuted ? 0 : newVolume / 100 * 0.2;
      gainNodeRef.current.gain.setValueAtTime(volumeLevel, audioContextRef.current?.currentTime || 0);
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current) {
      const volumeLevel = !isMuted ? 0 : volume / 100 * 0.2;
      gainNodeRef.current.gain.setValueAtTime(volumeLevel, audioContextRef.current?.currentTime || 0);
    }
  };

  const nextTrack = () => {
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * realTracks.length);
    } else {
      nextIndex = (currentTrackIndex + 1) % realTracks.length;
    }
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => togglePlay(), 100);
    }
  };

  const previousTrack = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      const prevIndex = currentTrackIndex === 0 ? realTracks.length - 1 : currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
      setCurrentTime(0);
      if (isPlaying) {
        setIsPlaying(false);
        setTimeout(() => togglePlay(), 100);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Audio Generation Status */}
        {isGeneratingAudio && (
          <div className="mb-2 text-center">
            <Badge className="bg-blue-600 text-white animate-pulse">
              <Music className="w-3 h-3 mr-1" />
              AI Generating Audio...
            </Badge>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="relative">
              <img 
                src={currentTrack.image} 
                alt={currentTrack.title}
                className="w-14 h-14 rounded-lg object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-medium truncate">{currentTrack.title}</h4>
              <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Badge variant="outline" className="text-xs border-gray-600">
                  {currentTrack.genre}
                </Badge>
                <span>•</span>
                <span>{currentTrack.releaseYear}</span>
                <span>•</span>
                <Badge className="bg-green-600 text-white text-xs">
                  AI Enhanced
                </Badge>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${isLiked ? 'text-red-400' : 'text-gray-400'} hover:text-red-400`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsShuffled(!isShuffled)}
                className={`text-gray-400 hover:text-white ${isShuffled ? 'text-green-400' : ''}`}
              >
                <Shuffle className="w-4 h-4" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={previousTrack} className="text-gray-400 hover:text-white">
                <SkipBack className="w-5 h-5" />
              </Button>
              
              <Button 
                onClick={togglePlay}
                disabled={isGeneratingAudio}
                className="bg-white text-black hover:bg-gray-200 rounded-full w-10 h-10 p-0 disabled:opacity-50"
              >
                {isGeneratingAudio ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
              
              <Button variant="ghost" size="sm" onClick={nextTrack} className="text-gray-400 hover:text-white">
                <SkipForward className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setRepeatMode((repeatMode + 1) % 3)}
                className={`text-gray-400 hover:text-white ${repeatMode > 0 ? 'text-green-400' : ''}`}
              >
                <Repeat className="w-4 h-4" />
                {repeatMode === 2 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></span>}
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2 w-full">
              <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleTimeChange}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume and Options */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Headphones className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700">
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <span className="mr-2">Quality:</span>
                  <Badge className="bg-green-600">High (AI Enhanced)</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <Music className="w-4 h-4 mr-2" />
                  Spatial Audio: On
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700">
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Track
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download (Premium)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleMute} className="text-gray-400 hover:text-white">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>
            
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}