# HANDS-ON 8: HTTP Client — API Integration, Observables & Interceptors

## 📚 Topics Covered
- ✓ Setting Up HttpClientModule
- ✓ GET, POST, PUT, DELETE with HttpClient
- ✓ Observables vs Promises
- ✓ RxJS Operators — map, catchError, tap, switchMap
- ✓ HTTP Interceptors
- ✓ Error Handling & Retry Strategies

---

## 🎯 Objective
Real Angular applications communicate with backend APIs. In this hands-on, you will replace all hardcoded service data with live HTTP calls, handle errors gracefully, and add interceptors for cross-cutting concerns like auth tokens and logging.

---

## 🚀 Setup Instructions

### Install JSON Server
To mock the backend API:

```bash
npm install -g json-server
```

### Start JSON Server
```bash
json-server --watch db.json --port 3000
```

This will create a REST API with the following endpoints:
- `http://localhost:3000/courses`
- `http://localhost:3000/students`
- `http://localhost:3000/enrollments`

---

## 📋 Task 1: Replace Service Data with HttpClient Calls

### Goal
Refactor `CourseService` and `EnrollmentService` to use real HTTP calls.

### Steps

1. **Import HttpClientModule**
   - In `app.config.ts` (for standalone Angular):
     ```typescript
     import { provideHttpClient } from '@angular/common/http';
     
     export const appConfig: ApplicationConfig = {
       providers: [
         provideHttpClient(),
         // other providers...
       ]
     };
     ```

2. **Inject HttpClient into CourseService**
   ```typescript
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';
   
   constructor(private http: HttpClient) {}
   ```

3. **Replace hardcoded courses array with HTTP GET**
   ```typescript
   getCourses(): Observable<Course[]> {
     return this.http.get<Course[]>('http://localhost:3000/courses');
   }
   
   getCourseById(id: number): Observable<Course> {
     return this.http.get<Course>(`http://localhost:3000/courses/${id}`);
   }
   ```

4. **Update CourseListComponent to subscribe**
   ```typescript
   ngOnInit() {
     this.courseService.getCourses().subscribe({
       next: courses => this.courses = courses,
       error: err => this.errorMessage = err.message,
       complete: () => this.isLoading = false
     });
   }
   ```

5. **Add POST method to create courses**
   ```typescript
   createCourse(course: Omit<Course, 'id'>): Observable<Course> {
     return this.http.post<Course>('http://localhost:3000/courses', course);
   }
   ```

6. **Add PUT and DELETE methods**
   ```typescript
   updateCourse(course: Course): Observable<Course> {
     return this.http.put<Course>(
       `http://localhost:3000/courses/${course.id}`,
       course
     );
   }
   
   deleteCourse(id: number): Observable<void> {
     return this.http.delete<void>(`http://localhost:3000/courses/${id}`);
   }
   ```

### ✅ Expected Outcome
- Course list loads from JSON Server
- Adding a course via POST persists it to `db.json`
- DELETE removes it
- All operations reflected in the UI

---

## 📋 Task 2: RxJS Operators and Error Handling

### Goal
Apply RxJS operators to transform and handle HTTP responses robustly.

### Steps

1. **Use `map` operator to transform data**
   ```typescript
   import { map } from 'rxjs/operators';
   
   getCourses(): Observable<Course[]> {
     return this.http.get<Course[]>('http://localhost:3000/courses').pipe(
       map(courses => courses.filter(c => c.credits > 0))
     );
   }
   ```

2. **Add error handling with `catchError`**
   ```typescript
   import { catchError, throwError } from 'rxjs';
   
   getCourses(): Observable<Course[]> {
     return this.http.get<Course[]>('http://localhost:3000/courses').pipe(
       catchError(err => {
         console.error('Error loading courses:', err);
         return throwError(() => 
           new Error('Failed to load courses. Please try again.')
         );
       })
     );
   }
   ```

3. **Add `tap` operator for logging (side effects)**
   ```typescript
   import { tap } from 'rxjs/operators';
   
   getCourses(): Observable<Course[]> {
     return this.http.get<Course[]>('http://localhost:3000/courses').pipe(
       tap(courses => console.log('Courses loaded:', courses.length)),
       catchError(err => {
         console.error('Error loading courses:', err);
         return throwError(() => 
           new Error('Failed to load courses. Please try again.')
         );
       })
     );
   }
   ```
   
   **Why `tap` instead of `map`?**  
   `tap` is for side effects (logging, analytics) that should not alter the stream. Never modify data inside `tap` — use `map` for transformations.

4. **Implement retry strategy**
   ```typescript
   import { retry } from 'rxjs/operators';
   
   getCourses(): Observable<Course[]> {
     return this.http.get<Course[]>('http://localhost:3000/courses').pipe(
       retry(2), // Retry up to 2 times before failing
       catchError(err => {
         console.error('Error after retries:', err);
         return throwError(() => 
           new Error('Failed to load courses. Please try again.')
         );
       })
     );
   }
   ```

5. **Use `switchMap` for dependent HTTP calls**
   ```typescript
   import { switchMap } from 'rxjs/operators';
   
   // When a course is selected, load its enrolled students
   selectedCourse$.pipe(
     switchMap(courseId => 
       this.enrollmentService.getStudentsByCourse(courseId)
     )
   ).subscribe(students => this.students = students);
   ```
   
   **Why `switchMap`?**  
   `switchMap` cancels the previous inner Observable when a new value arrives, preventing out-of-order responses. Essential for type-ahead search and dependent HTTP calls.

### ✅ Expected Outcome
- Courses load with error handling
- Turning off JSON Server shows error message
- `retry` attempts 2 retries before showing error
- `switchMap` cancels previous course student requests

---

## 📋 Task 3: HTTP Interceptors

### Goal
Build interceptors to handle auth tokens and global error logging.

### Steps

1. **Generate Auth Interceptor**
   ```bash
   ng generate interceptor interceptors/auth
   ```
   
   ```typescript
   import { HttpInterceptorFn } from '@angular/common/http';
   
   export const authInterceptor: HttpInterceptorFn = (req, next) => {
     const clonedReq = req.clone({
       setHeaders: {
         Authorization: 'Bearer mock-token-12345'
       }
     });
     return next(clonedReq);
   };
   ```

2. **Register Interceptor in `app.config.ts`**
   ```typescript
   import { provideHttpClient, withInterceptors } from '@angular/common/http';
   import { authInterceptor } from './interceptors/auth.interceptor';
   
   export const appConfig: ApplicationConfig = {
     providers: [
       provideHttpClient(withInterceptors([authInterceptor])),
       // other providers...
     ]
   };
   ```

3. **Verify in DevTools**
   - Open Chrome DevTools → Network tab
   - Select any API call
   - Check Request Headers for `Authorization: Bearer mock-token-12345`

4. **Generate Error Handler Interceptor**
   ```bash
   ng generate interceptor interceptors/error-handler
   ```
   
   ```typescript
   import { HttpInterceptorFn } from '@angular/common/http';
   import { catchError, throwError } from 'rxjs';
   import { inject } from '@angular/core';
   import { Router } from '@angular/router';
   
   export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
     const router = inject(Router);
     
     return next(req).pipe(
       catchError(err => {
         if (err.status === 401) {
           console.error('Unauthorized - redirecting to login');
           router.navigate(['/login']);
         } else if (err.status === 500) {
           console.error('Server error:', err);
           // Show global error notification
         }
         return throwError(() => err);
       })
     );
   };
   ```

5. **Generate Loading Interceptor**
   ```bash
   ng generate interceptor interceptors/loading
   ng generate service services/loading
   ```
   
   **LoadingService:**
   ```typescript
   import { Injectable } from '@angular/core';
   import { BehaviorSubject } from 'rxjs';
   
   @Injectable({ providedIn: 'root' })
   export class LoadingService {
     private loadingSubject = new BehaviorSubject<boolean>(false);
     isLoading$ = this.loadingSubject.asObservable();
     
     show() {
       this.loadingSubject.next(true);
     }
     
     hide() {
       this.loadingSubject.next(false);
     }
   }
   ```
   
   **Loading Interceptor:**
   ```typescript
   import { HttpInterceptorFn } from '@angular/common/http';
   import { inject } from '@angular/core';
   import { finalize } from 'rxjs/operators';
   import { LoadingService } from '../services/loading.service';
   
   export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
     const loadingService = inject(LoadingService);
     loadingService.show();
     
     return next(req).pipe(
       finalize(() => loadingService.hide())
     );
   };
   ```
   
   **Note:** `finalize` runs whether the Observable completes or errors — it's the correct place to hide a loading spinner.

6. **Display Loading Spinner in App Component**
   ```typescript
   // app.component.ts
   loadingService = inject(LoadingService);
   ```
   
   ```html
   <!-- app.component.html -->
   <div *ngIf="loadingService.isLoading$ | async" class="loading-spinner">
     Loading...
   </div>
   ```

### ✅ Expected Outcome
- DevTools shows `Authorization` header on all API requests
- Simulating a 401 response navigates to login
- A spinner appears on every HTTP call and disappears when it completes

---

## 🔑 Key Concepts

### Observables vs Promises
- **Observables** are lazy, cancellable, and can emit multiple values
- **Promises** are eager, not cancellable, and emit only one value
- HttpClient methods return cold Observables — they don't execute until subscribed

### RxJS Operators Summary
| Operator | Purpose | Use Case |
|----------|---------|----------|
| `map` | Transform data | Filter, format, extract properties |
| `tap` | Side effects (logging) | Don't modify data, just observe |
| `catchError` | Handle errors | Return fallback or rethrow |
| `retry` | Retry failed requests | Network resilience |
| `switchMap` | Chain dependent calls | Cancel previous inner Observable |
| `finalize` | Always runs after complete/error | Hide loading spinner |

### HTTP Interceptors
- Interceptors run in registration order for requests
- Responses travel back in reverse order
- Use for: auth tokens, error handling, logging, loading states

---

## 📸 Screenshots

10 screenshots demonstrating:
1. JSON Server running
2. GET request response
3. POST request creating course
4. DELETE request
5. Network tab in DevTools
6. Auth interceptor adding header
7. RxJS operators console logs
8. Error handling with retry
9. PUT request updating course
10. switchMap demonstration

All screenshots saved in the `Output/` folder.

---

## 🎓 Learning Outcomes

After completing this hands-on, you will be able to:
- ✅ Integrate Angular with REST APIs using HttpClient
- ✅ Use RxJS operators to transform and handle HTTP responses
- ✅ Implement error handling and retry strategies
- ✅ Build HTTP interceptors for cross-cutting concerns
- ✅ Understand the difference between Observables and Promises
- ✅ Apply best practices for async data management

---

## 📚 Additional Resources

- [Angular HttpClient Guide](https://angular.dev/guide/http)
- [RxJS Operators Documentation](https://rxjs.dev/api)
- [HTTP Interceptors](https://angular.dev/guide/http/interceptors)
- [JSON Server Documentation](https://github.com/typicode/json-server)

---

**Digital Nurture 5.0 | Week 5 | Angular (v20.0)**
