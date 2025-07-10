'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Play, 
  Pause, 
  SkipForward,
  Music,
  Heart,
  Shuffle
} from 'lucide-react';
import { realTracks } from '@/lib/musicData';

const voiceCommands = [
  "Play something upbeat",
  "I want to hear jazz music",
  "Play music for working out",
  "Something calm and relaxing",
  "Play my liked songs",
  "Shuffle my playlist",
  "Play the latest hits",
  "I'm feeling nostalgic",
  "Play music for studying",
  "Something romantic"
];

const responses = [
  "Playing energetic tracks for you",
  "Here's some smooth jazz",
  "Perfect workout playlist coming up",
  "Playing calming ambient music",
  "Playing your favorite tracks",
  "Shuffling your music library",
  "Here are today's top hits",
  "Playing nostalgic classics",
  "Focus music for studying",
  "Setting the romantic mood"
];

export default function VoiceControl() {
  const [isListening, setIsListening] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [lastResponse, setLastResponse] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [supportedLanguages] = useState([
    'English', 'Spanish', 'French', 'German', 'Italian', 
    'Portuguese', 'Japanese', 'Korean', 'Chinese', 'Russian',
    'Arabic', 'Hindi', 'Dutch', 'Swedish', 'Norwegian'
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [recognizedTrack, setRecognizedTrack] = useState<any>(null);

  const startListening = () => {
    setIsListening(true);
    setCurrentCommand('');
    setConfidence(0);

    // Simulate voice recognition
    setTimeout(() => {
      const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
      const randomResponse = responses[voiceCommands.indexOf(randomCommand)];
      const randomTrack = realTracks[Math.floor(Math.random() * realTracks.length)];
      
      setCurrentCommand(randomCommand);
      setLastResponse(randomResponse);
      setConfidence(Math.floor(Math.random() * 20) + 80); // 80-100% confidence
      setRecognizedTrack(randomTrack);
      setIsListening(false);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Mic className="w-6 h-6 mr-2 text-indigo-400" />
            Voice Music Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              Language ({supportedLanguages.length} supported)
            </label>
            <div className="flex flex-wrap gap-2">
              {supportedLanguages.slice(0, 8).map((lang) => (
                <Badge
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "secondary"}
                  className={`cursor-pointer ${
                    selectedLanguage === lang 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Voice Control Interface */}
          <div className="text-center space-y-4">
            <div className={`w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
              isListening 
                ? 'border-indigo-400 bg-indigo-500/20 animate-pulse' 
                : 'border-gray-600 bg-gray-700/50'
            }`}>
              {isListening ? (
                <div className="space-y-1">
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-indigo-400 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                  <Mic className="w-8 h-8 text-indigo-400" />
                </div>
              ) : (
                <MicOff className="w-8 h-8 text-gray-400" />
              )}
            </div>

            <div className="space-y-2">
              <Button
                onClick={isListening ? stopListening : startListening}
                className={`${
                  isListening 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } px-8 py-3`}
                size="lg"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start Voice Command
                  </>
                )}
              </Button>
              
              {isListening && (
                <p className="text-indigo-400 text-sm animate-pulse">
                  Listening in {selectedLanguage}... Speak now
                </p>
              )}
            </div>
          </div>

          {/* Command Recognition */}
          {currentCommand && (
            <div className="space-y-4">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Recognized Command:</span>
                  <Badge className="bg-green-600 text-white">
                    {confidence}% confidence
                  </Badge>
                </div>
                <p className="text-white font-medium">"{currentCommand}"</p>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-lg">
                <div className="text-gray-400 text-sm mb-1">AI Response:</div>
                <p className="text-indigo-300 font-medium">{lastResponse}</p>
              </div>

              {/* Recognized Track */}
              {recognizedTrack && (
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-3">Now Playing:</div>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={recognizedTrack.image} 
                      alt={recognizedTrack.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{recognizedTrack.title}</p>
                      <p className="text-gray-400 text-sm truncate">{recognizedTrack.artist}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Example Commands */}
          <div>
            <h4 className="text-white font-medium mb-3">Try these voice commands:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {voiceCommands.slice(0, 6).map((command, index) => (
                <div key={index} className="bg-gray-700/50 p-2 rounded text-sm text-gray-300">
                  "{command}"
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-700/30 p-3 rounded">
              <div className="text-indigo-400 font-medium">Natural Language</div>
              <div className="text-gray-400">Understands context and intent</div>
            </div>
            <div className="bg-gray-700/30 p-3 rounded">
              <div className="text-indigo-400 font-medium">Multi-Language</div>
              <div className="text-gray-400">15 languages supported</div>
            </div>
            <div className="bg-gray-700/30 p-3 rounded">
              <div className="text-indigo-400 font-medium">Smart Actions</div>
              <div className="text-gray-400">Controls playback and discovery</div>
            </div>
            <div className="bg-gray-700/30 p-3 rounded">
              <div className="text-indigo-400 font-medium">Learning AI</div>
              <div className="text-gray-400">Improves with usage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}