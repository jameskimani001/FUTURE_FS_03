'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
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
  Share2
} from 'lucide-react';
import { realTracks } from '@/lib/musicData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = realTracks[currentTrackIndex];

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Since we don't have real audio files, we'll simulate playback
        audioRef.current.play().catch(() => {
          // Simulate playing without actual audio
          setIsPlaying(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

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
  };

  const previousTrack = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      const prevIndex = currentTrackIndex === 0 ? realTracks.length - 1 : currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
      setCurrentTime(0);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentTrack.title,
        text: `Check out "${currentTrack.title}" by ${currentTrack.artist} on SoundSphere`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${currentTrack.title} by ${currentTrack.artist} - SoundSphere`);
    }
  };

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const trackDuration = 180; // 3 minutes in seconds
          setDuration(trackDuration);
          if (prev >= trackDuration) {
            if (repeatMode === 2) {
              return 0; // Repeat one
            } else if (repeatMode === 1) {
              nextTrack();
              return 0;
            } else {
              setIsPlaying(false);
              return trackDuration;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, repeatMode, currentTrackIndex]);

  useEffect(() => {
    // Reset time when track changes
    setCurrentTime(0);
    setDuration(180); // 3 minutes
  }, [currentTrackIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
      <audio ref={audioRef} src={currentTrack.audioUrl} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <img 
              src={currentTrack.image} 
              alt={currentTrack.title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-medium truncate">{currentTrack.title}</h4>
              <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${isLiked ? 'text-red-400' : 'text-gray-400'} hover:text-red-400`}
              onClick={toggleLike}
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
                className="bg-white text-black hover:bg-gray-200 rounded-full w-10 h-10 p-0"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
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
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700">
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download
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