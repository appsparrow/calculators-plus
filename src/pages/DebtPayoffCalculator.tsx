
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, ArrowLeft, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number;
  payment: number;
}

interface PayoffResult {
  totalDebt: number;
  totalInterest: number;
  monthsToFree: number;
  payoffDate: Date;
  schedule: Array<{
    debtName: string;
    monthsPaid: number;
    totalInterest: number;
  }>;
}

const DebtPayoffCalculator = () => {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: 5000, rate: 19.99, payment: 150 },
    { id: '2', name: 'Credit Card 2', balance: 3000, rate: 24.99, payment: 100 }
  ]);
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche');
  const [extraPayment, setExtraPayment] = useState(200);
  const [results, setResults] = useState<PayoffResult>({
    totalDebt: 0,
    totalInterest: 0,
    monthsToFree: 0,
    payoffDate: new Date(),
    schedule: []
  });

  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: '',
      balance: 0,
      rate: 0,
      payment: 0
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const calculatePayoff = () => {
    const validDebts = debts.filter(debt => debt.balance > 0 && debt.rate > 0 && debt.payment > 0);
    
    if (validDebts.length === 0) return;

    // Sort debts based on strategy
    const sortedDebts = [...validDebts].sort((a, b) => {
      if (strategy === 'avalanche') {
        return b.rate - a.rate; // Highest interest first
      } else {
        return a.balance - b.balance; // Smallest balance first
      }
    });

    let totalInterest = 0;
    let currentMonth = 0;
    let remainingDebts = sortedDebts.map(debt => ({ ...debt }));
    const schedule: Array<{ debtName: string; monthsPaid: number; totalInterest: number }> = [];

    while (remainingDebts.length > 0) {
      currentMonth++;
      let remainingExtraPayment = extraPayment;

      // Make minimum payments on all debts
      remainingDebts.forEach(debt => {
        const monthlyInterest = (debt.balance * debt.rate / 100) / 12;
        const principalPayment = Math.min(debt.payment - monthlyInterest, debt.balance);
        
        totalInterest += monthlyInterest;
        debt.balance -= principalPayment;
      });

      // Apply extra payment to first debt (based on strategy)
      if (remainingDebts.length > 0 && remainingExtraPayment > 0) {
        const targetDebt = remainingDebts[0];
        const extraPrincipal = Math.min(remainingExtraPayment, targetDebt.balance);
        targetDebt.balance -= extraPrincipal;
      }

      // Remove paid-off debts
      const paidOffDebts = remainingDebts.filter(debt => debt.balance <= 0);
      paidOffDebts.forEach(debt => {
        schedule.push({
          debtName: debt.name,
          monthsPaid: currentMonth,
          totalInterest: 0 // This would need more complex tracking
        });
      });

      remainingDebts = remainingDebts.filter(debt => debt.balance > 0);
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + currentMonth);

    setResults({
      totalDebt: validDebts.reduce((sum, debt) => sum + debt.balance, 0),
      totalInterest: Math.round(totalInterest),
      monthsToFree: currentMonth,
      payoffDate,
      schedule
    });
  };

  useEffect(() => {
    calculatePayoff();
  }, [debts, strategy, extraPayment]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      {/* Meta tags for SEO */}
      <head>
        <title>Debt Payoff Calculator | Plan Your Debt-Free Journey</title>
        <meta name="description" content="Create a personalized debt payoff plan with our calculator. Compare avalanche and snowball strategies, track your debt-free date, and optimize your repayment for credit cards, student loans, and more." />
        <meta name="keywords" content="debt payoff calculator, debt repayment plan, debt avalanche, debt snowball, pay off debt, debt-free date, student loan calculator, credit card debt, extra payment" />
      </head>

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
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-sky-400 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-sky-600 bg-clip-text text-transparent">
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

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Your Debts</CardTitle>
                  <CardDescription>Add all your debts to create a payoff plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {debts.map((debt, index) => (
                    <div key={debt.id} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-4">
                        <label className="block text-xs font-medium mb-1">Debt Name</label>
                        <Input
                          value={debt.name}
                          onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                          placeholder="e.g., Credit Card 1"
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium mb-1">Balance ($)</label>
                        <Input
                          type="number"
                          value={debt.balance}
                          onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium mb-1">Rate (%)</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={debt.rate}
                          onChange={(e) => updateDebt(debt.id, 'rate', Number(e.target.value))}
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="block text-xs font-medium mb-1">Payment ($)</label>
                        <Input
                          type="number"
                          value={debt.payment}
                          onChange={(e) => updateDebt(debt.id, 'payment', Number(e.target.value))}
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDebt(debt.id)}
                          className="p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={addDebt}
                    className="w-full flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Debt</span>
                  </Button>

                  <div className="pt-4 border-t">
                    <label className="block text-sm font-medium mb-2">Repayment Strategy</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="strategy"
                          value="avalanche"
                          checked={strategy === 'avalanche'}
                          onChange={(e) => setStrategy(e.target.value as 'avalanche')}
                        />
                        <span className="text-sm">Debt Avalanche (Highest Interest First)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="strategy"
                          value="snowball"
                          checked={strategy === 'snowball'}
                          onChange={(e) => setStrategy(e.target.value as 'snowball')}
                        />
                        <span className="text-sm">Debt Snowball (Smallest Balance First)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Extra Monthly Payment ($)</label>
                    <Input
                      type="number"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Results Panel */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Results & Analysis</CardTitle>
                  <CardDescription>Your debt payoff plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                      <p className="text-2xl font-bold text-blue-900">${results.totalDebt.toLocaleString()}</p>
                      <p className="text-sm text-blue-700">Total Debt</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                      <p className="text-2xl font-bold text-red-900">${results.totalInterest.toLocaleString()}</p>
                      <p className="text-sm text-red-700">Total Interest</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                      <p className="text-2xl font-bold text-green-900">{results.monthsToFree}</p>
                      <p className="text-sm text-green-700">Months to Debt-Free</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                      <p className="text-lg font-bold text-purple-900">{results.payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                      <p className="text-sm text-purple-700">Debt-Free Date</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Common Scenarios</h4>
                    <div className="space-y-2 text-sm">
                      <Badge variant="outline" className="w-full justify-start p-3">
                        <span className="font-medium">Credit Cards:</span>
                        <span className="ml-2">Focus on highest interest rates first</span>
                      </Badge>
                      <Badge variant="outline" className="w-full justify-start p-3">
                        <span className="font-medium">Student Loans:</span>
                        <span className="ml-2">Consider income-driven repayment plans</span>
                      </Badge>
                      <Badge variant="outline" className="w-full justify-start p-3">
                        <span className="font-medium">Mixed Debt:</span>
                        <span className="ml-2">Balance psychological wins vs. math optimization</span>
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

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
