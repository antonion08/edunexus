"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Course, fetchMockData } from "@/lib/dashboard-data";
import Image from "next/image";
import { BookOpen, Clock, Filter, Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await fetchMockData<Course[]>("courses");
        setCourses(coursesData);
        setFilteredCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let result = [...courses];
    
    // Filter
    if (searchTerm) {
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "progress":
          return b.progress - a.progress;
        case "popularity":
          return b.totalStudents - a.totalStudents;
        default:
          return 0;
      }
    });
    
    setFilteredCourses(result);
  }, [courses, searchTerm, sortBy]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Your Courses</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Name (A-Z)</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">Loading courses...</div>
      ) : (
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredCourses.map((course) => (
            <motion.div key={course.id} variants={item}>
              <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={course.coverImage}
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute top-2 right-2 bg-primary/80">
                    {course.progress}% Complete
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {course.instructor}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{course.totalStudents} enrolled</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{course.nextClass}</span>
                    </div>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">Continue Learning</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </DashboardLayout>
  );
}