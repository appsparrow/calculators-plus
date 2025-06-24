import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreditCardResult {
  monthsToPayoff: number;
  totalInterestPaid: number;
  monthlyPayment: number;
}

const CreditCardCalculator = () => {
  const [balance, setBalance] = useState(5000);
  const [interestRate, setInterestRate] = useState(18);
  const [monthlyPayment, setMonthlyPayment] = useState(200);
  const [results, setResults] = useState<CreditCardResult | null>(null);

  const calculatePayoff = () => {
    const monthlyInterestRate = interestRate / 100 / 12;
    let currentBalance = balance;
    let months = 0;
    let totalInterest = 0;

    if (monthlyPayment <= currentBalance * monthlyInterestRate) {
      setResults(null);
      return;
    }

    while (currentBalance > 0) {
      const interest = currentBalance * monthlyInterestRate;
      totalInterest += interest;
      currentBalance += interest;
      currentBalance -= monthlyPayment;
      months++;

      if (months > 1200) {
        setResults(null);
        return;
      }
    }

    setResults({
      monthsToPayoff: months,
      totalInterestPaid: totalInterest,
      monthlyPayment: monthlyPayment,
    });
  };

  useEffect(() => {
    if (balance > 0 && interestRate > 0 && monthlyPayment > 0) {
      calculatePayoff();
    }
  }, [balance, interestRate, monthlyPayment]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-orange-400 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Credit Card Payoff
                </h1>
                <p className="text-sm text-gray-600">Plan your debt repayment strategy</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Input Panel */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Credit Card Information</CardTitle>
                <CardDescription>Enter your credit card details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Balance</label>
                  <Input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Payment</label>
                  <Input
                    type="number"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Payoff Results</CardTitle>
                <CardDescription>Estimated time and interest to payoff</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {results ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Months to Payoff</span>
                      <span className="font-bold">{results.monthsToPayoff} months</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Interest Paid</span>
                      <span className="font-bold">${results.totalInterestPaid.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">
                    Enter credit card details to see payoff estimates.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Scenarios Panel */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Explore Scenarios</CardTitle>
                <CardDescription>Try different payment strategies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Increase Monthly Payment</h4>
                    <p className="text-sm text-gray-500">See how a higher payment can shorten your payoff time.</p>
                    <Button variant="outline">Try Scenario</Button>
                  </div>
                  <div>
                    <h4 className="font-medium">Lump Sum Payment</h4>
                    <p className="text-sm text-gray-500">Calculate the impact of a one-time extra payment.</p>
                    <Button variant="outline">Try Scenario</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

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
      </div>
    </div>
  );
};

export default CreditCardCalculator;
