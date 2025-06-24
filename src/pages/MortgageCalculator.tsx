
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Home, Calculator, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3600);
  const [insurance, setInsurance] = useState(1200);
  const [isFHA, setIsFHA] = useState(false);
  const [isVA, setIsVA] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [results, setResults] = useState({
    monthlyPI: 0,
    monthlyPITI: 0,
    totalInterest: 0,
    totalCost: 0,
    loanAmount: 0
  });
  const [amortization, setAmortization] = useState<AmortizationRow[]>([]);

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (homePrice <= 0) newErrors.homePrice = "Home price must be positive";
    if (downPayment < 0) newErrors.downPayment = "Down payment cannot be negative";
    if (downPayment > homePrice) newErrors.downPayment = "Down payment cannot exceed home price";
    if (interestRate < 0) newErrors.interestRate = "Interest rate cannot be negative";
    if (loanTerm <= 0) newErrors.loanTerm = "Loan term must be positive";
    if (propertyTax < 0) newErrors.propertyTax = "Property tax cannot be negative";
    if (insurance < 0) newErrors.insurance = "Insurance cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMortgage = () => {
    if (!validateInputs()) return;

    let adjustedDownPayment = downPayment;
    let adjustedHomePrice = homePrice;

    // FHA Loan adjustments
    if (isFHA) {
      const minDownPayment = homePrice * 0.035;
      if (downPayment < minDownPayment) {
        adjustedDownPayment = minDownPayment;
      }
    }

    // VA Loan adjustments
    if (isVA) {
      adjustedDownPayment = 0;
      const vaFundingFee = homePrice * 0.023; // 2.3% funding fee
      adjustedHomePrice = homePrice + vaFundingFee;
    }

    const loanAmount = adjustedHomePrice - adjustedDownPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                  (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPI = loanAmount / numPayments;
    }

    const monthlyTaxInsurance = (propertyTax + insurance) / 12;
    let monthlyPITI = monthlyPI + monthlyTaxInsurance;

    // Add FHA MIP if applicable
    if (isFHA) {
      const annualMIP = loanAmount * 0.0085; // 0.85% annual MIP
      monthlyPITI += annualMIP / 12;
    }

    const totalInterest = (monthlyPI * numPayments) - loanAmount;
    const totalCost = (monthlyPITI * numPayments) + adjustedDownPayment;

    setResults({
      monthlyPI: Math.round(monthlyPI),
      monthlyPITI: Math.round(monthlyPITI),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost),
      loanAmount: Math.round(loanAmount)
    });

    // Generate amortization schedule
    const schedule: AmortizationRow[] = [];
    let remainingBalance = loanAmount;

    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      remainingBalance = remainingBalance - principalPayment;

      schedule.push({
        month,
        payment: monthlyPI,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });

      if (remainingBalance <= 0) break;
    }

    setAmortization(schedule);
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, isFHA, isVA]);

  const isJumboLoan = results.loanAmount > 766550; // 2024 conforming loan limit

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
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Mortgage Calculator
                </h1>
                <p className="text-sm text-gray-600">Calculate monthly payments & total costs</p>
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
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter your mortgage information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Home Price ($)</label>
                <Input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className={errors.homePrice ? 'border-red-500' : ''}
                />
                {errors.homePrice && <p className="text-red-500 text-xs mt-1">{errors.homePrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Down Payment ($)</label>
                <Input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className={errors.downPayment ? 'border-red-500' : ''}
                />
                {errors.downPayment && <p className="text-red-500 text-xs mt-1">{errors.downPayment}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className={errors.interestRate ? 'border-red-500' : ''}
                />
                {errors.interestRate && <p className="text-red-500 text-xs mt-1">{errors.interestRate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Loan Term (Years)</label>
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className={errors.loanTerm ? 'border-red-500' : ''}
                />
                {errors.loanTerm && <p className="text-red-500 text-xs mt-1">{errors.loanTerm}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Property Tax ($/year)</label>
                <Input
                  type="number"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(Number(e.target.value))}
                  className={errors.propertyTax ? 'border-red-500' : ''}
                />
                {errors.propertyTax && <p className="text-red-500 text-xs mt-1">{errors.propertyTax}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Insurance ($/year)</label>
                <Input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(Number(e.target.value))}
                  className={errors.insurance ? 'border-red-500' : ''}
                />
                {errors.insurance && <p className="text-red-500 text-xs mt-1">{errors.insurance}</p>}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Loan Type</h4>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isFHA}
                      onChange={(e) => {
                        setIsFHA(e.target.checked);
                        if (e.target.checked) setIsVA(false);
                      }}
                    />
                    <span className="text-sm">FHA Loan</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isVA}
                      onChange={(e) => {
                        setIsVA(e.target.checked);
                        if (e.target.checked) setIsFHA(false);
                      }}
                    />
                    <span className="text-sm">VA Loan</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Results & Analysis
                {isJumboLoan && <Badge variant="secondary">Jumbo Loan</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg text-white">
                  <p className="text-sm opacity-90">Monthly P&I</p>
                  <p className="text-2xl font-bold">${results.monthlyPI.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-sky-400 to-pink-400 rounded-lg text-white">
                  <p className="text-sm opacity-90">Monthly PITI</p>
                  <p className="text-2xl font-bold">${results.monthlyPITI.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-orange-400 to-sky-400 rounded-lg text-white">
                  <p className="text-sm opacity-90">Total Interest</p>
                  <p className="text-2xl font-bold">${results.totalInterest.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-pink-400 to-sky-400 rounded-lg text-white">
                  <p className="text-sm opacity-90">Total Cost</p>
                  <p className="text-2xl font-bold">${results.totalCost.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p><strong>Loan Amount:</strong> ${results.loanAmount.toLocaleString()}</p>
                {isFHA && <p className="text-blue-600">✓ FHA loan with mortgage insurance premium included</p>}
                {isVA && <p className="text-green-600">✓ VA loan with funding fee included</p>}
                {isJumboLoan && <p className="text-orange-600">⚠ This is a jumbo loan - rates may differ</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Amortization Schedule */}
        {amortization.length > 0 && (
          <Card className="mt-8 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Amortization Schedule</CardTitle>
              <CardDescription>Payment breakdown over the loan term</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {amortization.slice(0, 60).map((row) => (
                      <TableRow key={row.month}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell>${row.payment.toFixed(2)}</TableCell>
                        <TableCell>${row.principal.toFixed(2)}</TableCell>
                        <TableCell>${row.interest.toFixed(2)}</TableCell>
                        <TableCell>${row.balance.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {amortization.length > 60 && (
                  <p className="text-center text-gray-500 mt-4">
                    Showing first 60 payments of {amortization.length}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;
