'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building2,
  Users,
  Shield,
  Zap,
  BarChart3,
  Settings,
  Globe,
  Lock,
  Crown,
  Rocket,
  Star,
  CheckCircle,
  ArrowRight,
  Database,
  Cloud,
  Cpu,
  Network,
  Code,
  Headphones,
  Palette,
  Search,
  Brain
} from 'lucide-react';

const enterpriseFeatures = [
  {
    category: 'AI & Machine Learning',
    icon: Brain,
    features: [
      'Custom AI model training',
      'Advanced recommendation algorithms',
      'Predictive analytics',
      'Real-time personalization',
      'Multi-language AI support',
      'Voice recognition & synthesis'
    ]
  },
  {
    category: 'Infrastructure & Scale',
    icon: Cloud,
    features: [
      'Auto-scaling architecture',
      'Global CDN distribution',
      'Multi-region deployment',
      '99.99% uptime SLA',
      'Load balancing',
      'Edge computing optimization'
    ]
  },
  {
    category: 'Security & Compliance',
    icon: Shield,
    features: [
      'SOC 2 Type II compliance',
      'GDPR & CCPA ready',
      'End-to-end encryption',
      'Advanced threat protection',
      'Audit logging',
      'Role-based access control'
    ]
  },
  {
    category: 'Analytics & Insights',
    icon: BarChart3,
    features: [
      'Real-time analytics dashboard',
      'Custom reporting',
      'User behavior tracking',
      'A/B testing framework',
      'Performance monitoring',
      'Business intelligence tools'
    ]
  },
  {
    category: 'Integration & APIs',
    icon: Code,
    features: [
      'RESTful & GraphQL APIs',
      'Webhook support',
      'Third-party integrations',
      'SDK for multiple platforms',
      'Custom plugin architecture',
      'Enterprise SSO'
    ]
  },
  {
    category: 'Support & Services',
    icon: Headphones,
    features: [
      '24/7 dedicated support',
      'Technical account manager',
      'Custom implementation',
      'Training & onboarding',
      'Priority bug fixes',
      'Consulting services'
    ]
  }
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Perfect for small teams and startups',
    features: [
      'Up to 10,000 users',
      'Basic AI features',
      'Standard support',
      'Core analytics',
      'API access'
    ],
    color: 'blue',
    popular: false
  },
  {
    name: 'Professional',
    price: '$299',
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 100,000 users',
      'Advanced AI features',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
      'White-label options'
    ],
    color: 'purple',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: [
      'Unlimited users',
      'Custom AI models',
      'Dedicated support',
      'Enterprise analytics',
      'Full customization',
      'On-premise deployment'
    ],
    color: 'gold',
    popular: false
  }
];

const caseStudies = [
  {
    company: 'TechCorp',
    industry: 'Technology',
    logo: '🚀',
    challenge: 'Needed scalable music platform for 50,000+ employees',
    solution: 'Implemented enterprise SoundSphere with custom AI models',
    results: [
      '300% increase in employee engagement',
      '50% reduction in development time',
      '99.9% uptime achieved'
    ]
  },
  {
    company: 'MediaFlow',
    industry: 'Media & Entertainment',
    logo: '🎬',
    challenge: 'Required white-label solution for multiple brands',
    solution: 'Deployed multi-tenant architecture with custom branding',
    results: [
      '5 brands launched successfully',
      '2M+ users onboarded',
      '40% cost savings vs custom build'
    ]
  },
  {
    company: 'EduTech',
    industry: 'Education',
    logo: '📚',
    challenge: 'Needed GDPR-compliant platform for global students',
    solution: 'Implemented privacy-first architecture with regional compliance',
    results: [
      '100% GDPR compliance',
      '25 countries supported',
      '95% student satisfaction'
    ]
  }
];

export default function EnterpriseFeatures() {
  const [selectedPlan, setSelectedPlan] = useState('Professional');
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const getPlanColor = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-cyan-500';
      case 'purple': return 'from-purple-500 to-pink-500';
      case 'gold': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full px-4 py-2 text-sm">
          <Crown className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-300">Enterprise-Grade Platform</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
          Enterprise Solutions
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Scale your business with enterprise-grade AI music platform. Built for performance, security, and global reach.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
            <Rocket className="w-5 h-5 mr-2" />
            Schedule Demo
          </Button>
          <Button size="lg" variant="outline" className="border-yellow-500/50 text-yellow-300">
            <Building2 className="w-5 h-5 mr-2" />
            Contact Sales
          </Button>
        </div>
      </div>

      {/* Enterprise Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enterpriseFeatures.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-yellow-500/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon className="w-6 h-6 mr-3 text-yellow-400" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* The rest of your component (Pricing Plans, Case Studies, Technical Specs, CTA) remains unchanged */}
      {/* ... */}
    </div>
  );
}
