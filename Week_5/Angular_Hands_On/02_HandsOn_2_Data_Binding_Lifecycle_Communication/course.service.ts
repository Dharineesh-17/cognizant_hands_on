import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import {
  Course,
  CourseCategory,
  CourseLevel,
  CourseStatus,
  DashboardStats,
  Enrollment,
  EnrollmentStatus,
  Student,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private mockCourses: Course[] = [
    {
      id: '1',
      title: 'Angular Fundamentals',
      description: 'Learn Angular from scratch. Build modern, reactive web applications with components, services, and TypeScript.',
      instructor: 'Sarah Johnson',
      duration: 40,
      category: 'Web Development',
      level: 'Beginner',
      rating: 4.8,
      enrolledStudents: 156,
      maxCapacity: 200,
      imageUrl: 'assets/images/angular-course.jpg',
      price: 49.99,
      startDate: '2025-08-01',
      endDate: '2025-10-15',
      status: 'Active',
      tags: ['Angular', 'TypeScript', 'Web Dev'],
      syllabus: [
        { id: 's1', title: 'Introduction to Angular', description: 'Setup and first app', order: 1, duration: 4 },
        { id: 's2', title: 'Components & Templates', description: 'Building UI with components', order: 2, duration: 6 },
        { id: 's3', title: 'Services & Dependency Injection', description: 'Angular services', order: 3, duration: 5 },
        { id: 's4', title: 'Routing & Navigation', description: 'SPA navigation', order: 4, duration: 5 },
        { id: 's5', title: 'Forms & Validation', description: 'Template & reactive forms', order: 5, duration: 6 },
        { id: 's6', title: 'HTTP & API Integration', description: 'Connecting to backends', order: 6, duration: 5 },
        { id: 's7', title: 'State Management', description: 'RxJS & NgRx basics', order: 7, duration: 5 },
        { id: 's8', title: 'Testing & Deployment', description: 'Unit tests & CI/CD', order: 8, duration: 4 },
      ],
    },
    {
      id: '2',
      title: 'React Advanced Patterns',
      description: 'Master advanced React patterns including hooks context, performance optimization, and architecture.',
      instructor: 'Mike Chen',
      duration: 35,
      category: 'Web Development',
      level: 'Advanced',
      rating: 4.6,
      enrolledStudents: 98,
      maxCapacity: 150,
      imageUrl: 'assets/images/react-course.jpg',
      price: 59.99,
      startDate: '2025-09-01',
      endDate: '2025-11-30',
      status: 'Upcoming',
      tags: ['React', 'Hooks', 'Advanced'],
      syllabus: [
        { id: 's1', title: 'Advanced Hooks', description: 'Custom hooks & patterns', order: 1, duration: 6 },
        { id: 's2', title: 'Context & State', description: 'Global state management', order: 2, duration: 5 },
        { id: 's3', title: 'Performance', description: 'Memo, callbacks, optimization', order: 3, duration: 6 },
        { id: 's4', title: 'Architecture', description: 'Clean architecture patterns', order: 4, duration: 6 },
        { id: 's5', title: 'Testing', description: 'Jest, RTL, E2E', order: 5, duration: 6 },
        { id: 's6', title: 'SSR & Next.js', description: 'Server-side rendering', order: 6, duration: 6 },
      ],
    },
    {
      id: '3',
      title: 'Python for Data Science',
      description: 'Comprehensive data science course covering Python, pandas, NumPy, matplotlib, and machine learning basics.',
      instructor: 'Dr. Priya Sharma',
      duration: 50,
      category: 'Data Science',
      level: 'Intermediate',
      rating: 4.9,
      enrolledStudents: 210,
      maxCapacity: 250,
      imageUrl: 'assets/images/python-ds.jpg',
      price: 69.99,
      startDate: '2025-07-15',
      endDate: '2025-12-20',
      status: 'Active',
      tags: ['Python', 'Data Science', 'Pandas', 'ML'],
      syllabus: [
        { id: 's1', title: 'Python Refresher', description: 'Core Python concepts', order: 1, duration: 5 },
        { id: 's2', title: 'NumPy Fundamentals', description: 'Numerical computing', order: 2, duration: 6 },
        { id: 's3', title: 'Pandas Deep Dive', description: 'Data manipulation', order: 3, duration: 8 },
        { id: 's4', title: 'Data Visualization', description: 'Matplotlib & Seaborn', order: 4, duration: 7 },
        { id: 's5', title: 'Statistical Analysis', description: 'Stats & hypothesis testing', order: 5, duration: 8 },
        { id: 's6', title: 'Intro to ML', description: 'Scikit-learn basics', order: 6, duration: 8 },
        { id: 's7', title: 'Capstone Project', description: 'End-to-end data project', order: 7, duration: 8 },
      ],
    },
    {
      id: '4',
      title: 'AWS Cloud Practitioner',
      description: 'Prepare for the AWS Cloud Practitioner certification with hands-on labs and real-world scenarios.',
      instructor: 'Alex Thompson',
      duration: 30,
      category: 'Cloud Computing',
      level: 'Beginner',
      rating: 4.5,
      enrolledStudents: 175,
      maxCapacity: 300,
      imageUrl: 'assets/images/aws-course.jpg',
      price: 39.99,
      startDate: '2025-08-15',
      endDate: '2025-10-30',
      status: 'Active',
      tags: ['AWS', 'Cloud', 'Certification'],
      syllabus: [
        { id: 's1', title: 'Cloud Concepts', description: 'What is cloud computing', order: 1, duration: 4 },
        { id: 's2', title: 'AWS Core Services', description: 'EC2, S3, RDS, Lambda', order: 2, duration: 8 },
        { id: 's3', title: 'Security & Compliance', description: 'IAM, policies', order: 3, duration: 5 },
        { id: 's4', title: 'Pricing & Support', description: 'Cost optimization', order: 4, duration: 4 },
        { id: 's5', title: 'Exam Prep', description: 'Practice questions', order: 5, duration: 9 },
      ],
    },
    {
      id: '5',
      title: 'UI/UX Design Masterclass',
      description: 'Learn user-centered design from research to prototyping. Master Figma and modern design systems.',
      instructor: 'Emma Rodriguez',
      duration: 45,
      category: 'UI/UX Design',
      level: 'Beginner',
      rating: 4.7,
      enrolledStudents: 132,
      maxCapacity: 180,
      imageUrl: 'assets/images/uiux-course.jpg',
      price: 54.99,
      startDate: '2025-09-10',
      endDate: '2025-12-15',
      status: 'Upcoming',
      tags: ['UI/UX', 'Figma', 'Design Systems'],
      syllabus: [
        { id: 's1', title: 'Design Thinking', description: 'User-centered approach', order: 1, duration: 5 },
        { id: 's2', title: 'User Research', description: 'Interviews & personas', order: 2, duration: 6 },
        { id: 's3', title: 'Wireframing', description: 'Low-fi prototyping', order: 3, duration: 7 },
        { id: 's4', title: 'Visual Design', description: 'Color, typography, layout', order: 4, duration: 8 },
        { id: 's5', title: 'Figma Mastery', description: 'Advanced Figma skills', order: 5, duration: 10 },
        { id: 's6', title: 'Design Systems', description: 'Component libraries', order: 6, duration: 9 },
      ],
    },
    {
      id: '6',
      title: 'DevOps with Docker & Kubernetes',
      description: 'Learn containerization, orchestration, CI/CD pipelines, and infrastructure as code.',
      instructor: 'Raj Patel',
      duration: 38,
      category: 'DevOps',
      level: 'Intermediate',
      rating: 4.4,
      enrolledStudents: 89,
      maxCapacity: 120,
      imageUrl: 'assets/images/devops-course.jpg',
      price: 64.99,
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      status: 'Upcoming',
      tags: ['Docker', 'Kubernetes', 'CI/CD'],
      syllabus: [
        { id: 's1', title: 'Linux Essentials', description: 'Command line basics', order: 1, duration: 4 },
        { id: 's2', title: 'Docker Deep Dive', description: 'Containers & images', order: 2, duration: 8 },
        { id: 's3', title: 'Kubernetes', description: 'Orchestration', order: 3, duration: 10 },
        { id: 's4', title: 'CI/CD Pipelines', description: 'GitHub Actions, Jenkins', order: 4, duration: 8 },
        { id: 's5', title: 'Monitoring & Logging', description: 'Prometheus, Grafana', order: 5, duration: 4 },
        { id: 's6', title: 'IaC with Terraform', description: 'Infrastructure as Code', order: 6, duration: 4 },
      ],
    },
  ];

  getCourses(): Observable<Course[]> {
    return of(this.mockCourses).pipe(delay(300));
  }

  getCourseById(id: string): Observable<Course> {
    const course = this.mockCourses.find((c) => c.id === id);
    if (course) {
      return of(course).pipe(delay(200));
    }
    return throwError(() => new Error('Course not found'));
  }

  getCoursesByCategory(category: CourseCategory): Observable<Course[]> {
    return of(this.mockCourses.filter((c) => c.category === category)).pipe(delay(300));
  }

  getCoursesByLevel(level: CourseLevel): Observable<Course[]> {
    return of(this.mockCourses.filter((c) => c.level === level)).pipe(delay(300));
  }

  getCoursesByStatus(status: CourseStatus): Observable<Course[]> {
    return of(this.mockCourses.filter((c) => c.status === status)).pipe(delay(300));
  }

  searchCourses(query: string): Observable<Course[]> {
    const lower = query.toLowerCase();
    return of(
      this.mockCourses.filter(
        (c) =>
          c.title.toLowerCase().includes(lower) ||
          c.description.toLowerCase().includes(lower) ||
          c.tags.some((t) => t.toLowerCase().includes(lower))
      )
    ).pipe(delay(300));
  }

  addCourse(course: Course): Observable<Course> {
    this.mockCourses.push(course);
    return of(course).pipe(delay(200));
  }

  updateCourse(course: Course): Observable<Course> {
    const index = this.mockCourses.findIndex((c) => c.id === course.id);
    if (index !== -1) {
      this.mockCourses[index] = course;
      return of(course).pipe(delay(200));
    }
    return throwError(() => new Error('Course not found'));
  }

  deleteCourse(id: string): Observable<void> {
    this.mockCourses = this.mockCourses.filter((c) => c.id !== id);
    return of(undefined).pipe(delay(200));
  }

  getCategories(): CourseCategory[] {
    return [
      'Web Development',
      'Mobile Development',
      'Data Science',
      'Machine Learning',
      'Cloud Computing',
      'DevOps',
      'UI/UX Design',
      'Cybersecurity',
    ];
  }
}
