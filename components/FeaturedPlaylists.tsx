'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Heart, Share2, Clock, Music } from 'lucide-react';
import { realPlaylists } from '@/lib/musicData';

export default function FeaturedPlaylists() {
  return (
    <section id="playlists" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI-Curated Playlists
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover perfectly crafted collections powered by advanced machine learning algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {realPlaylists.map((playlist) => (
            <Card key={playlist.id} className="group bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="relative">
                <img 
                  src={playlist.image} 
                  alt={playlist.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${playlist.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <Button 
                  size="sm" 
                  className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 rounded-full"
                >
                  <Play className="w-4 h-4" />
                </Button>
                
                {/* AI Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white font-medium">
                  AI Curated
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {playlist.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {playlist.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Music className="w-3 h-3" />
                    <span>{playlist.trackCount} tracks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{playlist.duration}</span>
                  </div>
                </div>
                <div className="text-xs text-purple-400 mb-3">
                  by {playlist.createdBy}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-1 text-gray-400 hover:text-red-400">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 text-gray-400 hover:text-blue-400">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Tracks Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Trending in AI Playlists
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {realPlaylists[0].tracks.slice(0, 3).map((track, index) => (
              <Card key={track.id} className="bg-gray-800/30 backdrop-blur-sm border-gray-700 hover:bg-gray-800/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={track.image} 
                      alt={track.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{track.title}</h4>
                      <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                      <p className="text-gray-500 text-xs">{track.genre} • {track.duration}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-full">
            Explore All AI Playlists
          </Button>
        </div>
      </div>
    </section>
  );
}