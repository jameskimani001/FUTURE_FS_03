'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  TrendingUp, 
  Target, 
  Zap,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  Star
} from 'lucide-react';

interface SEOMetrics {
  score: number;
  issues: string[];
  recommendations: string[];
  keywords: string[];
  performance: {
    speed: number;
    mobile: number;
    accessibility: number;
    seo: number;
  };
}

export default function SEOOptimizer() {
  const [url, setUrl] = useState('https://soundsphere.app');
  const [targetKeywords, setTargetKeywords] = useState('music streaming, AI music, playlist generator');
  const [metaTitle, setMetaTitle] = useState('SoundSphere - AI-Powered Music Streaming Platform');
  const [metaDescription, setMetaDescription] = useState('Experience music like never before with AI-powered recommendations, curated playlists, and immersive audio experiences.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics | null>(null);

  const analyzeSEO = async () => {
    setIsAnalyzing(true);
    
    // Simulate SEO analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const metrics: SEOMetrics = {
      score: 87,
      issues: [
        'Missing alt text on 2 images',
        'Page load time could be improved',
        'Some internal links missing descriptive text'
      ],
      recommendations: [
        'Add structured data markup for better search visibility',
        'Optimize images with WebP format',
        'Implement lazy loading for below-fold content',
        'Add more internal linking between related pages',
        'Create XML sitemap for better crawling'
      ],
      keywords: [
        'music streaming',
        'AI music discovery',
        'playlist generator',
        'audio streaming',
        'music recommendation',
        'smart playlists'
      ],
      performance: {
        speed: 92,
        mobile: 89,
        accessibility: 94,
        seo: 87
      }
    };
    
    setSeoMetrics(metrics);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 text-sm">
          <Search className="w-4 h-4 text-green-400" />
          <span className="text-green-300">SEO & Performance Optimizer</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          SEO Analysis & Optimization
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Analyze and optimize your website for search engines with AI-powered recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="w-5 h-5 mr-2" />
                SEO Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Website URL</Label>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              
              <div>
                <Label className="text-gray-300">Target Keywords</Label>
                <Input
                  value={targetKeywords}
                  onChange={(e) => setTargetKeywords(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              
              <div>
                <Label className="text-gray-300">Meta Title</Label>
                <Input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  maxLength={60}
                />
                <div className="text-xs text-gray-400 mt-1">
                  {metaTitle.length}/60 characters
                </div>
              </div>
              
              <div>
                <Label className="text-gray-300">Meta Description</Label>
                <Textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  maxLength={160}
                  rows={3}
                />
                <div className="text-xs text-gray-400 mt-1">
                  {metaDescription.length}/160 characters
                </div>
              </div>

              <Button
                onClick={analyzeSEO}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Search className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing SEO...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Analyze SEO
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Quick SEO Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <div className="text-blue-200 text-sm">
                  Keep titles under 60 characters
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <div className="text-blue-200 text-sm">
                  Meta descriptions should be 150-160 characters
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <div className="text-blue-200 text-sm">
                  Use target keywords naturally in content
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <div className="text-blue-200 text-sm">
                  Optimize images with alt text and compression
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {seoMetrics && (
            <>
              {/* Overall Score */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      SEO Score
                    </div>
                    <Badge className={`${getScoreBg(seoMetrics.score)} text-white`}>
                      {seoMetrics.score}/100
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getScoreColor(seoMetrics.score)}`}>
                        {seoMetrics.score}
                      </div>
                      <div className="text-gray-400">Overall SEO Score</div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(seoMetrics.performance.speed)}`}>
                          {seoMetrics.performance.speed}
                        </div>
                        <div className="text-gray-400 text-sm flex items-center justify-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Speed
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(seoMetrics.performance.mobile)}`}>
                          {seoMetrics.performance.mobile}
                        </div>
                        <div className="text-gray-400 text-sm flex items-center justify-center">
                          <Smartphone className="w-3 h-3 mr-1" />
                          Mobile
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(seoMetrics.performance.accessibility)}`}>
                          {seoMetrics.performance.accessibility}
                        </div>
                        <div className="text-gray-400 text-sm flex items-center justify-center">
                          <Globe className="w-3 h-3 mr-1" />
                          Access
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(seoMetrics.performance.seo)}`}>
                          {seoMetrics.performance.seo}
                        </div>
                        <div className="text-gray-400 text-sm flex items-center justify-center">
                          <Search className="w-3 h-3 mr-1" />
                          SEO
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Issues & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-red-500/10 border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-300 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Issues Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {seoMetrics.issues.map((issue, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                          <div className="text-red-200 text-sm">{issue}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-500/10 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-green-300 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {seoMetrics.recommendations.slice(0, 3).map((rec, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                          <div className="text-green-200 text-sm">{rec}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Keywords Analysis */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Keyword Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-3">Detected Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {seoMetrics.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="border-blue-500 text-blue-300">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Keyword Density</h4>
                      <div className="space-y-2">
                        {seoMetrics.keywords.slice(0, 4).map((keyword, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-300">{keyword}</span>
                            <div className="flex items-center space-x-2">
                              <Progress 
                                value={Math.random() * 100} 
                                className="w-20" 
                              />
                              <span className="text-gray-400 text-sm">
                                {(Math.random() * 3).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Core Web Vitals</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Largest Contentful Paint</span>
                          <Badge className="bg-green-600 text-white">1.2s</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">First Input Delay</span>
                          <Badge className="bg-green-600 text-white">8ms</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Cumulative Layout Shift</span>
                          <Badge className="bg-yellow-600 text-white">0.15</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Technical SEO</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">HTTPS Enabled</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Mobile Friendly</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Sitemap Present</span>
                          <AlertCircle className="w-5 h-5 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!seoMetrics && !isAnalyzing && (
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="text-center py-12">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Analyze</h3>
                <p className="text-gray-400">
                  Configure your SEO settings and click "Analyze SEO" to get detailed insights
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}