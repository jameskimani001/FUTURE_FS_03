'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, User, Settings, Brain, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import AuthModal from './AuthModal';
import EnhancedSearchModal from './EnhancedSearchModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SoundSphere
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200">
                Home
              </a>
              <a href="#discover" className="text-gray-300 hover:text-white transition-colors duration-200">
                Discover
              </a>
              <a href="#playlists" className="text-gray-300 hover:text-white transition-colors duration-200">
                Playlists
              </a>
              <a href="#artists" className="text-gray-300 hover:text-white transition-colors duration-200">
                Artists
              </a>
            </nav>

            {/* Search and User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white"
                onClick={() => setShowSearchModal(true)}
              >
                <Search className="w-4 h-4" />
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full mr-2" />
                      ) : (
                        <User className="w-4 h-4 mr-2" />
                      )}
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700">
                    <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => setShowAuthModal(true)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 backdrop-blur-sm rounded-lg mt-2">
                <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
                <a href="#discover" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                  Discover
                </a>
                <a href="#playlists" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                  Playlists
                </a>
                <a href="#artists" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                  Artists
                </a>
                <div className="pt-4 border-t border-gray-700 space-y-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-full justify-start text-gray-300"
                    onClick={() => setShowSearchModal(true)}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-white font-medium">{user.name}</div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="w-full justify-start text-gray-300"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                      onClick={() => setShowAuthModal(true)}
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      <EnhancedSearchModal open={showSearchModal} onOpenChange={setShowSearchModal} />
    </>
  );
}