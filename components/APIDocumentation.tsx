'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Book, 
  Zap, 
  Key,
  Copy,
  CheckCircle,
  ExternalLink,
  Download,
  Play,
  Terminal,
  Globe,
  Shield,
  Cpu
} from 'lucide-react';

const apiEndpoints = [
  {
    method: 'GET',
    endpoint: '/api/v1/tracks/search',
    description: 'Search for tracks with AI-powered recommendations',
    parameters: [
      { name: 'q', type: 'string', required: true, description: 'Search query' },
      { name: 'limit', type: 'integer', required: false, description: 'Number of results (max 50)' },
      { name: 'genre', type: 'string', required: false, description: 'Filter by genre' }
    ],
    response: {
      tracks: [
        {
          id: 'string',
          title: 'string',
          artist: 'string',
          duration: 'integer',
          preview_url: 'string',
          ai_score: 'float'
        }
      ]
    }
  },
  {
    method: 'POST',
    endpoint: '/api/v1/playlists/generate',
    description: 'Generate AI-curated playlist based on mood and preferences',
    parameters: [
      { name: 'mood', type: 'string', required: true, description: 'Target mood (happy, sad, energetic, etc.)' },
      { name: 'duration', type: 'integer', required: false, description: 'Playlist duration in minutes' },
      { name: 'genres', type: 'array', required: false, description: 'Preferred genres' }
    ],
    response: {
      playlist: {
        id: 'string',
        title: 'string',
        tracks: 'array',
        ai_confidence: 'float'
      }
    }
  },
  {
    method: 'GET',
    endpoint: '/api/v1/recommendations',
    description: 'Get personalized AI recommendations',
    parameters: [
      { name: 'user_id', type: 'string', required: true, description: 'User identifier' },
      { name: 'seed_tracks', type: 'array', required: false, description: 'Seed track IDs' },
      { name: 'limit', type: 'integer', required: false, description: 'Number of recommendations' }
    ],
    response: {
      recommendations: [
        {
          track_id: 'string',
          confidence: 'float',
          reason: 'string'
        }
      ]
    }
  }
];

const sdkExamples = {
  javascript: `// Install: npm install @soundsphere/sdk
import SoundSphere from '@soundsphere/sdk';

const client = new SoundSphere({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Search for tracks
const tracks = await client.tracks.search({
  query: 'electronic music',
  limit: 10,
  genre: 'electronic'
});

// Generate AI playlist
const playlist = await client.playlists.generate({
  mood: 'energetic',
  duration: 60,
  genres: ['electronic', 'pop']
});

// Get recommendations
const recommendations = await client.recommendations.get({
  userId: 'user-123',
  seedTracks: ['track-1', 'track-2'],
  limit: 20
});`,

  python: `# Install: pip install soundsphere-sdk
from soundsphere import SoundSphere

client = SoundSphere(
    api_key='your-api-key',
    environment='production'
)

# Search for tracks
tracks = client.tracks.search(
    query='electronic music',
    limit=10,
    genre='electronic'
)

# Generate AI playlist
playlist = client.playlists.generate(
    mood='energetic',
    duration=60,
    genres=['electronic', 'pop']
)

# Get recommendations
recommendations = client.recommendations.get(
    user_id='user-123',
    seed_tracks=['track-1', 'track-2'],
    limit=20
)`,

  curl: `# Search for tracks
curl -X GET "https://api.soundsphere.com/v1/tracks/search" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "q": "electronic music",
    "limit": 10,
    "genre": "electronic"
  }'

# Generate AI playlist
curl -X POST "https://api.soundsphere.com/v1/playlists/generate" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "mood": "energetic",
    "duration": 60,
    "genres": ["electronic", "pop"]
  }'`
};

export default function APIDocumentation() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [selectedSDK, setSelectedSDK] = useState('javascript');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 text-sm">
          <Code className="w-4 h-4 text-blue-400" />
          <span className="text-blue-300">Developer API Documentation</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          SoundSphere API
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Powerful RESTful API with AI-powered music discovery, playlist generation, and recommendation engine
        </p>
      </div>

      {/* Quick Start */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <Key className="w-8 h-8 text-blue-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">1. Get API Key</h3>
              <p className="text-blue-200 text-sm">Sign up and get your API key from the developer dashboard</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg">
              <Code className="w-8 h-8 text-green-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">2. Install SDK</h3>
              <p className="text-green-200 text-sm">Use our official SDKs for JavaScript, Python, or REST API</p>
            </div>
            <div className="bg-purple-500/10 p-4 rounded-lg">
              <Play className="w-8 h-8 text-purple-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">3. Start Building</h3>
              <p className="text-purple-200 text-sm">Make your first API call and integrate AI music features</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">API Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {apiEndpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedEndpoint === index
                      ? 'bg-blue-500/20 border border-blue-500/30'
                      : 'hover:bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedEndpoint(index)}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={`${
                      endpoint.method === 'GET' ? 'bg-green-600' :
                      endpoint.method === 'POST' ? 'bg-blue-600' :
                      endpoint.method === 'PUT' ? 'bg-yellow-600' : 'bg-red-600'
                    } text-white text-xs`}>
                      {endpoint.method}
                    </Badge>
                    <span className="text-white text-sm font-mono">{endpoint.endpoint}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{endpoint.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Endpoint Details</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(apiEndpoints[selectedEndpoint].endpoint, 'endpoint')}
                  className="border-gray-600"
                >
                  {copiedCode === 'endpoint' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={`${
                    apiEndpoints[selectedEndpoint].method === 'GET' ? 'bg-green-600' :
                    apiEndpoints[selectedEndpoint].method === 'POST' ? 'bg-blue-600' :
                    'bg-yellow-600'
                  } text-white`}>
                    {apiEndpoints[selectedEndpoint].method}
                  </Badge>
                  <code className="text-blue-400 font-mono">{apiEndpoints[selectedEndpoint].endpoint}</code>
                </div>
                <p className="text-gray-300">{apiEndpoints[selectedEndpoint].description}</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Parameters</h4>
                <div className="space-y-2">
                  {apiEndpoints[selectedEndpoint].parameters.map((param, index) => (
                    <div key={index} className="bg-gray-700/30 p-3 rounded">
                      <div className="flex items-center space-x-2 mb-1">
                        <code className="text-blue-400">{param.name}</code>
                        <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          {param.type}
                        </Badge>
                        {param.required && (
                          <Badge className="bg-red-600 text-white text-xs">Required</Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{param.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Response</h4>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    {JSON.stringify(apiEndpoints[selectedEndpoint].response, null, 2)}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SDK Examples */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Terminal className="w-5 h-5 mr-2" />
            SDK Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedSDK} onValueChange={setSelectedSDK} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-700">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            
            {Object.entries(sdkExamples).map(([lang, code]) => (
              <TabsContent key={lang} value={lang} className="space-y-4">
                <div className="relative">
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 z-10 border-gray-600"
                    onClick={() => copyToClipboard(code, lang)}
                  >
                    {copiedCode === lang ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <div className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Rate Limits & Authentication */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h4 className="text-blue-300 font-semibold mb-2">API Key Authentication</h4>
              <p className="text-blue-200 text-sm mb-3">Include your API key in the Authorization header:</p>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-green-400 text-xs">Authorization: Bearer your-api-key</code>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Rate Limit</span>
                <Badge className="bg-green-600 text-white">1000/hour</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Burst Limit</span>
                <Badge className="bg-blue-600 text-white">100/minute</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Timeout</span>
                <Badge className="bg-purple-600 text-white">30 seconds</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Base URLs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-green-300 font-semibold">Production</span>
                  <Badge className="bg-green-600 text-white text-xs">Live</Badge>
                </div>
                <code className="text-green-400 text-sm">https://api.soundsphere.com/v1</code>
              </div>
              <div className="bg-yellow-500/10 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-yellow-300 font-semibold">Staging</span>
                  <Badge className="bg-yellow-600 text-white text-xs">Test</Badge>
                </div>
                <code className="text-yellow-400 text-sm">https://staging-api.soundsphere.com/v1</code>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Status: </span>
                <Badge className="bg-green-600 text-white text-xs">All Systems Operational</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resources */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Book className="w-12 h-12 text-blue-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Need More Help?</h3>
            <p className="text-gray-300">Explore our comprehensive documentation and resources</p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" className="border-blue-500/50 text-blue-300">
                <Book className="w-4 h-4 mr-2" />
                Full Documentation
              </Button>
              <Button variant="outline" className="border-purple-500/50 text-purple-300">
                <Download className="w-4 h-4 mr-2" />
                Postman Collection
              </Button>
              <Button variant="outline" className="border-green-500/50 text-green-300">
                <ExternalLink className="w-4 h-4 mr-2" />
                Interactive Playground
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}