export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
  audioUrl: string;
  genre: string;
  releaseYear: number;
  popularity: number;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  followers: string;
  monthlyListeners: string;
  image: string;
  verified: boolean;
  topSongs: string[];
  bio: string;
  trending: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  image: string;
  tracks: Track[];
  createdBy: string;
  createdAt: Date;
  duration: string;
  trackCount: number;
  color: string;
}

// Expanded music library with more tracks
export const realTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Synthpop',
    releaseYear: 2019,
    popularity: 95
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: '3:53',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop',
    releaseYear: 2017,
    popularity: 92
  },
  {
    id: '3',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    album: 'When We All Fall Asleep, Where Do We Go?',
    duration: '3:14',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Electropop',
    releaseYear: 2019,
    popularity: 89
  },
  {
    id: '4',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: '2:54',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop Rock',
    releaseYear: 2020,
    popularity: 88
  },
  {
    id: '5',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: '3:23',
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Disco Pop',
    releaseYear: 2020,
    popularity: 91
  },
  {
    id: '6',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'Sour',
    duration: '2:58',
    image: 'https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop Punk',
    releaseYear: 2021,
    popularity: 87
  },
  {
    id: '7',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: 'Harry\'s House',
    duration: '2:47',
    image: 'https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop Rock',
    releaseYear: 2022,
    popularity: 94
  },
  {
    id: '8',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    duration: '3:20',
    image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Synth Pop',
    releaseYear: 2022,
    popularity: 96
  },
  {
    id: '9',
    title: 'Flowers',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    duration: '3:20',
    image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop Rock',
    releaseYear: 2023,
    popularity: 93
  },
  {
    id: '10',
    title: 'Unholy',
    artist: 'Sam Smith ft. Kim Petras',
    album: 'Gloria',
    duration: '2:36',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop',
    releaseYear: 2022,
    popularity: 90
  },
  {
    id: '11',
    title: 'Calm Down',
    artist: 'Rema & Selena Gomez',
    album: 'Rave & Roses',
    duration: '3:59',
    image: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Afrobeats',
    releaseYear: 2022,
    popularity: 88
  },
  {
    id: '12',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: '3:58',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Indie Pop',
    releaseYear: 2020,
    popularity: 89
  },
  {
    id: '13',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'F*CK LOVE 3: OVER YOU',
    duration: '2:21',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop Rap',
    releaseYear: 2021,
    popularity: 91
  },
  {
    id: '14',
    title: 'Industry Baby',
    artist: 'Lil Nas X & Jack Harlow',
    album: 'MONTERO',
    duration: '3:32',
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Hip Hop',
    releaseYear: 2021,
    popularity: 87
  },
  {
    id: '15',
    title: 'About Damn Time',
    artist: 'Lizzo',
    album: 'Special',
    duration: '3:11',
    image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop',
    releaseYear: 2022,
    popularity: 85
  },
  {
    id: '16',
    title: 'Running Up That Hill',
    artist: 'Kate Bush',
    album: 'Hounds of Love',
    duration: '5:03',
    image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Art Pop',
    releaseYear: 1985,
    popularity: 82
  },
  {
    id: '17',
    title: 'Shivers',
    artist: 'Ed Sheeran',
    album: '= (Equals)',
    duration: '3:27',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop',
    releaseYear: 2021,
    popularity: 86
  },
  {
    id: '18',
    title: 'Ghost',
    artist: 'Justice',
    album: 'Cross',
    duration: '4:17',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Electronic',
    releaseYear: 2007,
    popularity: 78
  },
  {
    id: '19',
    title: 'Peaches',
    artist: 'Justin Bieber ft. Daniel Caesar & Giveon',
    album: 'Justice',
    duration: '3:18',
    image: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'R&B',
    releaseYear: 2021,
    popularity: 84
  },
  {
    id: '20',
    title: 'Montero (Call Me By Your Name)',
    artist: 'Lil Nas X',
    album: 'MONTERO',
    duration: '2:17',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop Rap',
    releaseYear: 2021,
    popularity: 83
  },
  {
    id: '21',
    title: 'Starboy',
    artist: 'The Weeknd ft. Daft Punk',
    album: 'Starboy',
    duration: '3:50',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Synthpop',
    releaseYear: 2016,
    popularity: 89
  },
  {
    id: '22',
    title: 'Sunflower',
    artist: 'Post Malone & Swae Lee',
    album: 'Spider-Man: Into the Spider-Verse',
    duration: '2:38',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Hip Hop',
    releaseYear: 2018,
    popularity: 92
  },
  {
    id: '23',
    title: 'Circles',
    artist: 'Post Malone',
    album: 'Hollywood\'s Bleeding',
    duration: '3:35',
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop Rock',
    releaseYear: 2019,
    popularity: 88
  },
  {
    id: '24',
    title: 'Positions',
    artist: 'Ariana Grande',
    album: 'Positions',
    duration: '2:52',
    image: 'https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'R&B',
    releaseYear: 2020,
    popularity: 85
  },
  {
    id: '25',
    title: 'Dynamite',
    artist: 'BTS',
    album: 'BE',
    duration: '3:19',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Disco Pop',
    releaseYear: 2020,
    popularity: 90
  },
  {
    id: '26',
    title: 'Butter',
    artist: 'BTS',
    album: 'Butter',
    duration: '2:44',
    image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Dance Pop',
    releaseYear: 2021,
    popularity: 87
  },
  {
    id: '27',
    title: 'Savage',
    artist: 'Megan Thee Stallion',
    album: 'Suga',
    duration: '4:07',
    image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Hip Hop',
    releaseYear: 2020,
    popularity: 84
  },
  {
    id: '28',
    title: 'WAP',
    artist: 'Cardi B ft. Megan Thee Stallion',
    album: 'WAP',
    duration: '4:12',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Hip Hop',
    releaseYear: 2020,
    popularity: 86
  },
  {
    id: '29',
    title: 'Mood',
    artist: '24kGoldn ft. iann dior',
    album: 'El Dorado',
    duration: '2:20',
    image: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Hip Hop',
    releaseYear: 2020,
    popularity: 83
  },
  {
    id: '30',
    title: 'Rockstar',
    artist: 'DaBaby ft. Roddy Ricch',
    album: 'Blame It on Baby',
    duration: '3:01',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Hip Hop',
    releaseYear: 2020,
    popularity: 85
  }
];

export const realArtists: Artist[] = [
  {
    id: '1',
    name: 'The Weeknd',
    genre: 'R&B/Pop',
    followers: '45.2M',
    monthlyListeners: '89.4M',
    image: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    topSongs: ['Blinding Lights', 'Save Your Tears', 'The Hills'],
    bio: 'Canadian singer, songwriter, and record producer known for his dark wave-influenced R&B and pop music.',
    trending: '+15%'
  },
  {
    id: '2',
    name: 'Billie Eilish',
    genre: 'Alternative Pop',
    followers: '42.8M',
    monthlyListeners: '67.2M',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    topSongs: ['Bad Guy', 'Happier Than Ever', 'Ocean Eyes'],
    bio: 'American singer-songwriter known for her unique sound and style that blends pop, electronic, and alternative music.',
    trending: '+22%'
  },
  {
    id: '3',
    name: 'Dua Lipa',
    genre: 'Pop',
    followers: '38.9M',
    monthlyListeners: '73.1M',
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    topSongs: ['Levitating', 'Don\'t Start Now', 'Physical'],
    bio: 'English singer and songwriter who has received numerous accolades for her disco-influenced pop music.',
    trending: '+18%'
  },
  {
    id: '4',
    name: 'Harry Styles',
    genre: 'Pop Rock',
    followers: '41.3M',
    monthlyListeners: '58.7M',
    image: 'https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    topSongs: ['Watermelon Sugar', 'As It Was', 'Golden'],
    bio: 'English singer, songwriter, and actor known for his eclectic musical style and fashion sense.',
    trending: '+12%'
  },
  {
    id: '5',
    name: 'Ed Sheeran',
    genre: 'Pop/Folk',
    followers: '52.1M',
    monthlyListeners: '84.3M',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    topSongs: ['Shape of You', 'Perfect', 'Thinking Out Loud'],
    bio: 'English singer-songwriter known for his acoustic guitar-driven songs and heartfelt lyrics.',
    trending: '+8%'
  },
  {
    id: '6',
    name: 'Olivia Rodrigo',
    genre: 'Pop/Alternative',
    followers: '28.4M',
    monthlyListeners: '62.9M',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    topSongs: ['Good 4 U', 'Drivers License', 'Vampire'],
    bio: 'American singer-songwriter and actress who gained recognition for her emotionally driven pop and alternative rock music.',
    trending: '+35%'
  },
  {
    id: '7',
    name: 'Taylor Swift',
    genre: 'Pop/Country',
    followers: '58.7M',
    monthlyListeners: '95.2M',
    image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    topSongs: ['Anti-Hero', 'Shake It Off', 'Blank Space'],
    bio: 'American singer-songwriter known for narrative songwriting and genre versatility.',
    trending: '+28%'
  },
  {
    id: '8',
    name: 'Post Malone',
    genre: 'Hip Hop/Pop',
    followers: '35.4M',
    monthlyListeners: '71.8M',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    topSongs: ['Sunflower', 'Circles', 'Rockstar'],
    bio: 'American rapper, singer, and songwriter known for blending genres and melodic hooks.',
    trending: '+14%'
  },
  {
    id: '9',
    name: 'BTS',
    genre: 'K-Pop',
    followers: '47.1M',
    monthlyListeners: '68.9M',
    image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    topSongs: ['Dynamite', 'Butter', 'Permission to Dance'],
    bio: 'South Korean boy band that has achieved global success and broken numerous records.',
    trending: '+31%'
  }
];

export const realPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'AI Pop Perfection',
    description: 'The biggest pop hits curated by our AI based on global trends',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    tracks: realTracks.slice(0, 8),
    createdBy: 'AI Curator',
    createdAt: new Date('2024-01-15'),
    duration: '2h 34m',
    trackCount: 42,
    color: 'from-purple-500 to-blue-500'
  },
  {
    id: '2',
    title: 'Mood: Euphoric',
    description: 'AI-selected tracks that boost your energy and mood',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    tracks: [realTracks[1], realTracks[4], realTracks[7], realTracks[25], realTracks[26]],
    createdBy: 'Neural Network',
    createdAt: new Date('2024-01-20'),
    duration: '1h 45m',
    trackCount: 28,
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: '3',
    title: 'Alternative Vibes',
    description: 'Discover alternative and indie tracks with AI precision',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
    tracks: [realTracks[2], realTracks[5], realTracks[11], realTracks[16]],
    createdBy: 'Deep Learning AI',
    createdAt: new Date('2024-01-25'),
    duration: '2h 12m',
    trackCount: 35,
    color: 'from-blue-500 to-green-500'
  },
  {
    id: '4',
    title: 'Chart Toppers 2024',
    description: 'AI-predicted hits and current chart dominators',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    tracks: [realTracks[6], realTracks[7], realTracks[8], realTracks[9]],
    createdBy: 'Predictive AI',
    createdAt: new Date('2024-02-01'),
    duration: '1h 32m',
    trackCount: 24,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: '5',
    title: 'Hip Hop Heat',
    description: 'The hottest hip hop tracks selected by AI',
    image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
    tracks: [realTracks[13], realTracks[19], realTracks[21], realTracks[27], realTracks[29]],
    createdBy: 'AI Hip Hop Curator',
    createdAt: new Date('2024-02-05'),
    duration: '1h 58m',
    trackCount: 32,
    color: 'from-red-500 to-orange-500'
  },
  {
    id: '6',
    title: 'Electronic Dreams',
    description: 'AI-curated electronic and synth-driven tracks',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
    tracks: [realTracks[0], realTracks[17], realTracks[20]],
    createdBy: 'Synth AI',
    createdAt: new Date('2024-02-10'),
    duration: '2h 15m',
    trackCount: 28,
    color: 'from-cyan-500 to-blue-500'
  }
];