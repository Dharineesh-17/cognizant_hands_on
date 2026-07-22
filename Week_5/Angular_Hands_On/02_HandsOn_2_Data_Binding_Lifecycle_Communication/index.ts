// ===== Course Model =====
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // in hours
  category: CourseCategory;
  level: CourseLevel;
  rating: number;
  enrolledStudents: number;
  maxCapacity: number;
  imageUrl: string;
  price: number;
  startDate: string;
  endDate: string;
  status: CourseStatus;
  tags: string[];
  syllabus: SyllabusItem[];
}

export interface SyllabusItem {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number;
}

export type CourseCategory =
  | 'Web Development'
  | 'Mobile Development'
  | 'Data Science'
  | 'Machine Learning'
  | 'Cloud Computing'
  | 'DevOps'
  | 'UI/UX Design'
  | 'Cybersecurity';

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CourseStatus = 'Active' | 'Upcoming' | 'Completed' | 'Draft';

// ===== Student Model =====
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  enrollmentDate: string;
  enrolledCourses: string[]; // course IDs
  grade: string;
  department: string;
  address: Address;
  gpa: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// ===== Enrollment Model =====
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledDate: string;
  completionDate?: string;
  status: EnrollmentStatus;
  progress: number; // 0-100
  grade?: string;
}

export type EnrollmentStatus = 'Active' | 'Completed' | 'Dropped' | 'Suspended';

// ===== Dashboard Stats =====
export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  activeEnrollments: number;
  completionRate: number;
  averageGPA: number;
  topCategories: { category: string; count: number }[];
  recentEnrollments: Enrollment[];
  monthlyTrend: { month: string; enrollments: number }[];
}
