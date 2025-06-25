
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Home, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShareButton from '@/components/ShareButton';
import CalculatorHeader from '@/components/CalculatorHeader';
import AdSenseAd from '@/components/AdSenseAd';

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
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [homeInsuranceRate, setHomeInsuranceRate] = useState(0.3);
  const [results, setResults] = useState<MortgageResult | null>(null);
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);
  
  // Additional costs
  const [monthlyPropertyTax, setMonthlyPropertyTax] = useState(0);
  const [monthlyInsurance, setMonthlyInsurance] = useState(0);
  const [hoaFees, setHoaFees] = useState(0);
  const [pmiAmount, setPmiAmount] = useState(0);
  const [otherCharges, setOtherCharges] = useState(0);
  
  // Loan type toggles
  const [isFHA, setIsFHA] = useState(false);
  const [isVA, setIsVA] = useState(false);
  const [pmi, setPmi] = useState(0);

  const calculateMortgage = () => {
    let adjustedHomePrice = homePrice;
    let adjustedDownPayment = downPayment;
    let monthlyPMI = 0;

    // FHA loan adjustments
    if (isFHA) {
      const minDownPayment = homePrice * 0.035;
      adjustedDownPayment = Math.max(downPayment, minDownPayment);
      // MIP calculation (0.85% annually for loans > 90% LTV)
      const loanAmount = adjustedHomePrice - adjustedDownPayment;
      if (loanAmount / adjustedHomePrice > 0.9) {
        monthlyPMI = (loanAmount * 0.0085) / 12;
      }
    }

    // VA loan adjustments
    if (isVA) {
      adjustedDownPayment = 0;
      // VA funding fee (2.3% for first-time use, can be rolled into loan)
      const fundingFee = homePrice * 0.023;
      adjustedHomePrice = homePrice + fundingFee;
    }

    const principal = adjustedHomePrice - adjustedDownPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    const annualPropertyTax = (homePrice * propertyTaxRate) / 100;
    const calculatedMonthlyPropertyTax = annualPropertyTax / 12;

    const annualHomeInsurance = (homePrice * homeInsuranceRate) / 100;
    const calculatedMonthlyHomeInsurance = annualHomeInsurance / 12;

    // Set the calculated values if they haven't been manually set
    if (monthlyPropertyTax === 0) {
      setMonthlyPropertyTax(calculatedMonthlyPropertyTax);
    }
    if (monthlyInsurance === 0) {
      setMonthlyInsurance(calculatedMonthlyHomeInsurance);
    }

    setResults({
      monthlyPayment: monthlyPayment + monthlyPMI,
      totalInterest: totalInterest,
      totalPayment: totalPayment,
      principal: principal,
      interest: interestRate,
      propertyTax: monthlyPropertyTax || calculatedMonthlyPropertyTax,
      homeInsurance: monthlyInsurance || calculatedMonthlyHomeInsurance,
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

  const handleScenario = (scenario: string) => {
    switch (scenario) {
      case 'fha':
        setIsFHA(!isFHA);
        setIsVA(false);
        break;
      case 'va':
        setIsVA(!isVA);
        setIsFHA(false);
        break;
      case 'biweekly':
        setLoanTerm(loanTerm === 30 ? 26 : 30); // Approximate biweekly effect
        break;
      case '15year':
        setLoanTerm(15);
        break;
      case '20down':
        setDownPayment(homePrice * 0.2);
        break;
    }
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTaxRate, homeInsuranceRate, isFHA, isVA, monthlyPropertyTax, monthlyInsurance]);

  const isJumboLoan = (homePrice - downPayment) > 766550; // 2024 conforming loan limit

  const totalMonthlyPayment = results ? 
    results.monthlyPayment + results.propertyTax + results.homeInsurance + hoaFees + pmiAmount + otherCharges : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      {/* Meta tags for SEO */}
      <head>
        <title>Mortgage Calculator | Free Home Loan & Amortization Tool</title>
        <meta name="description" content="Use our free mortgage calculator to estimate your monthly payments, total interest, and full amortization schedule. Compare FHA, VA, conventional, and jumbo loans." />
        <meta name="keywords" content="mortgage calculator, home loan calculator, mortgage payment calculator, amortization schedule, FHA loan, VA loan, jumbo loan, property tax, home insurance, first-time homebuyer" />
      </head>

      <CalculatorHeader
        title="Mortgage Calculator"
        description="Calculate monthly payments and amortization"
        icon={Home}
        gradientFrom="orange-400"
        gradientTo="pink-400"
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
                  
                  {/* Loan Type Toggles */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">FHA Loan</label>
                      <Switch checked={isFHA} onCheckedChange={setIsFHA} />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">VA Loan</label>
                      <Switch checked={isVA} onCheckedChange={setIsVA} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Panel */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Mortgage Results</CardTitle>
                  <CardDescription>Your estimated monthly payments</CardDescription>
                  {isJumboLoan && (
                    <Badge variant="outline" className="w-fit">Jumbo Loan</Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {results ? (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Total Monthly Payment</p>
                        <p className="text-2xl font-bold text-orange-600">
                          ${totalMonthlyPayment.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Principal & Interest</p>
                        <p className="text-xl font-bold text-blue-600">${results.monthlyPayment.toFixed(2)}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Total Interest</p>
                        <p className="text-xl font-bold text-green-600">${results.totalInterest.toFixed(2)}</p>
                      </div>
                      
                      {/* Editable monthly costs */}
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-medium text-gray-500">Monthly Property Tax</label>
                          </div>
                          <Input
                            type="number"
                            value={monthlyPropertyTax || results.propertyTax}
                            onChange={(e) => setMonthlyPropertyTax(Number(e.target.value))}
                            className="text-sm"
                          />
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-medium text-gray-500">Monthly Insurance</label>
                          </div>
                          <Input
                            type="number"
                            value={monthlyInsurance || results.homeInsurance}
                            onChange={(e) => setMonthlyInsurance(Number(e.target.value))}
                            className="text-sm"
                          />
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-medium text-gray-500">HOA Fees</label>
                          </div>
                          <Input
                            type="number"
                            value={hoaFees}
                            onChange={(e) => setHoaFees(Number(e.target.value))}
                            className="text-sm"
                          />
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-medium text-gray-500">PMI</label>
                          </div>
                          <Input
                            type="number"
                            value={pmiAmount}
                            onChange={(e) => setPmiAmount(Number(e.target.value))}
                            className="text-sm"
                          />
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-medium text-gray-500">Other Charges</label>
                          </div>
                          <Input
                            type="number"
                            value={otherCharges}
                            onChange={(e) => setOtherCharges(Number(e.target.value))}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Enter mortgage details to see calculations.</p>
                  )}
                  <Button onClick={() => setShowAmortization(!showAmortization)} className="w-full">
                    {showAmortization ? 'Hide Amortization Schedule' : 'Show Amortization Schedule'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Common Scenarios */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Common Scenarios</CardTitle>
                <CardDescription>Explore different mortgage options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" onClick={() => handleScenario('15year')}>
                    15-Year Loan
                  </Button>
                  <Button variant="outline" onClick={() => handleScenario('20down')}>
                    20% Down Payment
                  </Button>
                  <Button variant="outline" onClick={() => handleScenario('biweekly')}>
                    Bi-Weekly Payments
                  </Button>
                  <Button variant="outline" onClick={() => setInterestRate(interestRate - 0.5)}>
                    Lower Rate (-0.5%)
                  </Button>
                  <Button variant="outline" onClick={() => setInterestRate(interestRate + 0.5)}>
                    Higher Rate (+0.5%)
                  </Button>
                  <Button variant="outline" onClick={() => setHomePrice(homePrice * 1.1)}>
                    10% Higher Price
                  </Button>
                </div>
              </CardContent>
            </Card>

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
                        {amortizationSchedule.slice(0, 12).map((payment, index) => (
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
                    {amortizationSchedule.length > 12 && (
                      <p className="text-sm text-gray-500 mt-2">Showing first 12 payments of {amortizationSchedule.length} total payments</p>
                    )}
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

export default MortgageCalculator;
