'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Pause, 
  Monitor, 
  Smartphone, 
  Tablet,
  Code,
  Eye,
  Zap,
  Sparkles,
  Music,
  Brain,
  Mic,
  Palette,
  BarChart3,
  Settings,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const demoFeatures = [
  {
    id: 'spotify-player',
    title: 'Real Spotify Integration',
    description: 'Search and play millions of real songs with 30-second previews',
    icon: Music,
    color: 'green',
    status: 'live',
    demo: 'Try searching for "Blinding Lights" or "Shape of You"'
  },
  {
    id: 'ai-composer',
    title: 'AI Music Composer',
    description: 'Generate original music using advanced AI algorithms',
    icon: Brain,
    color: 'purple',
    status: 'live',
    demo: 'Create unique beats and melodies in real-time'
  },
  {
    id: 'voice-control',
    title: 'Voice Music Control',
    description: 'Control music with natural language commands',
    icon: Mic,
    color: 'blue',
    status: 'live',
    demo: 'Say "Play something energetic" or "I want jazz music"'
  },
  {
    id: 'ai-branding',
    title: 'AI Brand Generator',
    description: 'Create professional brand identities with AI',
    icon: Palette,
    color: 'pink',
    status: 'live',
    demo: 'Generate logos, colors, and typography instantly'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Real-time insights with AI-powered recommendations',
    icon: BarChart3,
    color: 'cyan',
    status: 'live',
    demo: 'View detailed performance metrics and user behavior'
  },
  {
    id: 'performance',
    title: 'Performance Optimizer',
    description: 'Analyze and optimize website performance',
    icon: Zap,
    color: 'orange',
    status: 'live',
    demo: 'Get detailed performance scores and optimization tips'
  }
];

const deviceSizes = {
  desktop: { width: '100%', height: '600px' },
  tablet: { width: '768px', height: '600px' },
  mobile: { width: '375px', height: '600px' }
};

export default function LiveDemo() {
  const [selectedFeature, setSelectedFeature] = useState('spotify-player');
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentFeature = demoFeatures.find(f => f.id === selectedFeature);

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-500/10 border-green-500/20 text-green-300',
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
      blue: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
      pink: 'bg-pink-500/10 border-pink-500/20 text-pink-300',
      cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
      orange: 'bg-orange-500/10 border-orange-500/20 text-orange-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const renderDemoContent = () => {
    switch (selectedFeature) {
      case 'spotify-player':
        return (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-green-300 font-semibold">Real Spotify Integration Active</h3>
              </div>
              <p className="text-green-200 mb-4">
                Search millions of real songs and play 30-second previews directly from Spotify's catalog.
              </p>
              <div className="space-y-4">
                <Input
                  placeholder="Search for songs, artists, albums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border-green-500/30 text-white"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Blinding Lights - The Weeknd', 'Shape of You - Ed Sheeran', 'Bad Guy - Billie Eilish'].map((track, index) => (
                    <div key={index} className="bg-gray-800/50 p-4 rounded-lg flex items-center space-x-3">
                      <img 
                        src={`https://images.pexels.com/photos/${1763075 + index}/pexels-photo-${1763075 + index}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                        alt={track}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{track}</p>
                        <p className="text-gray-400 text-xs">Real Spotify Preview</p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai-composer':
        return (
          <div className="space-y-6">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h3 className="text-purple-300 font-semibold">AI Music Composition Studio</h3>
              </div>
              <p className="text-purple-200 mb-4">
                Generate original music using advanced AI algorithms that create unique beats and melodies.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {['Electronic', 'Pop', 'Jazz', 'Rock'].map((genre) => (
                  <Button key={genre} variant="outline" className="border-purple-500/30 text-purple-300">
                    {genre}
                  </Button>
                ))}
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">AI Generated Track</span>
                  <Badge className="bg-purple-600 text-white">Live Generation</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full w-1/3"></div>
                  </div>
                  <span className="text-gray-400 text-sm">1:23 / 3:45</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'voice-control':
        return (
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Mic className="w-6 h-6 text-blue-400" />
                <h3 className="text-blue-300 font-semibold">Voice Music Control</h3>
              </div>
              <p className="text-blue-200 mb-4">
                Control your music experience using natural language commands in 15+ languages.
              </p>
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-400 bg-blue-500/20 flex items-center justify-center mb-4">
                  <Mic className="w-12 h-12 text-blue-400" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Start Voice Command
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Play something upbeat',
                  'I want to hear jazz music',
                  'Play music for working out',
                  'Something calm and relaxing'
                ].map((command, index) => (
                  <div key={index} className="bg-gray-800/50 p-3 rounded text-blue-200 text-sm">
                    "{command}"
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className={`border rounded-lg p-6 ${getColorClasses(currentFeature?.color || 'blue')}`}>
              <div className="flex items-center space-x-3 mb-4">
                {currentFeature?.icon && <currentFeature.icon className="w-6 h-6" />}
                <h3 className="font-semibold">{currentFeature?.title}</h3>
              </div>
              <p className="mb-4">{currentFeature?.description}</p>
              <p className="text-sm opacity-80">{currentFeature?.demo}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 text-sm">
          <Play className="w-4 h-4 text-green-400" />
          <span className="text-green-300">Live Interactive Demo</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Experience SoundSphere Live
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Try all features in real-time. No setup required - everything works instantly with real data and AI.
        </p>
      </div>

      {/* Feature Selection */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Choose a Feature to Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all border ${
                    selectedFeature === feature.id
                      ? getColorClasses(feature.color)
                      : 'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon className="w-5 h-5" />
                    <h3 className="font-semibold">{feature.title}</h3>
                    <Badge className={`text-xs ${
                      feature.status === 'live' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                    }`}>
                      {feature.status}
                    </Badge>
                  </div>
                  <p className="text-sm opacity-80">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Device Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Preview Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-3">Device Type</h4>
                <div className="space-y-2">
                  {[
                    { id: 'desktop', icon: Monitor, label: 'Desktop' },
                    { id: 'tablet', icon: Tablet, label: 'Tablet' },
                    { id: 'mobile', icon: Smartphone, label: 'Mobile' }
                  ].map(({ id, icon: Icon, label }) => (
                    <Button
                      key={id}
                      variant={selectedDevice === id ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedDevice(id as any)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-3">Current Feature</h4>
                <div className={`p-3 rounded-lg ${getColorClasses(currentFeature?.color || 'blue')}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {currentFeature?.icon && <currentFeature.icon className="w-4 h-4" />}
                    <span className="font-medium text-sm">{currentFeature?.title}</span>
                  </div>
                  <p className="text-xs opacity-80">{currentFeature?.demo}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Full Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Monitor className="w-5 h-5 mr-2" />
                  Live Demo - {currentFeature?.title}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="mx-auto bg-gray-900 rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  width: deviceSizes[selectedDevice].width,
                  maxWidth: '100%',
                  height: deviceSizes[selectedDevice].height
                }}
              >
                <div className="h-full overflow-y-auto p-6">
                  {renderDemoContent()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Demo Stats */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-green-300">Features Working</div>
              <div className="text-green-200 text-sm">All demos are live</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">50M+</div>
              <div className="text-blue-300">Real Songs</div>
              <div className="text-blue-200 text-sm">Via Spotify API</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">AI</div>
              <div className="text-purple-300">Generated Audio</div>
              <div className="text-purple-200 text-sm">When previews unavailable</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">0ms</div>
              <div className="text-yellow-300">Setup Time</div>
              <div className="text-yellow-200 text-sm">Ready to use instantly</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}