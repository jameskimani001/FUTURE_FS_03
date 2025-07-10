'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Share2, Twitter, Instagram, Youtube, Facebook, Linkedin, BookText as TikTok, Users, Heart, MessageCircle, Repeat2, ExternalLink, Copy, CheckCircle, Zap, Globe } from 'lucide-react';

const socialPlatforms = [
  {
    name: 'Twitter',
    icon: Twitter,
    color: 'bg-blue-500',
    followers: '125K',
    engagement: '8.4%',
    connected: true
  },
  {
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-pink-500',
    followers: '89K',
    engagement: '12.1%',
    connected: true
  },
  {
    name: 'TikTok',
    icon: TikTok,
    color: 'bg-black',
    followers: '234K',
    engagement: '15.7%',
    connected: false
  },
  {
    name: 'YouTube',
    icon: Youtube,
    color: 'bg-red-500',
    followers: '67K',
    engagement: '6.2%',
    connected: true
  },
  {
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    followers: '45K',
    engagement: '4.8%',
    connected: false
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700',
    followers: '23K',
    engagement: '9.3%',
    connected: true
  }
];

const recentPosts = [
  {
    id: '1',
    platform: 'Twitter',
    content: 'Just discovered this amazing AI-generated track! 🎵 The future of music is here.',
    likes: 1247,
    shares: 89,
    comments: 156,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    platform: 'Instagram',
    content: 'Behind the scenes of our AI music composition process ✨',
    likes: 2341,
    shares: 234,
    comments: 89,
    timestamp: '5 hours ago'
  },
  {
    id: '3',
    platform: 'YouTube',
    content: 'New video: How AI is revolutionizing music discovery',
    likes: 567,
    shares: 123,
    comments: 45,
    timestamp: '1 day ago'
  }
];

export default function SocialIntegration() {
  const [shareText, setShareText] = useState('Check out this amazing AI-powered music platform! 🎵');
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = 'https://soundsphere.app';
    const text = encodeURIComponent(shareText);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      instagram: `https://www.instagram.com/`,
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText} https://soundsphere.app`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 text-sm">
          <Share2 className="w-4 h-4 text-blue-400" />
          <span className="text-blue-300">Social Media Integration</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Social Media Hub
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Connect, share, and engage with your audience across all major social platforms
        </p>
      </div>

      {/* Quick Share */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Quick Share
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="What would you like to share?"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={() => handleShare('twitter')} className="bg-blue-500 hover:bg-blue-600">
              <Twitter className="w-4 h-4 mr-2" />
              Tweet
            </Button>
            <Button onClick={() => handleShare('facebook')} className="bg-blue-600 hover:bg-blue-700">
              <Facebook className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button onClick={() => handleShare('linkedin')} className="bg-blue-700 hover:bg-blue-800">
              <Linkedin className="w-4 h-4 mr-2" />
              Post
            </Button>
            <Button onClick={copyToClipboard} variant="outline" className="border-gray-600">
              {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Connected Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <Card key={platform.name} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{platform.name}</h3>
                      <p className="text-gray-400 text-sm">{platform.followers} followers</p>
                    </div>
                  </div>
                  <Badge className={platform.connected ? 'bg-green-600' : 'bg-gray-600'}>
                    {platform.connected ? 'Connected' : 'Connect'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Engagement Rate</span>
                    <span className="text-white font-medium">{platform.engagement}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${platform.color}`}
                      style={{ width: platform.engagement }}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant={platform.connected ? "outline" : "default"}
                  size="sm"
                >
                  {platform.connected ? 'Manage' : 'Connect'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Recent Social Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-blue-600 text-white">{post.platform}</Badge>
                <span className="text-gray-400 text-sm">{post.timestamp}</span>
              </div>
              <p className="text-white mb-3">{post.content}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Repeat2 className="w-4 h-4" />
                  <span>{post.shares}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Social Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-blue-400 mb-2">583K</div>
            <div className="text-blue-300">Total Followers</div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-6 text-center">
            <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-green-400 mb-2">12.4K</div>
            <div className="text-green-300">Total Likes</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardContent className="p-6 text-center">
            <Share2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-purple-400 mb-2">3.2K</div>
            <div className="text-purple-300">Shares This Month</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-500/10 border-orange-500/20">
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-orange-400 mb-2">9.8%</div>
            <div className="text-orange-300">Avg Engagement</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}