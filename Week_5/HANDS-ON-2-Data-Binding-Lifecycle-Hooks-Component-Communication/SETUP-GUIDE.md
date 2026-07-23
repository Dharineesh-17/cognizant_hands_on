# HANDS-ON 2: Data Binding, Lifecycle Hooks & Component Communication

## Project Setup
- **Project Name:** student-course-portal-2
- **Location:** Week 5/HANDS-ON-2-Data-Binding-Lifecycle-Hooks-Component-Communication
- **Framework:** Angular 20 (Standalone Components)
- **Status:** Project scaffolded - Ready for component implementation

## Tasks Overview

### Task 1: All Four Binding Types
**Goal:** Implement interpolation, property binding, event binding, and two-way binding in HomeComponent

**Implementation Steps:**
1. **String Interpolation** - Display portalName in template
   ```typescript
   portalName = 'Student Course Portal';
   ```
   ```html
   <h1>{{ portalName }}</h1>
   ```

2. **Property Binding** - Control button disabled state
   ```typescript
   isPortalActive = true;
   ```
   ```html
   <button [disabled]='!isPortalActive'>Enroll Now</button>
   ```

3. **Event Binding** - Button click handler
   ```typescript
   message = '';
   onEnrollClick() {
     this.message = 'Enrollment opened!';
   }
   ```
   ```html
   <button (click)='onEnrollClick()'>{{ message }}</button>
   ```

4. **Two-Way Binding** - Search input with ngModel
   ```typescript
   searchTerm = '';
   // Import FormsModule in component imports
   ```
   ```html
   <input [(ngModel)]='searchTerm' placeholder='Search courses...'>
   <p>Searching for: {{ searchTerm }}</p>
   ```

**Key Concepts:**
- `[property]` = One-way binding (Component → DOM)
- `(event)` = Event binding (DOM → Component)
- `[(ngModel)]` = Two-way binding (DOM ↔ Component)
- FormsModule must be imported for ngModel to work

---

### Task 2: Lifecycle Hooks
**Goal:** Implement and observe ngOnInit, ngOnChanges, and ngOnDestroy

**Components to Create:**
1. **HomeComponent** - ngOnInit & ngOnDestroy
2. **CourseCardComponent** - @Input property & ngOnChanges
3. **CourseListComponent** - Render CourseCardComponent instances

**Implementation:**

**HomeComponent (ngOnInit & ngOnDestroy):**
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({...})
export class HomeComponent implements OnInit, OnDestroy {
  coursesCount = 0;
  
  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.coursesCount = 12; // Simulate data fetch
  }
  
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}
```

**CourseCardComponent (ngOnChanges):**
```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({...})
export class CourseCardComponent implements OnChanges {
  @Input() course: any;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Previous value:', changes['course'].previousValue);
      console.log('Current value:', changes['course'].currentValue);
    }
  }
}
```

**Lifecycle Hook Execution Order:**
1. `ngOnInit()` - After component inputs are set (once)
2. `ngOnChanges()` - When @Input properties change
3. `ngOnDestroy()` - When component is destroyed

---

### Task 3: @Input and @Output — Parent-Child Communication
**Goal:** Pass data down via @Input and emit events up via @Output

**CourseCardComponent:**
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({...})
export class CourseCardComponent {
  @Input() course: { id: number, name: string, code: string, credits: number };
  @Output() enrollRequested = new EventEmitter<number>();
  
  onEnroll(): void {
    this.enrollRequested.emit(this.course.id);
  }
}
```

**CourseCardComponent Template:**
```html
<div class="course-card">
  <h3>{{ course.name }}</h3>
  <p>Code: {{ course.code }}</p>
  <p>Credits: {{ course.credits }}</p>
  <button (click)='onEnroll()'>Enroll</button>
</div>
```

**CourseListComponent:**
```typescript
@Component({...})
export class CourseListComponent {
  courses = [
    { id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3 },
    { id: 2, name: 'Advanced Angular', code: 'ANG201', credits: 4 },
    { id: 3, name: 'RxJS Mastery', code: 'RXJ101', credits: 3 },
    { id: 4, name: 'State Management', code: 'STATE101', credits: 4 },
    { id: 5, name: 'Testing Angular', code: 'TEST101', credits: 3 }
  ];
  
  selectedCourseId: number | null = null;
  
  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
```

**CourseListComponent Template:**
```html
<div class="course-list">
  <app-course-card 
    *ngFor='let c of courses' 
    [course]='c'
    (enrollRequested)='onEnroll($event)'>
  </app-course-card>
  
  <p *ngIf='selectedCourseId'>
    Selected course ID: {{ selectedCourseId }}
  </p>
</div>
```

---

## Components To Create

```
src/app/
├── pages/
│   ├── home/
│   │   ├── home.ts (HomeComponent)
│   │   ├── home.html
│   │   └── home.css
│   └── course-list/
│       ├── course-list.ts (CourseListComponent)
│       ├── course-list.html
│       └── course-list.css
├── components/
│   ├── header/
│   │   ├── header.ts (HeaderComponent)
│   │   ├── header.html
│   │   └── header.css
│   └── course-card/
│       ├── course-card.ts (CourseCardComponent)
│       ├── course-card.html
│       └── course-card.css
├── app.ts (Root Component)
├── app.html (Root Template)
├── app.routes.ts (Route Configuration)
└── app.config.ts
```

## Generation Commands

```bash
# Generate components
ng generate component pages/home --skip-tests
ng generate component pages/course-list --skip-tests
ng generate component components/header --skip-tests
ng generate component components/course-card --skip-tests

# Generate service (optional)
ng generate service services/course

# Build and serve
ng build
ng serve
```

## Testing Checklist

- [ ] String interpolation displays portal name correctly
- [ ] Property binding disables/enables button based on isPortalActive
- [ ] Event binding shows message when button clicked
- [ ] Two-way binding updates search term in real-time
- [ ] ngOnInit logs to console on component load
- [ ] ngOnDestroy logs to console when navigating away
- [ ] ngOnChanges logs previous/current values for @Input changes
- [ ] @Input displays course data in CourseCardComponent
- [ ] @Output emits course ID when enroll button clicked
- [ ] Selected course ID displays below course list

## Key Takeaways

1. **Binding Types:**
   - `{{ }}` - Interpolation
   - `[]` - Property binding (one-way)
   - `()` - Event binding
   - `[()]` - Two-way binding

2. **Lifecycle Hooks:**
   - ngOnInit → Data fetching
   - ngOnChanges → Detect input changes
   - ngOnDestroy → Cleanup (unsubscribe, clear timers)

3. **Component Communication:**
   - @Input → Parent to child (data flow down)
   - @Output → Child to parent (event flow up)
   - EventEmitter<T> → Strongly typed events

## Next Steps
1. Implement all components
2. Test binding types in browser
3. Open browser console to verify lifecycle hooks
4. Verify parent-child communication works
5. Take screenshots of output
6. Push to GitHub

---

**Framework:** Angular 20 (Standalone Components)
**Testing:** Browser console for logs and verification
