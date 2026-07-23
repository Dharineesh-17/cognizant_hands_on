import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildDemoComponent, Course } from './child-demo.component';

@Component({
  selector: 'app-parent-demo',
  standalone: true,
  imports: [CommonModule, ChildDemoComponent],
  templateUrl: './parent-demo.component.html',
  styleUrl: './parent-demo.component.scss'
})
export class ParentDemoComponent {
  // ===== Data managed by Parent, passed DOWN to children via @Input =====
  courses: Course[] = [
    { id: '1', title: 'Angular Fundamentals', instructor: 'Sarah Johnson', price: 49.99, enrolled: 156 },
    { id: '2', title: 'React Advanced Patterns', instructor: 'Mike Chen', price: 59.99, enrolled: 98 },
    { id: '3', title: 'Python for Data Science', instructor: 'Dr. Priya Sharma', price: 69.99, enrolled: 210 },
  ];

  // Parent tracks enrollment state
  enrolledCourses: Set<string> = new Set(['1']); // Pre-enrolled in course 1
  favorites: { id: string; title: string }[] = [];
  parentLog: string[] = [];

  // ===== @Output handlers: Child events bubble UP to Parent =====

  onEnroll(courseId: string): void {
    this.enrolledCourses.add(courseId);
    const title = this.getCourseTitle(courseId);
    this.addParentLog(`ENROLLED in "${title}" (courseId: ${courseId})`);
  }

  onUnenroll(courseId: string): void {
    this.enrolledCourses.delete(courseId);
    const title = this.getCourseTitle(courseId);
    this.addParentLog(`UNENROLLED from "${title}" (courseId: ${courseId})`);
  }

  onFavorite(data: { id: string; title: string }): void {
    if (!this.favorites.find(f => f.id === data.id)) {
      this.favorites.push(data);
      this.addParentLog(`FAVORITED "${data.title}"`);
    }
  }

  removeFavorite(id: string): void {
    this.favorites = this.favorites.filter(f => f.id !== id);
    this.addParentLog('Removed a favorite');
  }

  // ===== Helper Methods =====

  isEnrolled(courseId: string): boolean {
    return this.enrolledCourses.has(courseId);
  }

  getCourseTitle(id: string): string {
    return this.courses.find(c => c.id === id)?.title || id;
  }

  private addParentLog(message: string): void {
    const ts = new Date().toLocaleTimeString();
    this.parentLog.push(`[${ts}] ${message}`);
    console.log('Parent:', message);
    if (this.parentLog.length > 30) {
      this.parentLog.shift();
    }
  }
}
