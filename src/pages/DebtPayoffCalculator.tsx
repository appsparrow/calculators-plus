
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Debt {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

const DebtPayoffCalculator = () => {
  const [debts, setDebts] = useState<Debt[]>([
    { name: 'Credit Card 1', balance: 2000, interestRate: 18, minimumPayment: 50 },
    { name: 'Credit Card 2', balance: 5000, interestRate: 20, minimumPayment: 100 },
    { name: 'Loan', balance: 10000, interestRate: 8, minimumPayment: 200 },
  ]);
  const [monthlyPayment, setMonthlyPayment] = useState(500);
  const [payoffStrategy, setPayoffStrategy] = useState('avalanche');
  const [results, setResults] = useState<any>(null);

  const calculatePayoff = () => {
    let sortedDebts = [...debts];

    if (payoffStrategy === 'avalanche') {
      sortedDebts.sort((a, b) => b.interestRate - a.interestRate);
    } else {
      sortedDebts.sort((a, b) => a.balance - b.balance);
    }

    let remainingDebts = sortedDebts.map(debt => ({ ...debt }));
    let months = 0;
    let totalInterestPaid = 0;
    let availablePayment = monthlyPayment;

    while (remainingDebts.length > 0) {
      months++;
      let currentPayment = availablePayment;

      for (let i = 0; i < remainingDebts.length; i++) {
        const debt = remainingDebts[i];
        const interest = debt.balance * (debt.interestRate / 100 / 12);
        totalInterestPaid += interest;
        debt.balance += interest;

        const paymentToDebt = Math.min(currentPayment, debt.balance);
        debt.balance -= paymentToDebt;
        currentPayment -= paymentToDebt;

        if (debt.balance <= 0) {
          availablePayment += Math.abs(debt.balance);
          remainingDebts.splice(i, 1);
          i--;
        }
      }

      if (months > 1200) {
        setResults(null);
        return;
      }
    }

    setResults({
      monthsToPayoff: months,
      totalInterestPaid: totalInterestPaid,
    });
  };

  const tryScenario = (scenarioType: string) => {
    switch (scenarioType) {
      case 'extra100':
        setMonthlyPayment(monthlyPayment + 100);
        break;
      case 'extra200':
        setMonthlyPayment(monthlyPayment + 200);
        break;
      case 'consolidate':
        const totalBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
        const avgRate = debts.reduce((sum, debt) => sum + debt.interestRate * debt.balance, 0) / totalBalance;
        setDebts([{ name: 'Consolidated Loan', balance: totalBalance, interestRate: avgRate * 0.8, minimumPayment: totalBalance * 0.02 }]);
        break;
    }
  };

  useEffect(() => {
    calculatePayoff();
  }, [debts, monthlyPayment, payoffStrategy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>Debt Payoff Calculator | Plan Your Debt-Free Journey</title>
        <meta name="description" content="Use our debt payoff calculator to create a plan to become debt-free. Choose between the debt avalanche and debt snowball methods." />
        <meta name="keywords" content="debt payoff calculator, debt avalanche, debt snowball, debt reduction, debt management, debt free, payoff debt" />
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
              <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Debt Payoff Calculator
                </h1>
                <p className="text-sm text-gray-600">Plan your debt-free journey</p>
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
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Debt Information</CardTitle>
                  <CardDescription>Enter your debt details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {debts.map((debt, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Debt Name</label>
                        <Input
                          type="text"
                          value={debt.name}
                          onChange={(e) => {
                            const newDebts = [...debts];
                            newDebts[index].name = e.target.value;
                            setDebts(newDebts);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Balance</label>
                        <Input
                          type="number"
                          value={debt.balance}
                          onChange={(e) => {
                            const newDebts = [...debts];
                            newDebts[index].balance = Number(e.target.value);
                            setDebts(newDebts);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
                        <Input
                          type="number"
                          value={debt.interestRate}
                          onChange={(e) => {
                            const newDebts = [...debts];
                            newDebts[index].interestRate = Number(e.target.value);
                            setDebts(newDebts);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Minimum Payment</label>
                        <Input
                          type="number"
                          value={debt.minimumPayment}
                          onChange={(e) => {
                            const newDebts = [...debts];
                            newDebts[index].minimumPayment = Number(e.target.value);
                            setDebts(newDebts);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setDebts([
                          ...debts,
                          { name: `New Debt ${debts.length + 1}`, balance: 0, interestRate: 0, minimumPayment: 0 },
                        ])
                      }
                    >
                      Add Debt
                    </Button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Total Monthly Payment</label>
                    <Input
                      type="number"
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Payoff Strategy</label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={payoffStrategy}
                      onChange={(e) => setPayoffStrategy(e.target.value)}
                    >
                      <option value="avalanche">Debt Avalanche (Highest Interest First)</option>
                      <option value="snowball">Debt Snowball (Lowest Balance First)</option>
                    </select>
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
              {/* Results Panel */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Payoff Results</CardTitle>
                  <CardDescription>Estimated time and interest to payoff</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results ? (
                    <>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-500">Months to Payoff</p>
                        <p className="text-2xl font-bold text-green-600">{results.monthsToPayoff} months</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-500">Total Interest Paid</p>
                        <p className="text-2xl font-bold text-red-600">${results.totalInterestPaid.toFixed(2)}</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500">Enter debt details to see payoff estimates.</p>
                  )}
                </CardContent>
              </Card>

              {/* Scenarios Panel */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Try Scenarios</CardTitle>
                  <CardDescription>See how changes affect your payoff</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => tryScenario('extra100')}
                  >
                    +$100/month
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => tryScenario('extra200')}
                  >
                    +$200/month
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => tryScenario('consolidate')}
                  >
                    Debt Consolidation
                  </Button>
                </CardContent>
              </Card>
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

export default DebtPayoffCalculator;
