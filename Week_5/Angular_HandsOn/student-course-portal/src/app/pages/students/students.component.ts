import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="students-page">
      <div class="container">
        <div class="page-header">
          <div>
            <h1>Students</h1>
            <p>Manage and view all {{ students.length }} registered students</p>
          </div>
          <button class="btn btn-primary">
            <span class="material-icons">person_add</span>
            Add Student
          </button>
        </div>

        <!-- Search & Filter -->
        <div class="filters-bar">
          <div class="search-box">
            <span class="material-icons">search</span>
            <input type="text"
                   placeholder="Search by name, email, or department..."
                   [(ngModel)]="searchQuery"
                   (ngModelChange)="filterStudents()">
          </div>
          <select [(ngModel)]="sortBy" (ngModelChange)="filterStudents()">
            <option value="name">Sort by Name</option>
            <option value="gpa-desc">GPA (High to Low)</option>
            <option value="gpa-asc">GPA (Low to High)</option>
            <option value="courses">Most Courses</option>
          </select>
        </div>

        <!-- Students Table -->
        <div class="table-wrapper">
          <table class="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Department</th>
                <th>GPA</th>
                <th>Grade</th>
                <th>Courses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let student of filteredStudents"
                  class="table-row"
                  (click)="router.navigate(['/students', student.id])">
                <td>
                  <div class="student-cell">
                    <div class="student-avatar-sm" [style.backgroundColor]="getAvatarColor(student.id)">
                      {{ student.firstName.charAt(0) }}{{ student.lastName.charAt(0) }}
                    </div>
                    <div>
                      <span class="student-name">{{ student.firstName }} {{ student.lastName }}</span>
                      <span class="student-id">ID: {{ student.id }}</span>
                    </div>
                  </div>
                </td>
                <td>{{ student.email }}</td>
                <td><span class="dept-badge">{{ student.department }}</span></td>
                <td>
                  <span class="gpa-value" [class.high-gpa]="student.gpa >= 3.5"
                        [class.med-gpa]="student.gpa >= 3.0 && student.gpa < 3.5"
                        [class.low-gpa]="student.gpa < 3.0">
                    {{ student.gpa.toFixed(2) }}
                  </span>
                </td>
                <td><span class="grade-badge">{{ student.grade }}</span></td>
                <td>{{ student.enrolledCourses.length }}</td>
                <td (click)="$event.stopPropagation()">
                  <button class="btn btn-secondary btn-sm">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="empty-state" *ngIf="filteredStudents.length === 0">
          <span class="material-icons">search_off</span>
          <h3>No students found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .students-page { padding: 2rem 0; }

      .page-header {
        display: flex; justify-content: space-between; align-items: flex-start;
        margin-bottom: 1.5rem;
        h1 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
        p { color: var(--text-secondary); }
      }

      .filters-bar {
        display: flex; gap: 1rem; margin-bottom: 1.5rem;
      }

      .search-box {
        display: flex; align-items: center;
        background: white; border: 1px solid var(--border-color);
        border-radius: var(--border-radius); padding: 0 0.875rem; flex: 1;
        .material-icons { color: var(--text-light); font-size: 20px; }
        input { border: none; outline: none; padding: 0.625rem; font-family: var(--font-family); font-size: var(--font-size-sm); flex: 1; background: transparent; }
      }

      select {
        padding: 0.625rem 0.875rem; border: 1px solid var(--border-color);
        border-radius: var(--border-radius); background: white;
        font-family: var(--font-family); font-size: var(--font-size-sm);
        &:focus { outline: none; border-color: var(--primary-color); }
      }

      .table-wrapper {
        background: white; border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm); overflow-x: auto;
      }

      .students-table {
        width: 100%; border-collapse: collapse;

        th {
          padding: 1rem 1.25rem; text-align: left;
          font-size: var(--font-size-xs); font-weight: 600;
          color: var(--text-secondary); text-transform: uppercase;
          letter-spacing: 0.05em; background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        td {
          padding: 0.875rem 1.25rem;
          font-size: var(--font-size-sm); color: var(--text-primary);
          border-bottom: 1px solid var(--bg-tertiary);
        }
      }

      .table-row {
        cursor: pointer; transition: background var(--transition-fast);
        &:hover { background: var(--bg-secondary); }
      }

      .student-cell {
        display: flex; align-items: center; gap: 0.75rem;
      }

      .student-avatar-sm {
        width: 38px; height: 38px; border-radius: 50%; color: white;
        display: flex; align-items: center; justify-content: center;
        font-size: var(--font-size-sm); font-weight: 600; flex-shrink: 0;
      }

      .student-name { display: block; font-weight: 600; }
      .student-id { display: block; font-size: var(--font-size-xs); color: var(--text-light); }

      .dept-badge {
        background: var(--bg-tertiary); padding: 0.25rem 0.625rem;
        border-radius: var(--border-radius); font-size: var(--font-size-xs); font-weight: 500;
      }

      .gpa-value { font-weight: 600; }
      .high-gpa { color: #10b981; }
      .med-gpa { color: #f59e0b; }
      .low-gpa { color: #ef4444; }

      .grade-badge {
        background: var(--primary-color); color: white;
        padding: 0.25rem 0.75rem; border-radius: 9999px;
        font-size: var(--font-size-xs); font-weight: 600;
      }

      .empty-state {
        text-align: center; padding: 4rem 2rem;
        .material-icons { font-size: 3rem; color: var(--text-light); margin-bottom: 1rem; }
        h3 { color: var(--text-primary); margin-bottom: 0.5rem; }
        p { color: var(--text-secondary); }
      }

      @media (max-width: 768px) {
        .filters-bar { flex-direction: column; }
      }
    `,
  ],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchQuery = '';
  sortBy = 'name';

  private studentService = inject(StudentService);
  router = inject(Router);

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
      this.filteredStudents = students;
    });
  }

  filterStudents(): void {
    let result = this.students.filter((s) => {
      if (!this.searchQuery) return true;
      const q = this.searchQuery.toLowerCase();
      return (
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q)
      );
    });

    switch (this.sortBy) {
      case 'name':
        result.sort((a, b) => a.lastName.localeCompare(b.lastName));
        break;
      case 'gpa-desc':
        result.sort((a, b) => b.gpa - a.gpa);
        break;
      case 'gpa-asc':
        result.sort((a, b) => a.gpa - b.gpa);
        break;
      case 'courses':
        result.sort((a, b) => b.enrolledCourses.length - a.enrolledCourses.length);
        break;
    }

    this.filteredStudents = result;
  }

  getAvatarColor(id: string): string {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
    return colors[parseInt(id, 10) % colors.length];
  }
}
