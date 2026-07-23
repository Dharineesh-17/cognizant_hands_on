import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course, CourseCategory, CourseLevel, CourseStatus } from '../../models';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TruncatePipe],
  template: `
    <div class="courses-page">
      <div class="container">
        <div class="page-header">
          <div>
            <h1>Courses</h1>
            <p>Explore our catalog of {{ courses.length }} courses</p>
          </div>
          <button class="btn btn-primary">
            <span class="material-icons">add</span>
            Add Course
          </button>
        </div>

        <!-- Filters -->
        <div class="filters-bar">
          <div class="search-box">
            <span class="material-icons">search</span>
            <input type="text"
                   placeholder="Search courses..."
                   [(ngModel)]="searchQuery"
                   (ngModelChange)="filterCourses()">
          </div>
          <div class="filter-group">
            <select [(ngModel)]="selectedCategory" (ngModelChange)="filterCourses()">
              <option value="">All Categories</option>
              <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
            </select>
            <select [(ngModel)]="selectedLevel" (ngModelChange)="filterCourses()">
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select [(ngModel)]="selectedStatus" (ngModelChange)="filterCourses()">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <!-- Course Grid -->
        <div class="course-list">
          <div class="course-card" *ngFor="let course of filteredCourses"
               (click)="router.navigate(['/courses', course.id])">
            <div class="course-image">
              <div class="course-image-placeholder" [style.backgroundColor]="getCategoryColor(course.category)">
                <span class="material-icons">school</span>
              </div>
              <span class="course-status-badge badge" [ngClass]="getStatusBadgeClass(course.status)">
                {{ course.status }}
              </span>
            </div>
            <div class="course-body">
              <div class="course-meta-row">
                <span class="category-tag">{{ course.category }}</span>
                <span class="level-tag badge" [ngClass]="getLevelBadgeClass(course.level)">{{ course.level }}</span>
              </div>
              <h3>{{ course.title }}</h3>
              <p>{{ course.description | truncate: 120 }}</p>

              <div class="course-details-grid">
                <div class="detail-item">
                  <span class="material-icons">person</span>
                  <span>{{ course.instructor }}</span>
                </div>
                <div class="detail-item">
                  <span class="material-icons">schedule</span>
                  <span>{{ course.duration }} hours</span>
                </div>
                <div class="detail-item">
                  <span class="material-icons">people</span>
                  <span>{{ course.enrolledStudents }}/{{ course.maxCapacity }}</span>
                </div>
                <div class="detail-item">
                  <span class="material-icons">star</span>
                  <span>{{ course.rating }}</span>
                </div>
              </div>

              <div class="course-tags">
                <span class="tag" *ngFor="let tag of course.tags">{{ tag }}</span>
              </div>

              <div class="course-footer">
                <span class="price">\${{ course.price }}</span>
                <span class="date">{{ course.startDate }} - {{ course.endDate }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="filteredCourses.length === 0">
          <span class="material-icons">search_off</span>
          <h3>No courses found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .courses-page { padding: 2rem 0; }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.5rem;

        h1 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
        p { color: var(--text-secondary); }
      }

      .filters-bar {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }

      .search-box {
        display: flex;
        align-items: center;
        background: white;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 0 0.875rem;
        flex: 1;
        min-width: 200px;

        .material-icons { color: var(--text-light); font-size: 20px; }

        input {
          border: none;
          outline: none;
          padding: 0.625rem;
          font-family: var(--font-family);
          font-size: var(--font-size-sm);
          flex: 1;
          background: transparent;
        }
      }

      .filter-group {
        display: flex;
        gap: 0.5rem;

        select {
          padding: 0.625rem 0.875rem;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          background: white;
          font-family: var(--font-family);
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          cursor: pointer;

          &:focus { outline: none; border-color: var(--primary-color); }
        }
      }

      .course-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        gap: 1.5rem;
      }

      .course-card {
        background: white;
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: transform var(--transition-normal), box-shadow var(--transition-normal);

        &:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
      }

      .course-image {
        position: relative;
        height: 160px;
      }

      .course-image-placeholder {
        width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        .material-icons { font-size: 2.5rem; color: rgba(255,255,255,0.7); }
      }

      .course-status-badge {
        position: absolute; top: 0.75rem; right: 0.75rem;
      }

      .course-body { padding: 1.25rem; }

      .course-meta-row {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 0.5rem;

        .category-tag { font-size: var(--font-size-xs); color: var(--primary-color); font-weight: 500; }
      }

      .course-body h3 {
        font-size: 1.125rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;
      }

      .course-body p {
        font-size: var(--font-size-sm); color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;
      }

      .course-details-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem;
      }

      .detail-item {
        display: flex; align-items: center; gap: 0.375rem;
        font-size: var(--font-size-sm); color: var(--text-secondary);
        .material-icons { font-size: 16px; }
      }

      .course-tags {
        display: flex; gap: 0.375rem; flex-wrap: wrap; margin-bottom: 1rem;
      }

      .tag {
        background: var(--bg-tertiary);
        color: var(--text-secondary);
        padding: 0.25rem 0.625rem;
        border-radius: 9999px;
        font-size: 0.6875rem;
        font-weight: 500;
      }

      .course-footer {
        display: flex; justify-content: space-between; align-items: center;
        padding-top: 0.75rem; border-top: 1px solid var(--border-color);

        .price { font-size: 1.25rem; font-weight: 700; color: var(--primary-color); }
        .date { font-size: var(--font-size-xs); color: var(--text-light); }
      }

      .empty-state {
        text-align: center; padding: 4rem 2rem;

        .material-icons { font-size: 3rem; color: var(--text-light); margin-bottom: 1rem; }
        h3 { color: var(--text-primary); margin-bottom: 0.5rem; }
        p { color: var(--text-secondary); }
      }

      @media (max-width: 768px) {
        .course-list { grid-template-columns: 1fr; }
        .filters-bar { flex-direction: column; }
        .filter-group { flex-wrap: wrap; }
      }
    `,
  ],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  categories: CourseCategory[] = [];

  searchQuery = '';
  selectedCategory = '';
  selectedLevel = '';
  selectedStatus = '';

  private courseService = inject(CourseService);
  router = inject(Router);

  ngOnInit(): void {
    this.categories = this.courseService.getCategories();
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesSearch =
        !this.searchQuery ||
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.tags.some((t) => t.toLowerCase().includes(this.searchQuery.toLowerCase()));

      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      const matchesLevel = !this.selectedLevel || course.level === this.selectedLevel;
      const matchesStatus = !this.selectedStatus || course.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
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
    return { Beginner: 'badge-info', Intermediate: 'badge-warning', Advanced: 'badge-danger' }[level] || 'badge-info';
  }

  getStatusBadgeClass(status: string): string {
    return { Active: 'badge-success', Upcoming: 'badge-warning', Completed: 'badge-info', Draft: 'badge-danger' }[status] || 'badge-info';
  }
}
