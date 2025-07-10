// Firebase configuration will be added here
// This is a placeholder for Firebase integration

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  image: string;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  image: string;
  tracks: Track[];
  createdBy: string;
  createdAt: Date;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  followers: string;
  monthlyListeners: string;
  image: string;
  verified: boolean;
  topSongs: Track[];
}

// Mock data for development
export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'AI Chill Vibes',
    description: 'Curated by our AI for the perfect relaxation mood',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    tracks: [],
    createdBy: 'AI Curator',
    createdAt: new Date()
  }
];

// Firebase functions will be implemented here
export const getPlaylists = async (): Promise<Playlist[]> => {
  // TODO: Implement Firebase Firestore query
  return mockPlaylists;
};

export const getArtists = async (): Promise<Artist[]> => {
  // TODO: Implement Firebase Firestore query
  return [];
};

export const getTracks = async (): Promise<Track[]> => {
  // TODO: Implement Firebase Firestore query
  return [];
};