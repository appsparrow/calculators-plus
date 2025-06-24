
import React from 'react';
import { Calculator, Home, Car, CreditCard, BarChart3, Flame, GraduationCap, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const calculators = [
  {
    id: 'mortgage',
    title: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments, interest, and amortization schedule.',
    icon: Home,
    color: 'from-orange-400 to-pink-400',
    scenarios: ['First-Time Buyer', 'Conventional', 'Jumbo Loan', 'VA Loan'],
    popular: true,
    route: '/mortgage'
  },
  {
    id: 'auto-loan',
    title: 'Auto Loan Compare',
    description: 'Compare car loan payments and total cost of ownership.',
    icon: Car,
    color: 'from-sky-400 to-blue-400',
    scenarios: ['New Car', 'Used Car', '0% APR', 'Lease vs Buy'],
    popular: true,
    route: '/auto-loan'
  },
  {
    id: 'credit-card',
    title: 'Credit Card Payoff',
    description: 'Plan your credit card debt repayment and save on interest.',
    icon: CreditCard,
    color: 'from-pink-400 to-orange-400',
    scenarios: ['Extra Payment', 'Lump Sum', 'Bi-Weekly', 'Balance Transfer'],
    popular: true,
    route: '/credit-card'
  },
  {
    id: 'debt-payoff',
    title: 'Debt Payoff Calculator',
    description: 'Plan your debt payoff strategy and timeline.',
    icon: BarChart3,
    color: 'from-orange-400 to-sky-400',
    scenarios: ['Debt Avalanche', 'Debt Snowball', 'Mixed Strategy'],
    popular: false,
    route: '#'
  },
  {
    id: 'calorie',
    title: 'Calorie Calculator',
    description: 'Estimate daily calorie needs for weight management.',
    icon: Flame,
    color: 'from-pink-400 to-sky-400',
    scenarios: ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Athletic'],
    popular: false,
    route: '/calorie'
  },
  {
    id: 'gpa',
    title: 'GPA Calculator',
    description: 'Calculate your Grade Point Average for semester or cumulative GPA.',
    icon: GraduationCap,
    color: 'from-sky-400 to-pink-400',
    scenarios: ['Semester GPA', 'Cumulative', 'Target GPA', 'Course Planning'],
    popular: false,
    route: '#'
  }
];

const Index = () => {
  const shareCalculator = (calculator: typeof calculators[0]) => {
    if (navigator.share) {
      navigator.share({
        title: calculator.title,
        text: calculator.description,
        url: window.location.href + calculator.route
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href + calculator.route);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 via-sky-400 to-pink-400 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-sky-600 to-pink-600 bg-clip-text text-transparent">
                  CalculatorsPlus
                </h1>
                <p className="text-sm text-gray-600">Most frequent scenarios made simple</p>
              </div>
            </div>
            <Button variant="outline" className="hidden sm:flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share Site</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Ad Space */}
          <aside className="hidden lg:block w-40 flex-shrink-0">
            <div className="sticky top-24">
              <div className="w-full h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-xs font-medium mb-1">Advertisement</div>
                  <div className="text-xs">160 x 600</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Calculate with
                <span className="bg-gradient-to-r from-orange-600 via-sky-600 to-pink-600 bg-clip-text text-transparent">
                  {" "}Confidence
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Smart calculators for life's most important financial decisions. 
                Simple interface, accurate results, easy sharing.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">✨ Intuitive Design</span>
                <span className="flex items-center">📱 Mobile Friendly</span>
                <span className="flex items-center">🔗 Easy Sharing</span>
                <span className="flex items-center">🎯 Common Scenarios</span>
              </div>
            </div>

            {/* Popular Calculators */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Most Popular</h3>
                <Badge className="bg-gradient-to-r from-orange-400 via-sky-400 to-pink-400 text-white">
                  Most Used
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculators.filter(calc => calc.popular).map((calculator) => (
                  <Card key={calculator.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm hover:scale-105">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${calculator.color} flex items-center justify-center mb-4`}>
                          <calculator.icon className="w-6 h-6 text-white" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareCalculator(calculator)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-xl">{calculator.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {calculator.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-2">Common Scenarios:</p>
                          <div className="flex flex-wrap gap-1">
                            {calculator.scenarios.slice(0, 3).map((scenario) => (
                              <Badge key={scenario} variant="secondary" className="text-xs">
                                {scenario}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {calculator.route !== '#' ? (
                          <Link to={calculator.route}>
                            <Button className={`w-full bg-gradient-to-r ${calculator.color} hover:opacity-90 text-white border-0`}>
                              Calculate Now
                            </Button>
                          </Link>
                        ) : (
                          <Button className={`w-full bg-gradient-to-r ${calculator.color} hover:opacity-90 text-white border-0`} disabled>
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Calculators */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">All Calculators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculators.filter(calc => !calc.popular).map((calculator) => (
                  <Card key={calculator.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/40 backdrop-blur-sm hover:bg-white/60">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${calculator.color} flex items-center justify-center mb-3`}>
                          <calculator.icon className="w-5 h-5 text-white" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareCalculator(calculator)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-lg">{calculator.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {calculator.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {calculator.scenarios.slice(0, 2).map((scenario) => (
                            <Badge key={scenario} variant="outline" className="text-xs">
                              {scenario}
                            </Badge>
                          ))}
                        </div>
                        {calculator.route !== '#' ? (
                          <Link to={calculator.route}>
                            <Button variant="outline" className="w-full hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50">
                              Try Calculator
                            </Button>
                          </Link>
                        ) : (
                          <Button variant="outline" className="w-full hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Bottom Ad Space */}
            <div className="mb-8">
              <div className="w-full h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-sm font-medium mb-1">Advertisement</div>
                  <div className="text-xs">728 x 90 Banner</div>
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar Ad Space */}
          <aside className="hidden lg:block w-40 flex-shrink-0">
            <div className="sticky top-24">
              <div className="w-full h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-xs font-medium mb-1">Advertisement</div>
                  <div className="text-xs">160 x 600</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 via-sky-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-orange-600 via-sky-600 to-pink-600 bg-clip-text text-transparent">
                CalculatorsPlus
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Making complex calculations simple and shareable
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Contact</a>
              <a href="#" className="hover:text-gray-700 transition-colors">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
