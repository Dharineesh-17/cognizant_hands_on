import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-binding-demo.component.html',
  styleUrl: './data-binding-demo.component.scss'
})
export class DataBindingDemoComponent {
  // ===== INTERPOLATION =====
  pageTitle: string = 'Data Binding Demo';
  currentYear: number = new Date().getFullYear();
  calculation: number = 25 * 4;

  // ===== PROPERTY BINDING =====
  isDisabled: boolean = true;
  imageUrl: string = 'https://via.placeholder.com/300x200/2563eb/ffffff?text=CourseHub';
  tooltipText: string = 'Hover over me!';
  buttonColor: string = '#2563eb';

  // ===== SIGNALS (Angular 16+) =====
  counter: number = 0;

  // ===== EVENT BINDING =====
  clickCount: number = 0;
  lastKeyPressed: string = '';
  mousePosition = { x: 0, y: 0 };
  inputText: string = '';

  // ===== TWO-WAY BINDING =====
  studentName: string = '';
  studentEmail: string = '';
  selectedCourse: string = 'angular';
  agreeTerms: boolean = false;

  courses = [
    { id: 'angular', name: 'Angular Fundamentals', price: 49.99 },
    { id: 'react', name: 'React Advanced Patterns', price: 59.99 },
    { id: 'python', name: 'Python Data Science', price: 69.99 },
  ];

  // ===== EVENT HANDLERS =====

  onButtonClick(): void {
    this.clickCount++;
    console.log('Button clicked!', this.clickCount, 'times');
  }

  onKeyPressed(event: KeyboardEvent): void {
    this.lastKeyPressed = event.key;
  }

  onMouseMove(event: MouseEvent): void {
    this.mousePosition = {
      x: event.offsetX,
      y: event.offsetY,
    };
  }

  incrementCounter(): void {
    this.counter++;
  }

  decrementCounter(): void {
    this.counter--;
  }

  resetCounter(): void {
    this.counter = 0;
  }

  onSubmit(): void {
    if (!this.studentName || !this.studentEmail) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Form submitted:', {
      name: this.studentName,
      email: this.studentEmail,
      course: this.selectedCourse,
      agreed: this.agreeTerms,
    });
    alert(`Enrollment submitted for ${this.studentName}!`);
  }

  // ===== STYLE BINDING HELPERS =====

  getButtonStyles(): Record<string, string> {
    return {
      'background-color': this.buttonColor,
      'color': 'white',
      'padding': '0.75rem 1.5rem',
      'border': 'none',
      'border-radius': '8px',
      'cursor': this.isDisabled ? 'not-allowed' : 'pointer',
      'opacity': this.isDisabled ? '0.6' : '1',
      'font-size': '0.875rem',
    };
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      active: 'status-active',
      pending: 'status-pending',
      completed: 'status-completed',
    };
    return classes[status] || '';
  }
}
