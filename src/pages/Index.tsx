
import { Calculator, Home, CreditCard, TrendingDown, Flame, GraduationCap, Building } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const calculators = [
    {
      title: "Mortgage Calculator",
      description: "Calculate monthly payments, interest rates, and amortization schedules for home loans.",
      icon: Home,
      href: "/mortgage",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Auto Loan Calculator",
      description: "Determine car loan payments, total interest, and compare financing options.",
      icon: Calculator,
      href: "/auto-loan",
      color: "from-green-400 to-green-600"
    },
    {
      title: "Credit Card Calculator",
      description: "Plan your credit card payoff strategy and see how much interest you'll save.",
      icon: CreditCard,
      href: "/credit-card",
      color: "from-purple-400 to-purple-600"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              CalculatorsPlus
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Free online calculators for all your financial, health, and educational needs. 
              Make informed decisions with our accurate and easy-to-use tools.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Left Sidebar Ad */}
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

          {/* Calculator Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {calculators.map((calc, index) => {
                const IconComponent = calc.icon;
                return (
                  <Link
                    key={index}
                    to={calc.href}
                    className="group relative bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${calc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {calc.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {calc.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                        Calculate Now
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Features Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-8">
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
            <div className="w-full h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-sm font-medium mb-1">Advertisement</div>
                <div className="text-xs">728 x 90 Banner</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Ad */}
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
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-white/20 mt-16">
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
