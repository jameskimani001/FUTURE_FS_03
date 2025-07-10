'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Play, Music, User, Disc, ExternalLink, Headphones, Loader2 } from 'lucide-react';
import { realTracks, realArtists, realPlaylists } from '@/lib/musicData';
import { spotifyAPI, SpotifyTrack, formatDuration, getImageUrl } from '@/lib/spotify';

interface EnhancedSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTrackSelect?: (track: SpotifyTrack | any) => void;
}

export default function EnhancedSearchModal({ open, onOpenChange, onTrackSelect }: EnhancedSearchModalProps) {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'local' | 'spotify'>('spotify');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState({
    tracks: [] as any[],
    artists: [] as typeof realArtists,
    playlists: [] as typeof realPlaylists,
    spotifyTracks: [] as SpotifyTrack[]
  });

  useEffect(() => {
    if (query.length > 0) {
      if (searchMode === 'local') {
        searchLocal();
      } else {
        searchSpotify();
      }
    } else {
      setResults({ tracks: [], artists: [], playlists: [], spotifyTracks: [] });
    }
  }, [query, searchMode]);

  const searchLocal = () => {
    const searchQuery = query.toLowerCase();
    
    const filteredTracks = realTracks.filter(track =>
      track.title.toLowerCase().includes(searchQuery) ||
      track.artist.toLowerCase().includes(searchQuery) ||
      track.genre.toLowerCase().includes(searchQuery)
    );

    const filteredArtists = realArtists.filter(artist =>
      artist.name.toLowerCase().includes(searchQuery) ||
      artist.genre.toLowerCase().includes(searchQuery)
    );

    const filteredPlaylists = realPlaylists.filter(playlist =>
      playlist.title.toLowerCase().includes(searchQuery) ||
      playlist.description.toLowerCase().includes(searchQuery)
    );

    setResults({
      tracks: filteredTracks.slice(0, 5),
      artists: filteredArtists.slice(0, 3),
      playlists: filteredPlaylists.slice(0, 3),
      spotifyTracks: []
    });
  };

  const searchSpotify = async () => {
    setIsSearching(true);
    try {
      console.log(`🔍 Searching Spotify for: "${query}"`);
      const spotifyTracks = await spotifyAPI.searchTracks(query, 12);
      console.log(`✅ Found ${spotifyTracks.length} Spotify tracks`);
      
      setResults({
        tracks: [],
        artists: [],
        playlists: [],
        spotifyTracks
      });
    } catch (error) {
      console.error('❌ Spotify search failed:', error);
      // Fallback to local search
      searchLocal();
    } finally {
      setIsSearching(false);
    }
  };

  const hasResults = results.tracks.length > 0 || 
                    results.artists.length > 0 || 
                    results.playlists.length > 0 || 
                    results.spotifyTracks.length > 0;

  const handleTrackSelect = (track: any) => {
    if (onTrackSelect) {
      onTrackSelect(track);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl bg-gray-900 border-gray-700 max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            <span>Search Music</span>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={searchMode === 'local' ? 'default' : 'outline'}
                onClick={() => setSearchMode('local')}
                className="text-xs"
              >
                <Music className="w-3 h-3 mr-1" />
                Local
              </Button>
              <Button
                size="sm"
                variant={searchMode === 'spotify' ? 'default' : 'outline'}
                onClick={() => setSearchMode('spotify')}
                className="text-xs bg-green-600 hover:bg-green-700"
              >
                <Headphones className="w-3 h-3 mr-1" />
                Spotify
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={searchMode === 'spotify' ? "Search millions of real songs on Spotify..." : "Search local library..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
              autoFocus
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-3 h-4 w-4 text-gray-400 animate-spin" />
            )}
          </div>

          <div className="overflow-y-auto max-h-[60vh] space-y-6">
            {query.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  {searchMode === 'spotify' 
                    ? 'Search Spotify for millions of real songs with 30-second previews'
                    : 'Start typing to search for music'
                  }
                </p>
                {searchMode === 'spotify' && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-green-400">✅ Real Spotify Integration Active</p>
                    <p className="text-xs text-gray-500">Try searching: "Blinding Lights", "Shape of You", "Bad Guy"</p>
                  </div>
                )}
              </div>
            )}

            {query.length > 0 && !hasResults && !isSearching && (
              <div className="text-center py-8">
                <p className="text-gray-400">No results found for "{query}"</p>
                {searchMode === 'spotify' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSearchMode('local')}
                    className="mt-2"
                  >
                    Try searching local library
                  </Button>
                )}
              </div>
            )}

            {/* Spotify Results */}
            {results.spotifyTracks.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Headphones className="w-4 h-4 mr-2 text-green-400" />
                  Spotify Tracks ({results.spotifyTracks.length})
                  <Badge className="ml-2 bg-green-600 text-white text-xs">Real Music</Badge>
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {results.spotifyTracks.map((track) => (
                    <div 
                      key={track.id} 
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                      onClick={() => handleTrackSelect(track)}
                    >
                      <img 
                        src={getImageUrl(track.album.images, 'small')} 
                        alt={track.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate group-hover:text-green-300">
                          {track.name}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                          {track.artists.map(artist => artist.name).join(', ')}
                        </p>
                        <p className="text-gray-500 text-xs truncate">{track.album.name}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {track.preview_url ? (
                          <Badge className="bg-green-600 text-white text-xs">
                            <Headphones className="w-3 h-3 mr-1" />
                            Preview
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-600 text-white text-xs">
                            <Music className="w-3 h-3 mr-1" />
                            AI Audio
                          </Badge>
                        )}
                        <span className="text-gray-400 text-sm">{formatDuration(track.duration_ms)}</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(track.external_urls.spotify, '_blank');
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Local Tracks */}
            {results.tracks.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Music className="w-4 h-4 mr-2" />
                  Songs
                  <Badge className="ml-2 bg-blue-600 text-white text-xs">AI Enhanced</Badge>
                </h3>
                <div className="space-y-2">
                  {results.tracks.map((track) => (
                    <div 
                      key={track.id} 
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={() => handleTrackSelect(track)}
                    >
                      <img src={track.image} alt={track.title} className="w-10 h-10 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{track.title}</p>
                        <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Artists */}
            {results.artists.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Artists
                </h3>
                <div className="space-y-2">
                  {results.artists.map((artist) => (
                    <div key={artist.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                      <img src={artist.image} alt={artist.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{artist.name}</p>
                        <p className="text-gray-400 text-sm truncate">{artist.genre} • {artist.followers} followers</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Playlists */}
            {results.playlists.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Disc className="w-4 h-4 mr-2" />
                  Playlists
                </h3>
                <div className="space-y-2">
                  {results.playlists.map((playlist) => (
                    <div key={playlist.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                      <img src={playlist.image} alt={playlist.title} className="w-10 h-10 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{playlist.title}</p>
                        <p className="text-gray-400 text-sm truncate">{playlist.trackCount} tracks • by {playlist.createdBy}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <span>Search powered by:</span>
              {searchMode === 'spotify' ? (
                <Badge className="bg-green-600 text-white">Spotify API</Badge>
              ) : (
                <Badge className="bg-blue-600 text-white">AI Enhanced Library</Badge>
              )}
            </div>
            <div className="text-xs">
              {searchMode === 'spotify' ? 'Real 30-second previews + AI fallback' : 'AI-generated audio'}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}