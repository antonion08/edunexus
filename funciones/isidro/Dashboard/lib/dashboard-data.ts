export type Course = {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalStudents: number;
  description: string;
  nextClass: string;
  coverImage: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledCourses: number;
  progress: number;
  lastActive: string;
};

export type Assignment = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: number;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  course: string;
  author: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  courseId?: string;
  type: "class" | "assignment" | "exam" | "other";
};

// Mock data for testing UI
export const courses: Course[] = [
  {
    id: "course-1",
    title: "Introduction to Programming",
    instructor: "Dr. Jane Smith",
    progress: 65,
    totalStudents: 120,
    description: "Learn the fundamentals of programming with Python and JavaScript.",
    nextClass: "Tomorrow, 10:00 AM",
    coverImage: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "course-2",
    title: "Advanced Data Structures",
    instructor: "Prof. Michael Johnson",
    progress: 42,
    totalStudents: 85,
    description: "Deep dive into complex data structures and algorithms.",
    nextClass: "Thursday, 2:00 PM",
    coverImage: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "course-3",
    title: "Web Development Masterclass",
    instructor: "Sarah Williams",
    progress: 78,
    totalStudents: 150,
    description: "Build modern websites with HTML, CSS, and JavaScript frameworks.",
    nextClass: "Today, 4:00 PM",
    coverImage: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "course-4",
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Robert Chen",
    progress: 30,
    totalStudents: 95,
    description: "Introduction to machine learning algorithms and applications.",
    nextClass: "Friday, 11:00 AM",
    coverImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export const upcomingAssignments: Assignment[] = [
  {
    id: "assignment-1",
    title: "Programming Basics Quiz",
    course: "Introduction to Programming",
    dueDate: "2025-04-15",
    status: "pending",
  },
  {
    id: "assignment-2",
    title: "Data Structure Implementation",
    course: "Advanced Data Structures",
    dueDate: "2025-04-18",
    status: "pending",
  },
  {
    id: "assignment-3",
    title: "Portfolio Website",
    course: "Web Development Masterclass",
    dueDate: "2025-04-20",
    status: "submitted",
  },
  {
    id: "assignment-4",
    title: "Classification Algorithm",
    course: "Machine Learning Fundamentals",
    dueDate: "2025-04-25",
    status: "graded",
    grade: 92,
  },
];

export const announcements: Announcement[] = [
  {
    id: "announcement-1",
    title: "Course Schedule Change",
    content: "The class scheduled for this Friday will be moved to Saturday at the same time.",
    date: "2025-04-10",
    course: "Introduction to Programming",
    author: "Dr. Jane Smith",
  },
  {
    id: "announcement-2",
    title: "New Learning Resources",
    content: "Additional learning materials have been uploaded to the course repository.",
    date: "2025-04-09",
    course: "Advanced Data Structures",
    author: "Prof. Michael Johnson",
  },
  {
    id: "announcement-3",
    title: "Guest Lecture Announcement",
    content: "We'll have a special guest lecture from a senior developer at Google next week.",
    date: "2025-04-08",
    course: "Web Development Masterclass",
    author: "Sarah Williams",
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Introduction to Programming - Lecture",
    start: new Date(2025, 3, 15, 10, 0),
    end: new Date(2025, 3, 15, 12, 0),
    courseId: "course-1",
    type: "class",
  },
  {
    id: "event-2",
    title: "Advanced Data Structures - Assignment Due",
    start: new Date(2025, 3, 18, 23, 59),
    end: new Date(2025, 3, 18, 23, 59),
    courseId: "course-2",
    type: "assignment",
  },
  {
    id: "event-3",
    title: "Web Development Masterclass - Workshop",
    start: new Date(2025, 3, 17, 14, 0),
    end: new Date(2025, 3, 17, 17, 0),
    courseId: "course-3",
    type: "class",
  },
  {
    id: "event-4",
    title: "Machine Learning Midterm Exam",
    start: new Date(2025, 3, 20, 9, 0),
    end: new Date(2025, 3, 20, 11, 0),
    courseId: "course-4",
    type: "exam",
  },
];

// Analytics data
export const analyticsData = {
  courseCompletionRate: 68,
  averageGrade: 87,
  activeStudents: 450,
  totalCourses: 12,
  engagementByDay: [
    { day: "Mon", hours: 4.5 },
    { day: "Tue", hours: 5.2 },
    { day: "Wed", hours: 3.8 },
    { day: "Thu", hours: 6.1 },
    { day: "Fri", hours: 4.0 },
    { day: "Sat", hours: 2.5 },
    { day: "Sun", hours: 1.8 },
  ],
  gradeDistribution: [
    { grade: "A", count: 120 },
    { grade: "B", count: 150 },
    { grade: "C", count: 95 },
    { grade: "D", count: 45 },
    { grade: "F", count: 20 },
  ],
};

// This would typically come from a Django backend API
export async function fetchMockData<T>(dataType: string): Promise<T> {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  switch (dataType) {
    case 'courses':
      return courses as unknown as T;
    case 'assignments':
      return upcomingAssignments as unknown as T;
    case 'announcements':
      return announcements as unknown as T;
    case 'calendar':
      return calendarEvents as unknown as T;
    case 'analytics':
      return analyticsData as unknown as T;
    default:
      throw new Error(`Unknown data type: ${dataType}`);
  }
}