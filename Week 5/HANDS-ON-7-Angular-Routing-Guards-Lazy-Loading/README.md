# HANDS-ON 7: Angular Routing — Guards, Lazy Loading & Route Data

**Digital Nurture 5.0 | Angular (v20.0) | Intermediate Level**

## Topics Covered

✓ Configuring Routes & RouterModule  
✓ Route Parameters & Query Parameters  
✓ Nested Routes  
✓ Lazy Loading Feature Modules  
✓ CanActivate Guard  
✓ CanDeactivate Guard  
✓ Passing Data Between Routes with Resolve  

## Overview

**Routing makes Angular a true SPA framework.** This hands-on configures all portal routes, adds route parameters, implements lazy loading for the enrollment module, and protects routes with guards.

## Project Structure

```
HANDS-ON-7-Angular-Routing-Guards-Lazy-Loading/
├── Output/                                # Screenshots
├── student-course-portal-7/
│   └── src/app/
│       ├── guards/
│       │   ├── auth.guard.ts              # CanActivate guard
│       │   └── unsaved-changes.guard.ts   # CanDeactivate guard
│       ├── services/
│       │   └── auth.service.ts            # Authentication service
│       ├── pages/
│       │   ├── course-detail/             # Dynamic route parameter
│       │   └── not-found/                 # Wildcard route (404)
│       └── app.routes.ts                  # Complete routing configuration
└── README.md
```

## Task 1: Route Configuration, Parameters and Nested Routes

### Complete Route Configuration

**File:** `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'courses', component: CourseList },
  { path: 'courses/:id', component: CourseDetail },
  { 
    path: 'profile', 
    component: StudentProfile,
    canActivate: [authGuard]
  },
  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentForm,
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },
  { path: '**', component: NotFound }
];
```

### Route Parameters

**Reading URL Parameters:**

```typescript
// In CourseDetailComponent
constructor(private route: ActivatedRoute) {}

ngOnInit(): void {
  // Method 1: Snapshot (for one-time read)
  const id = this.route.snapshot.paramMap.get('id');
  
  // Method 2: Observable (for dynamic params)
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    // Load course data
  });
}
```

**When to Use Each:**
- **Snapshot:** Parameters don't change while component is active
- **Observable:** Same component, different params (e.g., /courses/1 → /courses/2)

### Navigation with Router

**Programmatic Navigation:**

```typescript
// Navigate to course detail
this.router.navigate(['courses', course.id]);

// Navigate with query params
this.router.navigate(['courses'], {
  queryParams: { search: 'angular' }
});
```

### Query Parameters

**Setting Query Parameters:**
```typescript
// URL: /courses?search=angular&sort=asc
this.router.navigate(['courses'], {
  queryParams: { 
    search: 'angular',
    sort: 'asc'
  }
});
```

**Reading Query Parameters:**
```typescript
// Snapshot approach
const search = this.route.snapshot.queryParamMap.get('search');

// Observable approach
this.route.queryParamMap.subscribe(params => {
  const search = params.get('search');
});
```

### Wildcard Route (404)

```typescript
{ path: '**', component: NotFound }
```

**IMPORTANT:** Must be the LAST route!
- Angular matches routes in order
- Wildcard before specific routes catches everything
- Would prevent all other routes from working

## Task 2: Lazy Loading and Route Guards

### Lazy Loading Configuration

**Benefits:**
- ✅ Smaller initial bundle size
- ✅ Faster initial page load
- ✅ Code downloaded on demand
- ✅ Better performance for large apps

**Implementation:**
```typescript
{
  path: 'enroll',
  loadChildren: () => import('./features/enrollment/enrollment.module')
    .then(m => m.EnrollmentModule)
}
```

**Verification:**
1. Open Chrome DevTools → Network tab
2. Navigate to `/enroll`
3. See separate chunk file download
4. File only loads on first visit, not on app load

### CanActivate Guard (Route Protection)

**File:** `src/app/guards/auth.guard.ts`

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;  // Allow access
  } else {
    router.navigate(['/']);  // Redirect
    return false;  // Block access
  }
};
```

**Usage:**
```typescript
{
  path: 'profile',
  component: StudentProfile,
  canActivate: [authGuard]
}
```

**How It Works:**
1. User tries to navigate to `/profile`
2. Guard checks authentication
3. If logged in → allows navigation (return true)
4. If not → redirects to home (return false)

### CanDeactivate Guard (Unsaved Changes)

**File:** `src/app/guards/unsaved-changes.guard.ts`

```typescript
export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentFormComponent> = 
  (component) => {
    if (component.enrollForm && component.enrollForm.dirty) {
      return window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
    }
    return true;
  };
```

**Usage:**
```typescript
{
  path: 'enroll-reactive',
  component: ReactiveEnrollmentForm,
  canDeactivate: [unsavedChangesGuard]
}
```

**How It Works:**
1. User tries to navigate away from form
2. Guard checks if form is dirty
3. If pristine → allows navigation
4. If dirty → shows confirmation dialog
5. OK → allows, Cancel → stays on page

**Why It's User-Friendly:**
- Prevents accidental data loss
- Critical for form-heavy applications
- One of the best UX features

## Route Guards Comparison

| Guard Type | Purpose | Return Value | Use Case |
|------------|---------|--------------|----------|
| **CanActivate** | Control route access | `true` / `false` | Authentication, permissions |
| **CanDeactivate** | Control leaving route | `true` / `false` | Unsaved form data |
| **CanLoad** | Control lazy module loading | `true` / `false` | Module-level security |
| **Resolve** | Pre-fetch data | Data object | Load data before route |

## Functional Guards vs Class Guards

### Modern Approach (Functional - Angular 15+)

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  return service.isAuthenticated();
};
```

**Advantages:**
- ✅ Simpler syntax
- ✅ Less boilerplate
- ✅ Tree-shakeable
- ✅ Easier to test

### Old Approach (Class-based)

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  
  canActivate(): boolean {
    return this.authService.isAuthenticated();
  }
}
```

## Features Implemented

### ✅ Routing:
- [x] Basic route configuration
- [x] Route parameters (:id)
- [x] Query parameters (?search=value)
- [x] Wildcard route (**) for 404
- [x] Programmatic navigation
- [x] ActivatedRoute injection

### ✅ Route Guards:
- [x] CanActivate guard (auth protection)
- [x] CanDeactivate guard (unsaved changes)
- [x] Functional guard implementation
- [x] Route protection on multiple pages

### ✅ Components:
- [x] CourseDetailComponent (dynamic :id)
- [x] NotFoundComponent (404 page)
- [x] AuthService (authentication state)
- [x] Updated navigation links

## Running the Application

```bash
cd student-course-portal-7
npm install
npm start
```

**Navigate to:** http://localhost:4200/

## Testing the Application

### Test Case 1: Route Parameters
1. Go to Courses page
2. Click on any course card
3. URL changes to `/courses/2`
4. ✅ Course detail loads with correct data
5. Click back button
6. ✅ Returns to courses list

### Test Case 2: Query Parameters
1. On Courses page, type in search box
2. URL updates to `/courses?search=angular`
3. ✅ Query parameter appears in URL
4. Refresh page
5. ✅ Search term persists

### Test Case 3: 404 Page
1. Navigate to `/unknown-route`
2. ✅ NotFound component displays
3. Shows 404 message
4. Click "Go Home"
5. ✅ Navigates to home page

### Test Case 4: Auth Guard
1. Try to navigate to `/profile` (without login)
2. ✅ Redirected to home page
3. Console shows "Auth Guard: Access denied"
4. Toggle auth state (add button to test)
5. Try again
6. ✅ Access granted

### Test Case 5: Unsaved Changes Guard
1. Go to `/enroll-reactive`
2. Fill out form (make it dirty)
3. Try to navigate away
4. ✅ Confirmation dialog appears
5. Click Cancel
6. ✅ Stays on form page
7. Click OK
8. ✅ Navigates away

### Test Case 6: Lazy Loading
1. Open DevTools → Network tab
2. Refresh app
3. Navigate to `/enroll`
4. ✅ See separate chunk file load
5. Navigate away and back
6. ✅ No new file download (cached)

## Console Verification

Expected console output:

```
Auth Guard: Access denied - redirecting to home
Auth Guard: Access granted
Unsaved Changes Guard: User confirmed navigation
Unsaved Changes Guard: No unsaved changes
Course loaded from route parameter: {id: 2, name: "..."}
```

## Route Configuration Best Practices

### ✅ DO:
- Put wildcard route (**) last
- Use route guards for sensitive pages
- Implement unsaved changes guard on forms
- Use lazy loading for large features
- Provide clear 404 pages
- Use query params for filters/search
- Use route params for resource IDs

### ❌ DON'T:
- Put wildcard before specific routes
- Forget to handle navigation failures
- Skip guard implementation for auth
- Load everything eagerly
- Use route params for search queries
- Mix route params and query params incorrectly

## Routing Strategies

### 1. Route Parameters vs Query Parameters

| Feature | Route Param | Query Param |
|---------|-------------|-------------|
| **URL** | `/courses/123` | `/courses?id=123` |
| **Purpose** | Resource identification | Filters, search, pagination |
| **Required** | Yes (part of route) | No (optional) |
| **Bookmarkable** | Yes | Yes |
| **SEO** | Better | Good |

### 2. Navigation Methods

```typescript
// Method 1: Router.navigate
this.router.navigate(['courses', id]);

// Method 2: Router.navigateByUrl
this.router.navigateByUrl('/courses/123');

// Method 3: RouterLink in template
<a [routerLink]="['/courses', course.id]">View</a>
```

### 3. Route Matching Strategies

```typescript
// Prefix matching (default)
{ path: 'courses', pathMatch: 'prefix' }

// Full matching (for empty paths)
{ path: '', pathMatch: 'full' }
```

## Advanced Routing

### 1. Nested Routes

```typescript
{
  path: 'courses',
  component: CoursesLayoutComponent,
  children: [
    { path: '', component: CourseList },
    { path: ':id', component: CourseDetail }
  ]
}
```

### 2. Route Data

```typescript
{
  path: 'admin',
  component: AdminComponent,
  data: { role: 'admin', title: 'Admin Panel' }
}

// Access in component
this.route.data.subscribe(data => {
  console.log(data.role);  // 'admin'
});
```

### 3. Route Resolve

```typescript
export const courseResolver: ResolveFn<Course> = (route) => {
  const courseService = inject(CourseService);
  const id = route.paramMap.get('id');
  return courseService.getCourseById(+id);
};

// In routes
{
  path: 'courses/:id',
  component: CourseDetail,
  resolve: { course: courseResolver }
}
```

## Troubleshooting

### Routes not working
**Check:** Order of routes (wildcard last)
**Solution:** Move ** route to end

### Guard not firing
**Check:** Guard correctly provided in route
**Solution:** Add to canActivate/canDeactivate array

### Lazy module not loading
**Check:** Syntax and module export
**Solution:** Verify loadChildren function

### Parameters not updating
**Check:** Using snapshot vs observable
**Solution:** Subscribe to paramMap if params change

## Technologies Used

- **Angular**: v21.2.0
- **TypeScript**: v5.9.2
- **Angular Router**: @angular/router v21.2.0

## Learning Outcomes

After completing this hands-on exercise, you should be able to:

✅ Configure routes with RouterModule  
✅ Use route parameters for dynamic segments  
✅ Implement query parameters for filters  
✅ Create nested route structures  
✅ Implement lazy loading for modules  
✅ Protect routes with CanActivate guard  
✅ Prevent data loss with CanDeactivate guard  
✅ Create 404 pages with wildcard routes  
✅ Navigate programmatically with Router  
✅ Read route data with ActivatedRoute  

## Next Steps

Consider enhancing with:
- Route resolvers for data pre-fetching
- Custom route reuse strategy
- Route animations
- Auxiliary routes
- Hash location strategy
- Preloading strategies
- Child route outlets

---

**Completed**: July 23, 2026  
**Digital Nurture 5.0 Program**  
**Angular Version**: 21.2.0
