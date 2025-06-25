
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShareButton from '@/components/ShareButton';
import CalculatorHeader from '@/components/CalculatorHeader';
import AdSenseAd from '@/components/AdSenseAd';

interface CreditCardResult {
  monthsToPayoff: number;
  totalInterestPaid: number;
  monthlyPayment: number;
  payoffDate: string;
}

const CreditCardCalculator = () => {
  const [balance, setBalance] = useState(5000);
  const [interestRate, setInterestRate] = useState(18);
  const [monthlyPayment, setMonthlyPayment] = useState(200);
  const [results, setResults] = useState<CreditCardResult | null>(null);
  const [extraPayment, setExtraPayment] = useState(0);
  const [lumpSum, setLumpSum] = useState(0);

  const calculatePayoff = (currentBalance = balance, payment = monthlyPayment, extra = 0, lump = 0) => {
    const monthlyInterestRate = interestRate / 100 / 12;
    let remainingBalance = currentBalance - lump;
    let months = 0;
    let totalInterest = 0;
    const totalPayment = payment + extra;

    if (totalPayment <= remainingBalance * monthlyInterestRate) {
      return null;
    }

    while (remainingBalance > 0) {
      const interest = remainingBalance * monthlyInterestRate;
      totalInterest += interest;
      remainingBalance += interest;
      
      if (remainingBalance <= totalPayment) {
        months++;
        break;
      }
      
      remainingBalance -= totalPayment;
      months++;

      if (months > 1200) {
        return null;
      }
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);

    return {
      monthsToPayoff: months,
      totalInterestPaid: totalInterest,
      monthlyPayment: totalPayment,
      payoffDate: payoffDate.toLocaleDateString(),
    };
  };

  const handleScenario = (scenario: string) => {
    switch (scenario) {
      case 'doublePayment':
        setMonthlyPayment(monthlyPayment * 2);
        break;
      case 'extra50':
        setExtraPayment(50);
        break;
      case 'extra100':
        setExtraPayment(100);
        break;
      case 'lump1000':
        setLumpSum(1000);
        break;
      case 'biweekly':
        setMonthlyPayment((monthlyPayment * 12) / 26);
        break;
      case 'minPayment':
        setMonthlyPayment(Math.max(25, balance * 0.02));
        break;
    }
  };

  useEffect(() => {
    if (balance > 0 && interestRate > 0 && monthlyPayment > 0) {
      const result = calculatePayoff();
      setResults(result);
    }
  }, [balance, interestRate, monthlyPayment, extraPayment, lumpSum]);

  const baseResults = calculatePayoff();
  const extraResults = extraPayment > 0 ? calculatePayoff(balance, monthlyPayment, extraPayment) : null;
  const lumpResults = lumpSum > 0 ? calculatePayoff(balance, monthlyPayment, 0, lumpSum) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>Credit Card Payoff Calculator | Debt Repayment & Interest Savings</title>
        <meta name="description" content="Plan your credit card debt payoff with our calculator. See how long it will take to pay off your balance, total interest paid, and how extra payments can save you money." />
        <meta name="keywords" content="credit card payoff calculator, debt repayment calculator, pay off credit card, credit card interest, debt snowball, debt avalanche, extra payment, lump sum payment" />
      </head>

      <CalculatorHeader
        title="Credit Card Payoff Calculator"
        description="Plan your debt repayment strategy"
        icon={CreditCard}
        gradientFrom="pink-400"
        gradientTo="orange-400"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
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

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Input and Results Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <div>
                    <label className="block text-sm font-medium mb-1">Extra Monthly Payment (Optional)</label>
                    <Input
                      type="number"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">One-Time Lump Sum (Optional)</label>
                    <Input
                      type="number"
                      value={lumpSum}
                      onChange={(e) => setLumpSum(Number(e.target.value))}
                      placeholder="0"
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
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Time to Pay Off</p>
                        <p className="text-2xl font-bold text-pink-600">
                          {Math.floor(results.monthsToPayoff / 12)} years {results.monthsToPayoff % 12} months
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Total Interest Paid</p>
                        <p className="text-xl font-bold text-blue-600">${results.totalInterestPaid.toFixed(2)}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Payoff Date</p>
                        <p className="text-lg font-bold text-green-600">{results.payoffDate}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Total Amount Paid</p>
                        <p className="text-lg font-bold text-purple-600">
                          ${(balance + results.totalInterestPaid).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-red-600 font-medium">
                        Your monthly payment is too low to cover the interest. Please increase your payment.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Scenarios Comparison */}
            {(extraResults || lumpResults) && (
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Payment Strategy Comparison</CardTitle>
                  <CardDescription>See how different strategies compare</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {baseResults && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Current Plan</h4>
                        <p className="text-sm">Months: {baseResults.monthsToPayoff}</p>
                        <p className="text-sm">Interest: ${baseResults.totalInterestPaid.toFixed(2)}</p>
                      </div>
                    )}
                    {extraResults && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium mb-2">With Extra Payment</h4>
                        <p className="text-sm">Months: {extraResults.monthsToPayoff}</p>
                        <p className="text-sm">Interest: ${extraResults.totalInterestPaid.toFixed(2)}</p>
                        <p className="text-xs text-green-600">
                          Save: ${(baseResults ? baseResults.totalInterestPaid - extraResults.totalInterestPaid : 0).toFixed(2)}
                        </p>
                      </div>
                    )}
                    {lumpResults && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-2">With Lump Sum</h4>
                        <p className="text-sm">Months: {lumpResults.monthsToPayoff}</p>
                        <p className="text-sm">Interest: ${lumpResults.totalInterestPaid.toFixed(2)}</p>
                        <p className="text-xs text-blue-600">
                          Save: ${(baseResults ? baseResults.totalInterestPaid - lumpResults.totalInterestPaid : 0).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Scenarios */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Try Different Scenarios</CardTitle>
                <CardDescription>Quick ways to see how you can pay off debt faster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" onClick={() => handleScenario('doublePayment')}>
                    Double Payment
                  </Button>
                  <Button variant="outline" onClick={() => handleScenario('extra50')}>
                    +$50 Extra
                  </Button>
                  <Button variant="outline" onClick={() => handleScenario('extra100')}>
                    +$100 Extra
                  </Button>
                  <Button variant="outline" onClick={() => handleScenario('lump1000')}>
                    $1,000 Lump Sum
                  </Button>
                  <Button variant="outline" onClick={() => handleScenario('biweekly')}>
                    Bi-Weekly Payments
                  </Button>
                  <Button variant="outline" onClick={() => handleScenario('minPayment')}>
                    Minimum Payment
                  </Button>
                </div>
              </CardContent>
            </Card>

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
      </div>
    </div>
  );
};

export default CreditCardCalculator;
