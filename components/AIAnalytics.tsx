'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Brain,
  Target,
  Zap,
  Activity,
  PieChart,
  LineChart,
  Calendar,
  Download,
  Share2
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    activeUsers: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: string;
    conversionRate: number;
  };
  traffic: {
    organic: number;
    direct: number;
    social: number;
    referral: number;
    paid: number;
  };
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  aiInsights: {
    userBehavior: string[];
    recommendations: string[];
    predictions: string[];
  };
  realTime: {
    activeUsers: number;
    topPages: string[];
    topCountries: string[];
  };
}

export default function AIAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  const loadAnalytics = async () => {
    setIsLoading(true);
    
    // Simulate analytics data loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const data: AnalyticsData = {
      overview: {
        totalUsers: 45672,
        activeUsers: 12834,
        pageViews: 156789,
        bounceRate: 32.5,
        avgSessionDuration: '4m 23s',
        conversionRate: 8.7
      },
      traffic: {
        organic: 45,
        direct: 28,
        social: 15,
        referral: 8,
        paid: 4
      },
      devices: {
        desktop: 52,
        mobile: 38,
        tablet: 10
      },
      aiInsights: {
        userBehavior: [
          'Users spend 40% more time on AI-generated playlists',
          'Voice control feature has 85% user satisfaction',
          'Mobile users prefer shorter session durations',
          'Peak usage occurs between 7-9 PM'
        ],
        recommendations: [
          'Increase AI playlist recommendations on homepage',
          'Add more voice control prompts for mobile users',
          'Optimize loading times for evening traffic spikes',
          'Create targeted campaigns for tablet users'
        ],
        predictions: [
          'User growth expected to increase 23% next month',
          'AI features will drive 15% more engagement',
          'Mobile traffic will surpass desktop by Q2',
          'Voice control adoption will reach 60% by year-end'
        ]
      },
      realTime: {
        activeUsers: 1247,
        topPages: ['/ai-branding', '/spotify-player', '/home'],
        topCountries: ['United States', 'United Kingdom', 'Canada']
      }
    };
    
    setAnalyticsData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 text-sm mb-4">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300">AI-Powered Analytics</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Advanced Analytics Dashboard
          </h1>
          <p className="text-gray-300 mt-2">
            Real-time insights powered by machine learning and predictive analytics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-2">
        {['24h', '7d', '30d', '90d'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range}
          </Button>
        ))}
      </div>

      {analyticsData && (
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Total Users</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(analyticsData.overview.totalUsers)}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-green-400 text-xs">+12.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">Active Users</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(analyticsData.overview.activeUsers)}</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-green-400 text-xs">+8.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Page Views</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(analyticsData.overview.pageViews)}</p>
                  </div>
                  <Eye className="w-8 h-8 text-purple-400" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-green-400 text-xs">+15.7%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300 text-sm font-medium">Bounce Rate</p>
                    <p className="text-2xl font-bold text-white">{analyticsData.overview.bounceRate}%</p>
                  </div>
                  <Target className="w-8 h-8 text-orange-400" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-3 h-3 text-red-400 mr-1 rotate-180" />
                  <span className="text-green-400 text-xs">-2.1%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-300 text-sm font-medium">Avg. Session</p>
                    <p className="text-2xl font-bold text-white">{analyticsData.overview.avgSessionDuration}</p>
                  </div>
                  <Clock className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-green-400 text-xs">+5.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border-pink-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-300 text-sm font-medium">Conversion</p>
                    <p className="text-2xl font-bold text-white">{analyticsData.overview.conversionRate}%</p>
                  </div>
                  <Zap className="w-8 h-8 text-pink-400" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-green-400 text-xs">+3.8%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Analytics */}
          <Tabs defaultValue="traffic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
              <TabsTrigger value="realtime">Real-time</TabsTrigger>
            </TabsList>
            
            <TabsContent value="traffic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Traffic Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(analyticsData.traffic).map(([source, percentage]) => (
                      <div key={source} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 capitalize">{source}</span>
                          <span className="text-white font-semibold">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <PieChart className="w-5 h-5 mr-2" />
                      Traffic Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                        <span className="text-blue-300">Organic Search</span>
                        <Badge className="bg-blue-600 text-white">{analyticsData.traffic.organic}%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                        <span className="text-green-300">Direct Traffic</span>
                        <Badge className="bg-green-600 text-white">{analyticsData.traffic.direct}%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                        <span className="text-purple-300">Social Media</span>
                        <Badge className="bg-purple-600 text-white">{analyticsData.traffic.social}%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="devices" className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    Device Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-blue-500/10 rounded-lg">
                      <Monitor className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-white mb-2">{analyticsData.devices.desktop}%</div>
                      <div className="text-blue-300">Desktop</div>
                    </div>
                    <div className="text-center p-6 bg-green-500/10 rounded-lg">
                      <Smartphone className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-white mb-2">{analyticsData.devices.mobile}%</div>
                      <div className="text-green-300">Mobile</div>
                    </div>
                    <div className="text-center p-6 bg-purple-500/10 rounded-lg">
                      <Monitor className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-white mb-2">{analyticsData.devices.tablet}%</div>
                      <div className="text-purple-300">Tablet</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai-insights" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-blue-500/10 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-blue-300 flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      User Behavior
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analyticsData.aiInsights.userBehavior.map((insight, index) => (
                      <div key={index} className="text-blue-200 text-sm p-2 bg-blue-500/10 rounded">
                        {insight}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-green-500/10 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-green-300 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analyticsData.aiInsights.recommendations.map((rec, index) => (
                      <div key={index} className="text-green-200 text-sm p-2 bg-green-500/10 rounded">
                        {rec}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-purple-500/10 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-purple-300 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Predictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analyticsData.aiInsights.predictions.map((pred, index) => (
                      <div key={index} className="text-purple-200 text-sm p-2 bg-purple-500/10 rounded">
                        {pred}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="realtime" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Real-time Activity
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm">Live</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-green-400 mb-2">
                        {formatNumber(analyticsData.realTime.activeUsers)}
                      </div>
                      <div className="text-gray-400">Active Users Right Now</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Top Pages</h4>
                        <div className="space-y-2">
                          {analyticsData.realTime.topPages.map((page, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="text-gray-300">{page}</span>
                              <Badge variant="outline" className="border-gray-600 text-gray-300">
                                {Math.floor(Math.random() * 100) + 50}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-2">Top Countries</h4>
                        <div className="space-y-2">
                          {analyticsData.realTime.topCountries.map((country, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="text-gray-300">{country}</span>
                              <Badge variant="outline" className="border-gray-600 text-gray-300">
                                {Math.floor(Math.random() * 200) + 100}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <LineChart className="w-5 h-5 mr-2" />
                      Live Traffic Chart
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-center space-x-2">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div
                          key={i}
                          className="w-4 bg-gradient-to-t from-cyan-600 to-blue-400 rounded-t animate-pulse"
                          style={{ 
                            height: `${Math.random() * 80 + 20}%`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-center mt-4 text-gray-400 text-sm">
                      Last 20 minutes
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!analyticsData && (
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardContent className="text-center py-12">
            {isLoading ? (
              <div className="space-y-4">
                <BarChart3 className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
                <h3 className="text-xl font-semibold text-white">Loading Analytics...</h3>
                <p className="text-gray-400">Gathering insights from your data</p>
              </div>
            ) : (
              <div className="space-y-4">
                <BarChart3 className="w-16 h-16 text-gray-600 mx-auto" />
                <h3 className="text-xl font-semibold text-white">Analytics Dashboard</h3>
                <p className="text-gray-400">Advanced analytics with AI-powered insights</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}