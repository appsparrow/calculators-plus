
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RentalResults {
  loanAmount: number;
  monthlyMortgage: number;
  annualGrossIncome: number;
  annualNetIncome: number;
  totalOperatingExpenses: number;
  netOperatingIncome: number;
  annualCashFlow: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
}

const RentalHomeCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [monthlyRent, setMonthlyRent] = useState(2500);
  const [otherIncome, setOtherIncome] = useState(0);
  const [propertyTax, setPropertyTax] = useState(3600);
  const [insurance, setInsurance] = useState(1200);
  const [maintenance, setMaintenance] = useState(10);
  const [propertyManagement, setPropertyManagement] = useState(8);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [hoaFees, setHoaFees] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [results, setResults] = useState<RentalResults | null>(null);

  const calculateRental = () => {
    const loanAmount = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyMortgage = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const annualGrossIncome = monthlyRent * 12;
    const annualOtherIncome = otherIncome * 12;
    const annualTotalIncome = annualGrossIncome + annualOtherIncome;
    const annualVacancyLoss = annualGrossIncome * (vacancyRate / 100);
    const annualNetIncome = annualTotalIncome - annualVacancyLoss;

    const annualMaintenance = annualGrossIncome * (maintenance / 100);
    const annualPropertyManagement = annualGrossIncome * (propertyManagement / 100);
    const annualHoaFees = hoaFees * 12;
    const annualOtherExpenses = otherExpenses * 12;

    const totalOperatingExpenses = propertyTax + insurance + annualMaintenance + 
      annualPropertyManagement + annualHoaFees + annualOtherExpenses;

    const netOperatingIncome = annualNetIncome - totalOperatingExpenses;
    const annualMortgagePayment = monthlyMortgage * 12;
    const annualCashFlow = netOperatingIncome - annualMortgagePayment;
    const monthlyCashFlow = annualCashFlow / 12;
    const cashOnCashReturn = (annualCashFlow / downPayment) * 100;

    setResults({
      loanAmount,
      monthlyMortgage,
      annualGrossIncome,
      annualNetIncome,
      totalOperatingExpenses,
      netOperatingIncome,
      annualCashFlow,
      monthlyCashFlow,
      cashOnCashReturn,
    });
  };

  const tryScenario = (scenarioType: string) => {
    switch (scenarioType) {
      case 'rentIncrease':
        setMonthlyRent(monthlyRent + 100);
        break;
      case 'lowerRate':
        setInterestRate(interestRate - 0.5);
        break;
      case 'moreDown':
        setDownPayment(purchasePrice * 0.3);
        break;
      case 'higherVacancy':
        setVacancyRate(10);
        break;
    }
  };

  useEffect(() => {
    calculateRental();
  }, [purchasePrice, downPayment, loanTerm, interestRate, monthlyRent, otherIncome, 
      propertyTax, insurance, maintenance, propertyManagement, vacancyRate, hoaFees, otherExpenses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>Rental Home Calculator | Real Estate Investment Analysis</title>
        <meta name="description" content="Calculate rental property cash flow, ROI, and investment returns with our comprehensive rental home calculator. Analyze rental income, expenses, and profitability." />
        <meta name="keywords" content="rental calculator, rental property calculator, real estate investment, cash flow calculator, rental income calculator, property investment" />
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
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Rental Home Calculator
                </h1>
                <p className="text-sm text-gray-600">Analyze rental property cash flow</p>
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

          <div className="flex-1 flex gap-8">
            {/* Input Panel - 2/3 width */}
            <div className="flex-[2] space-y-8">
              {/* Property Information */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                  <CardDescription>Enter the property purchase details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Purchase Price ($)</label>
                      <Input
                        type="number"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Down Payment ($)</label>
                      <Input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Loan Term (Years)</label>
                      <Input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Income */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Income</CardTitle>
                  <CardDescription>Expected rental income</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Monthly Rent ($)</label>
                      <Input
                        type="number"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Other Monthly Income ($)</label>
                      <Input
                        type="number"
                        value={otherIncome}
                        onChange={(e) => setOtherIncome(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expenses */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Expenses</CardTitle>
                  <CardDescription>Operating expenses and costs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Property Tax ($/year)</label>
                      <Input
                        type="number"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Insurance ($/year)</label>
                      <Input
                        type="number"
                        value={insurance}
                        onChange={(e) => setInsurance(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Maintenance (% of Rent)</label>
                      <Input
                        type="number"
                        value={maintenance}
                        onChange={(e) => setMaintenance(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Property Management (%)</label>
                      <Input
                        type="number"
                        value={propertyManagement}
                        onChange={(e) => setPropertyManagement(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Vacancy Rate (%)</label>
                      <Input
                        type="number"
                        value={vacancyRate}
                        onChange={(e) => setVacancyRate(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">HOA Fees ($/month)</label>
                      <Input
                        type="number"
                        value={hoaFees}
                        onChange={(e) => setHoaFees(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Other Expenses ($/month)</label>
                      <Input
                        type="number"
                        value={otherExpenses}
                        onChange={(e) => setOtherExpenses(Number(e.target.value))}
                      />
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

            {/* Results and Scenarios Panel - 1/3 width */}
            <div className="flex-1 space-y-6">
              {/* Results */}
              {results && (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <Card className="bg-white/60 backdrop-blur-sm">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm font-medium text-gray-500">Monthly Cash Flow</p>
                        <p className={`text-2xl font-bold ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${results.monthlyCashFlow.toFixed(0)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/60 backdrop-blur-sm">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm font-medium text-gray-500">Cash-on-Cash Return</p>
                        <p className={`text-2xl font-bold ${results.cashOnCashReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {results.cashOnCashReturn.toFixed(1)}%
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-white/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Gross Rental Income:</span>
                        <span className="font-semibold">${results.annualGrossIncome.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Operating Expenses:</span>
                        <span className="font-semibold">${results.totalOperatingExpenses.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Net Operating Income:</span>
                        <span className="font-semibold">${results.netOperatingIncome.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Annual Mortgage:</span>
                        <span className="font-semibold">${(results.monthlyMortgage * 12).toFixed(0)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Annual Cash Flow:</span>
                        <span className={`font-bold ${results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${results.annualCashFlow.toFixed(0)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scenarios */}
                  <Card className="bg-white/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Try Scenarios</CardTitle>
                      <CardDescription>See how changes affect cash flow</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => tryScenario('rentIncrease')}
                      >
                        +$100 Rent
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => tryScenario('lowerRate')}
                      >
                        -0.5% Interest
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => tryScenario('moreDown')}
                      >
                        30% Down
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => tryScenario('higherVacancy')}
                      >
                        10% Vacancy
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
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

export default RentalHomeCalculator;
