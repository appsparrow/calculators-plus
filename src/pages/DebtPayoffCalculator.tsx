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
  const [payoffStrategy, setPayoffStrategy] = useState('avalanche'); // 'avalanche' or 'snowball'
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

      

      
        
          
            
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            
            
              
                <TrendingDown className="w-6 h-6 text-white" />
              
              
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Debt Payoff Calculator
                </h1>
                <p className="text-sm text-gray-600">Plan your debt-free journey</p>
              
            
          
        
      

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

            {/* Results Panel */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Payoff Results</CardTitle>
                <CardDescription>Estimated time and interest to payoff</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {results ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Months to Payoff</span>
                      <span className="font-bold">{results.monthsToPayoff} months</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Interest Paid</span>
                      <span className="font-bold">${results.totalInterestPaid.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">Enter debt details to see payoff estimates.</p>
                )}
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

export default DebtPayoffCalculator;
