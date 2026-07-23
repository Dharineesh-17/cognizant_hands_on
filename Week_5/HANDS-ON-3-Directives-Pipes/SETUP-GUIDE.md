# HANDS-ON 3: Directives & Pipes — Built-in and Custom

## Project Setup
- **Project Name:** student-course-portal-3
- **Location:** Week 5/HANDS-ON-3-Directives-Pipes
- **Framework:** Angular 20 (Standalone Components)
- **Status:** Fully Implemented - All tasks complete

## Implementation Overview

### Task 1: Structural Directives ✅
**Goal:** Control DOM structure dynamically using *ngIf, *ngFor, and *ngSwitch

**Implementation:**
1. ****ngIf with Loading State** - CourseListComponent shows loading message for 1.5 seconds
2. ****ngFor with trackBy** - Renders course cards with performance optimization
3. ****ngSwitch for Grade Badges** - Shows different colored badges (Passed/Failed/Pending)
4. ****ngIf with else** - Shows "No courses available" template when array is empty

**Key Files:**
- `course-list.ts`: isLoading property, trackByCourseId method
- `course-list.html`: *ngIf, *ngFor with trackBy, ng-template for else block
- `course-card.html`: *ngSwitch for grade status badges

---

### Task 2: Attribute Directives ✅
**Goal:** Apply dynamic CSS classes and inline styles using ngClass and ngStyle

**Implementation:**
1. **[ngClass]** - Conditionally applies 'card--enrolled' and 'card--full' classes
2. **[ngStyle]** - Dynamic border color based on gradeStatus (green/red/grey)
3. **isExpanded Toggle** - Show/Hide Details button with 'expanded' class
4. **Getter for ngClass** - Clean template with cardClasses getter

**Key Files:**
- `course-card.ts`: cardClasses getter, borderStyle getter, isExpanded property
- `course-card.html`: [ngClass] and [ngStyle] bindings
- `course-card.css`: .card--enrolled, .card--full, .expanded classes

---

### Task 3: Custom Directive and Custom Pipe ✅
**Goal:** Build reusable attribute directive and custom pipe

**Implementation:**
1. **HighlightDirective** - Yellow background on mouseenter, remove on mouseleave
2. **Configurable Highlight** - @Input() appHighlight allows custom color
3. **CreditLabelPipe** - Transforms credits number to "1 Credit" or "X Credits"
4. **Edge Cases** - Handles null, 0, 1, and plural credits correctly

**Key Files:**
- `highlight.directive.ts`: @HostListener for mouseenter/mouseleave
- `credit-label.pipe.ts`: PipeTransform with edge case handling
- `course-card.html`: appHighlight directive and creditLabel pipe usage

---

## Component Structure

```
src/app/
├── pages/
│   ├── home/
│   │   ├── home.ts
│   │   ├── home.html
│   │   └── home.css
│   └── course-list/
│       ├── course-list.ts
│       ├── course-list.html
│       └── course-list.css
├── components/
│   ├── header/
│   │   ├── header.ts
│   │   ├── header.html
│   │   └── header.css
│   └── course-card/
│       ├── course-card.ts
│       ├── course-card.html
│       └── course-card.css
├── directives/
│   └── highlight.directive.ts
├── pipes/
│   └── credit-label.pipe.ts
├── app.ts
├── app.html
├── app.routes.ts
└── app.config.ts
```

---

## Testing Checklist

### Task 1: Structural Directives
- [x] Loading message shows for 1.5 seconds on page load
- [x] trackByCourseId method implemented and used in *ngFor
- [x] *ngSwitch renders correct badge (green/red/grey) per grade status
- [x] Empty array shows "No courses available" template
- [x] Course grid renders when isLoading = false

### Task 2: Attribute Directives
- [x] Enrolled cards have visible 'card--enrolled' style (light green background)
- [x] Cards with credits >= 4 have 'card--full' style (yellow background)
- [x] Border color changes based on gradeStatus (green/red/grey)
- [x] Show Details button toggles 'expanded' class
- [x] cardClasses getter keeps template clean

### Task 3: Custom Directive & Pipe
- [x] Hovering over course card shows yellow highlight
- [x] Custom highlight color works (appHighlight='lightyellow')
- [x] {{ 1 | creditLabel }} displays "1 Credit"
- [x] {{ 3 | creditLabel }} displays "3 Credits"
- [x] {{ null | creditLabel }} displays "No Credits"
- [x] {{ 0 | creditLabel }} displays "No Credits"

---

## Course Data

The application displays 5 courses with different properties:

| Course | Credits | Grade Status | Enrolled |
|--------|---------|--------------|----------|
| Angular Basics | 3 | Passed | Yes |
| Advanced Angular | 4 | Pending | No |
| RxJS Mastery | 3 | Failed | Yes |
| State Management | 4 | Passed | No |
| Testing Angular | 1 | Pending | Yes |

---

## Key Concepts Demonstrated

### Structural Directives
- `*ngIf` - Conditionally add/remove elements from DOM
- `*ngFor` - Repeat elements for each item in array
- `*ngSwitch` - Conditionally display one element from several options
- `trackBy` - Performance optimization for list rendering
- `ng-template` - Define reusable template blocks

### Attribute Directives
- `[ngClass]` - Conditionally apply CSS classes
- `[ngStyle]` - Conditionally apply inline styles
- Prefer ngClass over ngStyle for styling
- Use getters to keep templates clean

### Custom Directive
- `@Directive` - Define custom attribute directive
- `@HostListener` - Listen to host element events
- `@Input` - Make directive configurable
- ElementRef - Access native DOM element

### Custom Pipe
- `@Pipe` - Define custom value transformer
- `PipeTransform` - Interface for transform method
- Pure pipes (default) - Only re-run on reference change
- Handle edge cases (null, undefined, zero)

---

## Build and Run

```bash
# Navigate to project
cd student-course-portal-3

# Install dependencies
npm install

# Build project
npm run build

# Run development server
ng serve --open
```

---

## Expected Output

### Home Page
- Welcome message with purple gradient
- Three info cards (Total Courses, Directives, Pipes)

### Courses Page
- Loading spinner for 1.5 seconds
- 5 course cards in grid layout
- Each card shows:
  - Course name and code
  - Grade status badge (colored based on status)
  - Credits with custom pipe formatting
  - Enrollment status
  - Show/Hide Details button
- Hover effect: Yellow background highlight
- Conditional styling:
  - Enrolled cards: Light green background
  - 4+ credits: Light yellow background
  - Left border color: Green/Red/Grey by status

---

**Framework:** Angular 20 (Standalone Components)
**Testing:** Open browser console to verify trackBy and check DOM updates

