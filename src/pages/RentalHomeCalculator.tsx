import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RentalResults {
  loanAmount: number;
  monthlyMortgage: number;
  annualGrossIncome: number;
  annualNetIncome: number;
  totalOperatingExpenses: number;
  noi: number;
  annualCashFlow: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
}

const RentalHomeCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(4.5);
  const [monthlyRent, setMonthlyRent] = useState(2500);
  const [otherMonthlyIncome, setOtherMonthlyIncome] = useState(0);
  const [propertyTax, setPropertyTax] = useState(3600);
  const [insurance, setInsurance] = useState(1200);
  const [maintenancePercent, setMaintenancePercent] = useState(10);
  const [managementPercent, setManagementPercent] = useState(8);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [hoaFees, setHoaFees] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [results, setResults] = useState<RentalResults | null>(null);

  const calculateCashFlow = () => {
    const loanAmount = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyMortgage = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const annualGrossIncome = monthlyRent * 12;
    const annualOtherIncome = otherMonthlyIncome * 12;
    const annualTotalIncome = annualGrossIncome + annualOtherIncome;
    
    const annualVacancyLoss = annualGrossIncome * (vacancyRate / 100);
    const annualNetIncome = annualTotalIncome - annualVacancyLoss;
    
    const annualMaintenance = annualGrossIncome * (maintenancePercent / 100);
    const annualManagement = annualGrossIncome * (managementPercent / 100);
    const annualHoaFees = hoaFees * 12;
    const annualOtherExpenses = otherExpenses * 12;
    
    const totalOperatingExpenses = propertyTax + insurance + annualMaintenance + 
                                  annualManagement + annualHoaFees + annualOtherExpenses;
    
    const noi = annualNetIncome - totalOperatingExpenses;
    const annualMortgagePayments = monthlyMortgage * 12;
    const annualCashFlow = noi - annualMortgagePayments;
    const monthlyCashFlow = annualCashFlow / 12;
    const cashOnCashReturn = downPayment > 0 ? (annualCashFlow / downPayment) * 100 : 0;

    setResults({
      loanAmount,
      monthlyMortgage,
      annualGrossIncome,
      annualNetIncome,
      totalOperatingExpenses,
      noi,
      annualCashFlow,
      monthlyCashFlow,
      cashOnCashReturn
    });
  };

  const tryScenario = (scenarioType: string) => {
    switch (scenarioType) {
      case 'increaseRent':
        setMonthlyRent(monthlyRent + 100);
        break;
      case 'lowerRate':
        setInterestRate(Math.max(0.1, interestRate - 0.5));
        break;
      case 'moreDown':
        setDownPayment(Math.min(purchasePrice * 0.9, downPayment + 20000));
        break;
      case 'higherVacancy':
        setVacancyRate(Math.min(50, vacancyRate + 5));
        break;
    }
  };

  useEffect(() => {
    calculateCashFlow();
  }, [purchasePrice, downPayment, loanTerm, interestRate, monthlyRent, otherMonthlyIncome, 
      propertyTax, insurance, maintenancePercent, managementPercent, vacancyRate, hoaFees, otherExpenses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>Rental Home Calculator | Real Estate Investment Cash Flow Analysis</title>
        <meta name="description" content="Calculate rental property cash flow, ROI, and investment returns with our comprehensive rental home calculator. Analyze property investments and scenarios." />
        <meta name="keywords" content="rental home calculator, rental property calculator, real estate investment, cash flow calculator, property ROI, rental yield calculator" />
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
              <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-600 bg-clip-text text-transparent">
                  Rental Home Calculator
                </h1>
                <p className="text-sm text-gray-600">Analyze rental property cash flow</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Sidebar Ad - Hidden on mobile */}
          <aside className="hidden xl:block w-40 flex-shrink-0">
            <div className="sticky top-24">
              <div className="w-full h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-xs font-medium mb-1">Advertisement</div>
                  <div className="text-xs">160 x 600</div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 flex flex-col lg:flex-row gap-8">
            {/* Input Panel */}
            <div className="flex-1 space-y-8">
              {/* Property Information */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                  <CardDescription>Enter property purchase details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <CardDescription>Monthly rental income sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        value={otherMonthlyIncome}
                        onChange={(e) => setOtherMonthlyIncome(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expenses */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Expenses</CardTitle>
                  <CardDescription>Annual and monthly operating expenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        value={maintenancePercent}
                        onChange={(e) => setMaintenancePercent(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Property Management (%)</label>
                      <Input
                        type="number"
                        value={managementPercent}
                        onChange={(e) => setManagementPercent(Number(e.target.value))}
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
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Other Expenses ($/month)</label>
                    <Input
                      type="number"
                      value={otherExpenses}
                      onChange={(e) => setOtherExpenses(Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Bottom Ad - Show on mobile */}
              <div className="w-full h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center lg:hidden">
                <div className="text-center text-gray-500">
                  <div className="text-sm font-medium mb-1">Advertisement</div>
                  <div className="text-xs">728 x 90 Banner</div>
                </div>
              </div>
            </div>

            {/* Results and Scenarios Panel */}
            <div className="w-full lg:w-80 space-y-6">
              {/* Results Panel */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Cash Flow Analysis</CardTitle>
                  <CardDescription>Annual property performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results ? (
                    <>
                      <div className="text-center pb-4 border-b">
                        <p className="text-sm font-medium text-gray-500">Annual Cash Flow</p>
                        <p className={`text-2xl font-bold ${results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${results.annualCashFlow.toFixed(0)}
                        </p>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Cash Flow:</span>
                          <span className={`font-semibold ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${results.monthlyCashFlow.toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cash on Cash Return:</span>
                          <span className={`font-semibold ${results.cashOnCashReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {results.cashOnCashReturn.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Net Operating Income:</span>
                          <span className="font-semibold">${results.noi.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Operating Expenses:</span>
                          <span className="font-semibold">${results.totalOperatingExpenses.toFixed(0)}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500">Enter property details to see cash flow analysis.</p>
                  )}
                </CardContent>
              </Card>

              {/* Scenarios Panel */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Try Scenarios</CardTitle>
                  <CardDescription>Test different investment scenarios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start"
                    onClick={() => tryScenario('increaseRent')}
                  >
                    +$100 Rent Increase
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start"
                    onClick={() => tryScenario('lowerRate')}
                  >
                    -0.5% Interest Rate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start"
                    onClick={() => tryScenario('moreDown')}
                  >
                    +$20k Down Payment
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start"
                    onClick={() => tryScenario('higherVacancy')}
                  >
                    +5% Vacancy Rate
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar Ad - Hidden on mobile */}
          <aside className="hidden xl:block w-40 flex-shrink-0">
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

        {/* Bottom Ad - Hidden on mobile, show on desktop */}
        <div className="hidden lg:block w-full h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mt-8">
          <div className="text-center text-gray-500">
            <div className="text-sm font-medium mb-1">Advertisement</div>
            <div className="text-xs">728 x 90 Banner</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalHomeCalculator;
