
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PayoffResults {
  monthsToPayoff: number;
  totalInterest: number;
  totalAmount: number;
  payoffDate: string;
}

interface ScenarioResults {
  monthsToPayoff: number;
  totalInterest: number;
  interestSaved: number;
  monthsSaved: number;
}

const CreditCardCalculator = () => {
  const [balance, setBalance] = useState(10000);
  const [annualRate, setAnnualRate] = useState(18.99);
  const [monthlyPayment, setMonthlyPayment] = useState(300);
  const [extraPayment, setExtraPayment] = useState(200);
  const [lumpSum, setLumpSum] = useState(2000);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [baseResults, setBaseResults] = useState<PayoffResults>({
    monthsToPayoff: 0,
    totalInterest: 0,
    totalAmount: 0,
    payoffDate: ''
  });
  const [scenarios, setScenarios] = useState<{[key: string]: ScenarioResults}>({});

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (balance <= 0) newErrors.balance = "Balance must be positive";
    if (annualRate < 0) newErrors.annualRate = "Interest rate cannot be negative";
    if (monthlyPayment <= 0) newErrors.monthlyPayment = "Monthly payment must be positive";

    // Check if payment covers interest
    const monthlyInterest = balance * (annualRate / 100 / 12);
    if (monthlyPayment <= monthlyInterest) {
      newErrors.monthlyPayment = "Payment too low to cover interest. Minimum required: $" + (monthlyInterest + 1).toFixed(2);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePayoff = (
    initialBalance: number, 
    rate: number, 
    payment: number, 
    extraAmount: number = 0,
    lumpSumAmount: number = 0
  ): PayoffResults => {
    let remainingBalance = initialBalance - lumpSumAmount;
    const monthlyRate = rate / 100 / 12;
    const totalPayment = payment + extraAmount;
    let totalInterest = 0;
    let months = 0;

    while (remainingBalance > 0 && months < 1000) { // Safety limit
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = Math.min(totalPayment - interestPayment, remainingBalance);
      
      if (principalPayment <= 0) break; // Can't make progress
      
      totalInterest += interestPayment;
      remainingBalance -= principalPayment;
      months++;
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);

    return {
      monthsToPayoff: months,
      totalInterest,
      totalAmount: initialBalance + totalInterest,
      payoffDate: payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
  };

  const calculateBiWeeklyPayoff = (
    initialBalance: number, 
    rate: number, 
    biWeeklyPayment: number
  ): PayoffResults => {
    let remainingBalance = initialBalance;
    const biWeeklyRate = rate / 100 / 26; // 26 bi-weekly periods per year
    let totalInterest = 0;
    let periods = 0;

    while (remainingBalance > 0 && periods < 2000) { // Safety limit
      const interestPayment = remainingBalance * biWeeklyRate;
      const principalPayment = Math.min(biWeeklyPayment - interestPayment, remainingBalance);
      
      if (principalPayment <= 0) break;
      
      totalInterest += interestPayment;
      remainingBalance -= principalPayment;
      periods++;
    }

    const months = periods / 2.17; // Convert bi-weekly periods to months
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);

    return {
      monthsToPayoff: Math.round(months),
      totalInterest,
      totalAmount: initialBalance + totalInterest,
      payoffDate: payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
  };

  const updateCalculations = () => {
    if (!validateInputs()) return;

    // Base calculation
    const base = calculatePayoff(balance, annualRate, monthlyPayment);
    setBaseResults(base);

    // Scenario calculations
    const newScenarios: {[key: string]: ScenarioResults} = {};

    // Extra payment scenario
    const extraResults = calculatePayoff(balance, annualRate, monthlyPayment, extraPayment);
    newScenarios.extra = {
      monthsToPayoff: extraResults.monthsToPayoff,
      totalInterest: extraResults.totalInterest,
      interestSaved: base.totalInterest - extraResults.totalInterest,
      monthsSaved: base.monthsToPayoff - extraResults.monthsToPayoff
    };

    // Lump sum scenario
    const lumpResults = calculatePayoff(balance, annualRate, monthlyPayment, 0, lumpSum);
    newScenarios.lump = {
      monthsToPayoff: lumpResults.monthsToPayoff,
      totalInterest: lumpResults.totalInterest,
      interestSaved: base.totalInterest - lumpResults.totalInterest,
      monthsSaved: base.monthsToPayoff - lumpResults.monthsToPayoff
    };

    // Bi-weekly scenario
    const biWeeklyResults = calculateBiWeeklyPayoff(balance, annualRate, monthlyPayment / 2);
    newScenarios.biweekly = {
      monthsToPayoff: biWeeklyResults.monthsToPayoff,
      totalInterest: biWeeklyResults.totalInterest,
      interestSaved: base.totalInterest - biWeeklyResults.totalInterest,
      monthsSaved: base.monthsToPayoff - biWeeklyResults.monthsToPayoff
    };

    setScenarios(newScenarios);
  };

  useEffect(() => {
    updateCalculations();
  }, [balance, annualRate, monthlyPayment, extraPayment, lumpSum]);

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths > 0 ? `and ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Calculators</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Credit Card Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current Balance ($)</label>
                <Input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className={errors.balance ? 'border-red-500' : ''}
                />
                {errors.balance && <p className="text-red-500 text-xs mt-1">{errors.balance}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Annual Interest Rate (%)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className={errors.annualRate ? 'border-red-500' : ''}
                />
                {errors.annualRate && <p className="text-red-500 text-xs mt-1">{errors.annualRate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Monthly Payment ($)</label>
                <Input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  className={errors.monthlyPayment ? 'border-red-500' : ''}
                />
                {errors.monthlyPayment && <p className="text-red-500 text-xs mt-1">{errors.monthlyPayment}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-pink-400 to-orange-400 rounded-lg text-white">
                  <p className="text-sm opacity-90">Time to Pay Off</p>
                  <p className="text-lg font-bold">{formatMonths(baseResults.monthsToPayoff)}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-orange-400 to-sky-400 rounded-lg text-white">
                  <p className="text-sm opacity-90">Total Interest</p>
                  <p className="text-lg font-bold">${baseResults.totalInterest.toFixed(0)}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-sky-400 to-pink-400 rounded-lg text-white">
                  <p className="text-sm opacity-90">Total Amount</p>
                  <p className="text-lg font-bold">${baseResults.totalAmount.toFixed(0)}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-pink-400 to-sky-400 rounded-lg text-white">
                  <p className="text-sm opacity-90">Payoff Date</p>
                  <p className="text-lg font-bold">{baseResults.payoffDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scenarios */}
        <Card className="mt-8 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Scenarios</CardTitle>
            <CardDescription>See how different strategies can save you money and time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Extra Payment */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Extra Payment</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Add $</span>
                  <Input
                    type="number"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm">extra to your monthly payment</span>
                </div>
              </div>
              {scenarios.extra && (
                <div className="text-sm text-gray-600">
                  <p>Interest saved: ${scenarios.extra.interestSaved.toFixed(0)}</p>
                  <p>Months saved: {scenarios.extra.monthsSaved}</p>
                </div>
              )}
            </div>

            {/* Lump Sum */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Lump Sum Payment</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Add a one-time payment of $</span>
                  <Input
                    type="number"
                    value={lumpSum}
                    onChange={(e) => setLumpSum(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
              {scenarios.lump && (
                <div className="text-sm text-gray-600">
                  <p>Interest saved: ${scenarios.lump.interestSaved.toFixed(0)}</p>
                  <p>Months saved: {scenarios.lump.monthsSaved}</p>
                </div>
              )}
            </div>

            {/* Bi-Weekly Payments */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Bi-Weekly Payments</h4>
              <p className="text-sm text-gray-600 mb-2">Pay half your monthly payment every two weeks</p>
              {scenarios.biweekly && (
                <div className="text-sm text-gray-600">
                  <p>Interest saved: ${scenarios.biweekly.interestSaved.toFixed(0)}</p>
                  <p>Months saved: {scenarios.biweekly.monthsSaved}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreditCardCalculator;
