'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Users, TrendingUp, Music, Heart } from 'lucide-react';
import { realArtists } from '@/lib/musicData';

export default function TrendingArtists() {
  return (
    <section id="artists" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 text-sm mb-6">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-300">AI-Detected Rising Stars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Trending Artists
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the artists making waves globally, identified by our AI trend prediction system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realArtists.map((artist) => (
            <Card key={artist.id} className="group bg-gray-900/50 backdrop-blur-sm border-gray-700 hover:bg-gray-900/80 transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="relative">
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Trending Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 backdrop-blur-sm">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {artist.trending}
                  </Badge>
                </div>

                {/* Verified Badge */}
                {artist.verified && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}

                {/* Play Button */}
                <Button 
                  size="lg" 
                  className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 rounded-full"
                >
                  <Play className="w-5 h-5" />
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                    {artist.name}
                  </h3>
                  <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                    {artist.genre}
                  </Badge>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {artist.bio}
                </p>

                {/* Top Songs */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Top Songs:</div>
                  <div className="flex flex-wrap gap-1">
                    {artist.topSongs.slice(0, 2).map((song, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gray-700/50 text-gray-300">
                        {song}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{artist.followers}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400">Monthly</div>
                    <div className="text-white font-semibold">{artist.monthlyListeners}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="flex-1 text-gray-400 hover:text-white">
                    <Music className="w-4 h-4 mr-2" />
                    Play
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Insights Section */}
        <div className="mt-16 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            AI Trend Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">847</div>
              <div className="text-gray-400">Artists Tracked</div>
              <div className="text-xs text-gray-500 mt-1">Real-time monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">23.4M</div>
              <div className="text-gray-400">Social Signals</div>
              <div className="text-xs text-gray-500 mt-1">Daily analysis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">91%</div>
              <div className="text-gray-400">Prediction Accuracy</div>
              <div className="text-xs text-gray-500 mt-1">3-month forecast</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-green-500/50 text-green-300 hover:bg-green-500/10 px-8 py-3 rounded-full">
            Discover More Artists
          </Button>
        </div>
      </div>
    </section>
  );
}