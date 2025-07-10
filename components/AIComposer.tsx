'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Music, 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Wand2, 
  Volume2,
  Mic,
  Piano,
  Guitar,
  Drum,
  VolumeX
} from 'lucide-react';

const genres = ['Electronic', 'Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop', 'Ambient', 'Folk'];
const moods = ['Happy', 'Sad', 'Energetic', 'Calm', 'Dark', 'Uplifting', 'Mysterious', 'Romantic'];
const instruments = [
  { name: 'Piano', icon: Piano, active: true },
  { name: 'Guitar', icon: Guitar, active: false },
  { name: 'Drums', icon: Drum, active: true },
  { name: 'Synth', icon: Music, active: false }
];

// Audio context for generating tones
const createAudioContext = () => {
  if (typeof window !== 'undefined') {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return null;
};

export default function AIComposer() {
  const [isComposing, setIsComposing] = useState(false);
  const [compositionProgress, setCompositionProgress] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('Electronic');
  const [selectedMood, setSelectedMood] = useState('Energetic');
  const [tempo, setTempo] = useState([120]);
  const [complexity, setComplexity] = useState([50]);
  const [duration, setDuration] = useState([180]);
  const [songTitle, setSongTitle] = useState('');
  const [generatedComposition, setGeneratedComposition] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioContextRef.current = createAudioContext();
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

  const generateMelody = () => {
    if (!audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Generate melody based on selected parameters
    const baseFreq = selectedGenre === 'Electronic' ? 440 : 
                    selectedGenre === 'Jazz' ? 523 :
                    selectedGenre === 'Classical' ? 261 : 349;
    
    const waveType = selectedGenre === 'Electronic' ? 'sawtooth' :
                     selectedGenre === 'Pop' ? 'sine' :
                     selectedGenre === 'Rock' ? 'square' : 'triangle';

    oscillator.type = waveType as OscillatorType;
    oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);

    // Create a simple melody pattern
    const melodyPattern = [1, 1.25, 1.5, 1.33, 1.125, 1.75, 1.5, 1];
    let noteIndex = 0;

    const playNote = () => {
      if (oscillator && audioContext) {
        const freq = baseFreq * melodyPattern[noteIndex % melodyPattern.length];
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        noteIndex++;
      }
    };

    // Set volume
    const volumeLevel = isMuted ? 0 : volume[0] / 100 * 0.3; // Max 0.3 to prevent ear damage
    gainNode.gain.setValueAtTime(volumeLevel, audioContext.currentTime);

    oscillator.start();
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;

    // Play melody pattern
    const noteInterval = setInterval(playNote, 60000 / tempo[0]); // Beat based on tempo
    
    return { oscillator, gainNode, noteInterval };
  };

  const startComposition = () => {
    setIsComposing(true);
    setCompositionProgress(0);
    
    const interval = setInterval(() => {
      setCompositionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComposing(false);
          const newComposition = {
            title: songTitle || `AI Generated ${selectedGenre} Track`,
            genre: selectedGenre,
            mood: selectedMood,
            tempo: tempo[0],
            duration: `${Math.floor(duration[0] / 60)}:${(duration[0] % 60).toString().padStart(2, '0')}`,
            complexity: complexity[0],
            instruments: instruments.filter(i => i.active).map(i => i.name),
            waveform: Array.from({ length: 50 }, () => Math.random() * 100),
            audioGenerated: true
          };
          setGeneratedComposition(newComposition);
          setTotalDuration(duration[0]);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 200);
  };

  const togglePlayback = () => {
    if (!generatedComposition) return;

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
      // Start playback
      const melody = generateMelody();
      if (melody) {
        setIsPlaying(true);
        setCurrentTime(0);
        
        // Update progress
        intervalRef.current = setInterval(() => {
          setCurrentTime(prev => {
            if (prev >= totalDuration) {
              togglePlayback(); // Stop when finished
              return totalDuration;
            }
            return prev + 1;
          });
        }, 1000);

        // Stop after duration
        setTimeout(() => {
          if (isPlaying) {
            togglePlayback();
          }
        }, totalDuration * 1000);
      }
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (gainNodeRef.current) {
      const volumeLevel = isMuted ? 0 : newVolume[0] / 100 * 0.3;
      gainNodeRef.current.gain.setValueAtTime(volumeLevel, audioContextRef.current?.currentTime || 0);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current) {
      const volumeLevel = !isMuted ? 0 : volume[0] / 100 * 0.3;
      gainNodeRef.current.gain.setValueAtTime(volumeLevel, audioContextRef.current?.currentTime || 0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadComposition = () => {
    // Simulate download
    const blob = new Blob(['AI Generated Music Data'], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedComposition?.title || 'ai-composition'}.wav`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareComposition = () => {
    if (navigator.share && generatedComposition) {
      navigator.share({
        title: generatedComposition.title,
        text: `Check out this AI-generated composition: ${generatedComposition.title}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Check out this AI-generated composition: ${generatedComposition?.title}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Wand2 className="w-6 h-6 mr-2 text-cyan-400" />
            AI Composition Studio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Song Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-gray-300">Song Title (Optional)</Label>
              <Input
                id="title"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="Enter song title..."
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Duration (seconds)</Label>
              <div className="mt-2">
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  max={300}
                  min={30}
                  step={15}
                  className="w-full"
                />
                <div className="text-sm text-gray-400 mt-1">
                  {Math.floor(duration[0] / 60)}:{(duration[0] % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          {/* Genre and Mood Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-300 mb-3 block">Genre</Label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "secondary"}
                    className={`cursor-pointer ${
                      selectedGenre === genre 
                        ? 'bg-cyan-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-gray-300 mb-3 block">Mood</Label>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <Badge
                    key={mood}
                    variant={selectedMood === mood ? "default" : "secondary"}
                    className={`cursor-pointer ${
                      selectedMood === mood 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedMood(mood)}
                  >
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Musical Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-300">Tempo (BPM)</Label>
              <div className="mt-2">
                <Slider
                  value={tempo}
                  onValueChange={setTempo}
                  max={200}
                  min={60}
                  step={5}
                  className="w-full"
                />
                <div className="text-sm text-gray-400 mt-1">{tempo[0]} BPM</div>
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Complexity</Label>
              <div className="mt-2">
                <Slider
                  value={complexity}
                  onValueChange={setComplexity}
                  max={100}
                  min={10}
                  step={10}
                  className="w-full"
                />
                <div className="text-sm text-gray-400 mt-1">
                  {complexity[0] < 30 ? 'Simple' : complexity[0] < 70 ? 'Moderate' : 'Complex'}
                </div>
              </div>
            </div>
          </div>

          {/* Instrument Selection */}
          <div>
            <Label className="text-gray-300 mb-3 block">Instruments</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {instruments.map((instrument, index) => (
                <Button
                  key={instrument.name}
                  variant={instrument.active ? "default" : "outline"}
                  className={`${
                    instrument.active 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    instruments[index].active = !instruments[index].active;
                  }}
                >
                  <instrument.icon className="w-4 h-4 mr-2" />
                  {instrument.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Composition Progress */}
          {isComposing && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">AI Composing...</span>
                <span className="text-cyan-400">{Math.round(compositionProgress)}%</span>
              </div>
              <Progress value={compositionProgress} className="w-full" />
              <div className="text-sm text-gray-400">
                {compositionProgress < 25 && "Analyzing musical patterns..."}
                {compositionProgress >= 25 && compositionProgress < 50 && "Generating melody..."}
                {compositionProgress >= 50 && compositionProgress < 75 && "Adding harmonies..."}
                {compositionProgress >= 75 && "Finalizing composition..."}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={startComposition}
            disabled={isComposing}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            size="lg"
          >
            <Wand2 className="w-5 h-5 mr-2" />
            {isComposing ? 'Composing...' : 'Generate AI Composition'}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Composition */}
      {generatedComposition && (
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>{generatedComposition.title}</span>
              <Badge className="bg-green-600 text-white">Generated</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Composition Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Genre:</span>
                <div className="text-white font-medium">{generatedComposition.genre}</div>
              </div>
              <div>
                <span className="text-gray-400">Mood:</span>
                <div className="text-white font-medium">{generatedComposition.mood}</div>
              </div>
              <div>
                <span className="text-gray-400">Tempo:</span>
                <div className="text-white font-medium">{generatedComposition.tempo} BPM</div>
              </div>
              <div>
                <span className="text-gray-400">Duration:</span>
                <div className="text-white font-medium">{generatedComposition.duration}</div>
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <div className="flex items-end justify-center space-x-1 h-20">
                {generatedComposition.waveform.map((height: number, index: number) => (
                  <div
                    key={index}
                    className={`w-2 rounded-t transition-all duration-300 ${
                      isPlaying && index < (currentTime / totalDuration) * 50
                        ? 'bg-gradient-to-t from-cyan-600 to-blue-400'
                        : 'bg-gradient-to-t from-gray-600 to-gray-500'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-1">
                  <div 
                    className="bg-cyan-400 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                  />
                </div>
                <span>{formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* Instruments Used */}
            <div>
              <span className="text-gray-400 text-sm">Instruments:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {generatedComposition.instruments.map((instrument: string) => (
                  <Badge key={instrument} variant="outline" className="border-gray-600 text-gray-300">
                    {instrument}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={togglePlayback}
                  className="bg-white text-black hover:bg-gray-200"
                  disabled={!generatedComposition.audioGenerated}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <Slider
                    value={volume}
                    onValueChange={handleVolumeChange}
                    max={100}
                    min={0}
                    step={1}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300"
                  onClick={downloadComposition}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300"
                  onClick={shareComposition}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Audio Status */}
            <div className="text-center">
              <Badge className="bg-blue-600 text-white">
                🎵 Real-time AI Audio Generation Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}