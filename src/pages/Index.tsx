
import { Calculator, Home, CreditCard, TrendingDown, Flame, GraduationCap, Building } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const calculators = [
    {
      title: "Mortgage Calculator",
      description: "Calculate monthly payments, interest rates, and amortization schedules for home loans.",
      icon: Home,
      href: "/mortgage",
      color: "from-orange-400 to-red-400"
    },
    {
      title: "Auto Loan Calculator", 
      description: "Determine car loan payments, total interest, and compare financing options.",
      icon: Calculator,
      href: "/auto-loan",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Credit Card Calculator",
      description: "Plan your credit card payoff strategy and see how much interest you'll save.",
      icon: CreditCard,
      href: "/credit-card",
      color: "from-pink-400 to-red-400"
    },
    {
      title: "Calorie Calculator",
      description: "Calculate daily calorie needs, BMR, and macro ratios for your health goals.",
      icon: Flame,
      href: "/calorie",
      color: "from-orange-400 to-orange-600"
    },
    {
      title: "Debt Payoff Calculator",
      description: "Create a debt elimination plan using avalanche or snowball methods.",
      icon: TrendingDown,
      href: "/debt-payoff",
      color: "from-red-400 to-red-600"
    },
    {
      title: "GPA Calculator",
      description: "Calculate your semester and cumulative GPA with course grades and credits.",
      icon: GraduationCap,
      href: "/gpa",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      title: "Rental Home Calculator",
      description: "Analyze rental property cash flow, ROI, and investment returns.",
      icon: Building,
      href: "/rental-home",
      color: "from-amber-400 to-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CalculatorsPlus</h1>
                <p className="text-sm text-gray-600">Most frequent scenarios made simple</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-sm font-medium">Share Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Left Sidebar Ad */}
          <aside className="hidden lg:block w-40 flex-shrink-0">
            <div className="sticky top-24">
              <div className="w-full h-96 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-xs font-medium mb-1">Advertisement</div>
                  <div className="text-xs">160 x 600</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Free Online Calculators for<br />
                Finance, Health, and<br />
                Education
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Discover the most accurate and user-friendly online calculators for all your needs. Instantly estimate your <strong>mortgage payments</strong>, compare <strong>auto loans</strong>, plan your <strong>credit card payoff</strong>, create a <strong>debt repayment strategy</strong>, calculate your daily <strong>calorie needs</strong>, and track your <strong>GPA</strong>—all in one place. Our calculators are trusted by thousands for making smarter financial, health, and academic decisions. Start calculating and take control of your future today!
              </p>
              
              {/* Feature highlights */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-12">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">✨</span>
                  <span>Intuitive Design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">📱</span>
                  <span>Mobile Friendly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">🔗</span>
                  <span>Easy Sharing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">🎯</span>
                  <span>Common Scenarios</span>
                </div>
              </div>
            </div>

            {/* Most Popular Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Most Popular</h3>
                <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-medium rounded-full">
                  Most Used
                </span>
              </div>
              
              {/* Top 3 calculators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {calculators.slice(0, 3).map((calc, index) => {
                  const IconComponent = calc.icon;
                  return (
                    <Link
                      key={index}
                      to={calc.href}
                      className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${calc.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{calc.title.replace(' Calculator', '')}</h4>
                      <p className="text-gray-600 text-sm mb-4">{calc.description}</p>
                      <div className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                        Calculate Now →
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* All Calculators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {calculators.slice(3).map((calc, index) => {
                const IconComponent = calc.icon;
                return (
                  <Link
                    key={index + 3}
                    to={calc.href}
                    className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${calc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{calc.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{calc.description}</p>
                    <div className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                      Calculate Now →
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose CalculatorsPlus?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
                  <p className="text-gray-600 text-sm">No hidden fees, no registration required. All calculators are completely free to use.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
                  <p className="text-gray-600 text-sm">Get accurate calculations immediately as you enter your information.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Privacy Protected</h3>
                  <p className="text-gray-600 text-sm">Your data stays private. We don't store or share your personal information.</p>
                </div>
              </div>
            </div>

            {/* Bottom Ad */}
            <div className="w-full h-24 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-sm font-medium mb-1">Advertisement</div>
                <div className="text-xs">728 x 90 Banner</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <aside className="hidden lg:block w-40 flex-shrink-0">
            <div className="sticky top-24">
              <div className="w-full h-96 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-xs font-medium mb-1">Advertisement</div>
                  <div className="text-xs">160 x 600</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900">CalculatorsPlus</h3>
              <p className="text-gray-600 text-sm">Making calculations simple and accessible</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link to="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</Link>
              <Link to="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</Link>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">&copy; 2024 CalculatorsPlus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
