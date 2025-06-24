
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Car, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoanOption {
  vehiclePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
}

interface LoanResults {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

const AutoLoanCalculator = () => {
  const [option1, setOption1] = useState<LoanOption>({
    vehiclePrice: 41000,
    downPayment: 5000,
    interestRate: 0,
    loanTerm: 5
  });

  const [option2, setOption2] = useState<LoanOption>({
    vehiclePrice: 41000,
    downPayment: 5000,
    interestRate: 5.7,
    loanTerm: 5
  });

  const [results1, setResults1] = useState<LoanResults>({
    loanAmount: 0,
    monthlyPayment: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  const [results2, setResults2] = useState<LoanResults>({
    loanAmount: 0,
    monthlyPayment: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateInputs = (option: LoanOption, prefix: string) => {
    const newErrors: {[key: string]: string} = {};
    
    if (option.vehiclePrice <= 0) newErrors[`${prefix}VehiclePrice`] = "Vehicle price must be positive";
    if (option.downPayment < 0) newErrors[`${prefix}DownPayment`] = "Down payment cannot be negative";
    if (option.downPayment > option.vehiclePrice) newErrors[`${prefix}DownPayment`] = "Down payment cannot exceed vehicle price";
    if (option.interestRate < 0) newErrors[`${prefix}InterestRate`] = "Interest rate cannot be negative";
    if (option.loanTerm <= 0) newErrors[`${prefix}LoanTerm`] = "Loan term must be positive";

    return newErrors;
  };

  const calculateLoan = (option: LoanOption): LoanResults => {
    const loanAmount = option.vehiclePrice - option.downPayment;
    const monthlyRate = option.interestRate / 100 / 12;
    const numPayments = option.loanTerm * 12;

    let monthlyPayment = 0;
    if (option.interestRate === 0) {
      monthlyPayment = loanAmount / numPayments;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                      (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;

    return {
      loanAmount,
      monthlyPayment,
      totalInterest,
      totalPayment: totalPayment
    };
  };

  const updateCalculations = () => {
    const errors1 = validateInputs(option1, 'option1');
    const errors2 = validateInputs(option2, 'option2');
    const allErrors = { ...errors1, ...errors2 };
    
    setErrors(allErrors);

    if (Object.keys(allErrors).length === 0) {
      setResults1(calculateLoan(option1));
      setResults2(calculateLoan(option2));
    }
  };

  useEffect(() => {
    updateCalculations();
  }, [option1, option2]);

  const savings = results2.totalPayment - results1.totalPayment;
  const betterOption = savings > 0 ? 1 : 2;
  const savingsAmount = Math.abs(savings);

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
              <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-400 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Auto Loan Comparison
                </h1>
                <p className="text-sm text-gray-600">Compare two loan options side-by-side</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Loan Option 1 */}
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sky-600">Loan Option 1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Price ($)</label>
                <Input
                  type="number"
                  value={option1.vehiclePrice}
                  onChange={(e) => setOption1(prev => ({ ...prev, vehiclePrice: Number(e.target.value) }))}
                  className={errors.option1VehiclePrice ? 'border-red-500' : ''}
                />
                {errors.option1VehiclePrice && <p className="text-red-500 text-xs mt-1">{errors.option1VehiclePrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Down Payment ($)</label>
                <Input
                  type="number"
                  value={option1.downPayment}
                  onChange={(e) => setOption1(prev => ({ ...prev, downPayment: Number(e.target.value) }))}
                  className={errors.option1DownPayment ? 'border-red-500' : ''}
                />
                {errors.option1DownPayment && <p className="text-red-500 text-xs mt-1">{errors.option1DownPayment}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={option1.interestRate}
                  onChange={(e) => setOption1(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                  className={errors.option1InterestRate ? 'border-red-500' : ''}
                />
                {errors.option1InterestRate && <p className="text-red-500 text-xs mt-1">{errors.option1InterestRate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Term (Years)</label>
                <Input
                  type="number"
                  value={option1.loanTerm}
                  onChange={(e) => setOption1(prev => ({ ...prev, loanTerm: Number(e.target.value) }))}
                  className={errors.option1LoanTerm ? 'border-red-500' : ''}
                />
                {errors.option1LoanTerm && <p className="text-red-500 text-xs mt-1">{errors.option1LoanTerm}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Loan Option 2 */}
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-600">Loan Option 2</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Price ($)</label>
                <Input
                  type="number"
                  value={option2.vehiclePrice}
                  onChange={(e) => setOption2(prev => ({ ...prev, vehiclePrice: Number(e.target.value) }))}
                  className={errors.option2VehiclePrice ? 'border-red-500' : ''}
                />
                {errors.option2VehiclePrice && <p className="text-red-500 text-xs mt-1">{errors.option2VehiclePrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Down Payment ($)</label>
                <Input
                  type="number"
                  value={option2.downPayment}
                  onChange={(e) => setOption2(prev => ({ ...prev, downPayment: Number(e.target.value) }))}
                  className={errors.option2DownPayment ? 'border-red-500' : ''}
                />
                {errors.option2DownPayment && <p className="text-red-500 text-xs mt-1">{errors.option2DownPayment}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={option2.interestRate}
                  onChange={(e) => setOption2(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                  className={errors.option2InterestRate ? 'border-red-500' : ''}
                />
                {errors.option2InterestRate && <p className="text-red-500 text-xs mt-1">{errors.option2InterestRate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Term (Years)</label>
                <Input
                  type="number"
                  value={option2.loanTerm}
                  onChange={(e) => setOption2(prev => ({ ...prev, loanTerm: Number(e.target.value) }))}
                  className={errors.option2LoanTerm ? 'border-red-500' : ''}
                />
                {errors.option2LoanTerm && <p className="text-red-500 text-xs mt-1">{errors.option2LoanTerm}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Results */}
        <Card className="bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Loan Comparison Results</CardTitle>
            <CardDescription>Side-by-side comparison of your loan options</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comparison</TableHead>
                  <TableHead className="text-center">Option 1</TableHead>
                  <TableHead className="text-center">Option 2</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Loan Amount</TableCell>
                  <TableCell className="text-center">${results1.loanAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-center">${results2.loanAmount.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Monthly Payment</TableCell>
                  <TableCell className="text-center">${results1.monthlyPayment.toFixed(2)}</TableCell>
                  <TableCell className="text-center">${results2.monthlyPayment.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Interest</TableCell>
                  <TableCell className="text-center">${results1.totalInterest.toFixed(2)}</TableCell>
                  <TableCell className="text-center">${results2.totalInterest.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Payment</TableCell>
                  <TableCell className="text-center">${results1.totalPayment.toFixed(2)}</TableCell>
                  <TableCell className="text-center">${results2.totalPayment.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {savingsAmount > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg border border-green-300">
                <p className="text-green-800 font-medium text-center">
                  Option {betterOption} saves you ${savingsAmount.toFixed(2)} over the life of the loan compared to Option {betterOption === 1 ? 2 : 1}.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutoLoanCalculator;
