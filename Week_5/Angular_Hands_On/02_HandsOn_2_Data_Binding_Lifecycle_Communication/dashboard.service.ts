import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DashboardStats, Enrollment, EnrollmentStatus } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  getDashboardStats(): Observable<DashboardStats> {
    const stats: DashboardStats = {
      totalStudents: 639,
      totalCourses: 6,
      activeEnrollments: 860,
      completionRate: 78.5,
      averageGPA: 3.63,
      topCategories: [
        { category: 'Web Development', count: 254 },
        { category: 'Data Science', count: 210 },
        { category: 'Cloud Computing', count: 175 },
        { category: 'UI/UX Design', count: 132 },
        { category: 'DevOps', count: 89 },
      ],
      recentEnrollments: [
        {
          id: 'e1',
          studentId: '1',
          courseId: '1',
          enrolledDate: '2025-08-01',
          status: 'Active',
          progress: 65,
          grade: 'A',
        },
        {
          id: 'e2',
          studentId: '2',
          courseId: '4',
          enrolledDate: '2025-08-15',
          status: 'Active',
          progress: 30,
        },
        {
          id: 'e3',
          studentId: '3',
          courseId: '3',
          enrolledDate: '2025-07-20',
          status: 'Active',
          progress: 85,
          grade: 'A-',
        },
        {
          id: 'e4',
          studentId: '4',
          courseId: '2',
          enrolledDate: '2025-09-01',
          status: 'Active',
          progress: 15,
        },
        {
          id: 'e5',
          studentId: '5',
          courseId: '5',
          enrolledDate: '2025-09-10',
          status: 'Active',
          progress: 5,
        },
      ],
      monthlyTrend: [
        { month: 'Jan', enrollments: 45 },
        { month: 'Feb', enrollments: 62 },
        { month: 'Mar', enrollments: 78 },
        { month: 'Apr', enrollments: 95 },
        { month: 'May', enrollments: 110 },
        { month: 'Jun', enrollments: 88 },
        { month: 'Jul', enrollments: 125 },
        { month: 'Aug', enrollments: 142 },
        { month: 'Sep', enrollments: 130 },
        { month: 'Oct', enrollments: 0 },
        { month: 'Nov', enrollments: 0 },
        { month: 'Dec', enrollments: 0 },
      ],
    };
    return of(stats).pipe(delay(400));
  }
}
