import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MortgageResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
  interest: number;
  propertyTax: number;
  homeInsurance: number;
}

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [homeInsuranceRate, setHomeInsuranceRate] = useState(0.3);
  const [results, setResults] = useState<MortgageResult | null>(null);
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    const annualPropertyTax = (homePrice * propertyTaxRate) / 100;
    const monthlyPropertyTax = annualPropertyTax / 12;

    const annualHomeInsurance = (homePrice * homeInsuranceRate) / 100;
    const monthlyHomeInsurance = annualHomeInsurance / 12;

    setResults({
      monthlyPayment: monthlyPayment,
      totalInterest: totalInterest,
      totalPayment: totalPayment,
      principal: principal,
      interest: interestRate,
      propertyTax: monthlyPropertyTax,
      homeInsurance: monthlyHomeInsurance,
    });

    generateAmortizationSchedule(
      principal,
      interestRate,
      loanTerm,
      monthlyPayment
    );
  };

  const generateAmortizationSchedule = (
    principal: number,
    interestRate: number,
    loanTerm: number,
    monthlyPayment: number
  ) => {
    let balance = principal;
    const schedule = [];
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;

      balance -= principalPayment;

      schedule.push({
        paymentNumber: i,
        beginningBalance: balance + principalPayment,
        monthlyPayment: monthlyPayment,
        principalPayment: principalPayment,
        interestPayment: interestPayment,
        endingBalance: balance > 0 ? balance : 0,
      });
    }

    setAmortizationSchedule(schedule);
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTaxRate, homeInsuranceRate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      {/* Meta tags for SEO */}
      <head>
        <title>Mortgage Calculator | Free Home Loan & Amortization Tool</title>
        <meta name="description" content="Use our free mortgage calculator to estimate your monthly payments, total interest, and full amortization schedule. Compare FHA, VA, conventional, and jumbo loans." />
        <meta name="keywords" content="mortgage calculator, home loan calculator, mortgage payment calculator, amortization schedule, FHA loan, VA loan, jumbo loan, property tax, home insurance, first-time homebuyer" />
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
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Mortgage Calculator
                </h1>
                <p className="text-sm text-gray-600">Calculate monthly payments and amortization</p>
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
                <CardTitle>Mortgage Details</CardTitle>
                <CardDescription>Enter your details to calculate your mortgage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Home Price</label>
                  <Input
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Down Payment</label>
                  <Input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
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
                  <label className="block text-sm font-medium mb-1">Loan Term (years)</label>
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Property Tax Rate (%)</label>
                  <Input
                    type="number"
                    value={propertyTaxRate}
                    onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Home Insurance Rate (%)</label>
                  <Input
                    type="number"
                    value={homeInsuranceRate}
                    onChange={(e) => setHomeInsuranceRate(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            {results && (
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Mortgage Results</CardTitle>
                  <CardDescription>Your estimated monthly payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Monthly Payment:</p>
                      <p className="text-2xl font-bold">${results.monthlyPayment.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Interest:</p>
                      <p className="text-2xl font-bold">${results.totalInterest.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Property Tax (Monthly):</p>
                      <p className="text-2xl font-bold">${results.propertyTax.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Home Insurance (Monthly):</p>
                      <p className="text-2xl font-bold">${results.homeInsurance.toFixed(2)}</p>
                    </div>
                  </div>
                  <Button onClick={() => setShowAmortization(!showAmortization)}>
                    {showAmortization ? 'Hide Amortization Schedule' : 'Show Amortization Schedule'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Amortization Schedule */}
            {showAmortization && (
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Amortization Schedule</CardTitle>
                  <CardDescription>A breakdown of each payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Payment #</th>
                          <th className="text-left p-2">Beginning Balance</th>
                          <th className="text-left p-2">Monthly Payment</th>
                          <th className="text-left p-2">Principal Payment</th>
                          <th className="text-left p-2">Interest Payment</th>
                          <th className="text-left p-2">Ending Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortizationSchedule.map((payment, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{payment.paymentNumber}</td>
                            <td className="p-2">${payment.beginningBalance.toFixed(2)}</td>
                            <td className="p-2">${payment.monthlyPayment.toFixed(2)}</td>
                            <td className="p-2">${payment.principalPayment.toFixed(2)}</td>
                            <td className="p-2">${payment.interestPayment.toFixed(2)}</td>
                            <td className="p-2">${payment.endingBalance.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

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

export default MortgageCalculator;
