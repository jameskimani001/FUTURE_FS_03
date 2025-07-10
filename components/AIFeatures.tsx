'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Waves, Palette, Headphones, Zap, Music, Mic, Radio, Target, Sparkles, Bot, TrendingUp, Play, Pause, Volume2, Settings } from 'lucide-react';
import { realTracks } from '@/lib/musicData';

const features = [
  {
    icon: Brain,
    title: "Neural Music Discovery",
    description: "Advanced deep learning algorithms analyze 50+ audio features to discover your perfect next song",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    stats: "99.2% accuracy",
    interactive: true,
    type: "discovery"
  },
  {
    icon: Waves,
    title: "Emotion-Based Curation",
    description: "Real-time mood detection through listening patterns creates perfectly matched playlists",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    stats: "12 emotions detected",
    interactive: true,
    type: "emotion"
  },
  {
    icon: Palette,
    title: "Sonic DNA Matching",
    description: "Analyze acoustic fingerprints, tempo, key, and harmonic structure for precise recommendations",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    stats: "50+ audio features",
    interactive: true,
    type: "dna"
  },
  {
    icon: Headphones,
    title: "3D Spatial Audio",
    description: "AI-powered spatial audio that adapts to your headphones and listening environment",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    stats: "360° immersion",
    interactive: true,
    type: "spatial"
  },
  {
    icon: Zap,
    title: "Predictive Listening",
    description: "Machine learning predicts your music preferences throughout the day and pre-loads content",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    stats: "94% prediction rate",
    interactive: true,
    type: "predictive"
  },
  {
    icon: Music,
    title: "AI Composition Studio",
    description: "Collaborative AI that helps create original music, remixes, and personalized soundtracks",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    stats: "1M+ compositions",
    interactive: true,
    type: "composition"
  },
  {
    icon: Mic,
    title: "Voice Music Control",
    description: "Natural language processing understands complex music requests and mood descriptions",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    stats: "15 languages",
    interactive: true,
    type: "voice"
  },
  {
    icon: Radio,
    title: "Smart Radio Evolution",
    description: "AI radio stations that evolve in real-time based on listener feedback and engagement",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    stats: "Live adaptation",
    interactive: true,
    type: "radio"
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Micro-genre classification and sub-mood detection for ultra-specific music discovery",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    stats: "500+ micro-genres",
    interactive: true,
    type: "targeting"
  },
  {
    icon: Sparkles,
    title: "Serendipity Engine",
    description: "AI creates unexpected but delightful music discoveries while respecting your core taste",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    stats: "Surprise factor: 23%",
    interactive: true,
    type: "serendipity"
  },
  {
    icon: Bot,
    title: "Music Therapy AI",
    description: "Therapeutic music selection based on biometric data and psychological research",
    color: "text-teal-400",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
    stats: "Clinical validation",
    interactive: true,
    type: "therapy"
  },
  {
    icon: TrendingUp,
    title: "Trend Prediction",
    description: "Identify emerging artists and viral tracks before they hit mainstream using social signals",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    stats: "3 months ahead",
    interactive: true,
    type: "trends"
  }
];

const emotions = ['Happy', 'Sad', 'Energetic', 'Calm', 'Angry', 'Romantic', 'Nostalgic', 'Focused', 'Excited', 'Melancholic', 'Uplifting', 'Dreamy'];
const genres = ['Electronic', 'Jazz-Fusion', 'Neo-Soul', 'Ambient-Pop', 'Indie-Folk', 'Synthwave', 'Lo-Fi Hip-Hop', 'Progressive Rock'];

export default function AIFeatures() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentEmotion, setCurrentEmotion] = useState('Happy');
  const [detectedGenre, setDetectedGenre] = useState('Electronic');
  const [spatialEnabled, setSpatialEnabled] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const [predictedTracks, setPredictedTracks] = useState<typeof realTracks>([]);

  useEffect(() => {
    if (activeFeature) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [activeFeature]);

  useEffect(() => {
    // Simulate emotion detection
    const emotionInterval = setInterval(() => {
      setCurrentEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
    }, 3000);

    // Simulate genre detection
    const genreInterval = setInterval(() => {
      setDetectedGenre(genres[Math.floor(Math.random() * genres.length)]);
    }, 4000);

    return () => {
      clearInterval(emotionInterval);
      clearInterval(genreInterval);
    };
  }, []);

  const handleFeatureClick = (featureType: string) => {
    setActiveFeature(featureType);
    setAnalysisProgress(0);

    if (featureType === 'predictive') {
      // Simulate predictive recommendations
      const shuffled = [...realTracks].sort(() => 0.5 - Math.random());
      setPredictedTracks(shuffled.slice(0, 3));
    }
  };

  const toggleSpatialAudio = () => {
    setSpatialEnabled(!spatialEnabled);
  };

  const toggleVoiceControl = () => {
    setVoiceListening(!voiceListening);
    if (!voiceListening) {
      setTimeout(() => setVoiceListening(false), 3000);
    }
  };

  const renderFeatureDemo = () => {
    if (!activeFeature) return null;

    switch (activeFeature) {
      case 'discovery':
        return (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Neural Analysis in Progress</h4>
            <Progress value={analysisProgress} className="mb-3" />
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">Tempo Analysis: <span className="text-purple-400">128 BPM</span></div>
              <div className="text-gray-400">Key Detection: <span className="text-purple-400">C Major</span></div>
              <div className="text-gray-400">Energy Level: <span className="text-purple-400">High</span></div>
              <div className="text-gray-400">Danceability: <span className="text-purple-400">0.87</span></div>
            </div>
          </div>
        );

      case 'emotion':
        return (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Real-time Emotion Detection</h4>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 font-medium">Current Mood: {currentEmotion}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {emotions.slice(0, 6).map((emotion) => (
                <Badge key={emotion} variant={emotion === currentEmotion ? "default" : "secondary"} className="text-xs">
                  {emotion}
                </Badge>
              ))}
            </div>
          </div>
        );

      case 'spatial':
        return (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-semibold mb-3">3D Spatial Audio Control</h4>
            <Button 
              onClick={toggleSpatialAudio}
              className={`w-full ${spatialEnabled ? 'bg-pink-600' : 'bg-gray-600'}`}
            >
              <Headphones className="w-4 h-4 mr-2" />
              {spatialEnabled ? '360° Audio Enabled' : 'Enable Spatial Audio'}
            </Button>
            {spatialEnabled && (
              <div className="mt-3 text-sm text-pink-400">
                ✓ Headphone profile detected: Sony WH-1000XM4
                <br />
                ✓ Room acoustics optimized
                <br />
                ✓ 3D positioning active
              </div>
            )}
          </div>
        );

      case 'voice':
        return (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Voice Music Control</h4>
            <Button 
              onClick={toggleVoiceControl}
              className={`w-full ${voiceListening ? 'bg-indigo-600 animate-pulse' : 'bg-gray-600'}`}
            >
              <Mic className="w-4 h-4 mr-2" />
              {voiceListening ? 'Listening...' : 'Start Voice Command'}
            </Button>
            {voiceListening && (
              <div className="mt-3 text-sm text-indigo-400">
                Try saying: "Play something upbeat for working out"
              </div>
            )}
          </div>
        );

      case 'predictive':
        return (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Predicted for You</h4>
            <div className="space-y-2">
              {predictedTracks.map((track, index) => (
                <div key={track.id} className="flex items-center space-x-3 p-2 bg-gray-700/50 rounded">
                  <img src={track.image} alt={track.title} className="w-8 h-8 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{track.title}</p>
                    <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                  </div>
                  <Badge className="text-xs bg-yellow-500/20 text-yellow-400">
                    {95 - index * 3}% match
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-semibold mb-3">AI Processing</h4>
            <Progress value={analysisProgress} className="mb-2" />
            <p className="text-gray-400 text-sm">Analyzing audio patterns and user preferences...</p>
          </div>
        );
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 text-sm mb-6">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300">Powered by Advanced AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Revolutionary AI Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the most advanced music AI ever created, with features that understand music better than ever before
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className={`group bg-gray-800/50 backdrop-blur-sm border ${feature.borderColor} hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer ${activeFeature === feature.type ? 'ring-2 ring-purple-500' : ''}`}>
              <CardContent className="p-6" onClick={() => handleFeatureClick(feature.type)}>
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-3 text-sm">
                  {feature.description}
                </p>
                <div className={`text-xs ${feature.color} font-medium mb-3`}>
                  {feature.stats}
                </div>
                {feature.interactive && (
                  <Button size="sm" variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    Try Feature
                  </Button>
                )}
                {activeFeature === feature.type && renderFeatureDemo()}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live AI Dashboard */}
        <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Live AI Processing Dashboard
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-6 py-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-400">Current Emotion</div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold text-blue-400">{currentEmotion}</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-6 py-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-400">Detected Genre</div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold text-green-400">{detectedGenre}</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-6 py-4 border border-gray-700">
              <div className="text-sm text-gray-400">AI Models Active</div>
              <div className="text-2xl font-bold text-purple-400">47</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-6 py-4 border border-gray-700">
              <div className="text-sm text-gray-400">Processing Speed</div>
              <div className="text-2xl font-bold text-yellow-400">0.03s</div>
            </div>
          </div>
          
          {/* Real-time Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-400">Songs Analyzed Today</div>
              <div className="text-xl font-bold text-white">12.8M</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Accuracy Rate</div>
              <div className="text-xl font-bold text-green-400">99.7%</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Active Users</div>
              <div className="text-xl font-bold text-blue-400">1.2M</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Predictions Made</div>
              <div className="text-xl font-bold text-purple-400">847K</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}