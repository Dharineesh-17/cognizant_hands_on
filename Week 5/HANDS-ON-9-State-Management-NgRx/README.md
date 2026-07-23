# HANDS-ON 9: State Management — NgRx Store, Actions, Reducers, Effects & Selectors

## 📚 Topics Covered
- ✓ When to Use NgRx vs Services
- ✓ Actions & Action Creators
- ✓ Reducers & Immutable State
- ✓ Selectors & Memoization
- ✓ NgRx Effects for Async Operations
- ✓ RxJS Observables & Operators in NgRx Context

---

## 🎯 Objective
As Angular applications grow, managing shared state in services becomes hard to maintain and debug. NgRx brings Redux-pattern state management to Angular with powerful developer tooling. You will migrate the course and enrollment state to NgRx.

---

## 📦 Installation

### Install NgRx Packages
```bash
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
```

### Install Redux DevTools Extension
Install the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

---

## 🏗️ Architecture Overview

### NgRx Data Flow
```
Component
    ↓ dispatch(action)
Store
    ↓ action → reducer
Reducer (pure function)
    ↓ new state
Store (immutable state tree)
    ↓ select(selector)
Component (via async pipe)
```

### With Effects (Async Operations)
```
Component
    ↓ dispatch(loadCourses)
Store → Effects
    ↓ HTTP call
    ↓ success/failure
    ↓ dispatch(loadCoursesSuccess)
Store → Reducer
    ↓ new state
Component (via async pipe)
```

---

## 📋 Task 1: Set Up NgRx Store and Define Course State

### Goal
Configure the NgRx store and create actions, reducer, and selectors for courses.

### Steps

#### 1. Configure NgRx in app.config.ts (Standalone Angular)

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(), // Root store
    provideEffects(), // Root effects
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Set to true in production
      autoPause: true, // Pauses recording when extension window is closed
    }),
    // other providers...
  ]
};
```

**Alternative for Module-based Angular:**
```typescript
// app.module.ts
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
  ],
})
export class AppModule {}
```

---

#### 2. Create Course State Structure

Create folder: `src/app/store/course/`

**File: course.actions.ts**
```typescript
// src/app/store/course/course.actions.ts
import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

// Load Courses
export const loadCourses = createAction(
  '[Course] Load Courses'
);

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);

// Add Course
export const addCourse = createAction(
  '[Course] Add Course',
  props<{ course: Omit<Course, 'id'> }>()
);

export const addCourseSuccess = createAction(
  '[Course] Add Course Success',
  props<{ course: Course }>()
);

export const addCourseFailure = createAction(
  '[Course] Add Course Failure',
  props<{ error: string }>()
);

// Update Course
export const updateCourse = createAction(
  '[Course] Update Course',
  props<{ course: Course }>()
);

export const updateCourseSuccess = createAction(
  '[Course] Update Course Success',
  props<{ course: Course }>()
);

// Delete Course
export const deleteCourse = createAction(
  '[Course] Delete Course',
  props<{ id: number }>()
);

export const deleteCourseSuccess = createAction(
  '[Course] Delete Course Success',
  props<{ id: number }>()
);
```

**Why the `[Course]` prefix?**
- Convention that groups actions by feature
- Makes Redux DevTools timeline readable
- Filter by `[Course]` to see only course-related actions

---

**File: course.state.ts**
```typescript
// src/app/store/course/course.state.ts
import { Course } from '../../models/course.model';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null
};
```

---

**File: course.reducer.ts**
```typescript
// src/app/store/course/course.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { CourseState, initialCourseState } from './course.state';
import * as CourseActions from './course.actions';

export const courseReducer = createReducer(
  initialCourseState,

  // Load Courses
  on(CourseActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null
  })),

  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Course
  on(CourseActions.addCourse, (state) => ({
    ...state,
    loading: true
  })),

  on(CourseActions.addCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
    loading: false
  })),

  on(CourseActions.addCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Course
  on(CourseActions.updateCourse, (state) => ({
    ...state,
    loading: true
  })),

  on(CourseActions.updateCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map(c => c.id === course.id ? course : c),
    loading: false
  })),

  // Delete Course
  on(CourseActions.deleteCourse, (state) => ({
    ...state,
    loading: true
  })),

  on(CourseActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter(c => c.id !== id),
    loading: false
  }))
);
```

**Key Principles:**
- ✅ Reducers are **pure functions** (no side effects)
- ✅ State is **immutable** (always return new objects)
- ✅ Use spread operator `...` to create new objects/arrays

---

**File: course.selectors.ts**
```typescript
// src/app/store/course/course.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.state';

// Feature selector
export const selectCourseState = createFeatureSelector<CourseState>('course');

// Memoized selectors
export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state.loading
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state: CourseState) => state.error
);

// Derived selector: filter courses with credits > 0
export const selectActiveCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter(c => c.credits > 0)
);

// Selector with parameter: get course by ID
export const selectCourseById = (id: number) => createSelector(
  selectAllCourses,
  (courses) => courses.find(c => c.id === id)
);
```

**Why Selectors are Important:**
- ✅ **Memoization**: Only recompute when input changes (performance optimization)
- ✅ **Composability**: Build complex selectors from simple ones
- ✅ **Testability**: Easy to unit test selector logic
- ✅ **Separation of concerns**: Components don't know state shape

---

#### 3. Register Feature State

**app.config.ts (Standalone):**
```typescript
import { provideStore, provideState } from '@ngrx/store';
import { courseReducer } from './store/course/course.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState({ name: 'course', reducer: courseReducer }),
    // other providers...
  ]
};
```

**app.module.ts (Module-based):**
```typescript
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './store/course/course.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('course', courseReducer),
  ],
})
export class AppModule {}
```

---

#### 4. Use Store in Components

**course-list.component.ts:**
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import * as CourseActions from '../../store/course/course.actions';
import * as CourseSelectors from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {
  private store = inject(Store);

  // Observables from store
  courses$: Observable<Course[]> = this.store.select(CourseSelectors.selectAllCourses);
  loading$: Observable<boolean> = this.store.select(CourseSelectors.selectCoursesLoading);
  error$: Observable<string | null> = this.store.select(CourseSelectors.selectCoursesError);

  ngOnInit() {
    // Dispatch action to load courses
    this.store.dispatch(CourseActions.loadCourses());
  }

  onAddCourse(course: Omit<Course, 'id'>) {
    this.store.dispatch(CourseActions.addCourse({ course }));
  }

  onUpdateCourse(course: Course) {
    this.store.dispatch(CourseActions.updateCourse({ course }));
  }

  onDeleteCourse(id: number) {
    this.store.dispatch(CourseActions.deleteCourse({ id }));
  }
}
```

**course-list.component.html:**
```html
<div class="course-list">
  <!-- Loading spinner -->
  <div *ngIf="loading$ | async" class="loading">
    Loading courses...
  </div>

  <!-- Error message -->
  <div *ngIf="error$ | async as error" class="error">
    {{ error }}
  </div>

  <!-- Course cards -->
  <div class="courses-grid">
    <app-course-card
      *ngFor="let course of courses$ | async"
      [course]="course"
      (delete)="onDeleteCourse($event)"
      (update)="onUpdateCourse($event)">
    </app-course-card>
  </div>
</div>
```

**Key Points:**
- ✅ Use `async` pipe to subscribe/unsubscribe automatically
- ✅ Dispatch actions for all state changes
- ✅ Never mutate state directly
- ✅ Use selectors to access state

---

### ✅ Expected Outcome

1. **Redux DevTools shows:**
   - `[Course] Load Courses` action dispatched on page load
   - State tree shows `courses`, `loading`, and `error`

2. **Component renders:**
   - Courses display via `async` pipe
   - Loading indicator shows during data fetch
   - Error message displays on failure

---

## 📋 Task 2: NgRx Effects for HTTP and Enrollment State

### Goal
Use NgRx Effects to handle async API calls and add enrollment state to the store.

### Steps

#### 1. Create Course Effects

**File: course.effects.ts**
```typescript
// src/app/store/course/course.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import * as CourseActions from './course.actions';

@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  // Load Courses Effect
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => CourseActions.loadCoursesSuccess({ courses })),
          catchError(error =>
            of(CourseActions.loadCoursesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Add Course Effect
  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.addCourse),
      switchMap(({ course }) =>
        this.courseService.createCourse(course).pipe(
          map(newCourse => CourseActions.addCourseSuccess({ course: newCourse })),
          catchError(error =>
            of(CourseActions.addCourseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Update Course Effect
  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      switchMap(({ course }) =>
        this.courseService.updateCourse(course).pipe(
          map(updatedCourse => CourseActions.updateCourseSuccess({ course: updatedCourse })),
          catchError(error =>
            of(CourseActions.loadCoursesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Delete Course Effect
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      switchMap(({ id }) =>
        this.courseService.deleteCourse(id).pipe(
          map(() => CourseActions.deleteCourseSuccess({ id })),
          catchError(error =>
            of(CourseActions.loadCoursesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
```

**Register Effects in app.config.ts:**
```typescript
import { provideEffects } from '@ngrx/effects';
import { CourseEffects } from './store/course/course.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideEffects([CourseEffects]),
    // other providers...
  ]
};
```

**Module-based:**
```typescript
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course/course.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([CourseEffects]),
  ],
})
export class AppModule {}
```

---

#### 2. Verify Full Flow in Redux DevTools

**Action Flow:**
```
Component: dispatch(loadCourses)
    ↓
Effect: listens for loadCourses
    ↓
Effect: calls courseService.getCourses() (HTTP)
    ↓
Effect: dispatch(loadCoursesSuccess({ courses }))
    ↓
Reducer: updates state with courses
    ↓
Selector: emits new courses array
    ↓
Component: async pipe re-renders
```

**In Redux DevTools:**
1. See `[Course] Load Courses` action
2. See HTTP request in Network tab
3. See `[Course] Load Courses Success` action
4. See state update in State tab

---

#### 3. Create Enrollment State

**File: enrollment.actions.ts**
```typescript
// src/app/store/enrollment/enrollment.actions.ts
import { createAction, props } from '@ngrx/store';

export const enrollInCourse = createAction(
  '[Enrollment] Enroll in Course',
  props<{ courseId: number }>()
);

export const unenrollFromCourse = createAction(
  '[Enrollment] Unenroll from Course',
  props<{ courseId: number }>()
);

export const setEnrolledCourses = createAction(
  '[Enrollment] Set Enrolled Courses',
  props<{ courseIds: number[] }>()
);

export const loadEnrollments = createAction(
  '[Enrollment] Load Enrollments'
);

export const loadEnrollmentsSuccess = createAction(
  '[Enrollment] Load Enrollments Success',
  props<{ courseIds: number[] }>()
);
```

---

**File: enrollment.state.ts**
```typescript
// src/app/store/enrollment/enrollment.state.ts
export interface EnrollmentState {
  enrolledCourseIds: number[];
  loading: boolean;
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledCourseIds: [],
  loading: false
};
```

---

**File: enrollment.reducer.ts**
```typescript
// src/app/store/enrollment/enrollment.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { EnrollmentState, initialEnrollmentState } from './enrollment.state';
import * as EnrollmentActions from './enrollment.actions';

export const enrollmentReducer = createReducer(
  initialEnrollmentState,

  on(EnrollmentActions.enrollInCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: [...state.enrolledCourseIds, courseId]
  })),

  on(EnrollmentActions.unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter(id => id !== courseId)
  })),

  on(EnrollmentActions.setEnrolledCourses, (state, { courseIds }) => ({
    ...state,
    enrolledCourseIds: courseIds
  })),

  on(EnrollmentActions.loadEnrollments, (state) => ({
    ...state,
    loading: true
  })),

  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { courseIds }) => ({
    ...state,
    enrolledCourseIds: courseIds,
    loading: false
  }))
);
```

---

**File: enrollment.selectors.ts**
```typescript
// src/app/store/enrollment/enrollment.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.state';
import { selectAllCourses } from '../course/course.selectors';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state: EnrollmentState) => state.enrolledCourseIds
);

// Cross-slice selector: combine course and enrollment state
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, enrolledIds) => courses.filter(c => enrolledIds.includes(c.id))
);

// Check if specific course is enrolled
export const isEnrolledInCourse = (courseId: number) => createSelector(
  selectEnrolledIds,
  (enrolledIds) => enrolledIds.includes(courseId)
);
```

**Cross-Slice Selectors:**
- ✅ Combine data from multiple state slices
- ✅ Avoid duplicating state
- ✅ Memoized for performance
- ✅ Powerful NgRx pattern

---

#### 4. Use Enrollment State in Components

**course-card.component.ts:**
```typescript
import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import * as EnrollmentSelectors from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
})
export class CourseCardComponent {
  @Input() course!: Course;
  private store = inject(Store);

  enrolledIds$: Observable<number[]> = this.store.select(EnrollmentSelectors.selectEnrolledIds);

  onEnroll() {
    this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId: this.course.id }));
  }

  onUnenroll() {
    this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId: this.course.id }));
  }
}
```

**course-card.component.html:**
```html
<div class="course-card">
  <h3>{{ course.name }}</h3>
  <p>Code: {{ course.code }}</p>
  <p>Credits: {{ course.credits }}</p>

  <!-- Show Enroll/Unenroll based on state -->
  <button
    *ngIf="!(enrolledIds$ | async)?.includes(course.id)"
    (click)="onEnroll()">
    Enroll
  </button>

  <button
    *ngIf="(enrolledIds$ | async)?.includes(course.id)"
    (click)="onUnenroll()"
    class="unenroll">
    Unenroll
  </button>
</div>
```

---

#### 5. Register Enrollment State

**app.config.ts:**
```typescript
import { provideState } from '@ngrx/store';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState({ name: 'course', reducer: courseReducer }),
    provideState({ name: 'enrollment', reducer: enrollmentReducer }),
    // other providers...
  ]
};
```

---

### ✅ Expected Outcome

1. **Redux DevTools shows:**
   - Complete action → effect → success flow
   - `[Enrollment] Enroll in Course` action
   - State update with new `enrolledCourseIds`

2. **Component behavior:**
   - Enroll button shows for non-enrolled courses
   - Unenroll button shows for enrolled courses
   - State updates immediately via `async` pipe

---

## 🔑 Key NgRx Concepts

### When to Use NgRx vs Services

**Use NgRx when:**
- ✅ State is shared across multiple components
- ✅ Need time-travel debugging (Redux DevTools)
- ✅ Complex state interactions
- ✅ Need to track all state changes
- ✅ Team needs consistent state management pattern

**Use Services when:**
- ✅ Simple component-to-component communication
- ✅ One-way data flow
- ✅ No need for debugging/history
- ✅ Small application

---

### Effects Best Practices

**✅ DO:**
- Use Effects for all side effects (HTTP, localStorage, navigation)
- Keep reducers pure (no side effects)
- Use `switchMap` for cancellable requests
- Handle errors with `catchError`

**❌ DON'T:**
- Put HTTP calls in reducers
- Dispatch actions from reducers
- Mutate state in reducers
- Use `tap` for state changes

---

### Selector Memoization

```typescript
// This selector only recomputes when courses array changes
export const selectActiveCourses = createSelector(
  selectAllCourses,
  (courses) => {
    console.log('Filtering courses'); // Logs only when courses change
    return courses.filter(c => c.credits > 0);
  }
);
```

**Benefits:**
- ✅ Performance optimization
- ✅ Prevents unnecessary re-renders
- ✅ Composable selector architecture

---

## 🧪 Testing NgRx

### Testing Reducers
```typescript
import { courseReducer } from './course.reducer';
import * as CourseActions from './course.actions';
import { initialCourseState } from './course.state';

describe('Course Reducer', () => {
  it('should set loading to true on loadCourses', () => {
    const action = CourseActions.loadCourses();
    const state = courseReducer(initialCourseState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should add courses on loadCoursesSuccess', () => {
    const courses = [{ id: 1, name: 'Angular', code: 'ANG101', credits: 3 }];
    const action = CourseActions.loadCoursesSuccess({ courses });
    const state = courseReducer(initialCourseState, action);
    
    expect(state.courses).toEqual(courses);
    expect(state.loading).toBe(false);
  });
});
```

### Testing Selectors
```typescript
import * as CourseSelectors from './course.selectors';

describe('Course Selectors', () => {
  const state = {
    course: {
      courses: [
        { id: 1, name: 'Angular', credits: 3 },
        { id: 2, name: 'React', credits: 0 }
      ],
      loading: false,
      error: null
    }
  };

  it('should select all courses', () => {
    const result = CourseSelectors.selectAllCourses(state);
    expect(result.length).toBe(2);
  });

  it('should select active courses only', () => {
    const result = CourseSelectors.selectActiveCourses(state);
    expect(result.length).toBe(1);
    expect(result[0].credits).toBeGreaterThan(0);
  });
});
```

---

## 📸 Screenshots Required

Take 10 screenshots demonstrating:

1. **Redux DevTools State Tree** - Show course and enrollment state
2. **Action Timeline** - Show `[Course] Load Courses` → `[Course] Load Courses Success`
3. **State Inspector** - Show state before and after action
4. **Effect Flow** - Show action → effect → HTTP → success action
5. **Component with Async Pipe** - Show courses rendering from store
6. **Enrollment State** - Show enrolledCourseIds array
7. **Cross-Slice Selector** - Show enrolled courses derived from both slices
8. **Loading State** - Show loading indicator from store
9. **Error Handling** - Show error message from store
10. **Enroll/Unenroll Buttons** - Show dynamic button based on enrollment state

---

## 🎓 Learning Outcomes

After completing this hands-on, you will be able to:
- ✅ Set up NgRx Store with Actions, Reducers, Selectors
- ✅ Use NgRx Effects for async operations
- ✅ Implement immutable state updates
- ✅ Create memoized selectors for performance
- ✅ Build cross-slice selectors
- ✅ Debug with Redux DevTools
- ✅ Understand NgRx vs Services trade-offs

---

## 📚 Additional Resources

- [NgRx Official Documentation](https://ngrx.io/)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
- [NgRx Best Practices](https://ngrx.io/guide/eslint-plugin)
- [RxJS in NgRx Effects](https://ngrx.io/guide/effects)

---

**Digital Nurture 5.0 | Week 5 | Angular (v20.0)**
