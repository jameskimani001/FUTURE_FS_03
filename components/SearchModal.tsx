'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Play, Music, User, Disc } from 'lucide-react';
import { realTracks, realArtists, realPlaylists } from '@/lib/musicData';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    tracks: [] as typeof realTracks,
    artists: [] as typeof realArtists,
    playlists: [] as typeof realPlaylists
  });

  useEffect(() => {
    if (query.length > 0) {
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
        playlists: filteredPlaylists.slice(0, 3)
      });
    } else {
      setResults({ tracks: [], artists: [], playlists: [] });
    }
  }, [query]);

  const hasResults = results.tracks.length > 0 || results.artists.length > 0 || results.playlists.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gray-900 border-gray-700 max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-white">Search SoundSphere</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for songs, artists, playlists..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
              autoFocus
            />
          </div>

          <div className="overflow-y-auto max-h-96 space-y-6">
            {query.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Start typing to search for music</p>
              </div>
            )}

            {query.length > 0 && !hasResults && (
              <div className="text-center py-8">
                <p className="text-gray-400">No results found for "{query}"</p>
              </div>
            )}

            {/* Tracks */}
            {results.tracks.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Music className="w-4 h-4 mr-2" />
                  Songs
                </h3>
                <div className="space-y-2">
                  {results.tracks.map((track) => (
                    <div key={track.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
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
      </DialogContent>
    </Dialog>
  );
}