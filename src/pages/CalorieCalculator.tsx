
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CalorieResult {
  bmr: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Micronutrients {
  vitaminC: number;
  vitaminD: number;
  iron: number;
  calcium: number;
  fiber: number;
  sodium: number;
}

const CalorieCalculator = () => {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [results, setResults] = useState<CalorieResult | null>(null);
  const [micronutrients, setMicronutrients] = useState<Micronutrients | null>(null);

  const calculateCalories = () => {
    let bmr: number;

    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let calories = bmr * activityLevel;

    if (goal === 'lose') {
      calories -= 500;
    } else if (goal === 'gain') {
      calories += 500;
    }

    const protein = weight * 1.6;
    const fat = weight * 1;
    const carbs = (calories - protein * 4 - fat * 9) / 4;

    setResults({
      bmr: bmr,
      calories: calories,
      protein: protein,
      carbs: carbs,
      fat: fat,
    });

    // Calculate micronutrients based on gender and age
    const vitaminC = gender === 'male' ? 90 : 75;
    const vitaminD = 15;
    const iron = gender === 'male' ? 8 : (age > 50 ? 8 : 18);
    const calcium = age > 50 ? 1200 : 1000;
    const fiber = Math.round(calories / 1000 * 14);
    const sodium = 2300;

    setMicronutrients({
      vitaminC,
      vitaminD,
      iron,
      calcium,
      fiber,
      sodium,
    });
  };

  useEffect(() => {
    calculateCalories();
  }, [age, gender, height, weight, activityLevel, goal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>Calorie Calculator | Daily Calorie Needs & Macro Calculator</title>
        <meta name="description" content="Calculate your daily calorie needs and macro ratios with our free calorie calculator. Determine your BMR, TDEE, and optimal protein, carbs, and fat intake for weight loss, maintenance, or gain." />
        <meta name="keywords" content="calorie calculator, macro calculator, BMR calculator, TDEE calculator, daily calorie needs, weight loss calculator, weight gain calculator, protein intake, carb intake, fat intake" />
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Calorie Calculator
                </h1>
                <p className="text-sm text-gray-600">Calculate daily calorie needs and macros</p>
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
            {/* Input Panel */}
            <div className="flex-1 space-y-8">
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>Enter your details to calculate your calorie needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Age</label>
                    <Input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <div className="flex space-x-4">
                      <Button
                        variant={gender === 'male' ? 'default' : 'outline'}
                        onClick={() => setGender('male')}
                      >
                        Male
                      </Button>
                      <Button
                        variant={gender === 'female' ? 'default' : 'outline'}
                        onClick={() => setGender('female')}
                      >
                        Female
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Height (cm)</label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Activity Level</label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(Number(e.target.value))}
                    >
                      <option value={1.2}>Sedentary (little to no exercise)</option>
                      <option value={1.375}>Lightly Active (light exercise/sports 1-3 days/week)</option>
                      <option value={1.55}>Moderately Active (moderate exercise/sports 3-5 days/week)</option>
                      <option value={1.725}>Very Active (hard exercise/sports 6-7 days a week)</option>
                      <option value={1.9}>Extremely Active (very hard exercise/sports & physical job)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Goal</label>
                    <div className="flex space-x-4">
                      <Button
                        variant={goal === 'lose' ? 'default' : 'outline'}
                        onClick={() => setGoal('lose')}
                      >
                        Lose Weight
                      </Button>
                      <Button
                        variant={goal === 'maintain' ? 'default' : 'outline'}
                        onClick={() => setGoal('maintain')}
                      >
                        Maintain Weight
                      </Button>
                      <Button
                        variant={goal === 'gain' ? 'default' : 'outline'}
                        onClick={() => setGoal('gain')}
                      >
                        Gain Weight
                      </Button>
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

            {/* Results Panel */}
            <div className="w-80 space-y-6">
              {results && (
                <>
                  {/* Main Results */}
                  <div className="grid grid-cols-1 gap-4">
                    <Card className="bg-white/60 backdrop-blur-sm">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm font-medium text-gray-500">Daily Calories</p>
                        <p className="text-2xl font-bold text-green-600">{results.calories.toFixed(0)}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/60 backdrop-blur-sm">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm font-medium text-gray-500">BMR</p>
                        <p className="text-2xl font-bold text-blue-600">{results.bmr.toFixed(0)}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Macronutrients */}
                  <Card className="bg-white/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Macronutrients</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Protein:</span>
                        <span className="font-bold">{results.protein.toFixed(0)}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Carbs:</span>
                        <span className="font-bold">{results.carbs.toFixed(0)}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Fat:</span>
                        <span className="font-bold">{results.fat.toFixed(0)}g</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Micronutrients */}
                  {micronutrients && (
                    <Card className="bg-white/60 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Daily Micronutrients</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Vitamin C:</span>
                            <p className="font-semibold">{micronutrients.vitaminC}mg</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Vitamin D:</span>
                            <p className="font-semibold">{micronutrients.vitaminD}μg</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Iron:</span>
                            <p className="font-semibold">{micronutrients.iron}mg</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Calcium:</span>
                            <p className="font-semibold">{micronutrients.calcium}mg</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Fiber:</span>
                            <p className="font-semibold">{micronutrients.fiber}g</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Sodium:</span>
                            <p className="font-semibold">{micronutrients.sodium}mg</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
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

export default CalorieCalculator;
