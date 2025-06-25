import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShareButton from '@/components/ShareButton';
import CalculatorHeader from '@/components/CalculatorHeader';
import AdSenseAd from '@/components/AdSenseAd';

interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

const AutoLoanCalculator = () => {
  const [loanAmount1, setLoanAmount1] = useState(25000);
  const [interestRate1, setInterestRate1] = useState(7.0);
  const [loanTerm1, setLoanTerm1] = useState(60);
  const [loanAmount2, setLoanAmount2] = useState(25000);
  const [interestRate2, setInterestRate2] = useState(7.5);
  const [loanTerm2, setLoanTerm2] = useState(72);
  const [result1, setResult1] = useState<LoanResult | null>(null);
  const [result2, setResult2] = useState<LoanResult | null>(null);

  const calculateLoan = (amount: number, rate: number, term: number) => {
    const monthlyInterestRate = rate / 100 / 12;
    const numberOfPayments = term;

    const monthlyPayment =
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    const totalCost = monthlyPayment * numberOfPayments;
    const totalInterest = totalCost - amount;

    return {
      monthlyPayment: monthlyPayment,
      totalInterest: totalInterest,
      totalCost: totalCost,
    };
  };

  useEffect(() => {
    const loan1 = calculateLoan(loanAmount1, interestRate1, loanTerm1);
    setResult1(loan1);
    const loan2 = calculateLoan(loanAmount2, interestRate2, loanTerm2);
    setResult2(loan2);
  }, [loanAmount1, interestRate1, loanTerm1, loanAmount2, interestRate2, loanTerm2]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>Auto Loan Comparison Calculator | Compare Car Loan Payments & Interest</title>
        <meta name="description" content="Compare car loans side-by-side with our auto loan comparison calculator. Calculate monthly payments, total interest, and find the best auto financing for your next vehicle." />
        <meta name="keywords" content="auto loan calculator, car loan comparison, vehicle loan calculator, car payment calculator, auto financing, compare car loans, total interest, car loan rates" />
      </head>

      <CalculatorHeader
        title="Auto Loan Calculator"
        description="Compare two loan options side-by-side"
        icon={Car}
        gradientFrom="blue-400"
        gradientTo="purple-400"
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
              {/* Loan Option 1 */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Loan Option 1</CardTitle>
                  <CardDescription>Enter the details for the first loan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Loan Amount</label>
                    <Input
                      type="number"
                      value={loanAmount1}
                      onChange={(e) => setLoanAmount1(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
                    <Input
                      type="number"
                      value={interestRate1}
                      onChange={(e) => setInterestRate1(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Loan Term (months)</label>
                    <Input
                      type="number"
                      value={loanTerm1}
                      onChange={(e) => setLoanTerm1(Number(e.target.value))}
                    />
                  </div>
                  {result1 && (
                    <div className="mt-4 space-y-2">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Monthly Payment</p>
                        <p className="text-xl font-bold text-blue-600">${result1.monthlyPayment.toFixed(2)}</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Total Interest</p>
                        <p className="text-xl font-bold text-purple-600">${result1.totalInterest.toFixed(2)}</p>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Total Cost</p>
                        <p className="text-xl font-bold text-indigo-600">${result1.totalCost.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Loan Option 2 */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Loan Option 2</CardTitle>
                  <CardDescription>Enter the details for the second loan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Loan Amount</label>
                    <Input
                      type="number"
                      value={loanAmount2}
                      onChange={(e) => setLoanAmount2(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
                    <Input
                      type="number"
                      value={interestRate2}
                      onChange={(e) => setInterestRate2(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Loan Term (months)</label>
                    <Input
                      type="number"
                      value={loanTerm2}
                      onChange={(e) => setLoanTerm2(Number(e.target.value))}
                    />
                  </div>
                  {result2 && (
                    <div className="mt-4 space-y-2">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Monthly Payment</p>
                        <p className="text-xl font-bold text-blue-600">${result2.monthlyPayment.toFixed(2)}</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Total Interest</p>
                        <p className="text-xl font-bold text-purple-600">${result2.totalInterest.toFixed(2)}</p>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Total Cost</p>
                        <p className="text-xl font-bold text-indigo-600">${result2.totalCost.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Comparison Summary */}
            {result1 && result2 && (
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Comparison Summary</CardTitle>
                  <CardDescription>See a side-by-side comparison of both loans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium">Monthly Payment</h4>
                      <p>Loan 1: ${result1.monthlyPayment.toFixed(2)}</p>
                      <p>Loan 2: ${result2.monthlyPayment.toFixed(2)}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Total Interest</h4>
                      <p>Loan 1: ${result1.totalInterest.toFixed(2)}</p>
                      <p>Loan 2: ${result2.totalInterest.toFixed(2)}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Total Cost</h4>
                      <p>Loan 1: ${result1.totalCost.toFixed(2)}</p>
                      <p>Loan 2: ${result2.totalCost.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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

export default AutoLoanCalculator;
