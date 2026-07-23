# HANDS-ON 4: Template-Driven Forms & Validation

**Digital Nurture 5.0 | Angular (v20.0) | Intermediate Level**

## Topics Covered

✓ Template-Driven Form Basics  
✓ ngModel Two-Way Binding in Forms  
✓ Built-in Validators — required, minlength, email  
✓ ngForm and ngModel References  
✓ Displaying Validation Errors  
✓ Form Submission Handling  

## Overview

This hands-on exercise demonstrates how to build a **Student Enrollment Request Form** using Angular's template-driven forms approach. The form includes multiple input types, comprehensive validation, contextual error messages, and proper form state management.

## Project Structure

```
HANDS-ON-4-Template-Driven-Forms-Validation/
├── Output/                          # Screenshots and demo outputs
├── student-course-portal-4/         # Angular project
│   └── src/
│       └── app/
│           ├── pages/
│           │   └── enrollment-form/
│           │       ├── enrollment-form.component.ts
│           │       ├── enrollment-form.component.html
│           │       └── enrollment-form.component.css
│           ├── app.routes.ts        # Route configuration
│           └── components/
│               └── header/          # Updated navigation
└── README.md
```

## Task 1: Build the Enrollment Request Form

### Steps Completed:

1. **Generated EnrollmentFormComponent**
   - Location: `src/app/pages/enrollment-form/`
   - Added route at path `/enroll` in `app.routes.ts`

2. **Form Fields Implemented:**
   - **studentName** (text input) - with `[(ngModel)]` binding
   - **studentEmail** (email input) - with email validation
   - **courseId** (number input) - for course selection
   - **preferredSemester** (select dropdown) - Options: Odd, Even
   - **agreeToTerms** (checkbox) - Terms acceptance

3. **Form Submission Handler:**
   - `onSubmit(form: NgForm)` method logs:
     - `form.value` - All field values as key-value pairs
     - `form.valid` - Boolean indicating form validity
   - Submit button disabled when form is invalid

4. **Template Reference Variables:**
   - `#enrollForm="ngForm"` - Access to NgForm directive instance
   - `name` attribute on every form control (mandatory for template-driven forms)

### Key Implementation Details:

```typescript
// Component Class
export class EnrollmentFormComponent {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;
  submitted = false;

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form Value:', form.value);
      console.log('Form Valid:', form.valid);
      this.submitted = true;
    }
  }
}
```

## Task 2: Validation and Error Messages

### Validation Rules Applied:

| Field | Validators | Error Messages |
|-------|-----------|----------------|
| **Student Name** | `required`, `minlength="3"` | "Name is required" / "Name must be at least 3 characters" |
| **Student Email** | `required`, `email` | "Email is required" / "Please enter a valid email address" |
| **Course ID** | `required` | "Course ID is required" |
| **Preferred Semester** | `required` | "Preferred Semester is required" |
| **Agree to Terms** | `required` (checked) | "You must agree to the terms and conditions" |

### Error Display Pattern:

```html
<input
  type="text"
  name="studentName"
  [(ngModel)]="studentName"
  #nameCtrl="ngModel"
  required
  minlength="3"
/>
<div class="error-messages" *ngIf="nameCtrl.invalid && nameCtrl.touched">
  <small *ngIf="nameCtrl.errors?.['required']">Name is required</small>
  <small *ngIf="nameCtrl.errors?.['minlength']">Name must be at least 3 characters</small>
</div>
```

### CSS Styling for Form States:

Angular automatically adds CSS classes based on form control state:

- **Validation State:** `ng-valid` / `ng-invalid`
- **Changed State:** `ng-pristine` / `ng-dirty`
- **Visited State:** `ng-untouched` / `ng-touched`

```css
/* Invalid fields - Red border after being touched */
.form-control.ng-invalid.ng-touched {
  border-color: #dc3545;
  background-color: #fff5f5;
}

/* Valid fields - Green border after being touched */
.form-control.ng-valid.ng-touched {
  border-color: #28a745;
  background-color: #f0fff4;
}
```

### Success Message:

- Appears after successful form submission
- Message: "Enrollment request submitted successfully!"
- Controlled by `submitted` boolean property
- Auto-hides after 3 seconds with smooth animation

### Reset Functionality:

```html
<button type="button" (click)="enrollForm.resetForm()">Reset</button>
```

- Clears all field values
- Resets validation states (pristine, untouched)
- Removes all error messages

## Features Implemented

### ✅ Form Features:
- [x] Two-way data binding with `[(ngModel)]`
- [x] Template reference variables for form and controls
- [x] Built-in HTML5 validators
- [x] Custom error message display logic
- [x] Submit button disabled for invalid forms
- [x] Form reset functionality
- [x] Success message on submission
- [x] Debug info panel (optional)

### ✅ Validation Features:
- [x] Required field validation
- [x] Minimum length validation (3 characters)
- [x] Email format validation
- [x] Checkbox required validation
- [x] Contextual error messages (shown on touch)
- [x] Visual feedback (red/green borders)

### ✅ UX Features:
- [x] Responsive design
- [x] Smooth animations
- [x] Accessible form labels
- [x] Clear visual hierarchy
- [x] Disabled state styling
- [x] Hover effects on buttons

## Running the Application

### Prerequisites:
```bash
# Ensure Node.js and npm are installed
node --version
npm --version
```

### Installation & Setup:
```bash
# Navigate to project directory
cd student-course-portal-4

# Install dependencies
npm install

# Start development server
npm start
```

### Access the Application:
- Open browser at: `http://localhost:4200`
- Navigate to: **Enroll** link in the navigation bar
- Or directly: `http://localhost:4200/enroll`

## Testing the Form

### Test Case 1: Invalid Form Submission
1. Click Submit button without filling any fields
2. ✅ Submit button should be disabled
3. Touch each field and leave it
4. ✅ Red borders and error messages should appear

### Test Case 2: Partial Validation
1. Enter name "Jo" (less than 3 characters)
2. ✅ Error: "Name must be at least 3 characters"
3. Enter invalid email "test@"
4. ✅ Error: "Please enter a valid email address"

### Test Case 3: Valid Form Submission
1. Fill all fields correctly:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Course ID: 101
   - Semester: "Odd"
   - Check terms checkbox
2. ✅ All fields show green borders
3. ✅ Submit button is enabled
4. Click Submit
5. ✅ Success message appears
6. ✅ Console logs form data

### Test Case 4: Reset Functionality
1. Fill the form with data
2. Click Reset button
3. ✅ All fields are cleared
4. ✅ No validation errors shown
5. ✅ Form returns to pristine state

## Console Output Example

When form is submitted successfully:

```javascript
Form Value: {
  studentName: "John Doe",
  studentEmail: "john@example.com",
  courseId: 101,
  preferredSemester: "Odd",
  agreeToTerms: true
}
Form Valid: true
```

## Key Concepts Learned

### 1. Template-Driven Forms
- Form logic lives in the template (HTML)
- `FormsModule` required for `ngModel`
- Automatic form tracking by Angular

### 2. ngModel Directive
- Two-way data binding: `[(ngModel)]="property"`
- Requires `name` attribute on form controls
- Creates FormControl instances automatically

### 3. Template Reference Variables
- `#enrollForm="ngForm"` - Access NgForm directive
- `#nameCtrl="ngModel"` - Access NgModel directive
- Used for validation state checking

### 4. Validation States
- **touched** - User focused and left the field
- **dirty** - User changed the value
- **pristine** - Value hasn't been changed
- **valid/invalid** - Validation status

### 5. Error Display Best Practices
- Use `touched` not `dirty` for showing errors
- Show errors after user interaction, not while typing
- Provide specific, actionable error messages
- Use visual cues (colors, icons) alongside text

## Form State CSS Classes

| State | Class | Opposite |
|-------|-------|----------|
| Validation | `ng-valid` | `ng-invalid` |
| Changed | `ng-dirty` | `ng-pristine` |
| Visited | `ng-touched` | `ng-untouched` |

## Important Notes

### FormsModule Import
```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  // ...
})
```

### Name Attribute is Mandatory
```html
<!-- ❌ Wrong - Missing name -->
<input [(ngModel)]="studentName" />

<!-- ✅ Correct - Has name attribute -->
<input name="studentName" [(ngModel)]="studentName" />
```

### Why Use touched instead of dirty?
- **touched** - Shows errors after user visits the field
- **dirty** - Shows errors while user is typing (bad UX)
- Best practice: `*ngIf="control.invalid && control.touched"`

## Additional Features

### Debug Info Panel
The form includes an optional debug panel showing:
- Form validity status
- Form touched state
- Form dirty state

This helps during development to understand form state changes.

### Responsive Design
- Mobile-friendly layout
- Stacked buttons on small screens
- Proper spacing and touch targets
- Readable font sizes

## Screenshots

Screenshots of the application are stored in the `Output/` directory:
- Form initial state
- Validation error states
- Valid form state
- Success message display

## Technologies Used

- **Angular**: v21.2.0
- **TypeScript**: v5.9.2
- **RxJS**: v7.8.0
- **Forms Module**: @angular/forms v21.2.0

## Learning Outcomes

After completing this hands-on exercise, you should be able to:

✅ Create template-driven forms in Angular  
✅ Implement two-way data binding with ngModel  
✅ Add built-in validators to form controls  
✅ Display contextual validation error messages  
✅ Style forms based on validation states  
✅ Handle form submission and reset  
✅ Use template reference variables effectively  
✅ Understand Angular's form state management  

## Next Steps

Consider enhancing the form with:
- Custom validators
- Async validation
- Custom error components
- Form field dependencies
- Dynamic form controls
- Integration with backend API

---

**Completed**: July 23, 2026  
**Digital Nurture 5.0 Program**  
**Angular Version**: 21.2.0
