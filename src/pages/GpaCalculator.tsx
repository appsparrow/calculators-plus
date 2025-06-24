
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, ArrowLeft, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface GpaResult {
  currentGpa: number;
  totalCredits: number;
  qualityPoints: number;
}

const GpaCalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', credits: 3, grade: 'A' }
  ]);
  const [results, setResults] = useState<GpaResult>({
    currentGpa: 0,
    totalCredits: 0,
    qualityPoints: 0
  });

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  const gradeOptions = Object.keys(gradePoints);

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      credits: 3,
      grade: 'A'
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGpa = () => {
    const validCourses = courses.filter(course => course.credits > 0);
    
    if (validCourses.length === 0) {
      setResults({ currentGpa: 0, totalCredits: 0, qualityPoints: 0 });
      return;
    }

    let totalQualityPoints = 0;
    let totalCredits = 0;

    validCourses.forEach(course => {
      const points = gradePoints[course.grade] || 0;
      totalQualityPoints += points * course.credits;
      totalCredits += course.credits;
    });

    const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

    setResults({
      currentGpa: Math.round(gpa * 100) / 100,
      totalCredits,
      qualityPoints: Math.round(totalQualityPoints * 100) / 100
    });
  };

  useEffect(() => {
    calculateGpa();
  }, [courses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      {/* Meta tags for SEO */}
      <head>
        <title>GPA Calculator | Semester & Cumulative Grade Point Average Tool</title>
        <meta name="description" content="Easily calculate your semester or cumulative GPA. Track your grades, credits, and see if you qualify for Dean's List, honors, or graduate school requirements." />
        <meta name="keywords" content="GPA calculator, grade point average calculator, semester GPA, cumulative GPA, college GPA, high school GPA, Dean's List, honors, academic calculator" />
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
              <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-pink-400 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-pink-600 bg-clip-text text-transparent">
                  GPA Calculator
                </h1>
                <p className="text-sm text-gray-600">Calculate your Grade Point Average</p>
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
                  <CardTitle>Course Information</CardTitle>
                  <CardDescription>Add your courses to calculate your GPA</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={course.id} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <label className="block text-xs font-medium mb-1">Course Name</label>
                        <Input
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          placeholder="e.g., Math 101"
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium mb-1">Credits</label>
                        <Input
                          type="number"
                          value={course.credits}
                          onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                          className="text-sm"
                          min="0"
                          max="6"
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="block text-xs font-medium mb-1">Grade</label>
                        <select
                          value={course.grade}
                          onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                          className="w-full p-2 text-sm border border-gray-300 rounded-md"
                        >
                          {gradeOptions.map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCourse(course.id)}
                          className="p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={addCourse}
                    className="w-full flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Course</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Results Panel */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>GPA Results</CardTitle>
                  <CardDescription>Your calculated Grade Point Average</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-100 to-purple-200 rounded-lg">
                    <p className="text-4xl font-bold text-blue-900">{results.currentGpa.toFixed(2)}</p>
                    <p className="text-lg text-blue-700">Current GPA</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                      <p className="text-2xl font-bold text-green-900">{results.totalCredits}</p>
                      <p className="text-sm text-green-700">Total Credits</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg">
                      <p className="text-2xl font-bold text-orange-900">{results.qualityPoints}</p>
                      <p className="text-sm text-orange-700">Quality Points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Table */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Course Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Course</th>
                        <th className="text-center p-2">Credits</th>
                        <th className="text-center p-2">Grade</th>
                        <th className="text-center p-2">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.filter(course => course.credits > 0).map((course) => (
                        <tr key={course.id} className="border-b">
                          <td className="p-2">{course.name || 'Unnamed Course'}</td>
                          <td className="text-center p-2">{course.credits}</td>
                          <td className="text-center p-2">{course.grade}</td>
                          <td className="text-center p-2">{(gradePoints[course.grade] * course.credits).toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Academic Benchmarks */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Academic Benchmarks</CardTitle>
                <CardDescription>Common GPA requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg border-2 ${results.currentGpa >= 3.5 ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'}`}>
                    <h4 className="font-medium text-green-800">Dean's List</h4>
                    <p className="text-2xl font-bold text-green-900">3.5+</p>
                    <p className="text-sm text-green-700">GPA Required</p>
                    <p className="text-xs mt-1">Typically needed for Dean's List recognition</p>
                  </div>
                  <div className={`p-4 rounded-lg border-2 ${results.currentGpa >= 3.7 ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-100 border-gray-300'}`}>
                    <h4 className="font-medium text-yellow-800">Honors</h4>
                    <p className="text-2xl font-bold text-yellow-900">3.7+</p>
                    <p className="text-sm text-yellow-700">GPA Required</p>
                    <p className="text-xs mt-1">Common requirement for graduating with honors</p>
                  </div>
                  <div className={`p-4 rounded-lg border-2 ${results.currentGpa >= 3.0 ? 'bg-blue-100 border-blue-300' : 'bg-gray-100 border-gray-300'}`}>
                    <h4 className="font-medium text-blue-800">Graduate School</h4>
                    <p className="text-2xl font-bold text-blue-900">3.0+</p>
                    <p className="text-sm text-blue-700">GPA Required</p>
                    <p className="text-xs mt-1">Minimum GPA for most graduate programs</p>
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

export default GpaCalculator;
