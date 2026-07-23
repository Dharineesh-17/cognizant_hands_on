import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// Course interface shared between parent and child
export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  enrolled: number;
}

@Component({
  selector: 'app-child-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-demo.component.html',
  styleUrl: './child-demo.component.scss'
})
export class ChildDemoComponent implements OnChanges {
  // === @Input: Receive data FROM parent ===
  @Input() course!: Course;
  @Input() isEnrolled: boolean = false;
  @Input() maxSlots: number = 200;

  // === @Output: Send events TO parent ===
  @Output() enroll = new EventEmitter<string>();          // Emit course ID to parent
  @Output() unenroll = new EventEmitter<string>();        // Emit course ID to parent
  @Output() favorite = new EventEmitter<{ id: string; title: string }>();

  slotsRemaining: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course'] && this.course) {
      this.slotsRemaining = this.maxSlots - this.course.enrolled;
      console.log(`Child(${this.course.id}): Course data received — "${this.course.title}"`);
    }
    if (changes['isEnrolled']) {
      console.log(`Child(${this.course?.id}): Enrollment status → ${this.isEnrolled}`);
    }
  }

  onEnrollClick(): void {
    if (this.isEnrolled) {
      console.log(`Child(${this.course.id}): Firing unenroll event`);
      this.unenroll.emit(this.course.id);
    } else {
      console.log(`Child(${this.course.id}): Firing enroll event`);
      this.enroll.emit(this.course.id);
    }
  }

  onFavoriteClick(): void {
    console.log(`Child(${this.course.id}): Firing favorite event`);
    this.favorite.emit({ id: this.course.id, title: this.course.title });
  }

  // Computed helper for template
  getCapacityPercentage(): number {
    return Math.round((this.course.enrolled / this.maxSlots) * 100);
  }

  getCapacityColor(): string {
    const pct = this.getCapacityPercentage();
    if (pct >= 90) return '#ef4444';
    if (pct >= 70) return '#f59e0b';
    return '#10b981';
  }
}
