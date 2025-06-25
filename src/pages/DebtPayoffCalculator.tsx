
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalculatorHeader from '@/components/CalculatorHeader';
import AdSenseAd from '@/components/AdSenseAd';

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

      <CalculatorHeader
        title="Debt Payoff Calculator"
        description="Plan your debt-free journey"
        icon={TrendingDown}
        gradientFrom="red-400"
        gradientTo="pink-400"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Sidebar Ad - Hidden on mobile */}
          <aside className="hidden xl:block w-40 flex-shrink-0">
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

          <div className="flex-1 flex flex-col lg:flex-row gap-8">
            {/* Input Panel */}
            <div className="flex-1 space-y-8">
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Debt Information</CardTitle>
                  <CardDescription>Enter your debt details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {debts.map((debt, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                        <label className="block text-sm font-medium mb-1">Int. Rate (%)</label>
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
                        <label className="block text-sm font-medium mb-1">Min. Payment</label>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  </div>
                </CardContent>
              </Card>

              {/* Bottom Ad - Show on mobile */}
              <AdSenseAd
                adSlot="3456789012"
                width={320}
                height={100}
                responsive={true}
                adFormat="horizontal"
                className="w-full lg:hidden"
              />
            </div>

            {/* Results and Scenarios Panel */}
            <div className="w-full lg:w-80 space-y-6">
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

          {/* Right Sidebar Ad - Hidden on mobile */}
          <aside className="hidden xl:block w-40 flex-shrink-0">
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

        {/* Bottom Ad - Hidden on mobile, show on desktop */}
        <div className="hidden lg:block mt-8">
          <AdSenseAd
            adSlot="7890123456"
            width={728}
            height={90}
            responsive={true}
            adFormat="horizontal"
          />
        </div>
      </div>
    </div>
  );
};

export default DebtPayoffCalculator;
