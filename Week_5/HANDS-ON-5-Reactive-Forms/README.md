# HANDS-ON 5: Reactive Forms — FormBuilder, FormGroup, FormArray & Custom Validators

**Digital Nurture 5.0 | Angular (v20.0) | Intermediate Level**

## Topics Covered

✓ ReactiveFormsModule Setup  
✓ FormBuilder & FormGroup  
✓ FormControl & FormArray  
✓ Built-in Validators  
✓ Custom Synchronous Validators  
✓ Custom Async Validators  
✓ Dynamic Form Controls  

## Overview

This hands-on exercise demonstrates **Reactive Forms** in Angular — a model-driven approach where form structure is defined in the component class rather than the template. Reactive forms are more powerful, testable, and suited to complex scenarios compared to template-driven forms.

We rebuild the enrollment form as a reactive form with:
- Custom synchronous validator (course code validation)
- Custom asynchronous validator (email availability check)
- Dynamic form controls using FormArray

## Project Structure

```
HANDS-ON-5-Reactive-Forms/
├── Output/                                    # Screenshots
├── student-course-portal-5/                   # Angular project
│   └── src/
│       └── app/
│           ├── pages/
│           │   └── reactive-enrollment-form/
│           │       ├── reactive-enrollment-form.component.ts
│           │       ├── reactive-enrollment-form.component.html
│           │       └── reactive-enrollment-form.component.css
│           ├── app.routes.ts
│           └── components/header/
└── README.md
```

## Task 1: Build a Reactive Form with FormBuilder

### Steps Completed:

1. **Generated ReactiveEnrollmentFormComponent**
   - Location: `src/app/pages/reactive-enrollment-form/`
   - Added route at path `/enroll-reactive`

2. **FormBuilder Injection:**
   ```typescript
   constructor(private fb: FormBuilder) {}
   ```

3. **Form Construction in ngOnInit:**
   ```typescript
   this.enrollForm = this.fb.group({
     studentName: ['', [Validators.required, Validators.minLength(3)]],
     studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
     courseId: ['', [Validators.required, noCourseCode]],
     preferredSemester: ['Odd', Validators.required],
     agreeToTerms: [false, Validators.requiredTrue],
     additionalCourses: this.fb.array([])
   });
   ```

4. **Template Binding:**
   - Uses `[formGroup]="enrollForm"` on form element
   - Uses `formControlName="fieldName"` on inputs (NO ngModel needed)
   - Submit button disabled when form is invalid or pending

5. **Form Value Logging:**
   ```typescript
   console.log('Form Value:', this.enrollForm.value);
   console.log('Raw Value:', this.enrollForm.getRawValue());
   ```

### Key Differences: value vs getRawValue()

| Method | Description | Use Case |
|--------|-------------|----------|
| **`enrollForm.value`** | Returns only **enabled** controls | Normal form submission |
| **`enrollForm.getRawValue()`** | Returns **all** controls including disabled | Display or audit purposes |

**Example:**
If a field is disabled: `courseId.disable()`
- `value` will **exclude** courseId
- `getRawValue()` will **include** courseId

### Why Reactive Forms are Better for Testing

```typescript
// In reactive forms, form logic is in TypeScript
// Can be unit tested without DOM!
it('should invalidate form when name is less than 3 chars', () => {
  component.enrollForm.patchValue({ studentName: 'Jo' });
  expect(component.enrollForm.valid).toBeFalsy();
});
```

### Validators.requiredTrue vs Validators.required

- **`Validators.required`**: Checks for non-empty/non-null value
- **`Validators.requiredTrue`**: Specifically validates that a checkbox is **checked** (value === true)

## Task 2: Custom Validators and FormArray

### Custom Synchronous Validator: noCourseCode

```typescript
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && typeof value === 'string' && value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}
```

**Behavior:**
- Returns `{ noCourseCode: true }` if course code starts with 'XX'
- Returns `null` if validation passes
- Applied to `courseId` control: `[Validators.required, noCourseCode]`

**Error Display:**
```html
<small *ngIf="getControl('courseId').errors?.['noCourseCode']">
  Course code starting with XX is not allowed
</small>
```

### Custom Async Validator: simulateEmailCheck

```typescript
function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value = control.value;
      if (value && value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}
```

**Key Features:**
- Returns a **Promise** (could also return Observable)
- Simulates 800ms API delay
- Returns `{ emailTaken: true }` if email contains 'test@'
- Applied as **third argument**: `[syncValidators], [asyncValidators]`

**When Async Validators Fire:**
- **Only after** all synchronous validators pass
- Prevents unnecessary API calls for already-invalid data
- Form shows `pending` state during validation

**Pending State Display:**
```html
<div *ngIf="getControl('studentEmail').pending">
  <small>Checking email availability...</small>
</div>
```

### FormArray for Dynamic Controls

**Initialization:**
```typescript
additionalCourses: this.fb.array([])
```

**Typed Getter (Best Practice):**
```typescript
get additionalCourses(): FormArray {
  return this.enrollForm.get('additionalCourses') as FormArray;
}
```

**Why This Getter is Better Than Casting in Template:**

| Approach | Pros | Cons |
|----------|------|------|
| **Typed Getter** | ✅ Type safety<br>✅ DRY principle<br>✅ Single source of truth<br>✅ Easier refactoring<br>✅ Cleaner template | Requires one extra method |
| **Template Casting** | Shorter code | ❌ Repeated casts<br>❌ Error-prone<br>❌ Hard to refactor<br>❌ No type safety |

**Add Control:**
```typescript
addCourse(): void {
  const courseControl = this.fb.control('', Validators.required);
  this.additionalCourses.push(courseControl);
}
```

**Remove Control:**
```typescript
removeCourse(index: number): void {
  this.additionalCourses.removeAt(index);
}
```

**Template Rendering:**
```html
<div *ngFor="let course of additionalCourses.controls; let i = index">
  <input [formControl]="$any(course)" />
  <button (click)="removeCourse(i)">Remove</button>
</div>
<button (click)="addCourse()">+ Add Another Course</button>
```

## Features Implemented

### ✅ Reactive Form Features:
- [x] FormBuilder for form construction
- [x] FormGroup for grouping controls
- [x] FormControl for individual fields
- [x] FormArray for dynamic repeating controls
- [x] No ngModel required (model-driven approach)
- [x] Form defined entirely in TypeScript
- [x] Fully unit-testable without DOM

### ✅ Validation Features:
- [x] Built-in validators (required, minLength, email)
- [x] Validators.requiredTrue for checkbox
- [x] Custom synchronous validator (noCourseCode)
- [x] Custom asynchronous validator (simulateEmailCheck)
- [x] Pending state during async validation
- [x] Contextual error messages
- [x] Visual feedback (red/green/yellow borders)

### ✅ Dynamic Features:
- [x] Add unlimited additional courses
- [x] Remove individual courses
- [x] Validation on each dynamic control
- [x] Array length tracking

### ✅ Advanced Features:
- [x] Typed getters for FormArray
- [x] Helper methods (getControl, markFormGroupTouched)
- [x] Debug panel showing form state
- [x] value vs getRawValue() demonstration
- [x] Disabled button during pending state
- [x] Success message on submission

## Running the Application

### Installation & Setup:
```bash
cd student-course-portal-5
npm install
npm start
```

### Access the Application:
- Open browser at: `http://localhost:4200`
- Navigate to: **Reactive Form** link in navigation
- Or directly: `http://localhost:4200/enroll-reactive`

## Testing the Form

### Test Case 1: Custom Sync Validator (Course Code)
1. Enter `XX101` in Course Code field
2. ✅ Error appears: "Course code starting with XX is not allowed"
3. Change to `CS101`
4. ✅ Validation passes, green border appears

### Test Case 2: Custom Async Validator (Email)
1. Enter `test@example.com` in email field
2. ✅ See "Checking email availability..." message
3. After 800ms: ✅ Error appears: "This email is already taken"
4. Change to `john@example.com`
5. ✅ After 800ms, validation passes

### Test Case 3: FormArray (Dynamic Courses)
1. Click "Add Another Course" button
2. ✅ New course input appears
3. Add multiple courses
4. ✅ Each has its own validation
5. Click "Remove" on any course
6. ✅ Course is removed from array
7. Submit form
8. ✅ All courses included in form value

### Test Case 4: Form Submission
1. Fill all required fields correctly
2. Add 2 additional courses
3. Check terms checkbox
4. ✅ Submit button becomes enabled
5. Click Submit
6. ✅ Console shows both `value` and `getRawValue()`
7. ✅ Success message appears

### Test Case 5: Pending State
1. Start typing valid email
2. ✅ Field shows yellow border (pending state)
3. ✅ Submit button disabled with "Validating..." text
4. After 800ms validation completes
5. ✅ Border changes to green or red based on result

## Console Output Example

```javascript
Form Value (enabled controls only): {
  studentName: "John Doe",
  studentEmail: "john@example.com",
  courseId: "CS101",
  preferredSemester: "Odd",
  agreeToTerms: true,
  additionalCourses: ["MATH201", "PHY301"]
}

Raw Value (all controls): {
  studentName: "John Doe",
  studentEmail: "john@example.com",
  courseId: "CS101",
  preferredSemester: "Odd",
  agreeToTerms: true,
  additionalCourses: ["MATH201", "PHY301"]
}
```

## Key Concepts Learned

### 1. Reactive Forms Architecture
- **Model-Driven**: Form structure lives in component class
- **TypeScript-First**: Define form in ngOnInit, not template
- **Immutability**: Form controls return new values, not mutate existing

### 2. FormBuilder vs Manual Construction

**With FormBuilder (Cleaner):**
```typescript
this.fb.group({
  name: ['', Validators.required],
  email: ['']
})
```

**Without FormBuilder (Verbose):**
```typescript
new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('')
})
```

### 3. Validator Order Matters

```typescript
this.fb.control('', 
  [Validators.required, Validators.email],  // Sync validators (run first)
  [asyncEmailCheck]                         // Async validator (runs after sync)
)
```

### 4. FormArray Use Cases
- Multiple phone numbers
- Multiple addresses
- Course enrollments
- Dynamic questionnaires
- Shopping cart items
- File uploads

### 5. Custom Validator Patterns

**Synchronous Validator:**
```typescript
function myValidator(control: AbstractControl): ValidationErrors | null {
  // Validation logic
  return isValid ? null : { errorKey: true };
}
```

**Asynchronous Validator:**
```typescript
function myAsyncValidator(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    // Async operation (API call, etc.)
    resolve(isValid ? null : { errorKey: true });
  });
}
```

### 6. FormControl States

| State | Description | CSS Class |
|-------|-------------|-----------|
| **valid** | All validators passed | `.ng-valid` |
| **invalid** | At least one validator failed | `.ng-invalid` |
| **pending** | Async validators running | `.ng-pending` |
| **pristine** | Value not changed | `.ng-pristine` |
| **dirty** | Value changed | `.ng-dirty` |
| **touched** | Field visited (focus/blur) | `.ng-touched` |
| **untouched** | Field not visited | `.ng-untouched` |

## Reactive Forms vs Template-Driven Forms

| Feature | Reactive Forms | Template-Driven Forms |
|---------|----------------|----------------------|
| **Setup** | ReactiveFormsModule | FormsModule |
| **Form Model** | Component class (TypeScript) | Template (HTML) |
| **Data Flow** | Explicit (synchronous) | Implicit (asynchronous) |
| **Validation** | Functions in class | Directives in template |
| **Testing** | Easy (no DOM needed) | Harder (needs DOM) |
| **Mutability** | Immutable | Mutable |
| **Scalability** | Better for complex forms | Better for simple forms |
| **Dynamic Controls** | Easy with FormArray | Difficult |
| **Predictability** | High | Medium |

## Best Practices

### ✅ DO:
- Use FormBuilder for cleaner syntax
- Create typed getters for FormArrays
- Implement custom validators as standalone functions
- Use async validators only when necessary
- Mark entire form as touched on submit
- Provide clear error messages
- Show pending state during async validation

### ❌ DON'T:
- Mix reactive and template-driven approaches
- Cast FormArray in template repeatedly
- Put complex logic in templates
- Forget to unsubscribe from form observables
- Run async validators before sync validators pass
- Use ngModel in reactive forms

## Advanced Techniques

### 1. Cross-Field Validation
```typescript
this.fb.group({
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required]
}, { validators: passwordMatchValidator });
```

### 2. Conditional Validators
```typescript
this.enrollForm.get('courseId')?.valueChanges.subscribe(value => {
  if (value.startsWith('ADV')) {
    this.enrollForm.get('prerequisite')?.setValidators(Validators.required);
  }
});
```

### 3. Dynamic FormGroup
```typescript
addAddress(): void {
  const addressGroup = this.fb.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', Validators.required]
  });
  this.addresses.push(addressGroup);
}
```

## Error Messages Helper

```typescript
getErrorMessage(controlName: string): string {
  const control = this.enrollForm.get(controlName);
  if (control?.hasError('required')) return 'This field is required';
  if (control?.hasError('email')) return 'Invalid email format';
  if (control?.hasError('minlength')) {
    const min = control.errors?.['minlength'].requiredLength;
    return `Minimum ${min} characters required`;
  }
  return '';
}
```

## Form State Debugging

The debug panel shows:
- **Valid**: Whether all validators pass
- **Touched**: Whether any field was visited
- **Dirty**: Whether any field value changed
- **Pending**: Whether async validators are running
- **value**: Enabled controls only
- **getRawValue()**: All controls including disabled

## Technologies Used

- **Angular**: v21.2.0
- **TypeScript**: v5.9.2
- **RxJS**: v7.8.0
- **ReactiveFormsModule**: @angular/forms v21.2.0

## Learning Outcomes

After completing this hands-on exercise, you should be able to:

✅ Build reactive forms using FormBuilder  
✅ Implement custom synchronous validators  
✅ Implement custom asynchronous validators  
✅ Use FormArray for dynamic form controls  
✅ Understand the difference between value and getRawValue()  
✅ Handle form submission in reactive forms  
✅ Display validation errors reactively  
✅ Manage form state (pending, valid, dirty, touched)  
✅ Test forms without DOM dependencies  
✅ Choose between reactive and template-driven approaches  

## Next Steps

Consider enhancing the form with:
- Cross-field validation (password confirmation)
- Conditional validation based on other fields
- Custom async validator with real API calls
- Complex nested FormGroups
- Value transformation before submission
- Save/restore form state from localStorage
- Multi-step wizard forms
- Dynamic form generation from JSON schema

## Screenshots

Screenshots demonstrating the following are stored in `Output/` directory:
- Initial form state
- Custom validator error (XX prefix)
- Async validator pending state
- Async validator error (test@ email)
- FormArray with multiple courses
- Valid form ready to submit
- Console output showing value vs getRawValue()

---

**Completed**: July 23, 2026  
**Digital Nurture 5.0 Program**  
**Angular Version**: 21.2.0
