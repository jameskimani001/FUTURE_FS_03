'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Music Producer",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "SoundSphere's AI discovered artists I never would have found. It's revolutionized how I find inspiration for my productions.",
    rating: 5,
    verified: true
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "DJ & Artist",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "The neural music discovery is incredible. It's like having a personal music curator who knows exactly what I want to hear.",
    rating: 5,
    verified: true
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Music Journalist",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "I've been covering the music industry for 10 years, and SoundSphere represents the most exciting advancement I've seen.",
    rating: 5,
    verified: true
  },
  {
    id: 4,
    name: "David Kim",
    role: "Audio Engineer",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "The 3D audio experience is phenomenal. It's changed how I think about spatial audio in my professional work.",
    rating: 5,
    verified: false
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Music Lover",
    avatar: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "Finally, a platform that understands my mood and finds the perfect soundtrack for every moment of my day.",
    rating: 5,
    verified: false
  },
  {
    id: 6,
    name: "Alex Rivera",
    role: "Electronic Artist",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "The AI composition assistant has become an essential part of my creative process. It's like collaborating with the future.",
    rating: 5,
    verified: true
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              What Our Community Says
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of artists, producers, and music lovers who've transformed their audio experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-8 h-8 text-purple-400" />
              </div>
              
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">1M+</div>
              <div className="text-gray-400">Songs Discovered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}