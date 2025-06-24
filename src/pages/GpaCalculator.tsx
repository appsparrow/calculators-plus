
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  name: string;
  credits: number;
  grade: string;
}

const gradePoints: { [key: string]: number } = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

const GpaCalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { name: '', credits: 3, grade: 'A' },
  ]);
  const [semesterGPA, setSemesterGPA] = useState(0.0);
  const [previousGPA, setPreviousGPA] = useState(3.5);
  const [previousCredits, setPreviousCredits] = useState(60);
  const [cumulativeGPA, setCumulativeGPA] = useState(3.5);

  const addCourse = () => {
    setCourses([...courses, { name: '', credits: 3, grade: 'A' }]);
  };

  const updateCourse = (index: number, field: keyof Course, value: string | number) => {
    const updatedCourses = [...courses];
    if (field === 'name') {
      updatedCourses[index][field] = value as string;
    } else if (field === 'credits') {
      updatedCourses[index][field] = value as number;
    } else if (field === 'grade') {
      updatedCourses[index][field] = value as string;
    }
    setCourses(updatedCourses);
  };

  const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalCreditsAttempted = 0;

    courses.forEach((course) => {
      const points = gradePoints[course.grade] || 0;
      totalGradePoints += course.credits * points;
      totalCreditsAttempted += course.credits;
    });

    const newSemesterGPA = totalCreditsAttempted === 0 ? 0 : totalGradePoints / totalCreditsAttempted;
    setSemesterGPA(parseFloat(newSemesterGPA.toFixed(2)));

    // Calculate cumulative GPA
    const totalCumulativeGradePoints = previousGPA * previousCredits + totalGradePoints;
    const totalCumulativeCredits = previousCredits + totalCreditsAttempted;
    const newCumulativeGPA = totalCumulativeCredits === 0 ? 0 : totalCumulativeGradePoints / totalCumulativeCredits;
    setCumulativeGPA(parseFloat(newCumulativeGPA.toFixed(2)));
  };

  useEffect(() => {
    calculateGPA();
  }, [courses, previousGPA, previousCredits]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-sky-50 to-pink-50">
      <head>
        <title>GPA Calculator | Calculate Your Grade Point Average</title>
        <meta name="description" content="Easily calculate your GPA with our free GPA calculator. Compute your semester and cumulative GPA by entering your grades and credits." />
        <meta name="keywords" content="GPA calculator, grade point average, calculate GPA, semester GPA, cumulative GPA, college GPA, high school GPA" />
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
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-600 bg-clip-text text-transparent">
                  GPA Calculator
                </h1>
                <p className="text-sm text-gray-600">Calculate semester and cumulative GPA</p>
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
            {/* Input Panel */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>Enter your course details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Course Name</label>
                      <Input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Credits</label>
                      <Input
                        type="number"
                        value={course.credits}
                        onChange={(e) => updateCourse(index, 'credits', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Grade</label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={course.grade}
                        onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                      >
                        {Object.keys(gradePoints).map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                <Button variant="secondary" onClick={addCourse}>
                  Add Course
                </Button>
              </CardContent>
            </Card>

            {/* Previous GPA Input */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Previous Academic Record</CardTitle>
                <CardDescription>Enter your previous cumulative GPA and credits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Previous Cumulative GPA</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={previousGPA}
                      onChange={(e) => setPreviousGPA(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Previous Total Credits</label>
                    <Input
                      type="number"
                      value={previousCredits}
                      onChange={(e) => setPreviousCredits(Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>GPA Results</CardTitle>
                <CardDescription>Your calculated GPA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Semester GPA:</p>
                    <p className="text-2xl font-bold">{semesterGPA.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cumulative GPA:</p>
                    <p className="text-2xl font-bold">{cumulativeGPA.toFixed(2)}</p>
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
