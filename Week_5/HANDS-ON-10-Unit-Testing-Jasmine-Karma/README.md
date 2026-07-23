# HANDS-ON 10: Unit Testing Angular Applications — Jasmine, Karma & TestBed

## 📚 Topics Covered
- ✓ Jasmine Syntax — describe, it, expect, spyOn
- ✓ TestBed for Angular Testing
- ✓ Component Testing — fixture, debugElement
- ✓ Testing @Input and @Output
- ✓ Service Testing with HttpClientTestingModule
- ✓ Component + Store Testing with MockStore

---

## 🎯 Objective
Every spec.ts file Angular generated has been waiting — now you will actually write tests. This hands-on covers unit testing Angular components and services using Jasmine, Karma, and Angular's TestBed utilities.

---

## 🚀 Running Tests

### Run All Tests
```bash
ng test
```
Runs all `*.spec.ts` files in watch mode using Karma.
Press `Ctrl+C` to stop.

### Generate Coverage Report
```bash
ng test --code-coverage
```
Generates a coverage report in the `coverage/` folder.

Open `coverage/index.html` in a browser to view detailed coverage.

---

## 📋 Task 1: Testing a Component — CourseCardComponent

### Goal
Write unit tests for `CourseCardComponent` covering rendering, inputs, and output events.

### Steps

#### 1. Configure TestBed

**File: course-card.component.spec.ts**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCardComponent } from './course-card.component';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange } from '@angular/core';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let compiled: HTMLElement;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCardComponent]  // Or imports for standalone
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => {
    fixture.destroy();
  });
});
```

**For Standalone Components:**
```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [CourseCardComponent]  // Standalone component
  }).compileComponents();
});
```

---

#### 2. Test Component Creation

```typescript
it('should create', () => {
  expect(component).toBeTruthy();
});
```

**Why this test matters:**
- Verifies TestBed configuration is correct
- Ensures component can be instantiated
- Basic smoke test

---

#### 3. Test @Input Rendering

```typescript
it('should display course name from @Input', () => {
  // Arrange: Set input property
  component.course = mockCourse;
  
  // Act: Trigger change detection
  fixture.detectChanges();
  
  // Assert: Check DOM rendering
  const courseNameElement = fixture.debugElement.query(By.css('h3'));
  expect(courseNameElement.nativeElement.textContent).toContain('Data Structures');
});

it('should display course code and credits', () => {
  component.course = mockCourse;
  fixture.detectChanges();
  
  const codeElement = fixture.debugElement.query(By.css('.course-code'));
  const creditsElement = fixture.debugElement.query(By.css('.course-credits'));
  
  expect(codeElement.nativeElement.textContent).toContain('CS101');
  expect(creditsElement.nativeElement.textContent).toContain('4');
});

it('should display grade status', () => {
  component.course = mockCourse;
  fixture.detectChanges();
  
  const statusElement = fixture.debugElement.query(By.css('.grade-status'));
  expect(statusElement.nativeElement.textContent).toContain('passed');
});
```

**Key Concept:**
- `fixture.detectChanges()` triggers Angular's change detection
- Always call after changing component properties
- Use `By.css()` to query the DOM (Angular-aware)

---

#### 4. Test @Output Event

```typescript
it('should emit enrollRequested event when enroll button is clicked', () => {
  // Arrange: Set up component
  component.course = mockCourse;
  fixture.detectChanges();
  
  // Spy on the output event
  spyOn(component.enrollRequested, 'emit');
  
  // Act: Click the button
  const enrollButton = fixture.debugElement.query(By.css('.enroll-button'));
  enrollButton.nativeElement.click();
  fixture.detectChanges();
  
  // Assert: Check event was emitted with correct data
  expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
});

it('should emit deleteRequested event when delete button is clicked', () => {
  component.course = mockCourse;
  fixture.detectChanges();
  
  spyOn(component.deleteRequested, 'emit');
  
  const deleteButton = fixture.debugElement.query(By.css('.delete-button'));
  deleteButton.nativeElement.click();
  
  expect(component.deleteRequested.emit).toHaveBeenCalledWith(1);
});
```

**Testing EventEmitters:**
- Use `spyOn()` to spy on the `emit` method
- Simulate user interaction (button click)
- Assert the emitter was called with expected arguments

---

#### 5. Test ngOnChanges Lifecycle Hook

```typescript
it('should log course name change in ngOnChanges', () => {
  // Spy on console.log
  spyOn(console, 'log');
  
  // Create SimpleChanges object
  const changes = {
    course: new SimpleChange(null, mockCourse, true)
  };
  
  // Call ngOnChanges
  component.ngOnChanges(changes);
  
  // Assert console.log was called
  expect(console.log).toHaveBeenCalledWith(
    'Course changed:',
    mockCourse.name
  );
});

it('should handle course update in ngOnChanges', () => {
  const oldCourse = { ...mockCourse };
  const newCourse = { ...mockCourse, name: 'Advanced Data Structures' };
  
  component.course = oldCourse;
  fixture.detectChanges();
  
  const changes = {
    course: new SimpleChange(oldCourse, newCourse, false)
  };
  
  component.ngOnChanges(changes);
  
  expect(component.course.name).toBe('Advanced Data Structures');
});
```

---

### ✅ Expected Outcome

**Terminal Output:**
```
CourseCardComponent
  ✓ should create
  ✓ should display course name from @Input
  ✓ should display course code and credits
  ✓ should display grade status
  ✓ should emit enrollRequested event when enroll button is clicked
  ✓ should emit deleteRequested event when delete button is clicked
  ✓ should log course name change in ngOnChanges
  ✓ should handle course update in ngOnChanges

8 specs, 0 failures
```

**Coverage Report:**
- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

---

## 📋 Task 2: Testing a Service and NgRx-Connected Component

### Goal
Test `CourseService` with `HttpClientTestingModule` and test an NgRx store-connected component.

### Steps

#### 1. Configure Service Test with HttpClientTestingModule

**File: course.service.spec.ts**

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'TypeScript', code: 'TS101', credits: 2, gradeStatus: 'in-progress' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no unexpected HTTP requests were made
    httpMock.verify();
  });
});
```

**Key Points:**
- `HttpClientTestingModule` provides mock HTTP backend
- `HttpTestingController` lets you control HTTP requests
- Always call `httpMock.verify()` in `afterEach`

---

#### 2. Test getCourses() HTTP Call

```typescript
it('should retrieve all courses via GET', () => {
  // Act: Call service method
  service.getCourses().subscribe(courses => {
    // Assert: Check response
    expect(courses.length).toBe(2);
    expect(courses).toEqual(mockCourses);
  });

  // Assert: Check HTTP request
  const req = httpMock.expectOne('http://localhost:3000/courses');
  expect(req.request.method).toBe('GET');

  // Simulate server response
  req.flush(mockCourses);
});

it('should retrieve a single course by id', () => {
  const courseId = 1;
  const mockCourse = mockCourses[0];

  service.getCourseById(courseId).subscribe(course => {
    expect(course).toEqual(mockCourse);
  });

  const req = httpMock.expectOne(`http://localhost:3000/courses/${courseId}`);
  expect(req.request.method).toBe('GET');
  req.flush(mockCourse);
});
```

**HTTP Testing Pattern:**
1. Call service method and subscribe
2. Assert expected HTTP request was made
3. Simulate server response with `flush()`
4. Verify no unexpected requests with `httpMock.verify()`

---

#### 3. Test Error Handling

```typescript
it('should handle 500 error when fetching courses', () => {
  const errorMessage = 'Server error';

  service.getCourses().subscribe({
    next: () => fail('should have failed with 500 error'),
    error: (error) => {
      expect(error.message).toContain('Failed to load courses');
    }
  });

  const req = httpMock.expectOne('http://localhost:3000/courses');
  
  // Simulate 500 error
  req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
});

it('should handle network error', () => {
  service.getCourses().subscribe({
    next: () => fail('should have failed with network error'),
    error: (error) => {
      expect(error.message).toContain('Network error');
    }
  });

  const req = httpMock.expectOne('http://localhost:3000/courses');
  
  // Simulate network error
  req.error(new ProgressEvent('error'), { 
    status: 0, 
    statusText: 'Network Error' 
  });
});
```

---

#### 4. Test POST, PUT, DELETE

```typescript
it('should create a new course via POST', () => {
  const newCourse: Omit<Course, 'id'> = {
    name: 'RxJS',
    code: 'RX201',
    credits: 3,
    gradeStatus: 'pending'
  };
  const createdCourse = { id: 3, ...newCourse };

  service.createCourse(newCourse).subscribe(course => {
    expect(course).toEqual(createdCourse);
  });

  const req = httpMock.expectOne('http://localhost:3000/courses');
  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(newCourse);
  req.flush(createdCourse);
});

it('should update a course via PUT', () => {
  const updatedCourse: Course = {
    id: 1,
    name: 'Angular Advanced',
    code: 'ANG201',
    credits: 4,
    gradeStatus: 'completed'
  };

  service.updateCourse(updatedCourse).subscribe(course => {
    expect(course).toEqual(updatedCourse);
  });

  const req = httpMock.expectOne(`http://localhost:3000/courses/${updatedCourse.id}`);
  expect(req.request.method).toBe('PUT');
  req.flush(updatedCourse);
});

it('should delete a course via DELETE', () => {
  const courseId = 1;

  service.deleteCourse(courseId).subscribe(() => {
    expect(true).toBe(true); // Success
  });

  const req = httpMock.expectOne(`http://localhost:3000/courses/${courseId}`);
  expect(req.request.method).toBe('DELETE');
  req.flush({});
});
```

---

### Testing NgRx-Connected Components

#### 5. Test Component with MockStore

**File: course-list.component.spec.ts**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseListComponent } from './course-list.component';
import { Course } from '../../models/course.model';
import * as CourseSelectors from '../../store/course/course.selectors';
import { By } from '@angular/platform-browser';

describe('CourseListComponent (with NgRx)', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'TypeScript', code: 'TS101', credits: 2, gradeStatus: 'pending' }
  ];

  const initialState = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    store.resetSelectors();
  });
});
```

---

#### 6. Test Initial State Rendering

```typescript
it('should display courses from store', () => {
  fixture.detectChanges();

  const courseCards = fixture.debugElement.queryAll(By.css('.course-card'));
  expect(courseCards.length).toBe(2);
  
  const firstCard = courseCards[0].nativeElement;
  expect(firstCard.textContent).toContain('Angular');
});

it('should display course count', () => {
  fixture.detectChanges();

  const countElement = fixture.debugElement.query(By.css('.course-count'));
  expect(countElement.nativeElement.textContent).toContain('2 courses');
});
```

---

#### 7. Test Loading State

```typescript
it('should display loading indicator when loading is true', () => {
  // Update store state to loading
  store.setState({
    course: {
      courses: [],
      loading: true,
      error: null
    }
  });

  fixture.detectChanges();

  const loadingElement = fixture.debugElement.query(By.css('.loading-spinner'));
  expect(loadingElement).toBeTruthy();
  
  const courseCards = fixture.debugElement.queryAll(By.css('.course-card'));
  expect(courseCards.length).toBe(0);
});

it('should hide course list when loading', () => {
  store.setState({
    course: {
      courses: mockCourses,
      loading: true,
      error: null
    }
  });

  fixture.detectChanges();

  const courseList = fixture.debugElement.query(By.css('.courses-grid'));
  expect(courseList).toBeFalsy();
});
```

---

#### 8. Test Error State

```typescript
it('should display error message when error exists', () => {
  store.setState({
    course: {
      courses: [],
      loading: false,
      error: 'Failed to load courses'
    }
  });

  fixture.detectChanges();

  const errorElement = fixture.debugElement.query(By.css('.error-message'));
  expect(errorElement).toBeTruthy();
  expect(errorElement.nativeElement.textContent).toContain('Failed to load courses');
});
```

---

#### 9. Test Action Dispatching

```typescript
it('should dispatch loadCourses action on init', () => {
  spyOn(store, 'dispatch');

  component.ngOnInit();

  expect(store.dispatch).toHaveBeenCalledWith(
    jasmine.objectContaining({ type: '[Course] Load Courses' })
  );
});

it('should dispatch deleteCourse action when delete is clicked', () => {
  fixture.detectChanges();
  spyOn(store, 'dispatch');

  component.onDeleteCourse(1);

  expect(store.dispatch).toHaveBeenCalledWith(
    jasmine.objectContaining({ 
      type: '[Course] Delete Course',
      id: 1
    })
  );
});
```

---

### ✅ Expected Outcome

**Terminal Output:**
```
CourseService
  ✓ should retrieve all courses via GET
  ✓ should retrieve a single course by id
  ✓ should handle 500 error when fetching courses
  ✓ should handle network error
  ✓ should create a new course via POST
  ✓ should update a course via PUT
  ✓ should delete a course via DELETE

CourseListComponent (with NgRx)
  ✓ should display courses from store
  ✓ should display course count
  ✓ should display loading indicator when loading is true
  ✓ should hide course list when loading
  ✓ should display error message when error exists
  ✓ should dispatch loadCourses action on init
  ✓ should dispatch deleteCourse action when delete is clicked

14 specs, 0 failures
```

**Coverage Report:**
```
File                    | % Stmts | % Branch | % Funcs | % Lines
------------------------|---------|----------|---------|--------
course.service.ts       |   100   |   100    |   100   |   100
course-card.component.ts|   100   |   100    |   100   |   100
course-list.component.ts|    95   |    90    |   100   |    95
```

---

## 🔑 Key Testing Concepts

### Jasmine Syntax

```typescript
describe('Test Suite Name', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should do something', () => {
    // Arrange
    const value = 42;

    // Act
    const result = value * 2;

    // Assert
    expect(result).toBe(84);
  });
});
```

### Common Matchers

```typescript
// Equality
expect(value).toBe(42);           // Strict equality (===)
expect(value).toEqual(obj);       // Deep equality
expect(value).not.toBe(null);     // Negation

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeDefined();
expect(value).toBeUndefined();
expect(value).toBeNull();

// Comparisons
expect(value).toBeGreaterThan(10);
expect(value).toBeLessThan(100);

// Strings
expect(str).toContain('substring');
expect(str).toMatch(/pattern/);

// Arrays
expect(arr).toContain(item);
expect(arr.length).toBe(5);

// Functions
expect(fn).toThrow();
expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledWith(arg1, arg2);
expect(fn).toHaveBeenCalledTimes(2);
```

### Spies

```typescript
// Create spy on method
spyOn(service, 'getData').and.returnValue(of(mockData));

// Spy on EventEmitter
spyOn(component.eventEmitter, 'emit');

// Check if called
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith(expectedArg);
expect(spy).toHaveBeenCalledTimes(1);

// Spy on console
spyOn(console, 'log');
spyOn(console, 'error');
```

---

## 📸 Screenshots Required

Take screenshots demonstrating:

1. **Karma Test Runner** - All tests passing
2. **Component Tests** - CourseCardComponent specs passing
3. **Service Tests** - CourseService HTTP tests passing
4. **MockStore Tests** - NgRx component tests passing
5. **Coverage Report** - 100% coverage summary
6. **Detailed Coverage** - Line-by-line coverage view
7. **Test Output** - Console showing test execution
8. **Failed Test** - Example of test failure (optional)
9. **Watch Mode** - Karma running in watch mode
10. **Coverage HTML** - coverage/index.html opened in browser

---

## 🎓 Learning Outcomes

After completing this hands-on, you will be able to:
- ✅ Write unit tests with Jasmine (describe, it, expect)
- ✅ Configure TestBed for Angular component testing
- ✅ Test component @Input and @Output
- ✅ Test services with HttpClientTestingModule
- ✅ Test NgRx-connected components with MockStore
- ✅ Use spies to mock dependencies
- ✅ Generate and interpret code coverage reports
- ✅ Follow TDD best practices

---

## 📚 Additional Resources

- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)
- [NgRx Testing](https://ngrx.io/guide/store/testing)

---

**Digital Nurture 5.0 | Week 5 | Angular (v20.0)**
