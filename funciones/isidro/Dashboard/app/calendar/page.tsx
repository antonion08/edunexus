"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarEvent, fetchMockData } from "@/lib/dashboard-data";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { addDays, format, isSameDay, startOfMonth } from "date-fns";
import { BookOpen, CalendarDays, GraduationCap, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setSelectedDate(new Date());
  }, []);
  
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const data = await fetchMockData<CalendarEvent[]>("calendar");
        setEvents(data);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCalendarData();
  }, []);
  
  if (!mounted) {
    return null;
  }

  const eventsForSelectedDate = selectedDate ? events.filter(event => 
    isSameDay(new Date(event.start), selectedDate as Date)
  ) : [];

  // Function to get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "class":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "assignment":
        return <FileText className="h-4 w-4 text-amber-500" />;
      case "exam":
        return <GraduationCap className="h-4 w-4 text-red-500" />;
      default:
        return <CalendarDays className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Function to get calendar day styles when there's an event
  const getDayClassNames = (date: Date) => {
    if (!selectedDate) return "";
    const hasEvent = events.some(event => 
      isSameDay(new Date(event.start), date)
    );
    
    return hasEvent ? "bg-primary/10 text-primary font-bold rounded-full" : "";
  };
  
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
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-[1fr_300px]">
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>
              View and manage your academic schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">Loading calendar...</div>
            ) : (
              <Calendar
                mode="single"
                selected={selectedDate as Date}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                classNames={{
                  day_selected: "bg-primary text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                }}
                modifiers={{
                  eventDay: (date) => events.some(event => 
                    isSameDay(new Date(event.start), date)
                  )
                }}
                defaultMonth={startOfMonth(events[0]?.start || new Date())}
              />
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? `Events for ${format(selectedDate, "MMMM d, yyyy")}` : "Loading..."}
            </CardTitle>
            <CardDescription>
              {selectedDate ? `${eventsForSelectedDate.length} events scheduled` : "Loading events..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">Loading events...</div>
            ) : (
              <motion.div 
                className="space-y-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {eventsForSelectedDate.length > 0 ? (
                  eventsForSelectedDate.map(event => (
                    <motion.div 
                      key={event.id}
                      variants={item}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="mt-0.5">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{event.title}</h4>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>
                            {format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}
                          </span>
                          <Badge variant="outline" className="ml-auto">
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <CalendarDays className="mx-auto h-8 w-8 mb-2" />
                    <p>No events scheduled for this day</p>
                  </div>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Week</CardTitle>
            <CardDescription>
              Next 7 days at a glance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">Loading events...</div>
            ) : (
              <motion.div 
                className="space-y-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {selectedDate && Array.from({ length: 7 }, (_, i) => {
                  const date = addDays(selectedDate, i);
                  const dayEvents = events.filter(event => 
                    isSameDay(new Date(event.start), date)
                  );
                  
                  return (
                    <motion.div key={i} variants={item}>
                      <div className="font-medium text-sm mb-2">
                        {format(date, "EEEE, MMM d")}
                      </div>
                      {dayEvents.length > 0 ? (
                        <div className="space-y-2">
                          {dayEvents.slice(0, 2).map(event => (
                            <div 
                              key={event.id}
                              className="flex items-center gap-2 text-xs p-2 rounded bg-muted/50"
                            >
                              {getEventIcon(event.type)}
                              <span className="flex-1 truncate">{event.title}</span>
                              <span className="text-muted-foreground">
                                {format(new Date(event.start), "h:mm a")}
                              </span>
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <p className="text-xs text-muted-foreground text-center">
                              +{dayEvents.length - 2} more events
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">No events</p>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}