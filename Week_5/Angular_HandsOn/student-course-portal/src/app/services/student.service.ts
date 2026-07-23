import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Student } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private mockStudents: Student[] = [
    {
      id: '1',
      firstName: 'Alice',
      lastName: 'Williams',
      email: 'alice.williams@email.com',
      phone: '+1-555-0101',
      avatar: 'assets/images/student-1.jpg',
      enrollmentDate: '2024-09-01',
      enrolledCourses: ['1', '3'],
      grade: 'A',
      department: 'Computer Science',
      gpa: 3.85,
      address: {
        street: '123 University Ave',
        city: 'Boston',
        state: 'MA',
        zipCode: '02115',
        country: 'USA',
      },
    },
    {
      id: '2',
      firstName: 'Bob',
      lastName: 'Martinez',
      email: 'bob.martinez@email.com',
      phone: '+1-555-0102',
      avatar: 'assets/images/student-2.jpg',
      enrollmentDate: '2024-09-01',
      enrolledCourses: ['1', '2', '4'],
      grade: 'B+',
      department: 'Information Technology',
      gpa: 3.4,
      address: {
        street: '456 College Blvd',
        city: 'Austin',
        state: 'TX',
        zipCode: '73301',
        country: 'USA',
      },
    },
    {
      id: '3',
      firstName: 'Carol',
      lastName: 'Nguyen',
      email: 'carol.nguyen@email.com',
      phone: '+1-555-0103',
      avatar: 'assets/images/student-3.jpg',
      enrollmentDate: '2025-01-15',
      enrolledCourses: ['3', '5'],
      grade: 'A-',
      department: 'Data Science',
      gpa: 3.72,
      address: {
        street: '789 Campus Dr',
        city: 'San Jose',
        state: 'CA',
        zipCode: '95110',
        country: 'USA',
      },
    },
    {
      id: '4',
      firstName: 'David',
      lastName: 'Kim',
      email: 'david.kim@email.com',
      phone: '+1-555-0104',
      avatar: 'assets/images/student-4.jpg',
      enrollmentDate: '2024-09-01',
      enrolledCourses: ['2', '4', '6'],
      grade: 'A',
      department: 'Software Engineering',
      gpa: 3.91,
      address: {
        street: '321 Tech Park',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA',
      },
    },
    {
      id: '5',
      firstName: 'Eva',
      lastName: 'Brown',
      email: 'eva.brown@email.com',
      phone: '+1-555-0105',
      avatar: 'assets/images/student-5.jpg',
      enrollmentDate: '2025-02-01',
      enrolledCourses: ['1', '5'],
      grade: 'B',
      department: 'Design & Media',
      gpa: 3.2,
      address: {
        street: '654 Creative Lane',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
    },
    {
      id: '6',
      firstName: 'Frank',
      lastName: 'Patel',
      email: 'frank.patel@email.com',
      phone: '+1-555-0106',
      avatar: 'assets/images/student-6.jpg',
      enrollmentDate: '2024-09-01',
      enrolledCourses: ['3', '4', '6'],
      grade: 'A-',
      department: 'Computer Science',
      gpa: 3.68,
      address: {
        street: '987 Binary Way',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA',
      },
    },
  ];

  getStudents(): Observable<Student[]> {
    return of(this.mockStudents).pipe(delay(300));
  }

  getStudentById(id: string): Observable<Student> {
    const student = this.mockStudents.find((s) => s.id === id);
    if (student) {
      return of(student).pipe(delay(200));
    }
    return of(undefined);
  }

  searchStudents(query: string): Observable<Student[]> {
    const lower = query.toLowerCase();
    return of(
      this.mockStudents.filter(
        (s) =>
          s.firstName.toLowerCase().includes(lower) ||
          s.lastName.toLowerCase().includes(lower) ||
          s.email.toLowerCase().includes(lower) ||
          s.department.toLowerCase().includes(lower)
      )
    ).pipe(delay(300));
  }

  addStudent(student: Student): Observable<Student> {
    this.mockStudents.push(student);
    return of(student).pipe(delay(200));
  }

  updateStudent(student: Student): Observable<Student> {
    const index = this.mockStudents.findIndex((s) => s.id === student.id);
    if (index !== -1) {
      this.mockStudents[index] = student;
      return of(student).pipe(delay(200));
    }
    return of(undefined);
  }

  deleteStudent(id: string): Observable<void> {
    this.mockStudents = this.mockStudents.filter((s) => s.id !== id);
    return of(undefined).pipe(delay(200));
  }
}
