# HANDS-ON 6: Services & Dependency Injection

**Digital Nurture 5.0 | Angular (v20.0) | Intermediate Level**

## Topics Covered

✓ Creating and Providing Services  
✓ providedIn: 'root' vs Component-level Providers  
✓ Injecting Services into Components  
✓ Service as a Shared Data Store  
✓ Hierarchical Dependency Injection  
✓ Singleton Service Pattern  

## Overview

**Services centralize shared logic and data** that doesn't belong in a single component. This hands-on demonstrates how to create Angular services for the Student Course Portal, understand the DI hierarchy, and use services as shared state stores between components.

## Key Concepts

### What are Services?
- **Reusable business logic** separated from UI components
- **Shared data** accessible across multiple components
- **Singleton pattern** for application-wide state management
- **Testable** units independent of components

### Dependency Injection (DI)
Angular's DI system provides dependencies to classes that need them, promoting:
- **Loose coupling** between components and services
- **Easy testing** through dependency mocking
- **Reusability** of service logic
- **Centralized state** management

## Project Structure

```
HANDS-ON-6-Services-Dependency-Injection/
├── Output/                              # Screenshots
├── student-course-portal-6/
│   └── src/app/
│       ├── models/
│       │   └── course.model.ts          # Course interface
│       ├── services/
│       │   ├── course.service.ts        # Root-level singleton service
│       │   ├── enrollment.service.ts    # Service-to-service injection
│       │   └── notification.service.ts  # Component-level provider demo
│       ├── components/
│       │   ├── course-summary-widget/   # Demonstrates shared service instance
│       │   ├── student-profile/         # Shows enrolled courses
│       │   └── notification/            # Component-level provider example
│       └── pages/
│           ├── course-list/             # Updated to use CourseService
│           └── home/                    # Updated to show live course count
└── README.md
```

## Task 1: Create and Use a Course Service

### CourseService Implementation

**Location:** `src/app/services/course.service.ts`

```typescript
@Injectable({
  providedIn: 'root'  // Makes it a SINGLETON
})
export class CourseService {
  private courses: Course[] = [/* 5 courses */];
  
  getCourses(): Course[] { return this.courses; }
  getCourseById(id: number): Course | undefined { /* ... */ }
  addCourse(course: Course): void { /* ... */ }
  getCourseCount(): number { return this.courses.length; }
}
```

### Course Model

**Location:** `src/app/models/course.model.ts`

```typescript
export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
}
```

**Why Use Interfaces?**
- ✅ Compile-time type checking
- ✅ IntelliSense support
- ✅ Prevents runtime errors
- ✅ Self-documenting code
- ✅ Refactoring safety

### Injecting CourseService

**In CourseListComponent:**
```typescript
constructor(private courseService: CourseService) {}

ngOnInit(): void {
  this.courses = this.courseService.getCourses();
}
```

**In HomeComponent:**
```typescript
constructor(private courseService: CourseService) {}

ngOnInit(): void {
  this.courseCount = this.courseService.getCourseCount();
}
```

### Singleton Pattern Verification

**CourseSummaryWidget** also injects `CourseService`:
```typescript
addSampleCourse(): void {
  this.courseService.addCourse(newCourse);
  // All components see the update - same instance!
}
```

**Test:**
1. Add a course in CourseSummaryWidget
2. Check CourseList → new course appears
3. Check Home → count updates
4. **Conclusion:** All components share the SAME service instance

### providedIn: 'root' Explained

```typescript
@Injectable({
  providedIn: 'root'  // <-- Singleton for entire app
})
```

**What this means:**
- ONE instance created when app starts
- Shared across ALL components
- Lives until app is destroyed
- Registered in root injector
- Lazy-loaded if not used

**Alternative (NOT recommended):**
```typescript
// Old way - had to add to providers array in module
providers: [CourseService]  // Don't do this anymore
```

## Task 2: Enrollment Service and Hierarchical DI

### EnrollmentService Implementation

**Location:** `src/app/services/enrollment.service.ts`

```typescript
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  // SERVICE-TO-SERVICE INJECTION
  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void { /* ... */ }
  unenroll(courseId: number): void { /* ... */ }
  isEnrolled(courseId: number): boolean { /* ... */ }
  
  // Uses CourseService to resolve IDs to Course objects
  getEnrolledCourses(): Course[] {
    return this.enrolledCourseIds
      .map(id => this.courseService.getCourseById(id))
      .filter((course): course is Course => course !== undefined);
  }
}
```

### Service-to-Service Injection

**EnrollmentService** injects **CourseService**:
```typescript
constructor(private courseService: CourseService) {}
```

**Benefits:**
- ✅ Layered architecture (like backend services)
- ✅ Single Responsibility Principle
- ✅ Enrollment logic separate from course data
- ✅ Easy to test each service independently

### Enrollment Toggle in CourseCard

```typescript
toggleEnrollment(): void {
  if (this.enrollmentService.isEnrolled(this.course.id)) {
    this.enrollmentService.unenroll(this.course.id);
  } else {
    this.enrollmentService.enroll(this.course.id);
  }
}
```

**Button label:**
```html
<button>
  {{ enrollmentService.isEnrolled(course.id) ? 'Unenroll' : 'Enroll' }}
</button>
```

### Student Profile Component

**Shows enrolled courses:**
```typescript
constructor(private enrollmentService: EnrollmentService) {}

ngOnInit(): void {
  this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
}
```

### Component-Level Provider

**NotificationComponent:**
```typescript
@Component({
  selector: 'app-notification',
  providers: [NotificationService]  // Component-level provider
})
export class NotificationComponent {
  constructor(private notificationService: NotificationService) {}
}
```

**WHY COMPONENT-LEVEL CREATES NEW INSTANCE:**

When you add `providers: [NotificationService]` to `@Component`:
- Angular creates a **NEW instance** for this component
- This instance is **scoped** to the component and its children
- Different from `providedIn: 'root'` which creates **ONE singleton**

**Use Cases:**
- ✅ Isolated state per component instance
- ✅ Form wizard with multiple steps
- ✅ Different configuration per component
- ✅ Easier testing with mocked services

## Hierarchical Dependency Injection

### DI Tree Structure

```
Root Injector (App)
├── providedIn: 'root' services (Singleton)
│   ├── CourseService
│   └── EnrollmentService
│
└── Component Injectors
    ├── HomeComponent
    │   └── Uses root CourseService
    ├── CourseListComponent
    │   └── Uses root CourseService
    └── NotificationComponent
        └── providers: [NotificationService]  ← New instance!
```

### How Angular Resolves Dependencies

1. **Request:** Component asks for a service
2. **Check local:** Look in component's injector
3. **Go up:** If not found, check parent injector
4. **Continue:** Keep going up to root
5. **Found:** Use the first match found
6. **Not found:** Error

### Provider Levels

| Level | Syntax | Scope | Use Case |
|-------|--------|-------|----------|
| **Root** | `providedIn: 'root'` | Entire app | Shared data, singletons |
| **Component** | `providers: [Service]` | Component + children | Isolated state |
| **Module** | `providers: [Service]` in module | Module scope | Feature modules |

## Features Implemented

### ✅ Services:
- [x] CourseService with CRUD operations
- [x] EnrollmentService with enroll/unenroll
- [x] NotificationService for component-level demo
- [x] All services fully typed with interfaces
- [x] Service-to-service injection demonstrated

### ✅ Components Using Services:
- [x] CourseListComponent → CourseService
- [x] HomeComponent → CourseService (live count)
- [x] CourseSummaryWidget → CourseService (shared instance)
- [x] CourseCard → EnrollmentService (toggle enroll)
- [x] StudentProfile → EnrollmentService (enrolled list)
- [x] NotificationComponent → NotificationService (component-level)

### ✅ Dependency Injection:
- [x] Root-level singleton services
- [x] Component-level providers
- [x] Service-to-service injection
- [x] Hierarchical DI demonstrated
- [x] Shared state verification

## Running the Application

```bash
cd student-course-portal-6
npm install
npm start
```

**Navigate to:** http://localhost:4200/

## Testing the Application

### Test Case 1: Singleton Service (Shared Instance)
1. Go to Home page → Note course count
2. Go to Courses page → Click "+ Add Sample Course" in widget
3. Go back to Home → **Count increased** ✓
4. Refresh Courses page → **New course appears** ✓
5. **Conclusion:** All components share same CourseService instance

### Test Case 2: Enrollment Flow
1. Go to Courses page
2. Click "Enroll" on any course → Button changes to "Unenroll" ✓
3. Go to Profile page → **Enrolled course appears** ✓
4. Go back to Courses → Click "Unenroll" ✓
5. Go to Profile → **Course removed** ✓

### Test Case 3: Service-to-Service Injection
1. Open browser console
2. Look for: `EnrollmentService instance created`
3. Enroll in a course
4. **EnrollmentService uses CourseService** internally ✓
5. Profile shows full course details (not just IDs) ✓

### Test Case 4: Component-Level Provider
1. Open Notification component
2. Check console: `NotificationService instance created`
3. Click "Add Notification" multiple times
4. Count increases in this component only
5. **Each NotificationComponent gets its own instance** ✓

## Console Verification

Expected console output when app loads:
```
CourseService instance created
EnrollmentService instance created
NotificationService instance created  (per NotificationComponent)
```

## Key Patterns Demonstrated

### 1. Singleton Pattern
```typescript
@Injectable({ providedIn: 'root' })
export class CourseService { }
```
- One instance for entire app
- Shared state across components

### 2. Service as Data Store
```typescript
private courses: Course[] = [/* data */];
getCourses(): Course[] { return this.courses; }
```
- Service holds the data
- Components don't duplicate data
- Single source of truth

### 3. Service-to-Service Injection
```typescript
export class EnrollmentService {
  constructor(private courseService: CourseService) {}
}
```
- Services can depend on other services
- Layered architecture
- Separation of concerns

### 4. Component-Level Isolation
```typescript
@Component({
  providers: [NotificationService]  // New instance
})
```
- Isolated state per component
- Useful for form wizards, dialogs
- Easier testing

## providedIn: 'root' vs Component Providers

| Feature | providedIn: 'root' | providers: [Service] |
|---------|-------------------|---------------------|
| **Scope** | Entire app | Component + children |
| **Instances** | One singleton | New per component |
| **When created** | First injection | Component creation |
| **Memory** | Lives until app ends | Destroyed with component |
| **Shared state** | Yes | No (isolated) |
| **Use for** | App-wide data | Isolated component state |

## Best Practices

### ✅ DO:
- Use `providedIn: 'root'` for app-wide services
- Define TypeScript interfaces for models
- Inject services via constructor
- Use services for shared logic and data
- Create service-to-service dependencies
- Use component-level providers for isolated state

### ❌ DON'T:
- Put business logic in components
- Duplicate data across components
- Use services for UI logic
- Provide services in both root and component (unless intended)
- Forget to inject dependencies in constructor
- Make services stateful if not needed

## Advanced Concepts

### 1. Optional Dependencies
```typescript
constructor(@Optional() private service: OptionalService) {
  if (service) {
    // Service is available
  }
}
```

### 2. Injection Tokens
```typescript
export const API_URL = new InjectionToken<string>('api.url');

providers: [
  { provide: API_URL, useValue: 'https://api.example.com' }
]
```

### 3. Factory Providers
```typescript
export function courseServiceFactory() {
  return new CourseService();
}

providers: [
  { provide: CourseService, useFactory: courseServiceFactory }
]
```

### 4. Multi Providers
```typescript
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
```

## Testing Services

### Unit Testing CourseService
```typescript
describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should return all courses', () => {
    const courses = service.getCourses();
    expect(courses.length).toBe(5);
  });

  it('should add a course', () => {
    const newCourse: Course = { /* ... */ };
    service.addCourse(newCourse);
    expect(service.getCourseCount()).toBe(6);
  });
});
```

### Testing with Service Dependencies
```typescript
describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let courseService: jasmine.SpyObj<CourseService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CourseService', ['getCourseById']);
    
    TestBed.configureTestingModule({
      providers: [
        EnrollmentService,
        { provide: CourseService, useValue: spy }
      ]
    });
    
    service = TestBed.inject(EnrollmentService);
    courseService = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
  });
});
```

## Troubleshooting

### Service not found error
```
NullInjectorError: No provider for CourseService!
```
**Solution:** Add `providedIn: 'root'` or provide in module

### Multiple instances created
**Check:** Are you providing at both root and component level?
**Solution:** Choose one location based on your needs

### Service state not persisting
**Check:** Is service provided at correct level?
**Solution:** Use `providedIn: 'root'` for shared state

## Technologies Used

- **Angular**: v21.2.0
- **TypeScript**: v5.9.2
- **RxJS**: v7.8.0

## Learning Outcomes

After completing this hands-on exercise, you should be able to:

✅ Create services with `@Injectable` decorator  
✅ Understand providedIn: 'root' vs component-level providers  
✅ Inject services into components via constructor  
✅ Use services as shared data stores  
✅ Implement service-to-service injection  
✅ Understand hierarchical dependency injection  
✅ Apply singleton pattern in Angular  
✅ Create typed models with TypeScript interfaces  
✅ Test services with dependency injection  
✅ Choose appropriate provider scope  

## Next Steps

Consider enhancing with:
- HTTP service for API calls
- State management with BehaviorSubject
- Error handling service
- Logging service
- Authentication service
- Caching strategies
- Service worker integration

---

**Completed**: July 23, 2026  
**Digital Nurture 5.0 Program**  
**Angular Version**: 21.2.0
