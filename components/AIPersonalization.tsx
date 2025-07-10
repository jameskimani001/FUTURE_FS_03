'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Brain, 
  User, 
  Settings, 
  Sparkles,
  Heart,
  Music,
  Headphones,
  Clock,
  Target,
  Zap,
  Eye,
  Palette,
  Volume2,
  Mic,
  Globe,
  Shield,
  Bell,
  Moon,
  Sun
} from 'lucide-react';

interface PersonalizationSettings {
  musicPreferences: {
    genres: string[];
    energy: number;
    danceability: number;
    valence: number;
    acousticness: number;
  };
  aiSettings: {
    recommendationStrength: number;
    discoveryMode: 'conservative' | 'balanced' | 'adventurous';
    voiceEnabled: boolean;
    smartNotifications: boolean;
    autoPlaylist: boolean;
  };
  interface: {
    theme: 'dark' | 'light' | 'auto';
    language: string;
    accessibility: {
      highContrast: boolean;
      largeText: boolean;
      reducedMotion: boolean;
    };
  };
  privacy: {
    dataCollection: boolean;
    personalizedAds: boolean;
    shareListening: boolean;
    publicProfile: boolean;
  };
}

export default function AIPersonalization() {
  const [settings, setSettings] = useState<PersonalizationSettings>({
    musicPreferences: {
      genres: ['Electronic', 'Pop', 'Indie'],
      energy: 70,
      danceability: 60,
      valence: 75,
      acousticness: 30
    },
    aiSettings: {
      recommendationStrength: 80,
      discoveryMode: 'balanced',
      voiceEnabled: true,
      smartNotifications: true,
      autoPlaylist: false
    },
    interface: {
      theme: 'dark',
      language: 'English',
      accessibility: {
        highContrast: false,
        largeText: false,
        reducedMotion: false
      }
    },
    privacy: {
      dataCollection: true,
      personalizedAds: false,
      shareListening: true,
      publicProfile: false
    }
  });

  const [isLearning, setIsLearning] = useState(false);
  const [learningProgress, setLearningProgress] = useState(0);

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 
    'Country', 'R&B', 'Indie', 'Folk', 'Reggae', 'Blues'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 
    'Portuguese', 'Japanese', 'Korean', 'Chinese', 'Russian'
  ];

  const startAILearning = async () => {
    setIsLearning(true);
    setLearningProgress(0);

    const interval = setInterval(() => {
      setLearningProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLearning(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 300);
  };

  const updateMusicPreference = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      musicPreferences: {
        ...prev.musicPreferences,
        [key]: value
      }
    }));
  };

  const updateAISetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      aiSettings: {
        ...prev.aiSettings,
        [key]: value
      }
    }));
  };

  const updateInterfaceSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      interface: {
        ...prev.interface,
        [key]: value
      }
    }));
  };

  const updateAccessibilitySetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      interface: {
        ...prev.interface,
        accessibility: {
          ...prev.interface.accessibility,
          [key]: value
        }
      }
    }));
  };

  const updatePrivacySetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const toggleGenre = (genre: string) => {
    const currentGenres = settings.musicPreferences.genres;
    if (currentGenres.includes(genre)) {
      updateMusicPreference('genres', currentGenres.filter(g => g !== genre));
    } else {
      updateMusicPreference('genres', [...currentGenres, genre]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-4 py-2 text-sm">
          <Brain className="w-4 h-4 text-pink-400" />
          <span className="text-pink-300">AI Personalization Engine</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Personalized AI Experience
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Customize your AI-powered experience with advanced personalization settings
        </p>
      </div>

      {/* AI Learning Status */}
      {isLearning && (
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2">AI Learning Your Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Analyzing music patterns...</span>
                    <span className="text-purple-400">{Math.round(learningProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${learningProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Music Preferences */}
        <div className="space-y-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Music className="w-5 h-5 mr-2" />
                Music Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Genre Selection */}
              <div>
                <Label className="text-gray-300 mb-3 block">Favorite Genres</Label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant={settings.musicPreferences.genres.includes(genre) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all ${
                        settings.musicPreferences.genres.includes(genre)
                          ? 'bg-pink-600 text-white hover:bg-pink-700'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => toggleGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Audio Features */}
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Energy Level</Label>
                  <Slider
                    value={[settings.musicPreferences.energy]}
                    onValueChange={(value) => updateMusicPreference('energy', value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Calm</span>
                    <span>{settings.musicPreferences.energy}%</span>
                    <span>Energetic</span>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Danceability</Label>
                  <Slider
                    value={[settings.musicPreferences.danceability]}
                    onValueChange={(value) => updateMusicPreference('danceability', value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Chill</span>
                    <span>{settings.musicPreferences.danceability}%</span>
                    <span>Danceable</span>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Mood (Valence)</Label>
                  <Slider
                    value={[settings.musicPreferences.valence]}
                    onValueChange={(value) => updateMusicPreference('valence', value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Sad</span>
                    <span>{settings.musicPreferences.valence}%</span>
                    <span>Happy</span>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Acousticness</Label>
                  <Slider
                    value={[settings.musicPreferences.acousticness]}
                    onValueChange={(value) => updateMusicPreference('acousticness', value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Electronic</span>
                    <span>{settings.musicPreferences.acousticness}%</span>
                    <span>Acoustic</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                AI Behavior
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-300 mb-2 block">Recommendation Strength</Label>
                <Slider
                  value={[settings.aiSettings.recommendationStrength]}
                  onValueChange={(value) => updateAISetting('recommendationStrength', value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Subtle</span>
                  <span>{settings.aiSettings.recommendationStrength}%</span>
                  <span>Aggressive</span>
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-3 block">Discovery Mode</Label>
                <div className="flex space-x-2">
                  {['conservative', 'balanced', 'adventurous'].map((mode) => (
                    <Button
                      key={mode}
                      variant={settings.aiSettings.discoveryMode === mode ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateAISetting('discoveryMode', mode)}
                      className="capitalize"
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mic className="w-4 h-4 text-gray-400" />
                    <Label className="text-gray-300">Voice Control</Label>
                  </div>
                  <Switch
                    checked={settings.aiSettings.voiceEnabled}
                    onCheckedChange={(checked) => updateAISetting('voiceEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-gray-400" />
                    <Label className="text-gray-300">Smart Notifications</Label>
                  </div>
                  <Switch
                    checked={settings.aiSettings.smartNotifications}
                    onCheckedChange={(checked) => updateAISetting('smartNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    <Label className="text-gray-300">Auto-Generate Playlists</Label>
                  </div>
                  <Switch
                    checked={settings.aiSettings.autoPlaylist}
                    onCheckedChange={(checked) => updateAISetting('autoPlaylist', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interface & Privacy */}
        <div className="space-y-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Interface Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-300 mb-3 block">Theme</Label>
                <div className="flex space-x-2">
                  <Button
                    variant={settings.interface.theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateInterfaceSetting('theme', 'dark')}
                    className="flex items-center space-x-1"
                  >
                    <Moon className="w-3 h-3" />
                    <span>Dark</span>
                  </Button>
                  <Button
                    variant={settings.interface.theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateInterfaceSetting('theme', 'light')}
                    className="flex items-center space-x-1"
                  >
                    <Sun className="w-3 h-3" />
                    <span>Light</span>
                  </Button>
                  <Button
                    variant={settings.interface.theme === 'auto' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateInterfaceSetting('theme', 'auto')}
                    className="flex items-center space-x-1"
                  >
                    <Settings className="w-3 h-3" />
                    <span>Auto</span>
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-3 block">Language</Label>
                <select
                  value={settings.interface.language}
                  onChange={(e) => updateInterfaceSetting('language', e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-gray-300 mb-3 block">Accessibility</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300 text-sm">High Contrast</Label>
                    <Switch
                      checked={settings.interface.accessibility.highContrast}
                      onCheckedChange={(checked) => updateAccessibilitySetting('highContrast', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300 text-sm">Large Text</Label>
                    <Switch
                      checked={settings.interface.accessibility.largeText}
                      onCheckedChange={(checked) => updateAccessibilitySetting('largeText', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300 text-sm">Reduced Motion</Label>
                    <Switch
                      checked={settings.interface.accessibility.reducedMotion}
                      onCheckedChange={(checked) => updateAccessibilitySetting('reducedMotion', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Data Collection</Label>
                  <p className="text-gray-400 text-xs">Allow AI to learn from your usage</p>
                </div>
                <Switch
                  checked={settings.privacy.dataCollection}
                  onCheckedChange={(checked) => updatePrivacySetting('dataCollection', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Personalized Ads</Label>
                  <p className="text-gray-400 text-xs">Show ads based on your preferences</p>
                </div>
                <Switch
                  checked={settings.privacy.personalizedAds}
                  onCheckedChange={(checked) => updatePrivacySetting('personalizedAds', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Share Listening Data</Label>
                  <p className="text-gray-400 text-xs">Help improve recommendations</p>
                </div>
                <Switch
                  checked={settings.privacy.shareListening}
                  onCheckedChange={(checked) => updatePrivacySetting('shareListening', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Public Profile</Label>
                  <p className="text-gray-400 text-xs">Make your profile visible to others</p>
                </div>
                <Switch
                  checked={settings.privacy.publicProfile}
                  onCheckedChange={(checked) => updatePrivacySetting('publicProfile', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Learning Button */}
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">AI Learning Session</h3>
              <p className="text-gray-300 text-sm mb-4">
                Start an AI learning session to improve your personalized experience
              </p>
              <Button
                onClick={startAILearning}
                disabled={isLearning}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isLearning ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-pulse" />
                    Learning...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start AI Learning
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Personalization Summary */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Your Personalization Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <Music className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-semibold">{settings.musicPreferences.genres.length}</div>
              <div className="text-blue-300 text-sm">Favorite Genres</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <Brain className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-white font-semibold">{settings.aiSettings.recommendationStrength}%</div>
              <div className="text-green-300 text-sm">AI Strength</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-semibold capitalize">{settings.aiSettings.discoveryMode}</div>
              <div className="text-purple-300 text-sm">Discovery Mode</div>
            </div>
            <div className="text-center p-4 bg-pink-500/10 rounded-lg">
              <Shield className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <div className="text-white font-semibold">
                {Object.values(settings.privacy).filter(Boolean).length}/4
              </div>
              <div className="text-pink-300 text-sm">Privacy Settings</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}