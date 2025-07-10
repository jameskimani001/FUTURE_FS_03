'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Monitor, Smartphone, Wifi, HardDrive, Clock, Image, Code, Database, CheckCircle, AlertTriangle, TrendingUp, Gauge, Maximize as Optimize, RefreshCw } from 'lucide-react';

interface PerformanceMetrics {
  overall: number;
  metrics: {
    fcp: number; // First Contentful Paint
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
    ttfb: number; // Time to First Byte
  };
  opportunities: {
    name: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    savings: string;
  }[];
  diagnostics: {
    name: string;
    status: 'good' | 'warning' | 'error';
    value: string;
    recommendation: string;
  }[];
}

export default function PerformanceOptimizer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile'>('desktop');

  const analyzePerformance = async () => {
    setIsAnalyzing(true);
    
    // Simulate performance analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const performanceData: PerformanceMetrics = {
      overall: selectedDevice === 'desktop' ? 92 : 87,
      metrics: {
        fcp: selectedDevice === 'desktop' ? 1.2 : 1.8,
        lcp: selectedDevice === 'desktop' ? 2.1 : 2.9,
        fid: selectedDevice === 'desktop' ? 8 : 15,
        cls: selectedDevice === 'desktop' ? 0.05 : 0.12,
        ttfb: selectedDevice === 'desktop' ? 0.3 : 0.6
      },
      opportunities: [
        {
          name: 'Optimize Images',
          description: 'Serve images in next-gen formats like WebP',
          impact: 'high',
          savings: '1.2s'
        },
        {
          name: 'Minify JavaScript',
          description: 'Remove unused JavaScript and minify files',
          impact: 'medium',
          savings: '0.8s'
        },
        {
          name: 'Enable Text Compression',
          description: 'Use gzip or brotli compression for text resources',
          impact: 'medium',
          savings: '0.5s'
        },
        {
          name: 'Preload Key Resources',
          description: 'Preload critical fonts and CSS files',
          impact: 'low',
          savings: '0.3s'
        }
      ],
      diagnostics: [
        {
          name: 'HTTP/2 Enabled',
          status: 'good',
          value: 'Yes',
          recommendation: 'HTTP/2 is properly configured'
        },
        {
          name: 'Image Optimization',
          status: 'warning',
          value: '78%',
          recommendation: 'Consider using WebP format for better compression'
        },
        {
          name: 'Caching Strategy',
          status: 'good',
          value: 'Optimized',
          recommendation: 'Cache headers are properly configured'
        },
        {
          name: 'Bundle Size',
          status: 'warning',
          value: '2.1MB',
          recommendation: 'Consider code splitting to reduce initial bundle size'
        }
      ]
    };
    
    setMetrics(performanceData);
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  useEffect(() => {
    // Auto-analyze on device change
    if (metrics) {
      analyzePerformance();
    }
  }, [selectedDevice]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-4 py-2 text-sm">
          <Zap className="w-4 h-4 text-orange-400" />
          <span className="text-orange-300">Performance Optimization</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          Website Performance Analyzer
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Analyze and optimize your website's performance with detailed metrics and actionable recommendations
        </p>
      </div>

      {/* Device Selection */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant={selectedDevice === 'desktop' ? 'default' : 'outline'}
          onClick={() => setSelectedDevice('desktop')}
          className="flex items-center space-x-2"
        >
          <Monitor className="w-4 h-4" />
          <span>Desktop</span>
        </Button>
        <Button
          variant={selectedDevice === 'mobile' ? 'default' : 'outline'}
          onClick={() => setSelectedDevice('mobile')}
          className="flex items-center space-x-2"
        >
          <Smartphone className="w-4 h-4" />
          <span>Mobile</span>
        </Button>
      </div>

      {/* Analyze Button */}
      <div className="text-center">
        <Button
          onClick={analyzePerformance}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Performance...
            </>
          ) : (
            <>
              <Gauge className="w-5 h-5 mr-2" />
              Analyze {selectedDevice === 'desktop' ? 'Desktop' : 'Mobile'} Performance
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {metrics && (
        <div className="space-y-8">
          {/* Overall Score */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Performance Score
                </div>
                <Badge className={`${getScoreBg(metrics.overall)} text-white`}>
                  {selectedDevice === 'desktop' ? 'Desktop' : 'Mobile'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`text-8xl font-bold ${getScoreColor(metrics.overall)}`}>
                  {metrics.overall}
                </div>
                <div className="text-gray-400">Overall Performance Score</div>
                <Progress value={metrics.overall} className="w-full max-w-md mx-auto" />
              </div>
            </CardContent>
          </Card>

          {/* Core Web Vitals */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Core Web Vitals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(metrics.metrics.fcp <= 1.8 ? 90 : 60)}`}>
                    {metrics.metrics.fcp}s
                  </div>
                  <div className="text-gray-400 text-sm">First Contentful Paint</div>
                  <div className="text-xs text-gray-500 mt-1">Good: &lt; 1.8s</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(metrics.metrics.lcp <= 2.5 ? 90 : 60)}`}>
                    {metrics.metrics.lcp}s
                  </div>
                  <div className="text-gray-400 text-sm">Largest Contentful Paint</div>
                  <div className="text-xs text-gray-500 mt-1">Good: &lt; 2.5s</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(metrics.metrics.fid <= 100 ? 90 : 60)}`}>
                    {metrics.metrics.fid}ms
                  </div>
                  <div className="text-gray-400 text-sm">First Input Delay</div>
                  <div className="text-xs text-gray-500 mt-1">Good: &lt; 100ms</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(metrics.metrics.cls <= 0.1 ? 90 : 60)}`}>
                    {metrics.metrics.cls}
                  </div>
                  <div className="text-gray-400 text-sm">Cumulative Layout Shift</div>
                  <div className="text-xs text-gray-500 mt-1">Good: &lt; 0.1</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(metrics.metrics.ttfb <= 0.8 ? 90 : 60)}`}>
                    {metrics.metrics.ttfb}s
                  </div>
                  <div className="text-gray-400 text-sm">Time to First Byte</div>
                  <div className="text-xs text-gray-500 mt-1">Good: &lt; 0.8s</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <Tabs defaultValue="opportunities" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="opportunities" className="space-y-4">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Optimize className="w-5 h-5 mr-2" />
                    Performance Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {metrics.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-white font-medium">{opportunity.name}</h4>
                          <Badge className={`${getImpactColor(opportunity.impact)} text-white text-xs`}>
                            {opportunity.impact} impact
                          </Badge>
                          <Badge variant="outline" className="border-green-500 text-green-300 text-xs">
                            Save {opportunity.savings}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{opportunity.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="diagnostics" className="space-y-4">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Performance Diagnostics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {metrics.diagnostics.map((diagnostic, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-lg">
                      <div className="mt-0.5">
                        {getStatusIcon(diagnostic.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{diagnostic.name}</h4>
                          <span className="text-gray-300 font-mono text-sm">{diagnostic.value}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{diagnostic.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Optimization Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-6 text-center">
                <Image className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-blue-300 font-semibold mb-2">Image Optimization</h3>
                <p className="text-blue-200 text-sm">
                  Use WebP format and lazy loading for better performance
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-6 text-center">
                <Code className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-green-300 font-semibold mb-2">Code Splitting</h3>
                <p className="text-green-200 text-sm">
                  Split your JavaScript bundles for faster initial load times
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-6 text-center">
                <Wifi className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-purple-300 font-semibold mb-2">CDN & Caching</h3>
                <p className="text-purple-200 text-sm">
                  Implement proper caching strategies and use a CDN
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!metrics && !isAnalyzing && (
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardContent className="text-center py-12">
            <Gauge className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Ready to Analyze</h3>
            <p className="text-gray-400">
              Click the analyze button to get detailed performance insights for your website
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}