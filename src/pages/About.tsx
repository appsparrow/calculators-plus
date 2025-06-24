
import React from 'react';
import { Calculator, ChevronLeft, Heart, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>About Us | CalculatorsPlus</title>
        <meta name="description" content="Learn about CalculatorsPlus - simple, intuitive calculators built by people who needed them and shared with friends who found them helpful." />
      </head>

      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 via-sky-400 to-pink-400 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-sky-600 to-pink-600 bg-clip-text text-transparent">
                  About CalculatorsPlus
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 via-sky-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Us, Shared with You</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              CalculatorsPlus started as a simple solution to our own everyday calculation needs.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">From Personal Need to Public Tool</h3>
                <p className="text-gray-700 leading-relaxed">
                  It started when we needed quick, reliable calculators for our own financial planning, health goals, and academic tracking. We built these tools for ourselves, making them as intuitive and comprehensive as possible. When we shared them with friends, they found them incredibly helpful too.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Beyond Our Inner Circle</h3>
                <p className="text-gray-700 leading-relaxed">
                  Word spread within our inner circle, and we realized these calculators might be helpful for more people than just our close friends and family. So here we are - sharing simple, intuitive calculators that consider the scenarios you might think of... and some you might not.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 via-sky-100 to-pink-100 rounded-xl p-6 border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What Makes Us Different</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Most Frequent Scenarios</h4>
                  <p className="text-sm text-gray-600">We focus on the calculations people actually need, not just basic formulas.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Intuitive Design</h4>
                  <p className="text-sm text-gray-600">Clean, simple interfaces that make complex calculations approachable.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Easy Sharing</h4>
                  <p className="text-sm text-gray-600">Built-in sharing features so you can easily recommend useful tools to others.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Privacy First</h4>
                  <p className="text-sm text-gray-600">Your data stays on your device - we never store your personal information.</p>
                </div>
              </div>
            </div>

            <div className="text-center bg-white/40 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide simple, accurate, and helpful calculators that make everyday financial, health, and academic planning easier for everyone. We believe good tools should be accessible, trustworthy, and actually useful for real-life scenarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
