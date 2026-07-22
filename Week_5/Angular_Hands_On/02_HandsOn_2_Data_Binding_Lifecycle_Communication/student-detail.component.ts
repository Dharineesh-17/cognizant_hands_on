import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { Student, Course } from '../../models';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="student-detail-page" *ngIf="student">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <a routerLink="/">Home</a>
          <span class="separator">/</span>
          <a routerLink="/students">Students</a>
          <span class="separator">/</span>
          <span class="current">{{ student.firstName }} {{ student.lastName }}</span>
        </nav>

        <div class="detail-grid">
          <!-- Student Profile -->
          <div class="profile-section">
            <div class="profile-card">
              <div class="profile-avatar" [style.backgroundColor]="getAvatarColor(student.id)">
                {{ student.firstName.charAt(0) }}{{ student.lastName.charAt(0) }}
              </div>
              <h2>{{ student.firstName }} {{ student.lastName }}</h2>
              <p class="profile-dept">{{ student.department }}</p>
              <div class="profile-stats">
                <div class="profile-stat">
                  <span class="stat-value">{{ student.gpa.toFixed(2) }}</span>
                  <span class="stat-label">GPA</span>
                </div>
                <div class="profile-stat">
                  <span class="stat-value">{{ student.grade }}</span>
                  <span class="stat-label">Grade</span>
                </div>
                <div class="profile-stat">
                  <span class="stat-value">{{ student.enrolledCourses.length }}</span>
                  <span class="stat-label">Courses</span>
                </div>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="info-card">
              <h3><span class="material-icons">contact_mail</span> Contact Information</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="material-icons">email</span>
                  <div>
                    <span class="info-label">Email</span>
                    <span class="info-value">{{ student.email }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="material-icons">phone</span>
                  <div>
                    <span class="info-label">Phone</span>
                    <span class="info-value">{{ student.phone }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="material-icons">location_on</span>
                  <div>
                    <span class="info-label">Address</span>
                    <span class="info-value">{{ student.address.street }}, {{ student.address.city }}, {{ student.address.state }} {{ student.address.zipCode }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="material-icons">event</span>
                  <div>
                    <span class="info-label">Enrolled Since</span>
                    <span class="info-value">{{ student.enrollmentDate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Enrolled Courses -->
          <div class="courses-section">
            <div class="section-card">
              <h2><span class="material-icons">school</span> Enrolled Courses</h2>
              <div class="enrolled-courses">
                <div class="enrolled-course-card" *ngFor="let course of enrolledCourses">
                  <div class="course-mini-banner" [style.backgroundColor]="getCategoryColor(course.category)">
                    <span class="material-icons">school</span>
                  </div>
                  <div class="enrolled-course-info">
                    <div class="course-meta-mini">
                      <span class="badge" [ngClass]="getStatusBadgeClass(course.status)">{{ course.status }}</span>
                      <span class="badge" [ngClass]="getLevelBadgeClass(course.level)">{{ course.level }}</span>
                    </div>
                    <h4 (click)="router.navigate(['/courses', course.id])" class="clickable">{{ course.title }}</h4>
                    <p>{{ course.description | slice:0:100 }}...</p>
                    <div class="course-footer-mini">
                      <span class="instructor-mini">
                        <span class="material-icons">person</span>
                        {{ course.instructor }}
                      </span>
                      <span class="duration-mini">
                        <span class="material-icons">schedule</span>
                        {{ course.duration }}h
                      </span>
                      <span class="rating-mini">
                        <span class="material-icons">star</span>
                        {{ course.rating }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="empty-courses" *ngIf="enrolledCourses.length === 0">
                <span class="material-icons">menu_book</span>
                <p>No courses enrolled yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .student-detail-page { padding: 1.5rem 0 3rem; }

      .breadcrumb {
        display: flex; align-items: center; gap: 0.5rem;
        margin-bottom: 1.5rem; font-size: var(--font-size-sm);
        a { color: var(--text-secondary); text-decoration: none; &:hover { color: var(--primary-color); } }
        .separator { color: var(--text-light); }
        .current { color: var(--text-primary); font-weight: 500; }
      }

      .detail-grid {
        display: grid; grid-template-columns: 360px 1fr; gap: 1.5rem;
      }

      /* Profile */
      .profile-card {
        background: white; border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm); text-align: center; padding: 2rem 1.5rem; margin-bottom: 1rem;
      }

      .profile-avatar {
        width: 90px; height: 90px; border-radius: 50%; color: white;
        display: flex; align-items: center; justify-content: center;
        font-size: 2rem; font-weight: 600; margin: 0 auto 1rem;
      }

      .profile-card h2 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem; }
      .profile-dept { font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 1.5rem; }

      .profile-stats {
        display: flex; justify-content: center; gap: 2rem;
        padding-top: 1.25rem; border-top: 1px solid var(--border-color);
      }

      .profile-stat {
        text-align: center;
        .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: var(--primary-color); }
        .stat-label { display: block; font-size: var(--font-size-xs); color: var(--text-light); }
      }

      .info-card {
        background: white; border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm); padding: 1.5rem;

        h3 {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: var(--font-size-base); font-weight: 600; margin-bottom: 1.25rem;
          .material-icons { color: var(--primary-color); font-size: 22px; }
        }
      }

      .info-list { display: flex; flex-direction: column; gap: 1rem; }

      .info-item {
        display: flex; gap: 0.75rem;
        .material-icons { color: var(--text-light); font-size: 20px; margin-top: 2px; }
      }

      .info-label { display: block; font-size: var(--font-size-xs); color: var(--text-light); }
      .info-value { display: block; font-size: var(--font-size-sm); color: var(--text-primary); font-weight: 500; }

      /* Enrolled Courses */
      .section-card {
        background: white; border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm); padding: 1.5rem;

        h2 {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 1.125rem; font-weight: 600; margin-bottom: 1.25rem;
          .material-icons { color: var(--primary-color); font-size: 24px; }
        }
      }

      .enrolled-courses { display: flex; flex-direction: column; gap: 1rem; }

      .enrolled-course-card {
        display: flex; gap: 1rem; padding: 1rem;
        background: var(--bg-secondary); border-radius: var(--border-radius);
        border: 1px solid var(--bg-tertiary);
      }

      .course-mini-banner {
        width: 80px; height: 80px; border-radius: var(--border-radius);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        .material-icons { font-size: 1.5rem; color: rgba(255,255,255,0.7); }
      }

      .enrolled-course-info { flex: 1; }

      .course-meta-mini { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }

      .enrolled-course-info h4 { font-size: var(--font-size-base); font-weight: 600; margin-bottom: 0.25rem; }
      .enrolled-course-info p { font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 0.5rem; }

      .clickable { cursor: pointer; &:hover { color: var(--primary-color); } }

      .course-footer-mini {
        display: flex; gap: 1rem;
        span {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: var(--font-size-xs); color: var(--text-light);
          .material-icons { font-size: 14px; }
        }
      }

      .empty-courses {
        text-align: center; padding: 2rem;
        .material-icons { font-size: 2.5rem; color: var(--text-light); margin-bottom: 0.5rem; }
        p { color: var(--text-secondary); }
      }

      @media (max-width: 900px) {
        .detail-grid { grid-template-columns: 1fr; }
      }
    `,
  ],
})
export class StudentDetailComponent implements OnInit {
  student: Student | null = null;
  enrolledCourses: Course[] = [];

  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  router = inject(Router);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.studentService.getStudentById(id).subscribe((student) => {
          this.student = student;
          if (student) {
            student.enrolledCourses.forEach((courseId) => {
              this.courseService.getCourseById(courseId).subscribe((course) => {
                this.enrolledCourses = [...this.enrolledCourses, course];
              });
            });
          }
        });
      }
    });
  }

  getAvatarColor(id: string): string {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
    return colors[parseInt(id, 10) % colors.length];
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'Web Development': '#3b82f6', 'Data Science': '#8b5cf6',
      'Cloud Computing': '#f59e0b', 'UI/UX Design': '#ec4899', 'DevOps': '#10b981',
    };
    return colors[category] || '#6366f1';
  }

  getLevelBadgeClass(level: string): string {
    return { Beginner: 'badge-info', Intermediate: 'badge-warning', Advanced: 'badge-danger' }[level] || 'badge-info';
  }

  getStatusBadgeClass(status: string): string {
    return { Active: 'badge-success', Upcoming: 'badge-warning', Completed: 'badge-info' }[status] || 'badge-info';
  }
}
