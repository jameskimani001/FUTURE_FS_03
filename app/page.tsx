'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedPlaylists from '@/components/FeaturedPlaylists';
import AIFeatures from '@/components/AIFeatures';
import TrendingArtists from '@/components/TrendingArtists';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import EnhancedMusicPlayer from '@/components/EnhancedMusicPlayer';
import AIBrandingStudio from '@/components/AIBrandingStudio';
import SEOOptimizer from '@/components/SEOOptimizer';
import CMSIntegration from '@/components/CMSIntegration';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';
import AIAnalytics from '@/components/AIAnalytics';
import AIPersonalization from '@/components/AIPersonalization';
import EnterpriseFeatures from '@/components/EnterpriseFeatures';
import APIDocumentation from '@/components/APIDocumentation';
import LiveDemo from '@/components/LiveDemo';
import SocialIntegration from '@/components/SocialIntegration';
import UserDashboard from '@/components/UserDashboard';
import { AuthProvider } from '@/lib/auth.tsx';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Home,
  Palette,
  Search,
  Database,
  Zap,
  Music,
  Sparkles,
  BarChart3,
  User,
  Building2,
  Code,
  Play,
  Share2
} from 'lucide-react';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'branding': return <AIBrandingStudio />;
      case 'seo': return <SEOOptimizer />;
      case 'cms': return <CMSIntegration />;
      case 'performance': return <PerformanceOptimizer />;
      case 'analytics': return <AIAnalytics />;
      case 'personalization': return <AIPersonalization />;
      case 'enterprise': return <EnterpriseFeatures />;
      case 'api': return <APIDocumentation />;
      case 'demo': return <LiveDemo />;
      case 'social': return <SocialIntegration />;
      case 'dashboard': return <UserDashboard />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <FeaturedPlaylists />
            <AIFeatures />
            <TrendingArtists />
            <Testimonials />
            <Footer />
            <EnhancedMusicPlayer />
          </>
        );
    }
  };

  const sectionTitleMap: Record<string, string> = {
    branding: '🎨 AI Brand Identity Generator',
    seo: '🔍 SEO Optimization Suite',
    cms: '📝 Dynamic Content Management',
    performance: '⚡ Performance Analysis',
    analytics: '📊 Advanced Analytics Dashboard',
    personalization: '🧠 AI Personalization Engine',
    enterprise: '🏢 Enterprise Solutions',
    api: '📚 Developer API Documentation',
    demo: '🎮 Interactive Live Demo',
    social: '📱 Social Media Integration',
    dashboard: '👤 Personal Dashboard',
  };

  return (
    <AuthProvider>
      <main className="min-h-screen bg-gray-900 text-white">
        <Header />

        {/* Navigation Tabs */}
        <div className="sticky top-16 z-40 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
              <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 bg-gray-800/50 backdrop-blur-sm">
                <TabsTrigger value="home" className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </TabsTrigger>
                <TabsTrigger value="branding" className="flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Branding</span>
                </TabsTrigger>
                <TabsTrigger value="seo" className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">SEO</span>
                </TabsTrigger>
                <TabsTrigger value="cms" className="flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span className="hidden sm:inline">CMS</span>
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">Performance</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="personalization" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">AI Personal</span>
                </TabsTrigger>
                <TabsTrigger value="enterprise" className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Enterprise</span>
                </TabsTrigger>
                <TabsTrigger value="api" className="flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span className="hidden sm:inline">API Docs</span>
                </TabsTrigger>
                <TabsTrigger value="demo" className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span className="hidden sm:inline">Live Demo</span>
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Social</span>
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* AI Banner */}
        {activeSection !== 'home' && (
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-b border-purple-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-medium">
                  {sectionTitleMap[activeSection] || '✨ AI-Powered Tools'}
                </span>
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {renderSection()}
      </main>
    </AuthProvider>
  );
}
