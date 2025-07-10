'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Sparkles, Zap, Brain, Mic, Music, Headphones } from 'lucide-react';
import AIComposer from './AIComposer';
import VoiceControl from './VoiceControl';
import SpotifyPlayer from './SpotifyPlayer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Hero() {
  const [showAIComposer, setShowAIComposer] = useState(false);
  const [showVoiceControl, setShowVoiceControl] = useState(false);
  const [showSpotifyPlayer, setShowSpotifyPlayer] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        <div
          className='absolute inset-0 opacity-40 bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%238B5CF6%27%20fill-opacity%3D%270.1%27%3E%3Ccircle%20cx%3D%2730%27%20cy%3D%2730%27%20r%3D%272%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300">AI-Powered Music Discovery</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                The Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                Music Streaming
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience music like never before with AI-powered recommendations,
              real Spotify integration, and immersive audio experiences.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25">
              <Play className="w-5 h-5 mr-2" />
              Start Listening Free
            </Button>
            <Button variant="outline" size="lg" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg rounded-full transition-all duration-300">
              <Zap className="w-5 h-5 mr-2" />
              Explore AI Features
            </Button>
          </div>

          {/* AI Feature Demos */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
            <Dialog open={showSpotifyPlayer} onOpenChange={setShowSpotifyPlayer}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-green-500/50 text-green-300 hover:bg-green-500/10">
                  <Headphones className="w-4 h-4 mr-2" />
                  Try Spotify Integration
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Real Spotify Music Player</DialogTitle>
                </DialogHeader>
                <SpotifyPlayer />
              </DialogContent>
            </Dialog>

            <Dialog open={showAIComposer} onOpenChange={setShowAIComposer}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10">
                  <Music className="w-4 h-4 mr-2" />
                  Try AI Composer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">AI Composition Studio</DialogTitle>
                </DialogHeader>
                <AIComposer />
              </DialogContent>
            </Dialog>

            <Dialog open={showVoiceControl} onOpenChange={setShowVoiceControl}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10">
                  <Mic className="w-4 h-4 mr-2" />
                  Try Voice Control
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Voice Music Control</DialogTitle>
                </DialogHeader>
                <VoiceControl />
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="border-green-500/50 text-green-300 hover:bg-green-500/10">
              <Brain className="w-4 h-4 mr-2" />
              Neural Discovery
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 pt-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">50M+</div>
              <div className="text-gray-400">Songs Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">30s</div>
              <div className="text-gray-400">Real Previews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-purple-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}