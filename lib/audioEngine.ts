// Advanced AI Audio Generation Engine
export interface AudioTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  genre?: string;
  tempo?: number;
  energy?: number;
  danceability?: number;
}

export class AdvancedAudioEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: Set<AudioNode> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
    }
  }

  // Generate unique audio based on track characteristics
  async generateTrackAudio(track: AudioTrack, volume: number = 0.3): Promise<{
    play: () => void;
    stop: () => void;
    setVolume: (vol: number) => void;
  }> {
    if (!this.audioContext || !this.masterGain) {
      throw new Error('Audio context not available');
    }

    // Analyze track characteristics
    const analysis = this.analyzeTrack(track);
    
    // Create unique audio signature
    const audioSignature = this.createAudioSignature(track, analysis);
    
    // Generate complex audio composition
    const composition = this.generateComposition(audioSignature, analysis);
    
    let isPlaying = false;
    let currentNodes: AudioNode[] = [];

    const play = () => {
      if (isPlaying) return;
      isPlaying = true;
      
      // Clear any existing nodes
      this.stopAllNodes();
      
      // Create and start new composition
      currentNodes = this.createAudioNodes(composition, analysis);
      currentNodes.forEach(node => {
        this.activeNodes.add(node);
        if ('start' in node) {
          (node as OscillatorNode).start();
        }
      });
    };

    const stop = () => {
      if (!isPlaying) return;
      isPlaying = false;
      
      currentNodes.forEach(node => {
        if ('stop' in node) {
          try {
            (node as OscillatorNode).stop();
          } catch (e) {
            // Node might already be stopped
          }
        }
        this.activeNodes.delete(node);
      });
      currentNodes = [];
    };

    const setVolume = (vol: number) => {
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(vol * 0.3, this.audioContext!.currentTime);
      }
    };

    // Set initial volume
    setVolume(volume);

    return { play, stop, setVolume };
  }

  // Analyze track to determine audio characteristics
  private analyzeTrack(track: AudioTrack) {
    const name = track.name.toLowerCase();
    const artist = track.artists[0]?.name.toLowerCase() || '';
    
    // Genre detection from track name and artist
    let detectedGenre = 'pop';
    if (name.includes('electronic') || artist.includes('daft') || artist.includes('calvin')) {
      detectedGenre = 'electronic';
    } else if (name.includes('rock') || artist.includes('rock') || name.includes('guitar')) {
      detectedGenre = 'rock';
    } else if (name.includes('jazz') || artist.includes('jazz') || name.includes('blue')) {
      detectedGenre = 'jazz';
    } else if (name.includes('hip') || name.includes('rap') || artist.includes('lil') || artist.includes('drake')) {
      detectedGenre = 'hiphop';
    } else if (name.includes('classical') || artist.includes('mozart') || artist.includes('bach')) {
      detectedGenre = 'classical';
    } else if (name.includes('country') || name.includes('folk')) {
      detectedGenre = 'country';
    } else if (name.includes('reggae') || name.includes('bob marley')) {
      detectedGenre = 'reggae';
    }

    // Energy analysis based on track name
    let energy = 0.5;
    if (name.includes('energy') || name.includes('power') || name.includes('fire') || name.includes('wild')) {
      energy = 0.9;
    } else if (name.includes('calm') || name.includes('soft') || name.includes('gentle') || name.includes('slow')) {
      energy = 0.2;
    } else if (name.includes('dance') || name.includes('party') || name.includes('club')) {
      energy = 0.8;
    }

    // Tempo analysis
    let tempo = 120;
    if (detectedGenre === 'electronic') tempo = 128;
    else if (detectedGenre === 'rock') tempo = 140;
    else if (detectedGenre === 'jazz') tempo = 100;
    else if (detectedGenre === 'hiphop') tempo = 85;
    else if (detectedGenre === 'classical') tempo = 90;
    else if (detectedGenre === 'country') tempo = 110;
    else if (detectedGenre === 'reggae') tempo = 75;

    // Adjust tempo based on energy
    tempo = Math.round(tempo * (0.7 + energy * 0.6));

    return {
      genre: detectedGenre,
      energy,
      tempo,
      danceability: energy > 0.6 ? 0.8 : 0.4,
      valence: name.includes('happy') || name.includes('love') ? 0.8 : 0.5
    };
  }

  // Create unique audio signature based on track metadata
  private createAudioSignature(track: AudioTrack, analysis: any) {
    const name = track.name;
    const artist = track.artists[0]?.name || '';
    
    // Create unique seed from track data
    const seed = this.hashString(name + artist);
    
    // Generate unique frequencies based on track characteristics
    const baseFreq = 220 + (seed % 200);
    const harmonics = [];
    
    for (let i = 0; i < 5; i++) {
      const harmonic = baseFreq * (1 + i * 0.5 + (seed % (i + 1)) * 0.1);
      harmonics.push(harmonic);
    }

    // Create rhythm pattern based on track name
    const rhythmPattern = this.generateRhythmPattern(name, analysis.tempo);
    
    // Create melody pattern
    const melodyPattern = this.generateMelodyPattern(name, artist, analysis);

    return {
      baseFreq,
      harmonics,
      rhythmPattern,
      melodyPattern,
      seed
    };
  }

  // Generate unique rhythm pattern
  private generateRhythmPattern(trackName: string, tempo: number) {
    const pattern = [];
    const seed = this.hashString(trackName);
    const patternLength = 16; // 16-beat pattern
    
    for (let i = 0; i < patternLength; i++) {
      const beat = {
        time: i * (60 / tempo / 4), // Quarter note timing
        intensity: (seed % (i + 1)) / 10 + 0.1,
        type: this.getBeatType(seed, i)
      };
      pattern.push(beat);
    }
    
    return pattern;
  }

  // Generate unique melody pattern
  private generateMelodyPattern(trackName: string, artist: string, analysis: any) {
    const notes = [];
    const seed = this.hashString(trackName + artist);
    const scale = this.getScale(analysis.genre, analysis.valence);
    
    for (let i = 0; i < 8; i++) {
      const noteIndex = (seed + i * 3) % scale.length;
      const note = {
        frequency: scale[noteIndex],
        duration: 0.5 + (seed % (i + 1)) * 0.1,
        timing: i * 0.5
      };
      notes.push(note);
    }
    
    return notes;
  }

  // Get musical scale based on genre and mood
  private getScale(genre: string, valence: number) {
    const baseFreq = 261.63; // C4
    
    // Major scale for happy songs, minor for sad
    const majorScale = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2];
    const minorScale = [1, 9/8, 6/5, 4/3, 3/2, 8/5, 9/5, 2];
    const pentatonic = [1, 9/8, 5/4, 3/2, 5/3, 2];
    
    let scale = valence > 0.6 ? majorScale : minorScale;
    
    if (genre === 'jazz') {
      scale = [1, 9/8, 5/4, 11/8, 3/2, 13/8, 15/8, 2]; // Jazz scale
    } else if (genre === 'electronic') {
      scale = pentatonic; // Simpler for electronic
    }
    
    return scale.map(ratio => baseFreq * ratio);
  }

  // Get beat type for rhythm variation
  private getBeatType(seed: number, position: number): 'kick' | 'snare' | 'hihat' | 'bass' {
    const types: ('kick' | 'snare' | 'hihat' | 'bass')[] = ['kick', 'snare', 'hihat', 'bass'];
    return types[(seed + position) % types.length];
  }

  // Generate complete audio composition
  private generateComposition(signature: any, analysis: any) {
    return {
      layers: [
        {
          type: 'bass',
          frequency: signature.baseFreq * 0.5,
          pattern: signature.rhythmPattern.filter(beat => beat.type === 'bass'),
          waveType: 'sawtooth' as OscillatorType,
          volume: 0.3
        },
        {
          type: 'melody',
          frequencies: signature.melodyPattern.map((note: any) => note.frequency),
          pattern: signature.melodyPattern,
          waveType: this.getWaveType(analysis.genre),
          volume: 0.4
        },
        {
          type: 'harmony',
          frequencies: signature.harmonics,
          pattern: signature.rhythmPattern.filter(beat => beat.type === 'hihat'),
          waveType: 'triangle' as OscillatorType,
          volume: 0.2
        },
        {
          type: 'percussion',
          frequency: signature.baseFreq * 2,
          pattern: signature.rhythmPattern.filter(beat => beat.type === 'kick' || beat.type === 'snare'),
          waveType: 'square' as OscillatorType,
          volume: 0.3
        }
      ],
      tempo: analysis.tempo,
      duration: 30 // 30 seconds
    };
  }

  // Get appropriate wave type for genre
  private getWaveType(genre: string): OscillatorType {
    switch (genre) {
      case 'electronic': return 'sawtooth';
      case 'rock': return 'square';
      case 'jazz': return 'triangle';
      case 'classical': return 'sine';
      default: return 'sine';
    }
  }

  // Create and connect audio nodes
  private createAudioNodes(composition: any, analysis: any): AudioNode[] {
    if (!this.audioContext || !this.masterGain) return [];

    const nodes: AudioNode[] = [];
    const startTime = this.audioContext.currentTime;

    composition.layers.forEach((layer: any, layerIndex: number) => {
      if (layer.type === 'melody') {
        // Create melody line
        layer.frequencies.forEach((freq: number, noteIndex: number) => {
          const osc = this.audioContext!.createOscillator();
          const gain = this.audioContext!.createGain();
          const filter = this.audioContext!.createBiquadFilter();
          
          osc.type = layer.waveType;
          osc.frequency.setValueAtTime(freq, startTime);
          
          // Add some variation to the frequency over time
          const variation = Math.sin(noteIndex) * 10;
          osc.frequency.linearRampToValueAtTime(freq + variation, startTime + layer.pattern[noteIndex]?.timing || 0);
          
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(freq * 2, startTime);
          
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(layer.volume, startTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + composition.duration);
          
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain!);
          
          nodes.push(osc, gain, filter);
        });
      } else {
        // Create rhythm/bass/harmony layers
        const osc = this.audioContext!.createOscillator();
        const gain = this.audioContext!.createGain();
        const filter = this.audioContext!.createBiquadFilter();
        
        osc.type = layer.waveType;
        osc.frequency.setValueAtTime(layer.frequency || layer.frequencies?.[0] || 220, startTime);
        
        // Create rhythmic pattern
        layer.pattern.forEach((beat: any, beatIndex: number) => {
          const beatTime = startTime + beat.time;
          gain.gain.setValueAtTime(0, beatTime);
          gain.gain.linearRampToValueAtTime(layer.volume * beat.intensity, beatTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.1);
        });
        
        filter.type = layer.type === 'bass' ? 'lowpass' : 'bandpass';
        filter.frequency.setValueAtTime((layer.frequency || 220) * 2, startTime);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        
        nodes.push(osc, gain, filter);
      }
    });

    return nodes;
  }

  // Hash string to create consistent seed
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Stop all active audio nodes
  private stopAllNodes() {
    this.activeNodes.forEach(node => {
      if ('stop' in node) {
        try {
          (node as OscillatorNode).stop();
        } catch (e) {
          // Node might already be stopped
        }
      }
    });
    this.activeNodes.clear();
  }

  // Cleanup
  destroy() {
    this.stopAllNodes();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Export singleton instance
export const audioEngine = new AdvancedAudioEngine();