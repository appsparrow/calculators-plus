
import React from 'react';
import { Calculator, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>Privacy Policy | CalculatorsPlus</title>
        <meta name="description" content="CalculatorsPlus privacy policy - we don't store your data. Learn about our commitment to protecting your privacy." />
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
                  Privacy Policy
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Privacy Matters</h2>
          
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Storage</h3>
              <p className="leading-relaxed">
                <strong>We do not store any of your personal or financial information in our database.</strong> All calculations are performed locally in your browser, and no data is transmitted to our servers or any third parties. Your mortgage amounts, loan details, personal information, grades, and health data remain completely private and secure on your device.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How Our Calculators Work</h3>
              <p className="leading-relaxed">
                Our calculators operate entirely within your web browser using JavaScript. When you enter information and perform calculations, all processing happens on your device. Once you close the browser or navigate away from the page, all entered data is automatically cleared and cannot be recovered.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies and Tracking</h3>
              <p className="leading-relaxed">
                We may use basic analytics cookies to understand how visitors use our site (such as which calculators are most popular), but these do not track personal information or calculation data. We may also display advertisements through third-party services, which may use their own cookies according to their privacy policies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h3>
              <p className="leading-relaxed">
                Our website may include advertisements served by third-party advertising networks. These services may collect non-personal information about your visits to our site and other websites to provide relevant advertisements. They do not have access to the data you enter into our calculators.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Responsibility</h3>
              <p className="leading-relaxed">
                While we ensure your data stays private, please make sure you are comfortable using this information for your personal calculations. Always verify important financial, health, or academic decisions with qualified professionals. Clear your browser data if you're using a shared or public computer.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Updates to This Policy</h3>
              <p className="leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
              <p className="text-blue-800 font-medium">
                💡 Bottom Line: Your calculator data never leaves your device. We're committed to keeping your financial, health, and academic information completely private.
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

export default Privacy;
