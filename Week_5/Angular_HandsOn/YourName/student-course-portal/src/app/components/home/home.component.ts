import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { DashboardService } from '../../services/dashboard.service';
import { Course, Student, DashboardStats } from '../../models';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  template: `
    <section class="hero">
      <div class="hero-content">
        <span class="hero-badge">Welcome to CourseHub</span>
        <h1>Learn, Grow & Build Your Future</h1>
        <p>Discover world-class courses taught by industry experts. Join thousands of students accelerating their careers with hands-on, project-based learning.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" (click)="router.navigate(['/courses'])">
            <span class="material-icons">explore</span>
            Browse Courses
          </button>
          <button class="btn btn-secondary btn-lg" (click)="router.navigate(['/students'])">
            <span class="material-icons">people</span>
            View Students
          </button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-card hero-card-1">
          <span class="material-icons">school</span>
          <span>{{ stats?.totalCourses || 0 }}+</span>
          <small>Courses</small>
        </div>
        <div class="hero-card hero-card-2">
          <span class="material-icons">people</span>
          <span>{{ stats?.totalStudents || 0 }}+</span>
          <small>Students</small>
        </div>
        <div class="hero-card hero-card-3">
          <span class="material-icons">trending_up</span>
          <span>{{ stats?.completionRate || 0 }}%</span>
          <small>Success Rate</small>
        </div>
      </div>
    </section>

    <!-- Featured Courses -->
    <section class="section featured-section">
      <div class="container">
        <div class="section-header">
          <h2>Featured Courses</h2>
          <p>Start your learning journey with our most popular courses</p>
        </div>
        <div class="course-grid">
          <div class="course-card" *ngFor="let course of featuredCourses" (click)="router.navigate(['/courses', course.id])">
            <div class="course-image">
              <div class="course-image-placeholder" [style.backgroundColor]="getCategoryColor(course.category)">
                <span class="material-icons">school</span>
              </div>
              <span class="course-level-badge badge" [ngClass]="getLevelBadgeClass(course.level)">
                {{ course.level }}
              </span>
            </div>
            <div class="course-content">
              <div class="course-meta">
                <span class="category-tag">{{ course.category }}</span>
                <span class="duration">
                  <span class="material-icons">schedule</span>
                  {{ course.duration }}h
                </span>
              </div>
              <h3 class="course-title">{{ course.title }}</h3>
              <p class="course-description">{{ course.description | truncate: 100 }}</p>
              <div class="course-footer">
                <div class="instructor">
                  <div class="avatar-placeholder">{{ course.instructor.charAt(0) }}</div>
                  <span>{{ course.instructor }}</span>
                </div>
                <div class="course-rating">
                  <span class="material-icons star-icon">star</span>
                  {{ course.rating }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Students -->
    <section class="section students-section">
      <div class="container">
        <div class="section-header">
          <h2>Top Performing Students</h2>
          <p>Meet our brightest learners making exceptional progress</p>
        </div>
        <div class="students-grid">
          <div class="student-card" *ngFor="let student of topStudents" (click)="router.navigate(['/students', student.id])">
            <div class="student-avatar">
              <div class="avatar-circle" [style.backgroundColor]="getAvatarColor(student.id)">
                {{ student.firstName.charAt(0) }}{{ student.lastName.charAt(0) }}
              </div>
            </div>
            <div class="student-info">
              <h4>{{ student.firstName }} {{ student.lastName }}</h4>
              <p class="student-dept">{{ student.department }}</p>
              <div class="student-stats">
                <div class="stat">
                  <span class="material-icons">grade</span>
                  <span>{{ student.grade }}</span>
                </div>
                <div class="stat">
                  <span class="material-icons">school</span>
                  <span>{{ student.enrolledCourses.length }} courses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      /* Hero Section */
      .hero {
        background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%);
        color: white;
        padding: 4rem 1.5rem 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4rem;
        min-height: 500px;
      }

      .hero-content {
        max-width: 550px;
      }

      .hero-badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        padding: 0.375rem 1rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 1.5rem;
        backdrop-filter: blur(4px);
      }

      .hero h1 {
        font-size: 2.75rem;
        font-weight: 700;
        line-height: 1.15;
        margin-bottom: 1rem;
      }

      .hero p {
        font-size: 1.0625rem;
        opacity: 0.9;
        line-height: 1.7;
        margin-bottom: 2rem;
      }

      .hero-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .hero-actions .btn-primary {
        background: white;
        color: var(--primary-color);
        &:hover { background: #f0f7ff; }
      }
      .hero-actions .btn-secondary {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        &:hover { background: rgba(255, 255, 255, 0.25); }
      }

      .hero-visual {
        display: flex;
        gap: 1rem;
      }

      .hero-card {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--border-radius-xl);
        padding: 2rem 1.5rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        transition: transform var(--transition-normal);

        &:hover { transform: translateY(-4px); }
        .material-icons { font-size: 2rem; opacity: 0.9; }
        span { font-size: 1.75rem; font-weight: 700; }
        small { font-size: 0.8125rem; opacity: 0.8; }
      }

      .hero-card-1 { transform: translateY(20px); }
      .hero-card-2 { transform: translateY(0); }
      .hero-card-3 { transform: translateY(-20px); }

      /* Section Styles */
      .section {
        padding: 4rem 0;
      }

      .section-header {
        text-align: center;
        margin-bottom: 2.5rem;

        h2 {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        p {
          font-size: var(--font-size-base);
          color: var(--text-secondary);
        }
      }

      /* Course Grid */
      .course-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.5rem;
      }

      .course-card {
        background: white;
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-md);
        cursor: pointer;
        transition: transform var(--transition-normal), box-shadow var(--transition-normal);

        &:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
      }

      .course-image {
        position: relative;
        height: 180px;
      }

      .course-image-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .material-icons { font-size: 3rem; color: rgba(255,255,255,0.7); }
      }

      .course-level-badge {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
      }

      .course-content {
        padding: 1.25rem;
      }

      .course-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;

        .category-tag {
          font-size: var(--font-size-xs);
          color: var(--primary-color);
          font-weight: 500;
        }

        .duration {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          .material-icons { font-size: 14px; }
        }
      }

      .course-title {
        font-size: 1.0625rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
      }

      .course-description {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        line-height: 1.5;
        margin-bottom: 1rem;
      }

      .course-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.75rem;
        border-top: 1px solid var(--border-color);
      }

      .instructor {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: var(--font-size-sm);
        color: var(--text-secondary);

        .avatar-placeholder {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }
      }

      .course-rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: var(--font-size-sm);
        font-weight: 600;
        color: var(--accent-color);
        .star-icon { font-size: 16px; }
      }

      /* Students Section */
      .students-section {
        background: var(--bg-primary);
      }

      .students-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.25rem;
      }

      .student-card {
        background: var(--bg-secondary);
        border-radius: var(--border-radius-lg);
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        transition: transform var(--transition-normal), box-shadow var(--transition-normal);

        &:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      }

      .avatar-circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.125rem;
        font-weight: 600;
        flex-shrink: 0;
      }

      .student-info h4 {
        font-size: var(--font-size-base);
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.125rem;
      }

      .student-dept {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
      }

      .student-stats {
        display: flex;
        gap: 0.75rem;

        .stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: var(--font-size-xs);
          color: var(--text-light);
          .material-icons { font-size: 14px; }
        }
      }

      @media (max-width: 768px) {
        .hero {
          flex-direction: column;
          padding: 3rem 1.5rem;
          min-height: auto;
          text-align: center;
        }
        .hero-content { max-width: 100%; }
        .hero-actions { justify-content: center; }
        .hero-visual { justify-content: center; flex-wrap: wrap; }
        .hero-card { transform: none !important; }
        .hero h1 { font-size: 2rem; }
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  featuredCourses: Course[] = [];
  topStudents: Student[] = [];
  stats: DashboardStats | null = null;

  private courseService = inject(CourseService);
  private studentService = inject(StudentService);
  private dashboardService = inject(DashboardService);
  router = inject(Router);

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.featuredCourses = courses.slice(0, 3);
    });

    this.studentService.getStudents().subscribe((students) => {
      this.topStudents = students.sort((a, b) => b.gpa - a.gpa).slice(0, 4);
    });

    this.dashboardService.getDashboardStats().subscribe((stats) => {
      this.stats = stats;
    });
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'Web Development': '#3b82f6',
      'Data Science': '#8b5cf6',
      'Cloud Computing': '#f59e0b',
      'UI/UX Design': '#ec4899',
      'DevOps': '#10b981',
    };
    return colors[category] || '#6366f1';
  }

  getLevelBadgeClass(level: string): string {
    const map: Record<string, string> = {
      Beginner: 'badge-info',
      Intermediate: 'badge-warning',
      Advanced: 'badge-danger',
    };
    return map[level] || 'badge-info';
  }

  getAvatarColor(id: string): string {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
    const index = parseInt(id, 10) % colors.length;
    return colors[index];
  }
}
