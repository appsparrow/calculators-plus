import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoanComparison {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalCost: number;
}

const AutoLoanCalculator = () => {
  const [loanAmount1, setLoanAmount1] = useState(25000);
  const [interestRate1, setInterestRate1] = useState(6.5);
  const [loanTerm1, setLoanTerm1] = useState(60);
  const [loanAmount2, setLoanAmount2] = useState(30000);
  const [interestRate2, setInterestRate2] = useState(7.0);
  const [loanTerm2, setLoanTerm2] = useState(72);
  const [comparisonResults, setComparisonResults] = useState<LoanComparison[]>([
    {
      loanAmount: 0,
      interestRate: 0,
      loanTerm: 0,
      monthlyPayment: 0,
      totalCost: 0,
    },
    {
      loanAmount: 0,
      interestRate: 0,
      loanTerm: 0,
      monthlyPayment: 0,
      totalCost: 0,
    },
  ]);

  const calculateLoan = (loanAmount: number, interestRate: number, loanTerm: number) => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalCost = monthlyPayment * numberOfPayments;

    return {
      monthlyPayment: monthlyPayment || 0,
      totalCost: totalCost || 0,
    };
  };

  useEffect(() => {
    const loan1 = calculateLoan(loanAmount1, interestRate1, loanTerm1);
    const loan2 = calculateLoan(loanAmount2, interestRate2, loanTerm2);

    setComparisonResults([
      {
        loanAmount: loanAmount1,
        interestRate: interestRate1,
        loanTerm: loanTerm1,
        monthlyPayment: loan1.monthlyPayment,
        totalCost: loan1.totalCost,
      },
      {
        loanAmount: loanAmount2,
        interestRate: interestRate2,
        loanTerm: loanTerm2,
        monthlyPayment: loan2.monthlyPayment,
        totalCost: loan2.totalCost,
      },
    ]);
  }, [loanAmount1, interestRate1, loanTerm1, loanAmount2, interestRate2, loanTerm2]);

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
              <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-400 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Auto Loan Calculator
                </h1>
                <p className="text-sm text-gray-600">Compare car loan options</p>
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
            {/* Input Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Loan Option 1</CardTitle>
                  <CardDescription>Enter details for the first loan option</CardDescription>
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
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Loan Option 2</CardTitle>
                  <CardDescription>Enter details for the second loan option</CardDescription>
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
                </CardContent>
              </Card>
            </div>

            {/* Comparison Results */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Comparison Results</CardTitle>
                <CardDescription>See a side-by-side comparison of the two loan options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2"></th>
                        <th className="text-center p-2">Loan Option 1</th>
                        <th className="text-center p-2">Loan Option 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Loan Amount</td>
                        <td className="text-center p-2">${comparisonResults[0].loanAmount.toFixed(0)}</td>
                        <td className="text-center p-2">${comparisonResults[1].loanAmount.toFixed(0)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Interest Rate</td>
                        <td className="text-center p-2">{comparisonResults[0].interestRate.toFixed(2)}%</td>
                        <td className="text-center p-2">{comparisonResults[1].interestRate.toFixed(2)}%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Loan Term (months)</td>
                        <td className="text-center p-2">{comparisonResults[0].loanTerm}</td>
                        <td className="text-center p-2">{comparisonResults[1].loanTerm}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Monthly Payment</td>
                        <td className="text-center p-2">${comparisonResults[0].monthlyPayment.toFixed(2)}</td>
                        <td className="text-center p-2">${comparisonResults[1].monthlyPayment.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="p-2">Total Cost</td>
                        <td className="text-center p-2">${comparisonResults[0].totalCost.toFixed(2)}</td>
                        <td className="text-center p-2">${comparisonResults[1].totalCost.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
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

export default AutoLoanCalculator;
