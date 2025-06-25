
import { Calculator, Home, CreditCard, TrendingDown, Flame, GraduationCap, Building } from "lucide-react";
import { Link } from "react-router-dom";
import ShareButton from "@/components/ShareButton";
import CalculatorCard from "@/components/CalculatorCard";
import AdSenseAd, { AdPlaceholder } from "@/components/AdSenseAd";
import MobileAd from "@/components/MobileAd";

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center shrink-0">
                <Calculator className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">CalculatorsPlus</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Most frequent scenarios made simple</p>
              </div>
            </div>
            <div className="shrink-0 ml-4">
              <ShareButton
                url={window.location.href}
                title="CalculatorsPlus - Free Online Calculators"
                text="Check out these amazing free calculators for finance, health, and education!"
                variant="outline"
                className="bg-gray-100 hover:bg-gray-200"
                showText={false}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Ad */}
          <aside className="hidden lg:block w-40 flex-shrink-0">
            <div className="sticky top-24">
              <AdSenseAd
                adSlot="1234567890"
                width={160}
                height={600}
                responsive={false}
                adFormat="vertical"
              />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            

            {/* Most Popular Section */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Most Popular</h3>
                <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs sm:text-sm font-medium rounded-full">
                  Most Used
                </span>
              </div>
              
              {/* Top 3 calculators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {calculators.slice(0, 3).map((calc, index) => (
                  <CalculatorCard
                    key={index}
                    title={calc.title}
                    description={calc.description}
                    icon={calc.icon}
                    href={calc.href}
                    color={calc.color}
                    size="large"
                  />
                ))}
              </div>
            </div>

            {/* Mobile Ad between sections */}
            <MobileAd adSlot="3456789012" className="my-6" />

            {/* All Calculators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {calculators.slice(3).map((calc, index) => (
                <CalculatorCard
                  key={index + 3}
                  title={calc.title}
                  description={calc.description}
                  icon={calc.icon}
                  href={calc.href}
                  color={calc.color}
                  size="default"
                  className="rounded-xl"
                />
              ))}
            </div>

            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Free Online Calculators for<br className="hidden sm:block" />
                Finance, Health, and<br className="hidden sm:block" />
                Education
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
                Discover the most accurate and user-friendly online calculators for all your needs. Instantly estimate your <strong>mortgage payments</strong>, compare <strong>auto loans</strong>, plan your <strong>credit card payoff</strong>, create a <strong>debt repayment strategy</strong>, calculate your daily <strong>calorie needs</strong>, and track your <strong>GPA</strong>—all in one place. Our calculators are trusted by thousands for making smarter financial, health, and academic decisions. Start calculating and take control of your future today!
              </p>
              
              {/* Feature highlights */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-600 mb-8 sm:mb-12 px-4">
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

            {/* Features Section */}
            <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-200 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Why Choose CalculatorsPlus?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

            {/* Mobile Ad before bottom ad */}
            <MobileAd adSlot="4567890123" className="my-6" />

            {/* Bottom Ad */}
            <AdSenseAd
              adSlot="0987654321"
              width={728}
              height={90}
              responsive={true}
              adFormat="horizontal"
              className="w-full"
            />
          </div>

          {/* Right Sidebar Ad */}
          <aside className="hidden lg:block w-40 flex-shrink-0">
            <div className="sticky top-24">
              <AdSenseAd
                adSlot="5678901234"
                width={160}
                height={600}
                responsive={false}
                adFormat="vertical"
              />
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
