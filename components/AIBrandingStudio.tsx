'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Wand2, 
  Download, 
  Share2, 
  Sparkles,
  Eye,
  Brush,
  Type,
  Image,
  Zap,
  RefreshCw,
  CheckCircle,
  Layers,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

const colorPalettes = [
  {
    name: 'Neon Synthwave',
    primary: '#FF006E',
    secondary: '#8338EC',
    accent: '#3A86FF',
    background: '#0A0A0A',
    text: '#FFFFFF'
  },
  {
    name: 'Ocean Depths',
    primary: '#006A6B',
    secondary: '#0081A7',
    accent: '#00AFB9',
    background: '#FDFCDC',
    text: '#003049'
  },
  {
    name: 'Sunset Vibes',
    primary: '#F77F00',
    secondary: '#FCBF49',
    accent: '#EAE2B7',
    background: '#003049',
    text: '#FFFFFF'
  },
  {
    name: 'Forest Harmony',
    primary: '#2D5016',
    secondary: '#61A5C2',
    accent: '#A9D6E5',
    background: '#E9F5F5',
    text: '#2D5016'
  },
  {
    name: 'Royal Purple',
    primary: '#6A0572',
    secondary: '#AB83A1',
    accent: '#FFC09F',
    background: '#FFEE93',
    text: '#6A0572'
  }
];

const logoStyles = [
  {
    name: 'Minimalist',
    description: 'Clean, simple geometric shapes',
    style: 'geometric'
  },
  {
    name: 'Gradient Modern',
    description: 'Contemporary gradients and smooth curves',
    style: 'gradient'
  },
  {
    name: 'Tech Futuristic',
    description: 'Angular, tech-inspired design',
    style: 'tech'
  },
  {
    name: 'Organic Flow',
    description: 'Natural, flowing organic shapes',
    style: 'organic'
  },
  {
    name: 'Retro Wave',
    description: '80s-inspired neon aesthetics',
    style: 'retro'
  }
];

const typographyPairs = [
  {
    name: 'Modern Sans',
    heading: 'Inter',
    body: 'Source Sans Pro',
    description: 'Clean and professional'
  },
  {
    name: 'Creative Mix',
    heading: 'Playfair Display',
    body: 'Lato',
    description: 'Elegant with personality'
  },
  {
    name: 'Tech Forward',
    heading: 'Space Mono',
    body: 'Roboto',
    description: 'Futuristic and readable'
  },
  {
    name: 'Warm Human',
    heading: 'Merriweather',
    body: 'Open Sans',
    description: 'Friendly and approachable'
  }
];

export default function AIBrandingStudio() {
  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0]);
  const [selectedLogo, setSelectedLogo] = useState(logoStyles[0]);
  const [selectedTypography, setSelectedTypography] = useState(typographyPairs[0]);
  const [brandName, setBrandName] = useState('SoundSphere');
  const [brandDescription, setBrandDescription] = useState('AI-Powered Music Streaming Platform');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const generateBranding = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const assets = {
      logo: {
        svg: generateLogoSVG(selectedLogo.style, selectedPalette),
        variations: ['primary', 'white', 'black', 'icon-only']
      },
      colorPalette: selectedPalette,
      typography: selectedTypography,
      brandGuidelines: {
        logoUsage: 'Maintain clear space equal to the height of the logo',
        colorUsage: 'Primary color for main elements, secondary for accents',
        typographyUsage: `${selectedTypography.heading} for headings, ${selectedTypography.body} for body text`
      },
      mockups: generateMockups()
    };
    
    setGeneratedAssets(assets);
    setIsGenerating(false);
  };

  const generateLogoSVG = (style: string, palette: any) => {
    const styles = {
      geometric: `
        <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:${palette.primary};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${palette.secondary};stop-opacity:1" />
            </linearGradient>
          </defs>
          <circle cx="30" cy="30" r="20" fill="url(#grad1)"/>
          <rect x="15" y="15" width="30" height="30" fill="none" stroke="${palette.accent}" stroke-width="2"/>
          <text x="60" y="35" font-family="Inter, sans-serif" font-size="24" font-weight="bold" fill="${palette.text}">SoundSphere</text>
        </svg>
      `,
      gradient: `
        <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:${palette.primary};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${palette.secondary};stop-opacity:1" />
            </radialGradient>
          </defs>
          <ellipse cx="30" cy="30" rx="25" ry="20" fill="url(#grad2)"/>
          <path d="M 20 30 Q 30 15 40 30 Q 30 45 20 30" fill="${palette.accent}"/>
          <text x="60" y="35" font-family="Inter, sans-serif" font-size="24" font-weight="bold" fill="${palette.text}">SoundSphere</text>
        </svg>
      `,
      tech: `
        <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <polygon points="15,15 45,15 40,30 45,45 15,45 20,30" fill="${palette.primary}"/>
          <polygon points="20,20 35,20 32,30 35,40 20,40 23,30" fill="${palette.accent}"/>
          <text x="60" y="35" font-family="Space Mono, monospace" font-size="24" font-weight="bold" fill="${palette.text}">SoundSphere</text>
        </svg>
      `,
      organic: `
        <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M 30 10 Q 50 20 45 40 Q 25 50 15 35 Q 10 15 30 10" fill="${palette.primary}"/>
          <path d="M 25 20 Q 35 25 32 35 Q 22 40 18 30 Q 15 20 25 20" fill="${palette.accent}"/>
          <text x="60" y="35" font-family="Merriweather, serif" font-size="24" font-weight="bold" fill="${palette.text}">SoundSphere</text>
        </svg>
      `,
      retro: `
        <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${palette.primary};stop-opacity:1" />
              <stop offset="50%" style="stop-color:${palette.secondary};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${palette.accent};stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="40" height="40" fill="url(#grad3)" rx="5"/>
          <rect x="15" y="15" width="30" height="5" fill="${palette.background}"/>
          <rect x="15" y="25" width="30" height="5" fill="${palette.background}"/>
          <rect x="15" y="35" width="30" height="5" fill="${palette.background}"/>
          <text x="60" y="35" font-family="Space Mono, monospace" font-size="24" font-weight="bold" fill="${palette.text}">SoundSphere</text>
        </svg>
      `
    };
    
    return styles[style as keyof typeof styles] || styles.geometric;
  };

  const generateMockups = () => {
    return [
      {
        type: 'Business Card',
        preview: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        type: 'Letterhead',
        preview: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        type: 'Social Media Kit',
        preview: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ];
  };

  const downloadAssets = () => {
    // Create downloadable brand package
    const brandPackage = {
      logo: generatedAssets?.logo,
      colorPalette: selectedPalette,
      typography: selectedTypography,
      guidelines: generatedAssets?.brandGuidelines
    };
    
    const blob = new Blob([JSON.stringify(brandPackage, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandName}-brand-package.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 text-sm">
          <Wand2 className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300">AI-Powered Branding Studio</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Brand Identity Generator
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Create professional brand identities with AI-generated logos, color palettes, and typography combinations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brush className="w-5 h-5 mr-2" />
                Brand Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Brand Name</Label>
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Description</Label>
                <Input
                  value={brandDescription}
                  onChange={(e) => setBrandDescription(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Color Palette
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {colorPalettes.map((palette, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedPalette.name === palette.name
                      ? 'ring-2 ring-purple-500 bg-gray-700/50'
                      : 'hover:bg-gray-700/30'
                  }`}
                  onClick={() => setSelectedPalette(palette)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{palette.name}</span>
                    {selectedPalette.name === palette.name && (
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: palette.primary }}></div>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: palette.secondary }}></div>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: palette.accent }}></div>
                    <div className="w-6 h-6 rounded border border-gray-600" style={{ backgroundColor: palette.background }}></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Image className="w-5 h-5 mr-2" />
                Logo Style
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {logoStyles.map((style, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedLogo.name === style.name
                      ? 'ring-2 ring-blue-500 bg-gray-700/50'
                      : 'hover:bg-gray-700/30'
                  }`}
                  onClick={() => setSelectedLogo(style)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{style.name}</span>
                    {selectedLogo.name === style.name && (
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{style.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Type className="w-5 h-5 mr-2" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {typographyPairs.map((pair, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedTypography.name === pair.name
                      ? 'ring-2 ring-green-500 bg-gray-700/50'
                      : 'hover:bg-gray-700/30'
                  }`}
                  onClick={() => setSelectedTypography(pair)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{pair.name}</span>
                    {selectedTypography.name === pair.name && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{pair.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {pair.heading} + {pair.body}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button
            onClick={generateBranding}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="lg"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating Brand...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Brand
              </>
            )}
          </Button>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Device Preview Toggle */}
          <div className="flex items-center justify-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-2">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
              className="text-gray-300"
            >
              <Monitor className="w-4 h-4 mr-1" />
              Desktop
            </Button>
            <Button
              variant={previewMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('tablet')}
              className="text-gray-300"
            >
              <Tablet className="w-4 h-4 mr-1" />
              Tablet
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
              className="text-gray-300"
            >
              <Smartphone className="w-4 h-4 mr-1" />
              Mobile
            </Button>
          </div>

          {/* Live Preview */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Live Preview
                </div>
                <Badge className="bg-green-600 text-white">Real-time</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className={`mx-auto transition-all duration-300 ${
                  previewMode === 'desktop' ? 'max-w-full' :
                  previewMode === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
                }`}
              >
                <div 
                  className="rounded-lg p-8 min-h-96"
                  style={{ 
                    backgroundColor: selectedPalette.background,
                    color: selectedPalette.text
                  }}
                >
                  {/* Logo Preview */}
                  <div className="mb-8">
                    <div 
                      className="w-48 h-12"
                      dangerouslySetInnerHTML={{ 
                        __html: generateLogoSVG(selectedLogo.style, selectedPalette) 
                      }}
                    />
                  </div>

                  {/* Typography Preview */}
                  <div className="space-y-4">
                    <h1 
                      className="text-4xl font-bold"
                      style={{ 
                        fontFamily: selectedTypography.heading,
                        color: selectedPalette.primary
                      }}
                    >
                      {brandName}
                    </h1>
                    <p 
                      className="text-lg"
                      style={{ 
                        fontFamily: selectedTypography.body,
                        color: selectedPalette.text
                      }}
                    >
                      {brandDescription}
                    </p>
                    
                    {/* Sample Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      <div 
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: selectedPalette.primary + '20' }}
                      >
                        <h3 
                          className="font-semibold mb-2"
                          style={{ 
                            fontFamily: selectedTypography.heading,
                            color: selectedPalette.primary
                          }}
                        >
                          Feature One
                        </h3>
                        <p 
                          className="text-sm"
                          style={{ fontFamily: selectedTypography.body }}
                        >
                          Sample content showcasing the brand typography and color usage.
                        </p>
                      </div>
                      <div 
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: selectedPalette.secondary + '20' }}
                      >
                        <h3 
                          className="font-semibold mb-2"
                          style={{ 
                            fontFamily: selectedTypography.heading,
                            color: selectedPalette.secondary
                          }}
                        >
                          Feature Two
                        </h3>
                        <p 
                          className="text-sm"
                          style={{ fontFamily: selectedTypography.body }}
                        >
                          Another example of how the brand elements work together.
                        </p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                      style={{
                        backgroundColor: selectedPalette.accent,
                        color: selectedPalette.background,
                        fontFamily: selectedTypography.body
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Assets */}
          {generatedAssets && (
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Layers className="w-5 h-5 mr-2" />
                    Generated Brand Assets
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={downloadAssets}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="logo" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                    <TabsTrigger value="logo">Logo</TabsTrigger>
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="typography">Typography</TabsTrigger>
                    <TabsTrigger value="mockups">Mockups</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="logo" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {generatedAssets.logo.variations.map((variation: string, index: number) => (
                        <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                          <h4 className="text-white font-medium mb-2 capitalize">{variation}</h4>
                          <div 
                            className="w-full h-16 bg-white rounded flex items-center justify-center"
                            dangerouslySetInnerHTML={{ 
                              __html: generateLogoSVG(selectedLogo.style, selectedPalette) 
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="colors" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(selectedPalette).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-3">
                          <div 
                            className="w-12 h-12 rounded-lg border border-gray-600"
                            style={{ backgroundColor: value as string }}
                          />
                          <div>
                            <div className="text-white font-medium capitalize">{key}</div>
                            <div className="text-gray-400 text-sm font-mono">{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="typography" className="space-y-4">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">Heading Font</h4>
                        <div 
                          className="text-2xl text-white"
                          style={{ fontFamily: selectedTypography.heading }}
                        >
                          {selectedTypography.heading}
                        </div>
                        <p className="text-gray-400 text-sm">The quick brown fox jumps over the lazy dog</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Body Font</h4>
                        <div 
                          className="text-lg text-white"
                          style={{ fontFamily: selectedTypography.body }}
                        >
                          {selectedTypography.body}
                        </div>
                        <p className="text-gray-400 text-sm">The quick brown fox jumps over the lazy dog</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mockups" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {generatedAssets.mockups.map((mockup: any, index: number) => (
                        <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                          <img 
                            src={mockup.preview} 
                            alt={mockup.type}
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                          <h4 className="text-white font-medium">{mockup.type}</h4>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}