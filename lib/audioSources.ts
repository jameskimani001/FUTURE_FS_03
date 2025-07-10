// Free and legal audio sources for demonstration
export const freeAudioSources = {
  // Creative Commons and royalty-free music
  ambient: [
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    'https://www.soundjay.com/misc/sounds/wind-chimes-1.wav',
    'https://www.soundjay.com/misc/sounds/rain-01.wav'
  ],
  
  // Procedurally generated audio URLs (these would be replaced with real sources)
  electronic: [
    'https://www.soundjay.com/misc/sounds/beep-07a.wav',
    'https://www.soundjay.com/misc/sounds/beep-10.wav'
  ],
  
  // Nature sounds and ambient tracks
  nature: [
    'https://www.soundjay.com/nature/sounds/rain-02.wav',
    'https://www.soundjay.com/nature/sounds/wind-1.wav'
  ]
};

// Audio generation functions for different genres
export const generateAudioForGenre = (genre: string, tempo: number, duration: number) => {
  // This would integrate with Web Audio API to create genre-specific audio
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const createTone = (frequency: number, type: OscillatorType = 'sine') => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    // Set volume to prevent ear damage
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    return { oscillator, gainNode };
  };
  
  // Genre-specific audio generation
  switch (genre.toLowerCase()) {
    case 'electronic':
      return createTone(440, 'sawtooth');
    case 'pop':
      return createTone(523, 'sine');
    case 'rock':
      return createTone(349, 'square');
    case 'jazz':
      return createTone(261, 'triangle');
    default:
      return createTone(440, 'sine');
  }
};

// Realistic track metadata with placeholder audio
export const enhancedTracks = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    // Note: This would be replaced with actual licensed audio in production
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Synthpop',
    releaseYear: 2019,
    popularity: 95,
    preview: true, // Indicates this is a preview/demo
    fullTrackAvailable: false // Would be true with proper licensing
  }
  // ... more tracks
];