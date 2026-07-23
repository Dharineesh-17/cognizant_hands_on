import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardStats } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-page">
      <div class="container">
        <div class="page-header">
          <h1>Dashboard</h1>
          <p>Overview of your learning platform performance</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card stat-card-blue">
            <div class="stat-icon">
              <span class="material-icons">people</span>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ stats?.totalStudents || 0 }}</span>
              <span class="stat-label">Total Students</span>
            </div>
          </div>

          <div class="stat-card stat-card-purple">
            <div class="stat-icon">
              <span class="material-icons">school</span>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ stats?.totalCourses || 0 }}</span>
              <span class="stat-label">Total Courses</span>
            </div>
          </div>

          <div class="stat-card stat-card-green">
            <div class="stat-icon">
              <span class="material-icons">how_to_reg</span>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ stats?.activeEnrollments || 0 }}</span>
              <span class="stat-label">Active Enrollments</span>
            </div>
          </div>

          <div class="stat-card stat-card-orange">
            <div class="stat-icon">
              <span class="material-icons">trending_up</span>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ stats?.completionRate || 0 }}%</span>
              <span class="stat-label">Completion Rate</span>
            </div>
          </div>
        </div>

        <div class="dashboard-grid">
          <!-- Top Categories -->
          <div class="dashboard-card">
            <div class="card-header">
              <h3>Top Categories</h3>
            </div>
            <div class="card-body">
              <div class="category-item" *ngFor="let cat of (stats?.topCategories || [])">
                <div class="category-info">
                  <span class="category-name">{{ cat.category }}</span>
                  <span class="category-count">{{ cat.count }} students</span>
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar"
                       [style.width.%]="(cat.count / maxCategoryCount) * 100"
                       [style.backgroundColor]="getCategoryBarColor(cat.category)">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Enrollments -->
          <div class="dashboard-card">
            <div class="card-header">
              <h3>Recent Enrollments</h3>
            </div>
            <div class="card-body">
              <div class="enrollment-table">
                <div class="enrollment-row header-row">
                  <span>Student ID</span>
                  <span>Course ID</span>
                  <span>Status</span>
                  <span>Progress</span>
                </div>
                <div class="enrollment-row" *ngFor="let enrollment of (stats?.recentEnrollments || [])">
                  <span class="id-cell">
                    <span class="material-icons">person</span>
                    {{ enrollment.studentId }}
                  </span>
                  <span class="id-cell">
                    <span class="material-icons">menu_book</span>
                    {{ enrollment.courseId }}
                  </span>
                  <span>
                    <span class="badge" [ngClass]="getStatusBadgeClass(enrollment.status)">
                      {{ enrollment.status }}
                    </span>
                  </span>
                  <span class="progress-cell">
                    <div class="mini-progress-bar">
                      <div class="mini-progress-fill"
                           [style.width.%]="enrollment.progress"
                           [style.backgroundColor]="enrollment.progress >= 80 ? '#10b981' : enrollment.progress >= 40 ? '#f59e0b' : '#3b82f6'">
                      </div>
                    </div>
                    <small>{{ enrollment.progress }}%</small>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Monthly Trend -->
          <div class="dashboard-card card-wide">
            <div class="card-header">
              <h3>Monthly Enrollment Trend</h3>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <div class="chart-bar-group" *ngFor="let item of (stats?.monthlyTrend || []); let i = index">
                  <div class="chart-bar-wrapper">
                    <div class="chart-bar"
                         [style.height.%]="maxTrendValue > 0 ? (item.enrollments / maxTrendValue) * 100 : 0">
                    </div>
                  </div>
                  <span class="chart-label">{{ item.month }}</span>
                  <span class="chart-value" *ngIf="item.enrollments > 0">{{ item.enrollments }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- GPA Stats -->
          <div class="dashboard-card">
            <div class="card-header">
              <h3>Academic Stats</h3>
            </div>
            <div class="card-body">
              <div class="gpa-display">
                <div class="gpa-circle">
                  <span class="gpa-value">{{ stats?.averageGPA || 0 }}</span>
                  <span class="gpa-label">Avg GPA</span>
                </div>
              </div>
              <div class="gpa-details">
                <div class="gpa-item">
                  <span class="gpa-dot" style="background: #10b981;"></span>
                  <span>High GPA (3.5+): 40%</span>
                </div>
                <div class="gpa-item">
                  <span class="gpa-dot" style="background: #f59e0b;"></span>
                  <span>Medium GPA (3.0-3.5): 45%</span>
                </div>
                <div class="gpa-item">
                  <span class="gpa-dot" style="background: #ef4444;"></span>
                  <span>Low GPA (<3.0): 15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-page {
        padding: 2rem 0;
      }

      .page-header {
        margin-bottom: 2rem;

        h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        p {
          color: var(--text-secondary);
          font-size: var(--font-size-base);
        }
      }

      /* Stats Grid */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.25rem;
        margin-bottom: 2rem;
      }

      .stat-card {
        background: white;
        border-radius: var(--border-radius-lg);
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: var(--shadow-sm);
        transition: box-shadow var(--transition-normal);

        &:hover { box-shadow: var(--shadow-md); }
      }

      .stat-icon {
        width: 52px;
        height: 52px;
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: center;

        .material-icons { font-size: 1.5rem; color: white; }
      }

      .stat-card-blue .stat-icon { background: linear-gradient(135deg, #3b82f6, #2563eb); }
      .stat-card-purple .stat-icon { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
      .stat-card-green .stat-icon { background: linear-gradient(135deg, #10b981, #059669); }
      .stat-card-orange .stat-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }

      .stat-info {
        display: flex;
        flex-direction: column;
      }

      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
      }

      .stat-label {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
      }

      /* Dashboard Grid */
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .dashboard-card {
        background: white;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);
        overflow: hidden;
      }

      .card-wide {
        grid-column: span 2;
      }

      .card-header {
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid var(--border-color);

        h3 {
          font-size: var(--font-size-base);
          font-weight: 600;
          color: var(--text-primary);
        }
      }

      .card-body {
        padding: 1.25rem 1.5rem;
      }

      /* Category Bars */
      .category-item {
        margin-bottom: 1.25rem;

        &:last-child { margin-bottom: 0; }
      }

      .category-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;

        .category-name {
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--text-primary);
        }

        .category-count {
          font-size: var(--font-size-xs);
          color: var(--text-light);
        }
      }

      .progress-bar-container {
        height: 8px;
        background: var(--bg-tertiary);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-bar {
        height: 100%;
        border-radius: 4px;
        transition: width 0.6s ease;
      }

      /* Enrollment Table */
      .enrollment-table {
        width: 100%;
      }

      .enrollment-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1.2fr;
        gap: 0.5rem;
        padding: 0.75rem 0;
        font-size: var(--font-size-sm);
        align-items: center;

        &:not(:last-child) {
          border-bottom: 1px solid var(--bg-tertiary);
        }
      }

      .header-row {
        font-weight: 600;
        color: var(--text-secondary);
        font-size: var(--font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: 1px solid var(--border-color);
      }

      .id-cell {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        .material-icons { font-size: 16px; color: var(--text-light); }
      }

      .progress-cell {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        small {
          font-size: var(--font-size-xs);
          color: var(--text-light);
          min-width: 32px;
        }
      }

      .mini-progress-bar {
        flex: 1;
        height: 6px;
        background: var(--bg-tertiary);
        border-radius: 3px;
        overflow: hidden;
      }

      .mini-progress-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.5s ease;
      }

      /* Bar Chart */
      .chart-container {
        display: flex;
        align-items: flex-end;
        gap: 0.75rem;
        height: 200px;
        padding-top: 1rem;
      }

      .chart-bar-group {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        height: 100%;
        justify-content: flex-end;
      }

      .chart-bar-wrapper {
        width: 100%;
        max-width: 40px;
        height: calc(100% - 2rem);
        background: var(--bg-tertiary);
        border-radius: 4px 4px 0 0;
        display: flex;
        align-items: flex-end;
        overflow: hidden;
      }

      .chart-bar {
        width: 100%;
        background: linear-gradient(180deg, #3b82f6, #2563eb);
        border-radius: 4px 4px 0 0;
        transition: height 0.6s ease;
      }

      .chart-label {
        font-size: var(--font-size-xs);
        color: var(--text-light);
      }

      .chart-value {
        font-size: 0.6875rem;
        color: var(--text-secondary);
        font-weight: 600;
      }

      /* GPA Display */
      .gpa-display {
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
      }

      .gpa-circle {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: linear-gradient(135deg, #10b981, #059669);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .gpa-value {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1;
      }

      .gpa-label {
        font-size: var(--font-size-xs);
        opacity: 0.9;
      }

      .gpa-details {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .gpa-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
      }

      .gpa-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      @media (max-width: 768px) {
        .dashboard-grid {
          grid-template-columns: 1fr;
        }
        .card-wide { grid-column: span 1; }
        .enrollment-row {
          grid-template-columns: 1fr 1fr;
          gap: 0.25rem;
        }
        .chart-container {
          height: 150px;
        }
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;

  private dashboardService = inject(DashboardService);

  maxCategoryCount = 0;
  maxTrendValue = 0;

  ngOnInit(): void {
    this.dashboardService.getDashboardStats().subscribe((stats) => {
      this.stats = stats;
      this.maxCategoryCount = Math.max(...stats.topCategories.map((c) => c.count));
      this.maxTrendValue = Math.max(...stats.monthlyTrend.map((m) => m.enrollments), 1);
    });
  }

  getCategoryBarColor(category: string): string {
    const colors: Record<string, string> = {
      'Web Development': '#3b82f6',
      'Data Science': '#8b5cf6',
      'Cloud Computing': '#f59e0b',
      'UI/UX Design': '#ec4899',
      'DevOps': '#10b981',
    };
    return colors[category] || '#6366f1';
  }

  getStatusBadgeClass(status: string): string {
    const map: Record<string, string> = {
      Active: 'badge-success',
      Completed: 'badge-info',
      Dropped: 'badge-danger',
      Suspended: 'badge-warning',
    };
    return map[status] || 'badge-info';
  }
}
