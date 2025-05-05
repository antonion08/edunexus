"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Assignment, fetchMockData } from "@/lib/dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, isPast, parseISO } from "date-fns";
import { AlertCircle, Calendar, CheckCircle, Clock, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const data = await fetchMockData<Assignment[]>("assignments");
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssignmentData();
  }, []);
  
  const pendingAssignments = assignments.filter(a => a.status === "pending");
  const submittedAssignments = assignments.filter(a => a.status === "submitted");
  const gradedAssignments = assignments.filter(a => a.status === "graded");
  
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
  
  const renderAssignmentCard = (assignment: Assignment) => {
    const dueDate = parseISO(assignment.dueDate);
    const isOverdue = assignment.status === "pending" && isPast(dueDate);
    
    return (
      <motion.div key={assignment.id} variants={item}>
        <Card className={`mb-4 border-l-4 ${
          isOverdue ? "border-l-destructive" :
          assignment.status === "pending" ? "border-l-amber-500" :
          assignment.status === "submitted" ? "border-l-blue-500" : 
          "border-l-green-500"
        }`}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{assignment.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{assignment.course}</p>
              </div>
              <Badge variant={
                isOverdue ? "destructive" :
                assignment.status === "pending" ? "outline" :
                assignment.status === "submitted" ? "secondary" : 
                "default"
              }>
                {isOverdue ? "Overdue" : assignment.status}
                {assignment.grade && ` - ${assignment.grade}%`}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Due: {format(dueDate, "PPP")}</span>
              </div>
              <div className="flex">
                <Button variant="outline" size="sm" className="mr-2">
                  <FileText className="mr-1 h-4 w-4" />
                  View Details
                </Button>
                {assignment.status === "pending" && (
                  <Button size="sm">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5 text-amber-500" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pendingAssignments.length}</p>
            <p className="text-sm text-muted-foreground">assignments to complete</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-blue-500" />
              Submitted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{submittedAssignments.length}</p>
            <p className="text-sm text-muted-foreground">assignments awaiting grade</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-green-500" />
              Graded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{gradedAssignments.length}</p>
            <p className="text-sm text-muted-foreground">assignments completed</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {loading ? (
            <div className="flex justify-center py-8">Loading assignments...</div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              {assignments.length > 0 ? 
                assignments.map(renderAssignmentCard) : 
                <p className="text-center py-8 text-muted-foreground">No assignments found</p>
              }
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          {loading ? (
            <div className="flex justify-center py-8">Loading assignments...</div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              {pendingAssignments.length > 0 ? 
                pendingAssignments.map(renderAssignmentCard) : 
                <div className="text-center py-8 text-muted-foreground flex flex-col items-center">
                  <CheckCircle className="h-8 w-8 mb-2" />
                  <p>No pending assignments</p>
                </div>
              }
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="submitted" className="mt-4">
          {loading ? (
            <div className="flex justify-center py-8">Loading assignments...</div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              {submittedAssignments.length > 0 ? 
                submittedAssignments.map(renderAssignmentCard) : 
                <div className="text-center py-8 text-muted-foreground flex flex-col items-center">
                  <AlertCircle className="h-8 w-8 mb-2" />
                  <p>No submitted assignments</p>
                </div>
              }
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="graded" className="mt-4">
          {loading ? (
            <div className="flex justify-center py-8">Loading assignments...</div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              {gradedAssignments.length > 0 ? 
                gradedAssignments.map(renderAssignmentCard) : 
                <div className="text-center py-8 text-muted-foreground flex flex-col items-center">
                  <AlertCircle className="h-8 w-8 mb-2" />
                  <p>No graded assignments</p>
                </div>
              }
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}