import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of, interval } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-built-in-pipes-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './built-in-pipes-demo.component.html',
  styleUrl: './built-in-pipes-demo.component.scss'
})
export class BuiltInPipesDemoComponent {
  // DatePipe
  now: Date = new Date();
  enrollmentDate: Date = new Date(2024, 8, 1);
  courseDeadline: string = '2025-12-31T23:59:59';

  // String pipes
  studentName: string = 'alice williams';
  courseTitle: string = 'introduction to angular fundamentals';
  courseCategory: string = 'WEB DEVELOPMENT';

  // SlicePipe
  longDescription: string = 'Learn Angular from scratch. Build modern, reactive web applications with components, services, routing, and forms. This comprehensive course covers everything you need.';
  tags: string[] = ['Angular', 'TypeScript', 'RxJS', 'Forms', 'Routing', 'HTTP', 'Testing', 'NgRx'];
  topStudents: string[] = ['Alice Williams', 'Bob Martinez', 'Carol Nguyen', 'David Kim', 'Eva Brown', 'Frank Patel'];

  // CurrencyPipe / PercentPipe / DecimalPipe
  coursePrice: number = 49.99;
  annualSalary: number = 85000;
  completionRate: number = 0.785;
  gpa: number = 3.85432;
  totalEnrolled: number = 1234567;

  // JsonPipe
  courseObject = {
    id: '1',
    title: 'Angular Fundamentals',
    instructor: 'Sarah Johnson',
    price: 49.99,
    enrolled: 156,
    tags: ['Angular', 'TypeScript'],
  };

  // AsyncPipe
  message$: Observable<string> = of('Data loaded from Observable!').pipe(delay(2000));
  clock$: Observable<Date> = interval(1000).pipe(map(() => new Date()));
  studentData$: Observable<any> = of({
    name: 'Alice Williams',
    course: 'Angular Fundamentals',
    progress: 65,
  }).pipe(delay(1500));

  // I18n pipes
  enrolledCount: number = 0;
  courseCapacity: number = 200;
  studentGender: 'male' | 'female' | 'other' | 'unknown' = 'female';
  enrollmentStatus: 'active' | 'completed' | 'dropped' = 'active';

  genderMap = { male: 'Mr.', female: 'Ms.', other: 'Mx.', unknown: 'Student' };
  statusMap = { active: 'Currently studying', completed: 'Course finished', dropped: 'No longer enrolled' };

  // Interactive controls
  selectedDateFormat: string = 'mediumDate';
  sliceStart: number = 0;
  sliceEnd: number = 3;

  incrementEnrolled(): void {
    if (this.enrolledCount < this.courseCapacity) this.enrolledCount++;
  }
  decrementEnrolled(): void {
    if (this.enrolledCount > 0) this.enrolledCount--;
  }
  cycleGender(): void {
    const genders = ['male', 'female', 'other', 'unknown'] as const;
    const idx = genders.indexOf(this.studentGender);
    this.studentGender = genders[(idx + 1) % genders.length];
  }
}
