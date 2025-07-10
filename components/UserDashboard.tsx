'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Music, 
  Heart, 
  Clock, 
  TrendingUp,
  Award,
  Calendar,
  Headphones,
  Mic,
  Star,
  Play,
  Settings,
  Crown,
  Zap
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

const userStats = {
  totalListeningTime: '247h 32m',
  songsPlayed: 3247,
  playlistsCreated: 23,
  aiTracksGenerated: 156,
  voiceCommands: 89,
  favoriteGenre: 'Electronic',
  streak: 45,
  level: 'Music Enthusiast',
  achievements: [
    { name: 'Early Adopter', icon: Star, earned: true },
    { name: 'AI Explorer', icon: Zap, earned: true },
    { name: 'Voice Master', icon: Mic, earned: false },
    { name: 'Playlist Curator', icon: Music, earned: true },
    { name: 'Premium Member', icon: Crown, earned: false }
  ]
};

const recentActivity = [
  {
    type: 'played',
    content: 'Listened to "Blinding Lights" by The Weeknd',
    time: '2 minutes ago',
    icon: Play
  },
  {
    type: 'created',
    content: 'Created AI playlist "Morning Energy"',
    time: '1 hour ago',
    icon: Music
  },
  {
    type: 'liked',
    content: 'Liked "Shape of You" by Ed Sheeran',
    time: '3 hours ago',
    icon: Heart
  },
  {
    type: 'voice',
    content: 'Used voice command: "Play something upbeat"',
    time: '5 hours ago',
    icon: Mic
  }
];

export default function UserDashboard() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardContent className="text-center py-12">
            <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Sign In Required</h3>
            <p className="text-gray-400">Please sign in to view your personal dashboard</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-400">Here's your music journey overview</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-purple-600 text-white">
            {userStats.level}
          </Badge>
          {user.premium && (
            <Badge className="bg-yellow-600 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Listening Time</p>
                <p className="text-2xl font-bold text-white">{userStats.totalListeningTime}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              <span className="text-green-400 text-xs">+12% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Songs Played</p>
                <p className="text-2xl font-bold text-white">{userStats.songsPlayed.toLocaleString()}</p>
              </div>
              <Music className="w-8 h-8 text-green-400" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              <span className="text-green-400 text-xs">+8% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">AI Tracks</p>
                <p className="text-2xl font-bold text-white">{userStats.aiTracksGenerated}</p>
              </div>
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              <span className="text-green-400 text-xs">+25% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-500/10 border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm font-medium">Daily Streak</p>
                <p className="text-2xl font-bold text-white">{userStats.streak} days</p>
              </div>
              <Award className="w-8 h-8 text-orange-400" />
            </div>
            <div className="flex items-center mt-2">
              <Calendar className="w-3 h-3 text-orange-400 mr-1" />
              <span className="text-orange-400 text-xs">Keep it up!</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {userStats.achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-4 rounded-lg transition-all ${
                    achievement.earned
                      ? 'bg-yellow-500/20 border border-yellow-500/30'
                      : 'bg-gray-700/30 border border-gray-600'
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${
                    achievement.earned ? 'text-yellow-400' : 'text-gray-500'
                  }`} />
                  <h4 className={`font-medium text-sm ${
                    achievement.earned ? 'text-yellow-300' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </h4>
                  {achievement.earned && (
                    <Badge className="bg-yellow-600 text-white text-xs mt-1">
                      Earned
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Music Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.content}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Music Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Favorite Genre</span>
                <Badge className="bg-blue-600 text-white">{userStats.favoriteGenre}</Badge>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Top Genres This Week</h4>
              <div className="space-y-3">
                {[
                  { genre: 'Electronic', percentage: 45 },
                  { genre: 'Pop', percentage: 28 },
                  { genre: 'Hip Hop', percentage: 15 },
                  { genre: 'Jazz', percentage: 12 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-sm">{item.genre}</span>
                      <span className="text-white text-sm">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <Button className="w-full" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Customize Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listening Goals */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Weekly Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-300">Listening Time</span>
                <span className="text-white">32h / 40h</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-purple-200 text-xs mt-1">8 hours to go!</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-300">New Discoveries</span>
                <span className="text-white">12 / 15</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-blue-200 text-xs mt-1">3 more songs to discover</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-300">AI Creations</span>
                <span className="text-white">8 / 10</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-green-200 text-xs mt-1">2 more AI tracks to create</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}