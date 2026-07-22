import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="course-detail-page" *ngIf="course">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <a routerLink="/">Home</a>
          <span class="separator">/</span>
          <a routerLink="/courses">Courses</a>
          <span class="separator">/</span>
          <span class="current">{{ course.title }}</span>
        </nav>

        <div class="detail-grid">
          <!-- Left Column: Main Info -->
          <div class="detail-main">
            <div class="course-header-card">
              <div class="course-banner" [style.backgroundColor]="getCategoryColor(course.category)">
                <span class="material-icons">school</span>
              </div>
              <div class="course-header-info">
                <div class="badges">
                  <span class="badge" [ngClass]="getStatusBadgeClass(course.status)">{{ course.status }}</span>
                  <span class="badge" [ngClass]="getLevelBadgeClass(course.level)">{{ course.level }}</span>
                  <span class="badge badge-info">{{ course.category }}</span>
                </div>
                <h1>{{ course.title }}</h1>
                <p class="course-description">{{ course.description }}</p>
                <div class="course-meta-stats">
                  <div class="meta-stat">
                    <span class="material-icons">person</span>
                    <div>
                      <span class="meta-label">Instructor</span>
                      <span class="meta-value">{{ course.instructor }}</span>
                    </div>
                  </div>
                  <div class="meta-stat">
                    <span class="material-icons">schedule</span>
                    <div>
                      <span class="meta-label">Duration</span>
                      <span class="meta-value">{{ course.duration }} hours</span>
                    </div>
                  </div>
                  <div class="meta-stat">
                    <span class="material-icons">people</span>
                    <div>
                      <span class="meta-label">Enrolled</span>
                      <span class="meta-value">{{ course.enrolledStudents }}/{{ course.maxCapacity }}</span>
                    </div>
                  </div>
                  <div class="meta-stat">
                    <span class="material-icons">star</span>
                    <div>
                      <span class="meta-label">Rating</span>
                      <span class="meta-value">{{ course.rating }}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Syllabus -->
            <div class="section-card">
              <h2>
                <span class="material-icons">list_alt</span>
                Course Syllabus
              </h2>
              <div class="syllabus-list">
                <div class="syllabus-item" *ngFor="let item of course.syllabus; let i = index">
                  <div class="syllabus-number">{{ i + 1 }}</div>
                  <div class="syllabus-content">
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.description }}</p>
                  </div>
                  <div class="syllabus-duration">
                    <span class="material-icons">schedule</span>
                    {{ item.duration }}h
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Sidebar -->
          <div class="detail-sidebar">
            <div class="sidebar-card pricing-card">
              <div class="price-tag">
                <span class="price">\${{ course.price }}</span>
                <span class="price-note">per enrollment</span>
              </div>
              <button class="btn btn-primary btn-lg full-width">
                <span class="material-icons">how_to_reg</span>
                Enroll Now
              </button>
              <button class="btn btn-secondary btn-lg full-width">
                <span class="material-icons">bookmark</span>
                Save for Later
              </button>
            </div>

            <div class="sidebar-card">
              <h3>Course Details</h3>
              <div class="detail-list">
                <div class="detail-row">
                  <span>Start Date</span>
                  <span>{{ course.startDate }}</span>
                </div>
                <div class="detail-row">
                  <span>End Date</span>
                  <span>{{ course.endDate }}</span>
                </div>
                <div class="detail-row">
                  <span>Capacity</span>
                  <span>{{ course.enrolledStudents }}/{{ course.maxCapacity }}</span>
                </div>
                <div class="detail-row">
                  <span>Language</span>
                  <span>English</span>
                </div>
                <div class="detail-row">
                  <span>Certificate</span>
                  <span>Included</span>
                </div>
              </div>
            </div>

            <div class="sidebar-card">
              <h3>Tags</h3>
              <div class="tag-list">
                <span class="tag" *ngFor="let tag of course.tags">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .course-detail-page { padding: 1.5rem 0 3rem; }

      .breadcrumb {
        display: flex; align-items: center; gap: 0.5rem;
        margin-bottom: 1.5rem; font-size: var(--font-size-sm);

        a { color: var(--text-secondary); text-decoration: none; &:hover { color: var(--primary-color); } }
        .separator { color: var(--text-light); }
        .current { color: var(--text-primary); font-weight: 500; }
      }

      .detail-grid {
        display: grid; grid-template-columns: 1fr 360px; gap: 1.5rem;
      }

      .course-header-card {
        background: white; border-radius: var(--border-radius-lg); overflow: hidden;
        box-shadow: var(--shadow-sm); margin-bottom: 1.5rem;
      }

      .course-banner {
        height: 180px; display: flex; align-items: center; justify-content: center;
        .material-icons { font-size: 4rem; color: rgba(255,255,255,0.7); }
      }

      .course-header-info { padding: 1.5rem; }

      .badges { display: flex; gap: 0.5rem; margin-bottom: 1rem; }

      .course-header-info h1 {
        font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;
      }

      .course-description {
        font-size: var(--font-size-base); color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;
      }

      .course-meta-stats {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
        padding-top: 1.25rem; border-top: 1px solid var(--border-color);
      }

      .meta-stat {
        display: flex; align-items: center; gap: 0.5rem;

        .material-icons { font-size: 24px; color: var(--primary-color); }
        .meta-label { display: block; font-size: var(--font-size-xs); color: var(--text-light); }
        .meta-value { display: block; font-size: var(--font-size-sm); font-weight: 600; color: var(--text-primary); }
      }

      .section-card {
        background: white; border-radius: var(--border-radius-lg);
        padding: 1.5rem; box-shadow: var(--shadow-sm);

        h2 {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 1.125rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1.25rem;
          .material-icons { color: var(--primary-color); font-size: 24px; }
        }
      }

      .syllabus-list { display: flex; flex-direction: column; gap: 0.75rem; }

      .syllabus-item {
        display: flex; align-items: center; gap: 1rem;
        padding: 1rem; background: var(--bg-secondary);
        border-radius: var(--border-radius); border-left: 3px solid var(--primary-color);

        .syllabus-number {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--primary-color); color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: var(--font-size-sm); font-weight: 600; flex-shrink: 0;
        }

        .syllabus-content { flex: 1; h4 { font-size: var(--font-size-sm); font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem; }
          p { font-size: var(--font-size-xs); color: var(--text-secondary); } }
        .syllabus-duration {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: var(--font-size-xs); color: var(--text-light); flex-shrink: 0;
          .material-icons { font-size: 16px; }
        }
      }

      /* Sidebar */
      .sidebar-card {
        background: white; border-radius: var(--border-radius-lg);
        padding: 1.5rem; box-shadow: var(--shadow-sm); margin-bottom: 1rem;

        h3 { font-size: var(--font-size-base); font-weight: 600; color: var(--text-primary); margin-bottom: 1rem; }
      }

      .pricing-card { text-align: center; }

      .price-tag { margin-bottom: 1.25rem; }
      .price { font-size: 2rem; font-weight: 700; color: var(--primary-color); }
      .price-note { display: block; font-size: var(--font-size-xs); color: var(--text-light); margin-top: 0.25rem; }

      .full-width { width: 100%; margin-bottom: 0.5rem; }

      .detail-list { display: flex; flex-direction: column; gap: 0.75rem; }
      .detail-row {
        display: flex; justify-content: space-between;
        font-size: var(--font-size-sm); padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--bg-tertiary);

        &:last-child { border-bottom: none; padding-bottom: 0; }
        span:first-child { color: var(--text-secondary); }
        span:last-child { font-weight: 500; color: var(--text-primary); }
      }

      .tag-list { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .tag {
        background: var(--bg-tertiary); color: var(--text-secondary);
        padding: 0.375rem 0.75rem; border-radius: var(--border-radius);
        font-size: var(--font-size-sm);
      }

      @media (max-width: 900px) {
        .detail-grid { grid-template-columns: 1fr; }
        .course-meta-stats { grid-template-columns: repeat(2, 1fr); }
      }
    `,
  ],
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;

  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.courseService.getCourseById(id).subscribe((course) => {
          this.course = course;
        });
      }
    });
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
