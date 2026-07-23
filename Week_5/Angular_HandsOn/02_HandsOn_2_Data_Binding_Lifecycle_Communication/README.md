# HandsOn 2: Data Binding, Lifecycle Hooks & Component Communication

## Objective
Master the three pillars of Angular component interaction: **Data Binding** (interpolation, property binding, event binding, two-way binding), **Lifecycle Hooks** (understanding and implementing component lifecycle events), and **Component Communication** (passing data between parent/child components using `@Input`/`@Output`, and sharing state via services).

## Prerequisites
- Completed **HandsOn 1** (Angular CLI installed, project running)
- Your `student-course-portal` project is available at `localhost:4200`

---

## Table of Contents
1. [Part A — Data Binding](#part-a--data-binding)
2. [Part B — Lifecycle Hooks](#part-b--lifecycle-hooks)
3. [Part C — Component Communication](#part-c--component-communication)
4. [Key Concepts Summary](#key-concepts-summary)
5. [Useful Commands](#useful-commands)
6. [Troubleshooting](#troubleshooting)

---

## Part A — Data Binding

### Overview
Angular provides four types of data binding. Understanding each one is essential for building interactive applications.

| Binding Type | Syntax | Direction | Example |
|-------------|--------|-----------|---------|
| **Interpolation** | `{{ }}` | One-way (Component → Template) | `{{ student.name }}` |
| **Property Binding** | `[target]` | One-way (Component → Template) | `[disabled]="isLoading"` |
| **Event Binding** | `(target)` | One-way (Template → Component) | `(click)="onSave()"` |
| **Two-way Binding** | `[(ngModel)]` | Two-way | `[(ngModel)]="student.name"` |

---

### Step 1: Create the Data Binding Demo Component

```bash
cd student-course-portal
ng generate component examples/data-binding-demo
```

### Step 2: Implement Interpolation & Property Binding

**`data-binding-demo.component.ts`**
```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-data-binding-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-binding-demo.component.html',
  styleUrl: './data-binding-demo.component.scss'
})
export class DataBindingDemoComponent {
  // --- Interpolation ---
  pageTitle: string = 'Data Binding Demo';
  currentYear: number = new Date().getFullYear();
  calculation: number = 25 * 4;  // Expressions work in interpolation

  // --- Property Binding ---
  isDisabled: boolean = true;
  imageUrl: string = 'https://via.placeholder.com/300x200';
  tooltipText: string = 'Hover over me!';
  buttonColor: string = '#2563eb';

  // --- Angular Signals (Angular 16+) ---
  counter = signal(0);
  doubledCounter = computed(() => this.counter() * 2);

  // --- Event Binding ---
  clickCount: number = 0;
  lastKeyPressed: string = '';
  mousePosition = { x: 0, y: 0 };
  inputText: string = '';

  // --- Two-way Binding ---
  studentName: string = '';
  studentEmail: string = '';
  selectedCourse: string = 'angular';
  agreeTerms: boolean = false;

  courses = [
    { id: 'angular', name: 'Angular Fundamentals', price: 49.99 },
    { id: 'react', name: 'React Advanced', price: 59.99 },
    { id: 'python', name: 'Python Data Science', price: 69.99 },
  ];

  // --- Event Handlers ---
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
      y: event.offsetY
    };
  }

  incrementCounter(): void {
    this.counter.update(val => val + 1);
  }

  decrementCounter(): void {
    this.counter.update(val => val - 1);
  }

  resetCounter(): void {
    this.counter.set(0);
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
      agreed: this.agreeTerms
    });
  }

  // --- Property Binding Methods ---
  getButtonStyles(): Record<string, string> {
    return {
      'background-color': this.buttonColor,
      'color': 'white',
      'padding': '0.75rem 1.5rem',
      'border': 'none',
      'border-radius': '8px',
      'cursor': this.isDisabled ? 'not-allowed' : 'pointer',
      'opacity': this.isDisabled ? '0.6' : '1',
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
```

### Step 3: Build the Template

**`data-binding-demo.component.html`**
```html
<div class="binding-demo-container">

  <!-- ===================== INTERPOLATION ===================== -->
  <section class="demo-section">
    <h2>1. Interpolation — {{ }}</h2>
    <p>Display component data in the template using double curly braces.</p>

    <div class="demo-card">
      <h3>{{ pageTitle }}</h3>
      <p>Year: {{ currentYear }}</p>
      <p>Calculation (25 x 4) = {{ calculation }}</p>
      <p>Ternary: {{ clickCount > 5 ? 'Many clicks!' : 'Keep clicking' }}</p>
      <p>Method call: {{ getButtonStyles() ? 'Styles available' : 'No styles' }}</p>
    </div>

    <div class="code-hint">
      <code>{{ pageTitle }}</code> → renders as: <strong>{{ pageTitle }}</strong>
    </div>
  </section>

  <!-- ===================== PROPERTY BINDING ===================== -->
  <section class="demo-section">
    <h2>2. Property Binding — [target]</h2>
    <p>Set DOM properties dynamically from the component.</p>

    <div class="demo-card">
      <button [disabled]="isDisabled" [style]="getButtonStyles()">
        {{ isDisabled ? 'Disabled Button' : 'Click Me' }}
      </button>
      <button (click)="isDisabled = !isDisabled" class="btn-secondary">
        Toggle Disabled
      </button>

      <div class="binding-row">
        <img [src]="imageUrl" [alt]="tooltipText" [title]="tooltipText" class="demo-image">
        <input type="text" [placeholder]="pageTitle" [value]="inputText">
      </div>

      <div class="class-binding-demo">
        <span [class]="getStatusClass('active')" class="status-badge">Active</span>
        <span [class]="getStatusClass('pending')" class="status-badge">Pending</span>
        <span [class]="getStatusClass('completed')" class="status-badge">Completed</span>
      </div>

      <div [style.background-color]="'#f0f7ff'" [style.padding]="'1rem'" [style.border-radius]="'8px'">
        <p>This div's styles are set via style binding.</p>
      </div>
    </div>

    <div class="code-hint">
      <code>[disabled]="isDisabled"</code> | <code>[src]="imageUrl"</code> | <code>[class.active]="isActive"</code>
    </div>
  </section>

  <!-- ===================== EVENT BINDING ===================== -->
  <section class="demo-section">
    <h2>3. Event Binding — (target)</h2>
    <p>Listen to DOM events and trigger component methods.</p>

    <div class="demo-card">
      <div class="event-grid">
        <div class="event-box">
          <h4>Click Event</h4>
          <button (click)="onButtonClick()" class="btn-primary">
            Click Me ({{ clickCount }} clicks)
          </button>
        </div>

        <div class="event-box">
          <h4>Keyboard Event</h4>
          <input (keyup)="onKeyPressed($event)" placeholder="Type something...">
          <p *ngIf="lastKeyPressed">Last key: <strong>{{ lastKeyPressed }}</strong></p>
        </div>

        <div class="event-box">
          <h4>Mouse Move</h4>
          <div class="mouse-tracker"
               (mousemove)="onMouseMove($event)"
               (mouseleave)="mousePosition = { x: 0, y: 0 }">
            <p>Move your mouse here</p>
            <p>X: {{ mousePosition.x }}, Y: {{ mousePosition.y }}</p>
          </div>
        </div>

        <div class="event-box">
          <h4>Angular Signals Counter</h4>
          <div class="counter-display">
            <span class="counter-value">{{ counter() }}</span>
            <span class="counter-doubled">x2 = {{ doubledCounter() }}</span>
          </div>
          <div class="counter-buttons">
            <button (click)="decrementCounter()">-</button>
            <button (click)="resetCounter()">Reset</button>
            <button (click)="incrementCounter()">+</button>
          </div>
        </div>
      </div>
    </div>

    <div class="code-hint">
      <code>(click)="onButtonClick()"</code> | <code>(keyup)="onKeyPressed($event)"</code> | <code>(mousemove)="onMouseMove($event)"</code>
    </div>
  </section>

  <!-- ===================== TWO-WAY BINDING ===================== -->
  <section class="demo-section">
    <h2>4. Two-Way Binding — [(ngModel)]</h2>
    <p>Combine property + event binding for seamless form inputs.</p>

    <div class="demo-card">
      <form class="demo-form" (ngSubmit)="onSubmit()">
        <div class="form-row">
          <div class="form-group">
            <label>Student Name</label>
            <input type="text" [(ngModel)]="studentName" name="name" placeholder="Enter name">
          </div>
          <div class="form-group">
            <label>Student Email</label>
            <input type="email" [(ngModel)]="studentEmail" name="email" placeholder="Enter email">
          </div>
        </div>

        <div class="form-group">
          <label>Select Course</label>
          <select [(ngModel)]="selectedCourse" name="course">
            <option *ngFor="let course of courses" [value]="course.id">
              {{ course.name }} — \${{ course.price }}
            </option>
          </select>
        </div>

        <label class="checkbox-label">
          <input type="checkbox" [(ngModel)]="agreeTerms" name="agree">
          I agree to the terms and conditions
        </label>

        <button type="submit" class="btn-submit" [disabled]="!agreeTerms">
          Submit Enrollment
        </button>
      </form>

      <div class="live-preview">
        <h4>Live Preview (reflects two-way binding)</h4>
        <p><strong>Name:</strong> {{ studentName || '—' }}</p>
        <p><strong>Email:</strong> {{ studentEmail || '—' }}</p>
        <p><strong>Course:</strong> {{ selectedCourse }}</p>
        <p><strong>Agreed:</strong> {{ agreeTerms ? 'Yes' : 'No' }}</p>
      </div>
    </div>

    <div class="code-hint">
      <code>[(ngModel)]="studentName"</code> → equivalent to <code>[ngModel]="studentName" (ngModelChange)="studentName = $event"</code>
    </div>
  </section>

</div>
```

### Step 4: Style the Demo Page

**`data-binding-demo.component.scss`**
```scss
.binding-demo-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Inter', sans-serif;
}

.demo-section {
  margin-bottom: 3rem;

  h2 {
    color: #2563eb;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  > p {
    color: #64748b;
    margin-bottom: 1rem;
  }
}

.demo-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 0.75rem;
}

.code-hint {
  background: #1e293b;
  color: #e2e8f0;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  code {
    color: #38bdf8;
    font-family: 'Fira Code', monospace;
  }
  strong { color: #fbbf24; }
}

.binding-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.demo-image {
  border-radius: 8px;
  border: 2px solid #e2e8f0;
}

// Status badges
.status-badge {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  margin-right: 0.5rem;
}

.status-active    { background: #d1fae5; color: #065f46; }
.status-pending   { background: #fef3c7; color: #92400e; }
.status-completed { background: #dbeafe; color: #1e40af; }

// Buttons
.btn-primary {
  background: #2563eb;
  color: white;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  &:hover { background: #1d4ed8; }
}

.btn-secondary {
  background: #f1f5f9;
  color: #334155;
  padding: 0.625rem 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  &:hover { background: #e2e8f0; }
}

// Event Grid
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.event-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  text-align: center;

  h4 {
    font-size: 0.875rem;
    color: #475569;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  input, select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.875rem;
    &:focus { outline: none; border-color: #2563eb; }
  }
}

.mouse-tracker {
  background: #e0f2fe;
  border-radius: 8px;
  padding: 2rem;
  cursor: crosshair;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p { margin: 0.25rem 0; font-size: 0.8125rem; color: #0369a1; }
}

// Counter
.counter-display {
  margin-bottom: 0.75rem;
  .counter-value {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: #2563eb;
  }
  .counter-doubled {
    font-size: 0.875rem;
    color: #64748b;
  }
}

.counter-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  button {
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 1px solid #e2e8f0;
    background: white;
    cursor: pointer;
    font-size: 1.125rem;
    font-weight: 600;
    &:hover { background: #f1f5f9; }
  }
}

// Form
.demo-form {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 500px) { grid-template-columns: 1fr; }
}

.form-group {
  margin-bottom: 1rem;
  label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.375rem;
  }
  input, select {
    width: 100%;
    padding: 0.625rem 0.875rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.875rem;
    &:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
  margin-bottom: 1.25rem;
  cursor: pointer;
  input { width: 16px; height: 16px; }
}

.btn-submit {
  background: #2563eb;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  &:hover:not(:disabled) { background: #1d4ed8; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

// Live Preview
.live-preview {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 1.25rem;
  h4 {
    font-size: 0.875rem;
    color: #166534;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  p {
    font-size: 0.875rem;
    color: #334155;
    margin: 0.375rem 0;
  }
}

@media (max-width: 600px) {
  .event-grid { grid-template-columns: 1fr; }
  .class-binding-demo { flex-wrap: wrap; }
}
```

---

## Part B — Lifecycle Hooks

### Overview
Angular components go through a lifecycle from creation to destruction. Hooks let you tap into key moments.

| Hook | Timing | Use Case |
|------|--------|----------|
| `constructor` | First, before Angular initializes | Dependency injection setup |
| `ngOnChanges` | When `@Input` properties change | React to parent data changes |
| `ngOnInit` | Once after first `ngOnChanges` | Fetch initial data, setup |
| `ngDoCheck` | During every change detection | Custom change detection |
| `ngAfterContentInit` | After external content projected | Work with `ng-content` |
| `ngAfterViewInit` | After view & child views init | DOM manipulation |
| `ngAfterViewChecked` | After every view check | Post-view updates |
| `ngOnDestroy` | Just before component is destroyed | Cleanup (unsubscribe, detach listeners) |

---

### Step 5: Create the Lifecycle Demo Component

```bash
ng generate component examples/lifecycle-demo
```

### Step 6: Implement Lifecycle Hooks

**`lifecycle-demo.component.ts`**
```typescript
import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lifecycle-demo.component.html',
  styleUrl: './lifecycle-demo.component.scss'
})
export class LifecycleDemoComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // Input property — triggers ngOnChanges
  @Input() courseTitle: string = 'Angular Fundamentals';
  @Input() studentCount: number = 100;

  // ViewChild — access child DOM element
  @ViewChild('lifecycleLog') logContainer!: ElementRef<HTMLDivElement>;

  // Component state
  logs: string[] = [];
  private changeDetectionCount = 0;

  // Signal for toggle demo
  isVisible = signal(true);
  manualLogs = signal<string[]>([]);

  constructor() {
    this.addLog('1. constructor — Component instance created');
    console.log('LifecycleDemo: constructor');
  }

  // Called when ANY @Input property changes (first time + subsequent)
  ngOnChanges(changes: SimpleChanges): void {
    const courseTitleChange = changes['courseTitle'];
    const studentCountChange = changes['studentCount'];

    let message = '2. ngOnChanges — ';
    if (courseTitleChange?.isFirstChange()) {
      message += `First: courseTitle="${courseTitleChange.currentValue}"`;
    } else if (courseTitleChange) {
      message += `courseTitle: "${courseTitleChange.previousValue}" → "${courseTitleChange.currentValue}"`;
    }
    if (studentCountChange) {
      message += ` | studentCount: ${studentCountChange.currentValue}`;
    }
    this.addLog(message);
    console.log('LifecycleDemo: ngOnChanges', changes);
  }

  // Called ONCE after the first ngOnChanges
  ngOnInit(): void {
    this.addLog('3. ngOnInit — Component initialized (fetch data here!)');
    console.log('LifecycleDemo: ngOnInit');
    // This is where you'd typically:
    // - Make HTTP calls
    // - Initialize subscriptions
    // - Set up form controls
  }

  // Called during EVERY change detection cycle
  ngDoCheck(): void {
    this.changeDetectionCount++;
    // Only log occasionally to avoid flooding
    if (this.changeDetectionCount % 5 === 0) {
      this.addLog(`4. ngDoCheck (every change detection, count: ${this.changeDetectionCount})`);
    }
  }

  // Called once after Angular projects external content into the view
  ngAfterContentInit(): void {
    this.addLog('5. ngAfterContentInit — Content projected');
    console.log('LifecycleDemo: ngAfterContentInit');
  }

  // Called after every check of projected content
  ngAfterContentChecked(): void {
    if (this.changeDetectionCount % 10 === 0) {
      this.addLog('6. ngAfterContentChecked — Content checked');
    }
  }

  // Called once after the component view and its child views are initialized
  ngAfterViewInit(): void {
    this.addLog('7. ngAfterViewInit — View & child views initialized');
    console.log('LifecycleDemo: ngAfterViewInit');
    // DOM is available here — safe to access ViewChild elements
    if (this.logContainer?.nativeElement) {
      console.log('Log container height:', this.logContainer.nativeElement.scrollHeight);
    }
  }

  // Called after every check of the component view
  ngAfterViewChecked(): void {
    if (this.changeDetectionCount % 10 === 0) {
      this.addLog('8. ngAfterViewChecked — View checked');
    }
  }

  // Called just before Angular destroys the component
  ngOnDestroy(): void {
    this.addLog('9. ngOnDestroy — Component about to be destroyed!');
    console.log('LifecycleDemo: ngOnDestroy — CLEANUP RESOURCES HERE');
    // IMPORTANT: This is where you MUST:
    // - Unsubscribe from Observables
    // - Clear intervals/timeouts
    // - Detach event listeners
    // - Abort HTTP requests
  }

  // --- Demo Methods ---

  private addLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `[${timestamp}] ${message}`;
    this.logs.push(entry);
    this.manualLogs.update(prev => [...prev, entry]);
    // Keep log manageable
    if (this.logs.length > 50) this.logs.shift();
  }

  changeTitle(): void {
    // Parent would normally do this, but for demo:
    this.courseTitle = this.courseTitle === 'Angular Fundamentals'
      ? 'React Advanced Patterns'
      : 'Angular Fundamentals';
  }

  incrementStudents(): void {
    this.studentCount += 10;
  }

  toggleVisibility(): void {
    this.isVisible.update(v => !v);
    if (!this.isVisible.get()) {
      this.addLog('>>> Component hidden (simulate destroy)');
    } else {
      this.addLog('>>> Component shown again');
    }
  }

  clearLogs(): void {
    this.logs = [];
    this.manualLogs.set([]);
  }
}
```

### Step 7: Build the Lifecycle Template

**`lifecycle-demo.component.html`**
```html
<div class="lifecycle-container">
  <h2>Angular Lifecycle Hooks</h2>
  <p>Watch the execution order as you interact with the component.</p>

  <div class="controls-bar">
    <button (click)="changeTitle()" class="btn-primary">
      Change Title → {{ courseTitle }}
    </button>
    <button (click)="incrementStudents()" class="btn-secondary">
      Students: {{ studentCount }} (+10)
    </button>
    <button (click)="toggleVisibility()" class="btn-secondary">
      {{ isVisible() ? 'Hide' : 'Show' }}
    </button>
    <button (click)="clearLogs()" class="btn-danger">Clear Logs</button>
  </div>

  <!-- Lifecycle Execution Order -->
  <div class="order-diagram">
    <h3>Hooks Execution Order</h3>
    <div class="order-steps">
      <div class="step">
        <span class="step-num">1</span>
        <span class="step-name">constructor()</span>
        <span class="step-note">DI setup</span>
      </div>
      <div class="step-arrow">↓</div>
      <div class="step">
        <span class="step-num">2</span>
        <span class="step-name">ngOnChanges()</span>
        <span class="step-note">@Input changes</span>
      </div>
      <div class="step-arrow">↓</div>
      <div class="step">
        <span class="step-num">3</span>
        <span class="step-name">ngOnInit()</span>
        <span class="step-note">Initialize data</span>
      </div>
      <div class="step-arrow">↓</div>
      <div class="step">
        <span class="step-num">4</span>
        <span class="step-name">ngDoCheck()</span>
        <span class="step-note">Custom detection</span>
      </div>
      <div class="step-arrow">↓</div>
      <div class="step">
        <span class="step-num">5</span>
        <span class="step-name">ngAfterContentInit()</span>
        <span class="step-note">Content projected</span>
      </div>
      <div class="step-arrow">↓</div>
      <div class="step">
        <span class="step-num">6</span>
        <span class="step-name">ngAfterContentChecked()</span>
        <span class="step-note">Content checked</span>
      </div>
      <div class="step-arrow">↓</div>
      <div class="step">
        <span class="step-num">7</span>
        <span class="step-name">ngAfterViewInit()</span>
        <span class="step-note">DOM ready</span>
      </div>
      <div class="step-arrow">↓</div>
      <div class="step">
        <span class="step-num">8</span>
        <span class="step-name">ngAfterViewChecked()</span>
        <span class="step-note">View checked</span>
      </div>
      <div class="step-arrow">↓</div>
      <div class="step destroy-step">
        <span class="step-num">9</span>
        <span class="step-name">ngOnDestroy()</span>
        <span class="step-note">Cleanup!</span>
      </div>
    </div>
  </div>

  <!-- Live Log -->
  <div class="log-panel" #lifecycleLog>
    <div class="log-header">
      <h3>Live Lifecycle Log</h3>
      <span class="log-count">{{ logs.length }} events</span>
    </div>
    <div class="log-entries">
      <div class="log-entry" *ngFor="let log of logs; let i = index" [class.highlight]="i === logs.length - 1">
        <span class="log-index">{{ i + 1 }}</span>
        <span class="log-text">{{ log }}</span>
      </div>
      <div class="log-empty" *ngIf="logs.length === 0">
        No lifecycle events recorded yet. Interact with the controls above.
      </div>
    </div>
  </div>

  <!-- Visibility toggle demo -->
  <div class="conditional-demo" *ngIf="isVisible()">
    <div class="info-card">
      <h4>Component is Visible</h4>
      <p>This section uses <code>*ngIf="isVisible()"</code>. Toggling this will trigger
        <code>ngOnDestroy</code> when hidden and <code>constructor → ngOnInit</code> sequence when shown again.</p>
    </div>
  </div>
</div>
```

### Step 8: Style the Lifecycle Demo

**`lifecycle-demo.component.scss`**
```scss
.lifecycle-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Inter', sans-serif;

  h2 {
    color: #2563eb;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  > p { color: #64748b; margin-bottom: 1.5rem; }
}

.controls-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.btn-primary {
  background: #2563eb; color: white;
  padding: 0.5rem 1rem; border: none; border-radius: 8px;
  cursor: pointer; font-size: 0.875rem; font-weight: 500;
  &:hover { background: #1d4ed8; }
}
.btn-secondary {
  background: #f1f5f9; color: #334155;
  padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 8px;
  cursor: pointer; font-size: 0.875rem; font-weight: 500;
  &:hover { background: #e2e8f0; }
}
.btn-danger {
  background: #fef2f2; color: #dc2626;
  padding: 0.5rem 1rem; border: 1px solid #fecaca; border-radius: 8px;
  cursor: pointer; font-size: 0.875rem; font-weight: 500;
  &:hover { background: #fee2e2; }
}

// Order Diagram
.order-diagram {
  background: white; border: 1px solid #e2e8f0;
  border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;

  h3 {
    font-size: 1rem; font-weight: 600; color: #1e293b; margin-bottom: 1rem;
  }
}

.order-steps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f0f7ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
}

.step-num {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 700;
}

.step-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1e293b;
}

.step-note {
  font-size: 0.6875rem;
  color: #64748b;
  background: #e2e8f0;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}

.step-arrow {
  color: #94a3b8;
  font-size: 0.75rem;
}

.destroy-step {
  background: #fef2f2;
  border-color: #fecaca;
  .step-num { background: #dc2626; }
}

// Log Panel
.log-panel {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1.25rem;
  background: #1e293b;
  color: white;

  h3 { font-size: 0.875rem; font-weight: 600; }
  .log-count {
    font-size: 0.75rem;
    background: #334155;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
  }
}

.log-entries {
  max-height: 300px;
  overflow-y: auto;
  background: #0f172a;
  padding: 0.75rem;
}

.log-entry {
  display: flex;
  gap: 0.75rem;
  padding: 0.375rem 0.5rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.75rem;
  border-radius: 4px;

  &:hover { background: #1e293b; }
  &.highlight { background: rgba(37, 99, 235, 0.15); }

  .log-index {
    color: #64748b;
    min-width: 24px;
  }
  .log-text { color: #e2e8f0; word-break: break-all; }
}

.log-empty {
  color: #64748b;
  text-align: center;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
}

// Conditional Demo
.conditional-demo {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.info-card {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 1.25rem;

  h4 { color: #166534; font-size: 0.875rem; margin-bottom: 0.5rem; }
  p { color: #334155; font-size: 0.875rem; line-height: 1.6; }
  code {
    background: #166534;
    color: #d1fae5;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.8125rem;
  }
}
```

---

## Part C — Component Communication

### Overview

There are three main ways components communicate in Angular:

| Method | Direction | Use Case |
|--------|-----------|----------|
| `@Input()` | Parent → Child | Pass data down |
| `@Output()` + `@Output EventEmitter` | Child → Parent | Send events up |
| **Service** | Any ↔ Any | Shared state, cross-component data |

---

### Step 9: Create Parent-Child Communication Demo

```bash
ng generate component examples/parent-demo
ng generate component examples/child-demo
```

### Step 10: Implement the Child Component (receives `@Input`, emits `@Output`)

**`child-demo.component.ts`**
```typescript
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  // === @Output: Send data TO parent ===
  @Output() enroll = new EventEmitter<string>();         // Emit course ID
  @Output() unenroll = new EventEmitter<string>();       // Emit course ID
  @Output() favorite = new EventEmitter<{ id: string; title: string }>();

  slotsRemaining: number = 0;
  private log: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course'] && this.course) {
      this.slotsRemaining = this.maxSlots - this.course.enrolled;
      this.addLog(`Course data received: "${this.course.title}"`);
    }
    if (changes['isEnrolled']) {
      this.addLog(`Enrollment status: ${this.isEnrolled}`);
    }
  }

  onEnrollClick(): void {
    if (this.isEnrolled) {
      this.addLog('Unenrolling...');
      this.unenroll.emit(this.course.id);
    } else {
      this.addLog('Enrolling!');
      this.enroll.emit(this.course.id);
    }
  }

  onFavoriteClick(): void {
    this.addLog('Favorited!');
    this.favorite.emit({ id: this.course.id, title: this.course.title });
  }

  getCapacityPercentage(): number {
    return Math.round((this.course.enrolled / this.maxSlots) * 100);
  }

  getCapacityColor(): string {
    const pct = this.getCapacityPercentage();
    if (pct >= 90) return '#ef4444';
    if (pct >= 70) return '#f59e0b';
    return '#10b981';
  }

  private addLog(message: string): void {
    const ts = new Date().toLocaleTimeString();
    this.log.push(`[${ts}] ${message}`);
    if (this.log.length > 20) this.log.shift();
    console.log(`Child(${this.course?.id}):`, message);
  }
}
```

**`child-demo.component.html`**
```html
<div class="child-card" [class.enrolled]="isEnrolled">
  <div class="card-header">
    <h4>{{ course.title }}</h4>
    <span class="badge" [style.backgroundColor]="isEnrolled ? '#10b981' : '#3b82f6'">
      {{ isEnrolled ? 'Enrolled' : 'Available' }}
    </span>
  </div>

  <div class="card-body">
    <p class="instructor">by {{ course.instructor }}</p>
    <p class="price">\${{ course.price }}</p>

    <!-- Capacity bar using @Input data -->
    <div class="capacity-section">
      <div class="capacity-bar">
        <div class="capacity-fill" [style.width.%]="getCapacityPercentage()"
             [style.backgroundColor]="getCapacityColor()"></div>
      </div>
      <span class="capacity-text">
        {{ course.enrolled }}/{{ maxSlots }} enrolled ({{ slotsRemaining }} remaining)
      </span>
    </div>
  </div>

  <div class="card-actions">
    <button (click)="onEnrollClick()" class="btn-enroll">
      {{ isEnrolled ? 'Drop Course' : 'Enroll Now' }}
    </button>
    <button (click)="onFavoriteClick()" class="btn-favorite" title="Add to favorites">
      ♡
    </button>
  </div>
</div>
```

**`child-demo.component.scss`**
```scss
.child-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
  }

  &.enrolled { border-color: #10b981; }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  h4 {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #1e293b;
  }

  .badge {
    color: white;
    padding: 0.25rem 0.625rem;
    border-radius: 9999px;
    font-size: 0.6875rem;
    font-weight: 600;
  }
}

.card-body {
  padding: 1rem 1.25rem;

  .instructor { color: #64748b; font-size: 0.8125rem; margin-bottom: 0.25rem; }
  .price { font-size: 1.25rem; font-weight: 700; color: #2563eb; margin-bottom: 0.75rem; }
}

.capacity-section { margin-bottom: 0.25rem; }

.capacity-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.capacity-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}

.capacity-text {
  font-size: 0.6875rem;
  color: #64748b;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border-top: 1px solid #e2e8f0;
}

.btn-enroll {
  flex: 1;
  padding: 0.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  border: none;
  background: #2563eb;
  color: white;
  &:hover { background: #1d4ed8; }
}

.enrolled .btn-enroll {
  background: #dc2626;
  &:hover { background: #b91c1c; }
}

.btn-favorite {
  width: 36px; height: 36px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover { background: #fef2f2; border-color: #fecaca; }
}
```

### Step 11: Implement the Parent Component (passes `@Input`, listens to `@Output`)

**`parent-demo.component.ts`**
```typescript
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
  // Data the parent manages and passes DOWN via @Input
  courses: Course[] = [
    { id: '1', title: 'Angular Fundamentals', instructor: 'Sarah Johnson', price: 49.99, enrolled: 156 },
    { id: '2', title: 'React Advanced Patterns', instructor: 'Mike Chen', price: 59.99, enrolled: 98 },
    { id: '3', title: 'Python for Data Science', instructor: 'Dr. Priya Sharma', price: 69.99, enrolled: 210 },
  ];

  // Track which courses the "user" is enrolled in
  enrolledCourses: Set<string> = new Set(['1']); // Pre-enrolled in course 1
  favorites: { id: string; title: string }[] = [];
  parentLog: string[] = [];

  // === @Output handlers — Child sends events UP to Parent ===

  onEnroll(courseId: string): void {
    this.enrolledCourses.add(courseId);
    this.addParentLog(`ENROLLED in course "${this.getCourseTitle(courseId)}"`);
  }

  onUnenroll(courseId: string): void {
    this.enrolledCourses.delete(courseId);
    this.addParentLog(`UNENROLLED from course "${this.getCourseTitle(courseId)}"`);
  }

  onFavorite(data: { id: string; title: string }): void {
    if (!this.favorites.find(f => f.id === data.id)) {
      this.favorites.push(data);
      this.addParentLog(`FAVORITED "${data.title}"`);
    }
  }

  removeFavorite(id: string): void {
    this.favorites = this.favorites.filter(f => f.id !== id);
    this.addParentLog(`Removed from favorites`);
  }

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
    if (this.parentLog.length > 30) this.parentLog.shift();
  }
}
```

**`parent-demo.component.html`**
```html
<div class="parent-container">
  <h2>Component Communication: Parent → Child (Input) & Child → Parent (Output)</h2>
  <p>Parent manages course data and enrollment state. Child receives data via <code>@Input()</code> and sends events via <code>@Output()</code>.</p>

  <!-- Communication Flow Diagram -->
  <div class="flow-diagram">
    <div class="flow-box parent-flow">
      <span class="material-icons">account_tree</span>
      <span>Parent Component</span>
    </div>
    <div class="flow-arrows">
      <span class="arrow-down">
        <code>@Input()</code>
        <span>▼</span>
        data flows down
      </span>
      <span class="arrow-up">
        <code>@Output()</code>
        <span>▲</span>
        events flow up
      </span>
    </div>
    <div class="flow-box child-flow">
      <span class="material-icons">widgets</span>
      <span>Child Component</span>
    </div>
  </div>

  <!-- Child Components rendered by Parent -->
  <div class="children-grid">
    <ng-container *ngFor="let course of courses">
      <!--
        @Input:  [course]="course"        → passes course data to child
                 [isEnrolled]="isEnrolled(course.id)" → passes enrollment status
                 [maxSlots]="200"         → passes capacity limit
        @Output: (enroll)="onEnroll($event)"     → child fires enroll event
                  (unenroll)="onUnenroll($event)" → child fires unenroll event
                  (favorite)="onFavorite($event)" → child fires favorite event
      -->
      <app-child-demo
        [course]="course"
        [isEnrolled]="isEnrolled(course.id)"
        [maxSlots]="200"
        (enroll)="onEnroll($event)"
        (unenroll)="onUnenroll($event)"
        (favorite)="onFavorite($event)">
      </app-child-demo>
    </ng-container>
  </div>

  <!-- Parent State -->
  <div class="parent-state">
    <h3>Parent's Managed State</h3>
    <div class="state-grid">
      <div class="state-card">
        <h4>Enrolled Courses</h4>
        <div class="state-list">
          <span *ngFor="let courseId of enrolledCourses" class="state-item enrolled">
            {{ getCourseTitle(courseId) }}
          </span>
          <span *ngIf="enrolledCourses.size === 0" class="empty-state">None yet</span>
        </div>
      </div>
      <div class="state-card">
        <h4>Favorites</h4>
        <div class="state-list">
          <span *ngFor="let fav of favorites" class="state-item favorite">
            ♡ {{ fav.title }}
            <button (click)="removeFavorite(fav.id)" class="remove-btn">×</button>
          </span>
          <span *ngIf="favorites.length === 0" class="empty-state">None yet</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Parent Event Log -->
  <div class="parent-log">
    <h3>Parent Event Log (received from children)</h3>
    <div class="log-entries">
      <div class="log-entry" *ngFor="let log of parentLog; let i = index" [class.highlight]="i === parentLog.length - 1">
        <span class="log-index">{{ i + 1 }}</span>
        <span class="log-text">{{ log }}</span>
      </div>
      <div class="log-empty" *ngIf="parentLog.length === 0">
        Click "Enroll Now" or "♡" on a child card to see events flow up to the parent.
      </div>
    </div>
  </div>
</div>
```

**`parent-demo.component.scss`**
```scss
.parent-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Inter', sans-serif;

  h2 {
    color: #2563eb;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  > p {
    color: #64748b;
    margin-bottom: 1.5rem;
    font-size: 0.9375rem;

    code {
      background: #f1f5f9;
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
      font-size: 0.875rem;
      color: #2563eb;
    }
  }
}

// Flow Diagram
.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.25rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.flow-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  .material-icons { font-size: 20px; }
}

.parent-flow {
  background: #2563eb;
  color: white;
}

.child-flow {
  background: #8b5cf6;
  color: white;
}

.flow-arrows {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  code {
    font-size: 0.75rem;
    font-weight: 600;
  }

  .arrow-down { color: #2563eb; font-size: 0.75rem; display: flex; align-items: center; gap: 0.375rem; }
  .arrow-up { color: #8b5cf6; font-size: 0.75rem; display: flex; align-items: center; gap: 0.375rem; }
}

// Children Grid
.children-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

// State Section
.parent-state {
  margin-bottom: 2rem;

  h3 { font-size: 1.125rem; color: #1e293b; margin-bottom: 1rem; }
}

.state-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.state-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;

  h4 {
    font-size: 0.875rem;
    color: #475569;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.state-list { display: flex; flex-direction: column; gap: 0.5rem; }

.state-item {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.enrolled { background: #d1fae5; color: #065f46; }
  &.favorite { background: #fce7f3; color: #9d174d; }
}

.remove-btn {
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  font-size: 1.125rem;
  padding: 0 0.25rem;
  &:hover { background: #fecaca; border-radius: 4px; }
}

.empty-state {
  color: #94a3b8;
  font-size: 0.8125rem;
  font-style: italic;
}

// Parent Log
.parent-log {
  h3 { font-size: 1.125rem; color: #1e293b; margin-bottom: 1rem; }
}

.log-entries {
  background: #0f172a;
  border-radius: 8px;
  padding: 0.75rem;
  max-height: 250px;
  overflow-y: auto;
}

.log-entry {
  display: flex;
  gap: 0.75rem;
  padding: 0.375rem 0.5rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.75rem;
  border-radius: 4px;
  &:hover { background: #1e293b; }
  &.highlight { background: rgba(56, 189, 248, 0.1); }
  .log-index { color: #64748b; min-width: 24px; }
  .log-text { color: #e2e8f0; }
}

.log-empty {
  color: #64748b;
  text-align: center;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
}
```

### Step 12: Service-Based Communication Demo

**`communication.service.ts`**
```typescript
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  // Shared state using Angular Signals
  private notifications = signal<string[]>([]);
  private activeUsers = signal<number>(0);

  // Read-only computed signals
  readonly notificationCount = computed(() => this.notifications().length);
  readonly hasNotifications = computed(() => this.notifications().length > 0);
  readonly userStatus = computed(() =>
    this.activeUsers() > 0 ? `${this.activeUsers()} online` : 'No one online'
  );

  // === Notification Methods ===
  getNotifications(): string[] {
    return this.notifications();
  }

  addNotification(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.notifications.update(prev => [
      `[${timestamp}] ${message}`,
      ...prev
    ]);
    // Keep max 50
    if (this.notifications().length > 50) {
      this.notifications.update(prev => prev.slice(0, 50));
    }
    console.log('CommunicationService: Notification added:', message);
  }

  clearNotifications(): void {
    this.notifications.set([]);
  }

  removeNotification(index: number): void {
    this.notifications.update(prev => prev.filter((_, i) => i !== index));
  }

  // === User Tracking Methods ===
  getActiveUsers(): number {
    return this.activeUsers();
  }

  userJoined(): void {
    this.activeUsers.update(n => n + 1);
    this.addNotification('A user joined the platform');
  }

  userLeft(): void {
    this.activeUsers.update(n => Math.max(0, n - 1));
    this.addNotification('A user left the platform');
  }

  resetUsers(): void {
    this.activeUsers.set(0);
  }
}
```

**`service-demo.component.ts`**
```typescript
import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationService } from './communication.service';

@Component({
  selector: 'app-service-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-demo.component.html',
  styleUrl: './service-demo.component.scss'
})
export class ServiceDemoComponent implements OnDestroy {
  // Inject the shared service — same instance across all components
  private commService = inject(CommunicationService);

  constructor() {
    // Service is already available — show current state
    this.commService.addNotification('ServiceDemoComponent initialized');
  }

  ngOnDestroy(): void {
    this.commService.addNotification('ServiceDemoComponent destroyed');
  }

  // Expose service signals for template
  get notifications() { return this.commService.notifications(); }
  get notificationCount() { return this.commService.notificationCount(); }
  get hasNotifications() { return this.commService.hasNotifications(); }
  get activeUsers() { return this.commService.getActiveUsers(); }
  get userStatus() { return this.commService.userStatus(); }

  addCustomNotification(): void {
    this.commService.addNotification('Custom notification from ServiceDemo');
  }

  clearAll(): void {
    this.commService.clearNotifications();
  }

  userJoin(): void {
    this.commService.userJoined();
  }

  userLeave(): void {
    this.commService.userLeft();
  }
}
```

**`service-demo.component.html`**
```html
<div class="service-demo">
  <h3>Service-Based Communication</h3>
  <p>Multiple components share state via an injectable service (singleton pattern).</p>

  <div class="demo-actions">
    <button (click)="userJoin()" class="btn-primary">User Joined</button>
    <button (click)="userLeave()" class="btn-secondary">User Left</button>
    <button (click)="addCustomNotification()" class="btn-secondary">Add Notification</button>
    <button (click)="clearAll()" class="btn-danger">Clear All</button>
  </div>

  <div class="stats-row">
    <div class="stat-card">
      <span class="stat-value">{{ activeUsers }}</span>
      <span class="stat-label">Active Users</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">{{ notificationCount }}</span>
      <span class="stat-label">Notifications</span>
    </div>
    <div class="stat-card wide">
      <span class="stat-value small">{{ userStatus }}</span>
      <span class="stat-label">Status</span>
    </div>
  </div>

  <div class="notification-list">
    <div class="noti-header">
      <span>Notifications (shared via service)</span>
    </div>
    <div class="noti-entries">
      <div class="noti-entry" *ngFor="let noti of notifications; let i = index">
        <span>{{ noti }}</span>
        <button (click)="commService.removeNotification(i)" class="remove-btn">×</button>
      </div>
      <div class="noti-empty" *ngIf="!hasNotifications">No notifications yet</div>
    </div>
  </div>
</div>
```

**`service-demo.component.scss`**
```scss
.service-demo {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Inter', sans-serif;

  h3 { color: #8b5cf6; font-size: 1.25rem; margin-bottom: 0.25rem; }
  > p { color: #64748b; font-size: 0.875rem; margin-bottom: 1.25rem; }
}

.demo-actions {
  display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;
}

.btn-primary {
  background: #2563eb; color: white; padding: 0.5rem 1rem; border: none;
  border-radius: 8px; cursor: pointer; font-size: 0.8125rem; font-weight: 500;
  &:hover { background: #1d4ed8; }
}
.btn-secondary {
  background: #f1f5f9; color: #334155; padding: 0.5rem 1rem; border: 1px solid #e2e8f0;
  border-radius: 8px; cursor: pointer; font-size: 0.8125rem; font-weight: 500;
  &:hover { background: #e2e8f0; }
}
.btn-danger {
  background: #fef2f2; color: #dc2626; padding: 0.5rem 1rem; border: 1px solid #fecaca;
  border-radius: 8px; cursor: pointer; font-size: 0.8125rem; font-weight: 500;
  &:hover { background: #fee2e2; }
}

.stats-row {
  display: flex; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;
}

.stat-card {
  background: white; border: 1px solid #e2e8f0; border-radius: 8px;
  padding: 1rem 1.25rem; text-align: center; flex: 1; min-width: 120px;
  &.wide { flex: 2; }
  .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: #2563eb; }
  .stat-value.small { font-size: 0.875rem; }
  .stat-label { display: block; font-size: 0.6875rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
}

.notification-list {
  border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;
}

.noti-header {
  background: #1e293b; color: white; padding: 0.625rem 1rem;
  font-size: 0.8125rem; font-weight: 600;
}

.noti-entries {
  background: #0f172a; padding: 0.5rem; max-height: 200px; overflow-y: auto;
}

.noti-entry {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.375rem 0.5rem; font-size: 0.75rem;
  font-family: 'Fira Code', monospace; color: #e2e8f0;
  border-radius: 4px;
  &:hover { background: #1e293b; }
}

.remove-btn {
  background: none; border: none; color: #64748b; cursor: pointer;
  font-size: 1rem; padding: 0 0.25rem;
  &:hover { color: #ef4444; }
}

.noti-empty {
  color: #64748b; text-align: center; padding: 1.5rem;
  font-family: 'Inter', sans-serif; font-size: 0.8125rem;
}
```

### Step 13: Register All Demo Routes

Update your `app.routes.ts` to add the new demo routes:

```typescript
import { Routes } from '@angular/router';
// ... existing imports ...
import { DataBindingDemoComponent } from './examples/data-binding-demo/data-binding-demo.component';
import { LifecycleDemoComponent } from './examples/lifecycle-demo/lifecycle-demo.component';
import { ParentDemoComponent } from './examples/parent-demo/parent-demo.component';
import { ServiceDemoComponent } from './examples/service-demo/service-demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'students/:id', component: StudentDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // HandsOn 2 demos
  { path: 'demo/binding', component: DataBindingDemoComponent },
  { path: 'demo/lifecycle', component: LifecycleDemoComponent },
  { path: 'demo/communication', component: ParentDemoComponent },
  { path: 'demo/service', component: ServiceDemoComponent },
  { path: '**', component: NotFoundComponent },
];
```

---

## Key Concepts Summary

### Data Binding Cheat Sheet

```
Interpolation:      {{ expression }}              → Component → DOM text
Property Binding:   [property]="expression"       → Component → DOM property
Event Binding:      (event)="handler()"            → DOM event → Component
Two-Way Binding:    [(ngModel)]="property"         → Component ↔ DOM input
Class Binding:      [class.active]="isActive"      → Toggle CSS class
Style Binding:      [style.color]="'red'"          → Set inline style
```

### Lifecycle Hook Order (Creation)

```
constructor()  →  ngOnChanges()  →  ngOnInit()  →  ngDoCheck()  →
ngAfterContentInit()  →  ngAfterContentChecked()  →
ngAfterViewInit()  →  ngAfterViewChecked()  →  ... (change detection repeats)  →
ngOnDestroy()
```

### Communication Patterns

```
Parent → Child:     @Input() decorator on child property
Child → Parent:     @Output() EventEmitter on child, parent listens with (event)
Any ↔ Any:          Shared service (providedIn: 'root') with signals/observables
```

---

## Useful Commands

| Command | Purpose |
|---------|---------|
| `ng serve --open` | Start dev server and open browser |
| `ng generate component <path>` | Create new component |
| `ng generate service <name>` | Create new service |

---

## Troubleshooting

### `[(ngModel)]` not working
**Solution:** Make sure you import `FormsModule` in the component's `imports` array.

### `ngOnChanges` not firing
**Solution:** The property must use `@Input()` decorator. Plain properties won't trigger it.

### `ViewChild` is undefined
**Solution:** Access it in `ngAfterViewInit()`, not in `ngOnInit()`. The view isn't ready yet during init.

### Service not sharing data between components
**Solution:** Ensure the service has `providedIn: 'root'` in the `@Injectable()` decorator.

---

## Expected Output
See the `screenshots/` folder for expected output screenshots:
- Data binding demo with live interaction
- Lifecycle hook execution log in console/terminal
- Parent-child communication with enroll/favorite flow
- Service-based shared state across components

## Next Steps
Proceed to **HandsOn 3** to learn about Angular Services, HTTP Client, and RxJS Observables.
