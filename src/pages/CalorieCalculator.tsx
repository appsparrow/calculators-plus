
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CalorieResults {
  bmr: number;
  maintain: number;
  mildLoss: number;
  weightLoss: number;
  extremeLoss: number;
  protein: number;
  carbs: number;
  fats: number;
}

const CalorieCalculator = () => {
  const [age, setAge] = useState(27);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(10);
  const [weight, setWeight] = useState(203);
  const [activityLevel, setActivityLevel] = useState(1.55); // Moderately active
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [results, setResults] = useState<CalorieResults>({
    bmr: 0,
    maintain: 0,
    mildLoss: 0,
    weightLoss: 0,
    extremeLoss: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });

  const activityLevels = [
    { value: 1.2, label: 'Sedentary: little or no exercise' },
    { value: 1.375, label: 'Lightly Active: light exercise 1-3 days/week' },
    { value: 1.55, label: 'Moderately Active: moderate exercise 3-5 days/week' },
    { value: 1.725, label: 'Very Active: hard exercise 6-7 days/week' },
    { value: 1.9, label: 'Extra Active: very hard exercise & physical job' }
  ];

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (age <= 0 || age > 150) newErrors.age = "Age must be between 1 and 150";
    if (heightFeet <= 0 || heightFeet > 10) newErrors.heightFeet = "Height must be realistic";
    if (heightInches < 0 || heightInches >= 12) newErrors.heightInches = "Inches must be 0-11";
    if (weight <= 0 || weight > 1000) newErrors.weight = "Weight must be between 1 and 1000 lbs";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCalories = () => {
    if (!validateInputs()) return;

    // Convert measurements
    const weightKg = weight / 2.205;
    const heightCm = ((heightFeet * 12) + heightInches) * 2.54;

    // Calculate BMR using Mifflin-St Jeor formula
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityLevel;

    // Calculate calorie goals
    const maintain = tdee;
    const mildLoss = tdee - 250;
    const weightLoss = tdee - 500;
    const extremeLoss = tdee - 1000;

    // Calculate macronutrients for maintenance calories
    const protein = (maintain * 0.30) / 4; // 30% protein, 4 cal/g
    const carbs = (maintain * 0.40) / 4;   // 40% carbs, 4 cal/g
    const fats = (maintain * 0.30) / 9;    // 30% fats, 9 cal/g

    setResults({
      bmr: Math.round(bmr),
      maintain: Math.round(maintain),
      mildLoss: Math.round(mildLoss),
      weightLoss: Math.round(weightLoss),
      extremeLoss: Math.round(extremeLoss),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats)
    });
  };

  useEffect(() => {
    calculateCalories();
  }, [age, gender, heightFeet, heightInches, weight, activityLevel]);

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
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-sky-400 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-sky-600 bg-clip-text text-transparent">
                  Calorie Calculator
                </h1>
                <p className="text-sm text-gray-600">Estimate daily calorie needs for your goals</p>
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
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className={errors.age ? 'border-red-500' : ''}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Height</label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className={`${errors.heightFeet ? 'border-red-500' : ''} flex-1`}
                    placeholder="Feet"
                  />
                  <span className="self-center">ft</span>
                  <Input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className={`${errors.heightInches ? 'border-red-500' : ''} flex-1`}
                    placeholder="Inches"
                  />
                  <span className="self-center">in</span>
                </div>
                {(errors.heightFeet || errors.heightInches) && (
                  <p className="text-red-500 text-xs mt-1">{errors.heightFeet || errors.heightInches}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Weight (lbs)</label>
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className={errors.weight ? 'border-red-500' : ''}
                />
                {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {activityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Calorie Results</CardTitle>
              <CardDescription>Daily calorie needs for different goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                  <span className="font-medium">Maintain Weight</span>
                  <span className="font-bold text-lg">{results.maintain} calories</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg">
                  <span className="font-medium">Mild Weight Loss (0.5 lb/week)</span>
                  <span className="font-bold text-lg">{results.mildLoss} calories</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg">
                  <span className="font-medium">Weight Loss (1 lb/week)</span>
                  <span className="font-bold text-lg">{results.weightLoss} calories</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                  <span className="font-medium">Extreme Weight Loss (2 lb/week)</span>
                  <span className="font-bold text-lg">{results.extremeLoss} calories</span>
                </div>
              </div>

              {results.extremeLoss < 1200 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">
                    ⚠️ Warning: Extreme weight loss may not be sustainable. Consult a healthcare provider.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Macronutrient Breakdown */}
        <Card className="mt-8 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Macronutrient Breakdown</CardTitle>
            <CardDescription>Daily intake for maintenance calories ({results.maintain} calories)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Protein</h4>
                <p className="text-3xl font-bold text-blue-900">{results.protein}g</p>
                <p className="text-sm text-blue-700">30% of calories</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Carbohydrates</h4>
                <p className="text-3xl font-bold text-green-900">{results.carbs}g</p>
                <p className="text-sm text-green-700">40% of calories</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Fats</h4>
                <p className="text-3xl font-bold text-yellow-900">{results.fats}g</p>
                <p className="text-sm text-yellow-700">30% of calories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalorieCalculator;
