
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalculatorHeader from '@/components/CalculatorHeader';
import AdSenseAd from '@/components/AdSenseAd';

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
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [results, setResults] = useState<CalorieResult | null>(null);
  const [micronutrients, setMicronutrients] = useState<Micronutrients | null>(null);

  // Convert weight to kg for calculations
  const getWeightInKg = () => {
    return weightUnit === 'lbs' ? weight * 0.453592 : weight;
  };

  // Handle unit switch with conversion
  const toggleWeightUnit = () => {
    const newUnit = weightUnit === 'kg' ? 'lbs' : 'kg';
    const convertedWeight = weightUnit === 'kg' 
      ? Math.round(weight * 2.20462 * 10) / 10  // kg to lbs
      : Math.round(weight * 0.453592 * 10) / 10; // lbs to kg
    
    setWeight(convertedWeight);
    setWeightUnit(newUnit);
  };

  const calculateCalories = () => {
    let bmr: number;
    const weightInKg = getWeightInKg();

    if (gender === 'male') {
      bmr = 10 * weightInKg + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * height - 5 * age - 161;
    }

    let calories = bmr * activityLevel;

    if (goal === 'lose') {
      calories -= 500;
    } else if (goal === 'gain') {
      calories += 500;
    }

    const protein = weightInKg * 1.6;
    const fat = weightInKg * 1;
    const carbs = (calories - protein * 4 - fat * 9) / 4;

    setResults({
      bmr: bmr,
      calories: calories,
      protein: protein,
      carbs: carbs,
      fat: fat,
    });

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
  }, [age, gender, height, weight, weightUnit, activityLevel, goal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>Calorie Calculator | Daily Calorie Needs & Macro Calculator</title>
        <meta name="description" content="Calculate your daily calorie needs and macro ratios with our free calorie calculator. Determine your BMR, TDEE, and optimal protein, carbs, and fat intake for weight loss, maintenance, or gain." />
        <meta name="keywords" content="calorie calculator, macro calculator, BMR calculator, TDEE calculator, daily calorie needs, weight loss calculator, weight gain calculator, protein intake, carb intake, fat intake" />
      </head>

      <CalculatorHeader
        title="Calorie Calculator"
        description="Calculate daily calorie needs and macros"
        icon={Flame}
        gradientFrom="orange-400"
        gradientTo="orange-600"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
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
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>Enter your details to calculate your calorie needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <div className="flex space-x-2">
                        <Button
                          variant={gender === 'male' ? 'default' : 'outline'}
                          onClick={() => setGender('male')}
                          className="flex-1"
                          size="sm"
                        >
                          Male
                        </Button>
                        <Button
                          variant={gender === 'female' ? 'default' : 'outline'}
                          onClick={() => setGender('female')}
                          className="flex-1"
                          size="sm"
                        >
                          Female
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Height (cm)</label>
                      <Input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium">Weight ({weightUnit})</label>
                        <button
                          type="button"
                          onClick={toggleWeightUnit}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                        >
                          Switch to {weightUnit === 'kg' ? 'lbs' : 'kg'}
                        </button>
                      </div>
                      <Input
                        type="number"
                        step={weightUnit === 'lbs' ? '0.1' : '0.1'}
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                      />
                    </div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <Button
                        variant={goal === 'lose' ? 'default' : 'outline'}
                        onClick={() => setGoal('lose')}
                        size="sm"
                      >
                        Lose Weight
                      </Button>
                      <Button
                        variant={goal === 'maintain' ? 'default' : 'outline'}
                        onClick={() => setGoal('maintain')}
                        size="sm"
                      >
                        Maintain Weight
                      </Button>
                      <Button
                        variant={goal === 'gain' ? 'default' : 'outline'}
                        onClick={() => setGoal('gain')}
                        size="sm"
                      >
                        Gain Weight
                      </Button>
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

            {/* Results Panel */}
            <div className="w-full lg:w-80 space-y-6">
              {results && (
                <>
                  {/* Main Results */}
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
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
                    <div className="grid grid-cols-3 gap-3">
                      <Card className="bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Vitamin C</p>
                          <p className="font-semibold">{micronutrients.vitaminC}mg</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Vitamin D</p>
                          <p className="font-semibold">{micronutrients.vitaminD}μg</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Iron</p>
                          <p className="font-semibold">{micronutrients.iron}mg</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Calcium</p>
                          <p className="font-semibold">{micronutrients.calcium}mg</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Fiber</p>
                          <p className="font-semibold">{micronutrients.fiber}g</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Sodium</p>
                          <p className="font-semibold">{micronutrients.sodium}mg</p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </>
              )}
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

export default CalorieCalculator;
