
import React from 'react';
import { Calculator, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>Terms & Conditions | CalculatorsPlus</title>
        <meta name="description" content="Terms and conditions for using CalculatorsPlus calculators. Important disclaimers about financial, health, and academic calculations." />
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
                  Terms & Conditions
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h2>
          
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Calculator Accuracy & Testing</h3>
              <p className="leading-relaxed">
                Our calculators have been extensively tested and reviewed by our close circle of users to ensure accuracy and reliability. However, these tools are provided for educational and estimation purposes only. While we strive for precision, we cannot guarantee 100% accuracy in all scenarios.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Not Professional Advice</h3>
              <p className="leading-relaxed">
                <strong>Important Disclaimer:</strong> These calculators are by no means professional advice for financial, health, academic, or any other matters concerning your specific situation. The results should be used as quick gauges or estimates for your personal planning only.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Use at Your Own Discretion</h3>
              <p className="leading-relaxed">
                Please use these calculators with your own discretion and judgment. Always consult with qualified professionals such as:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Financial advisors or mortgage brokers for loan and investment decisions</li>
                <li>Healthcare professionals for nutrition and calorie recommendations</li>
                <li>Academic counselors for GPA and educational planning</li>
                <li>Certified professionals relevant to your specific needs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reporting Issues</h3>
              <p className="leading-relaxed">
                If you notice any issues with our calculations or have suggestions for improvements, please let us know. We're committed to making our calculators better and more helpful for everyone. Your feedback helps us maintain and improve the accuracy of our tools.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
              <p className="leading-relaxed">
                CalculatorsPlus and its creators shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of these calculators. Users acknowledge that they use these tools at their own risk and should verify all important calculations independently.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceptable Use</h3>
              <p className="leading-relaxed">
                These calculators are intended for personal, non-commercial use. You may not copy, modify, or distribute our calculator algorithms without permission. Please use the share features we provide to recommend our tools to others.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Updates and Changes</h3>
              <p className="leading-relaxed">
                We may update our calculators, formulas, and these terms from time to time to improve accuracy and functionality. Continued use of our calculators constitutes acceptance of any updates to these terms.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
              <p className="text-yellow-800 font-medium">
                ⚠️ Remember: These are estimation tools designed to help you understand various scenarios. Always verify important financial, health, or academic decisions with qualified professionals.
              </p>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
