# HandsOn 3: Directives & Pipes

## Objective
Master Angular's two most powerful template transformation tools: **Pipes** (transform displayed data) and **Directives** (modify DOM elements and structure). You will learn to use built-in pipes, create custom pipes, understand attribute vs. structural directives, and build your own custom directives from scratch.

## Prerequisites
- Completed **HandsOn 1** and **HandsOn 2**
- Working `student-course-portal` project at `localhost:4200`
- Understanding of data binding (`{{ }}`, `[ ]`, `( )`, `[(ngModel)]`)

---

## Table of Contents
1. [Part A — Built-in Pipes](#part-a--built-in-pipes)
2. [Part B — Custom Pipes](#part-b--custom-pipes)
3. [Part C — Attribute Directives](#part-c--attribute-directives)
4. [Part D — Structural Directives](#part-d--structural-directives)
5. [Key Concepts Summary](#key-concepts-summary)
6. [Troubleshooting](#troubleshooting)

---

## Part A — Built-in Pipes

### Overview
Pipes transform data before it is displayed in the template. Angular ships with several built-in pipes.

| Pipe | Usage | Description |
|------|-------|-------------|
| `DatePipe` | `date : 'shortDate'` | Format dates |
| `UpperCasePipe` | `uppercase` | Convert to uppercase |
| `LowerCasePipe` | `lowercase` | Convert to lowercase |
| `TitleCasePipe` | `titlecase` | Title case first letter of each word |
| `SlicePipe` | `slice : 0 : 5` | Array/string slicing |
| `CurrencyPipe` | `currency : 'USD'` | Format as currency |
| `PercentPipe` | `percent : '1.2-2'` | Format as percentage |
| `DecimalPipe` | `number : '1.2-2'` | Format numbers |
| `JsonPipe` | `json` | Debug: stringify to JSON |
| `AsyncPipe` | `async` | Unwrap Observable/Promise |
| `ReplacePipe` | `replace` (Angular 19+) | Replace substring |
| `I18nPluralPipe` | `i18nPlural` | Pluralization |
| `I18nSelectPipe` | `i18nSelect` | Select by key |

---

### Step 1: Create the Built-in Pipes Demo Component

```bash
cd student-course-portal
ng generate component examples/built-in-pipes-demo
```

### Step 2: Implement the Component

**`built-in-pipes-demo.component.ts`**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of, interval } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-built-in-pipes-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './built-in-pipes-demo.component.html',
  styleUrl: './built-in-pipes-demo.component.scss'
})
export class BuiltInPipesDemoComponent {
  // DatePipe examples
  now: Date = new Date();
  enrollmentDate: Date = new Date(2024, 8, 1); // Sep 1, 2024
  courseDeadline: string = '2025-12-31T23:59:59';

  // String pipes
  studentName: string = 'alice williams';
  courseTitle: string = 'introduction to angular fundamentals';
  courseCategory: string = 'WEB DEVELOPMENT';

  // SlicePipe examples
  longDescription: string = 'Learn Angular from scratch. Build modern, reactive web applications with components, services, routing, and forms. This comprehensive course covers everything you need.';
  tags: string[] = ['Angular', 'TypeScript', 'RxJS', 'Forms', 'Routing', 'HTTP', 'Testing', 'NgRx'];
  topStudents: string[] = ['Alice Williams', 'Bob Martinez', 'Carol Nguyen', 'David Kim', 'Eva Brown', 'Frank Patel'];

  // CurrencyPipe / PercentPipe / DecimalPipe
  coursePrice: number = 49.99;
  annualSalary: number = 85000;
  completionRate: number = 0.785;
  gpa: number = 3.85432;
  totalEnrolled: number = 1234567;

  // JsonPipe — for debugging objects
  courseObject = {
    id: '1',
    title: 'Angular Fundamentals',
    instructor: 'Sarah Johnson',
    price: 49.99,
    enrolled: 156,
    tags: ['Angular', 'TypeScript'],
  };

  // AsyncPipe — unwrap Observable
  message$: Observable<string> = of('Data loaded from Observable!').pipe(delay(2000));
  clock$: Observable<Date> = interval(1000).pipe(map(() => new Date()));
  studentData$: Observable<any> = of({
    name: 'Alice Williams',
    course: 'Angular Fundamentals',
    progress: 65,
  }).pipe(delay(1500));

  // I18nPluralPipe
  enrolledCount: number = 0;
  courseCapacity: number = 200;

  // I18nSelectPipe
  studentGender: 'male' | 'female' | 'other' | 'unknown' = 'female';
  enrollmentStatus: 'active' | 'completed' | 'dropped' = 'active';

  genderMap = { male: 'Mr.', female: 'Ms.', other: 'Mx.', unknown: 'Student' };
  statusMap = { active: 'Currently studying', completed: 'Course finished', dropped: 'No longer enrolled' };

  // Interactive controls
  selectedDateFormat: string = 'mediumDate';
  selectedCurrency: string = 'USD';
  selectedLocale: string = 'en-US';
  sliceStart: number = 0;
  sliceEnd: number = 3;

  // Increment / Decrement methods
  incrementEnrolled(): void {
    if (this.enrolledCount < this.courseCapacity) this.enrolledCount++;
  }
  decrementEnrolled(): void {
    if (this.enrolledCount > 0) this.enrolledCount--;
  }
  cycleGender(): void {
    const genders = ['male', 'female', 'other', 'unknown'] as const;
    const idx = genders.indexOf(this.studentGender);
    this.studentGender = genders[(idx + 1) % genders.length];
  }
}
```

### Step 3: Build the Template

**`built-in-pipes-demo.component.html`**
```html
<div class="pipes-demo-container">

  <!-- ===================== DATE PIPE ===================== -->
  <section class="demo-section">
    <h2>1. DatePipe — date</h2>
    <p>Format Date objects and ISO strings using predefined or custom format strings.</p>
    <div class="demo-card">
      <div class="pipe-grid">
        <div class="pipe-item">
          <code>{{ '{{ now | date: "fullDate" }}' }}</code>
          <span class="result">{{ now | date:'fullDate' }}</span>
        </div>
        <div class="pipe-item">
          <code>{{ '{{ now | date: "shortDate" }}' }}</code>
          <span class="result">{{ now | date:'shortDate' }}</span>
        </div>
        <div class="pipe-item">
          <code>{{ '{{ now | date: "medium" }}' }}</code>
          <span class="result">{{ now | date:'medium' }}</span>
        </div>
        <div class="pipe-item">
          <code>{{ '{{ now | date: "yMMMd" }}' }}</code>
          <span class="result">{{ now | date:'yMMMd' }}</span>
        </div>
        <div class="pipe-item">
          <code>{{ '{{ now | date: "HH:mm:ss" }}' }}</code>
          <span class="result">{{ now | date:'HH:mm:ss' }}</span>
        </div>
        <div class="pipe-item">
          <code>{{ '{{ now | date: "MMMM yyyy" }}' }}</code>
          <span class="result">{{ now | date:'MMMM yyyy' }}</span>
        </div>
      </div>
    </div>
    <div class="code-hint">
      Common formats: <code>shortDate</code> | <code>mediumDate</code> | <code>longDate</code> | <code>fullDate</code> |
      <code>shortTime</code> | <code>mediumTime</code> | <code>HH:mm:ss</code> | <code>MMMM dd, yyyy</code>
    </div>
  </section>

  <!-- ===================== STRING PIPES ===================== -->
  <section class="demo-section">
    <h2>2. String Pipes — uppercase, lowercase, titlecase</h2>
    <p>Transform string casing in the template.</p>
    <div class="demo-card">
      <div class="pipe-grid">
        <div class="pipe-item">
          <span class="label">Original:</span>
          <span>{{ studentName }}</span>
        </div>
        <div class="pipe-item">
          <code>uppercase</code>
          <span class="result">{{ studentName | uppercase }}</span>
        </div>
        <div class="pipe-item">
          <code>titlecase</code>
          <span class="result">{{ studentName | titlecase }}</span>
        </div>
      </div>
      <div class="pipe-grid" style="margin-top: 1rem;">
        <div class="pipe-item">
          <span class="label">Category:</span>
          <span>{{ courseCategory }}</span>
        </div>
        <div class="pipe-item">
          <code>lowercase</code>
          <span class="result">{{ courseCategory | lowercase }}</span>
        </div>
        <div class="pipe-item">
          <code>titlecase</code>
          <span class="result">{{ courseCategory | titlecase }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== SLICE PIPE ===================== -->
  <section class="demo-section">
    <h2>3. SlicePipe — slice:start:end</h2>
    <p>Extract a subset of an array or string (similar to Array.slice()).</p>
    <div class="demo-card">
      <div class="slice-controls">
        <label>Start: <input type="number" [(ngModel)]="sliceStart" min="0" max="10" class="num-input"></label>
        <label>End: <input type="number" [(ngModel)]="sliceEnd" min="1" max="10" class="num-input"></label>
      </div>

      <div class="pipe-result-box">
        <h4>String slice:</h4>
        <p class="original">{{ longDescription }}</p>
        <p class="sliced">{{ longDescription | slice:sliceStart:sliceEnd }}<span class="ellipsis">...</span></p>
      </div>

      <div class="pipe-result-box">
        <h4>Array slice (top students):</h4>
        <div class="tag-list">
          <span class="tag" *ngFor="let student of topStudents | slice:sliceStart:sliceEnd">{{ student }}</span>
        </div>
        <p class="hint">Showing {{ sliceEnd - sliceStart }} of {{ topStudents.length }} students</p>
      </div>
    </div>
    <div class="code-hint">
      <code>{{ "{{ tags | slice:0:3 }}" }}</code> → shows first 3 elements |
      <code>{{ "{{ text | slice:0:50 }}" }}</code> → truncates text
    </div>
  </section>

  <!-- ===================== CURRENCY / PERCENT / DECIMAL ===================== -->
  <section class="demo-section">
    <h2>4. Currency, Percent & Number Pipes</h2>
    <p>Format numeric values for currency, percentages, and decimal numbers.</p>
    <div class="demo-card">
      <div class="pipe-grid">
        <div class="pipe-item wide">
          <span class="label">Course Price:</span>
          <code>{{ '{{ coursePrice | currency }}' }}</code>
          <span class="result">{{ coursePrice | currency }}</span>
        </div>
        <div class="pipe-item">
          <code>{{ '{{ coursePrice | currency:"EUR":"symbol":"1.2-2" }}' }}</code>
          <span class="result">{{ coursePrice | currency:'EUR':'symbol':'1.2-2' }}</span>
        </div>
        <div class="pipe-item">
          <code>{{ '{{ annualSalary | currency }}' }}</code>
          <span class="result">{{ annualSalary | currency }}</span>
        </div>
        <div class="pipe-item wide">
          <span class="label">Completion Rate:</span>
          <code>{{ '{{ completionRate | percent }}' }}</code>
          <span class="result">{{ completionRate | percent }}</span>
        </div>
        <div class="pipe-item">
          <code>{{ '{{ completionRate | percent:"1.2-2" }}' }}</code>
          <span class="result">{{ completionRate | percent:'1.2-2' }}</span>
        </div>
        <div class="pipe-item wide">
          <span class="label">GPA:</span>
          <code>{{ '{{ gpa | number:"1.2-2" }}' }}</code>
          <span class="result">{{ gpa | number:'1.2-2' }}</span>
        </div>
        <div class="pipe-item">
          <code>{{ '{{ gpa | number:"2.1-1" }}' }}</code>
          <span class="result">{{ gpa | number:'2.1-1' }}</span>
        </div>
        <div class="pipe-item wide">
          <span class="label">Total Enrolled:</span>
          <code>{{ '{{ totalEnrolled | number }}' }}</code>
          <span class="result">{{ totalEnrolled | number }}</span>
        </div>
      </div>
    </div>
    <div class="code-hint">
      <code>number:'1.2-2'</code> means: min 1 digit before decimal, min 2 / max 2 after decimal |
      <code>currency:'EUR'</code> uses Euro symbol
    </div>
  </section>

  <!-- ===================== JSON PIPE ===================== -->
  <section class="demo-section">
    <h2>5. JsonPipe — json</h2>
    <p>Convert any value to its JSON string representation. Perfect for debugging.</p>
    <div class="demo-card">
      <pre class="json-output">{{ courseObject | json }}</pre>
    </div>
    <div class="code-hint">
      Use <code>{{ '{{ data | json }}' }}</code> for debugging — it formats any object as pretty-printed JSON in the template.
    </div>
  </section>

  <!-- ===================== ASYNC PIPE ===================== -->
  <section class="demo-section">
    <h2>6. AsyncPipe — async</h2>
    <p>Automatically subscribe to an Observable or Promise and display the latest value. Handles subscription lifecycle for you.</p>
    <div class="demo-card">
      <div class="async-grid">
        <div class="async-item">
          <h4>Observable Message (2s delay)</h4>
          <p *ngIf="message$ | async as message; else loadingMsg" class="async-value">{{ message }}</p>
          <ng-template #loadingMsg>
            <span class="loading-spinner">Loading...</span>
          </ng-template>
        </div>
        <div class="async-item">
          <h4>Live Clock (updates every second)</h4>
          <p class="async-value clock">{{ clock$ | async | date:'HH:mm:ss' }}</p>
        </div>
        <div class="async-item">
          <h4>Student Data (1.5s delay)</h4>
          <div *ngIf="studentData$ | async as data; else loadingData" class="async-data-card">
            <p><strong>{{ data.name }}</strong></p>
            <p>Course: {{ data.course }}</p>
            <p>Progress: {{ data.progress }}%</p>
          </div>
          <ng-template #loadingData>
            <span class="loading-spinner">Fetching student data...</span>
          </ng-template>
        </div>
      </div>
    </div>
    <div class="code-hint">
      <code>{{ '{{ observable$ | async }}' }}</code> — auto-subscribes and auto-unsubscribes on destroy. No manual cleanup needed!
    </div>
  </section>

  <!-- ===================== I18N PLURAL / SELECT ===================== -->
  <section class="demo-section">
    <h2>7. I18n Plural & Select Pipes</h2>
    <p>Internationalize text based on numeric value or key selection.</p>
    <div class="demo-card">
      <div class="i18n-section">
        <div class="i18n-item">
          <h4>I18nPluralPipe</h4>
          <div class="counter-control">
            <button (click)="decrementEnrolled()">-</button>
            <span class="counter-value">{{ enrolledCount }}</span>
            <button (click)="incrementEnrolled()">+</button>
          </div>
          <p class="i18n-result">
            {{ enrolledCount | i18nPlural: {
              '=0': 'No students enrolled',
              '=1': 'One student enrolled',
              'other': '# students enrolled'
            } }}
          </p>
        </div>
        <div class="i18n-item">
          <h4>I18nSelectPipe</h4>
          <button (click)="cycleGender()" class="btn-toggle">Gender: {{ studentGender }}</button>
          <p class="i18n-result">
            {{ studentGender | i18nSelect: genderMap }} Alice Williams
          </p>
          <p class="i18n-result">
            Status: {{ enrollmentStatus | i18nSelect: statusMap }}
          </p>
        </div>
      </div>
    </div>
    <div class="code-hint">
      <code>{{ '{{ count | i18nPlural: mapping }}' }}</code> selects text by '=0', '=1', or 'other' |
      <code>{{ '{{ key | i18nSelect: mapping }}' }}</code> selects text by any key
    </div>
  </section>

</div>
```

### Step 4: Style the Demo

**`built-in-pipes-demo.component.scss`**
```scss
.pipes-demo-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Inter', sans-serif;

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

.demo-section { margin-bottom: 3rem; }

.demo-card {
  background: white;
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
  font-size: 0.8125rem;
  code {
    color: #38bdf8;
    font-family: 'Fira Code', monospace;
    font-size: 0.75rem;
  }
}

// Pipe Grid
.pipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

.pipe-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.625rem 0.875rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;

  &.wide { grid-column: span 2; @media (max-width: 500px) { grid-column: span 1; } }

  code {
    font-size: 0.6875rem;
    color: #8b5cf6;
    font-family: 'Fira Code', monospace;
    word-break: break-all;
  }

  .label {
    font-size: 0.6875rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  span { font-size: 0.875rem; color: #334155; }
  .result { font-weight: 600; color: #2563eb; }
}

// Slice Controls
.slice-controls {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: #475569;
    font-weight: 500;
  }
}

.num-input {
  width: 60px;
  padding: 0.375rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.875rem;
  text-align: center;
  &:focus { outline: none; border-color: #2563eb; }
}

.pipe-result-box {
  margin-bottom: 1.25rem;
  h4 { font-size: 0.8125rem; color: #475569; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
  .original { font-size: 0.8125rem; color: #94a3b8; margin-bottom: 0.25rem; }
  .sliced { font-size: 0.9375rem; color: #1e293b; font-weight: 500; }
  .ellipsis { color: #2563eb; }
  .hint { font-size: 0.6875rem; color: #94a3b8; margin-top: 0.5rem; }
}

.tag-list { display: flex; gap: 0.375rem; flex-wrap: wrap; }
.tag {
  background: #eff6ff;
  color: #2563eb;
  padding: 0.25rem 0.625rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
}

// JSON Output
.json-output {
  background: #0f172a;
  color: #e2e8f0;
  padding: 1.25rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.8125rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
}

// Async Pipe
.async-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.async-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  h4 { font-size: 0.8125rem; color: #475569; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
}

.async-value {
  font-size: 0.9375rem;
  color: #2563eb;
  font-weight: 600;
}

.async-value.clock {
  font-size: 2rem;
  text-align: center;
  font-family: 'Fira Code', monospace;
}

.async-data-card {
  p { margin: 0.25rem 0; font-size: 0.875rem; color: #334155; }
}

.loading-spinner {
  color: #94a3b8;
  font-size: 0.8125rem;
  font-style: italic;
}

// I18n
.i18n-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.i18n-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  h4 { font-size: 0.8125rem; color: #475569; margin-bottom: 0.75rem; text-transform: uppercase; }
}

.counter-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  button {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid #e2e8f0; background: white;
    cursor: pointer; font-size: 1.125rem; font-weight: 600;
    &:hover { background: #f1f5f9; }
  }
  .counter-value {
    font-size: 1.5rem; font-weight: 700; color: #2563eb;
    min-width: 40px; text-align: center;
  }
}

.btn-toggle {
  background: #f1f5f9; color: #334155;
  padding: 0.5rem 1rem; border: 1px solid #e2e8f0;
  border-radius: 8px; cursor: pointer; font-size: 0.8125rem;
  font-weight: 500; margin-bottom: 0.75rem;
  &:hover { background: #e2e8f0; }
}

.i18n-result {
  font-size: 0.875rem; color: #334155;
  &:first-of-type { font-weight: 500; }
}
```

---

## Part B — Custom Pipes

### Step 5: Create Custom Pipes

```bash
ng generate pipe pipes/highlight
ng generate pipe pipes/sort-by
ng generate pipe pipes/filter-by
ng generate pipe pipes/duration
```

### Step 6: Implement Custom Pipes

**`highlight.pipe.ts`** — Highlights matching text in a string
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string, caseSensitive: boolean = false): string {
    if (!text || !search) return text;

    const flags = caseSensitive ? 'g' : 'gi';
    const pattern = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${pattern})`, flags);

    return text.replace(regex, '<mark class="highlight-match">$1</mark>');
  }
}
```

**`sort-by.pipe.ts`** — Sort an array of objects by a key
```typescript
import { Pipe, PipeTransform } from '@angular/core';

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

@Pipe({
  name: 'sortBy',
  standalone: true
})
export class SortByPipe implements PipeTransform {
  transform<T>(items: T[], config: SortConfig): T[] {
    if (!items || !config) return items;

    return [...items].sort((a, b) => {
      const aVal = a[config.key as keyof T];
      const bVal = b[config.key as keyof T];

      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      else if (aVal > bVal) comparison = 1;

      return config.direction === 'desc' ? -comparison : comparison;
    });
  }
}
```

**`filter-by.pipe.ts`** — Filter array of objects by a property value
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {
  transform<T extends Record<string, any>>(
    items: T[],
    key: string,
    value: any,
    strict: boolean = false
  ): T[] {
    if (!items || !key || value === undefined || value === null) return items;

    return items.filter(item => {
      const itemValue = item[key];
      if (strict) return itemValue === value;
      return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
    });
  }
}
```

**`duration.pipe.ts`** — Format hours into human-readable duration
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(hours: number, format: 'short' | 'long' = 'long'): string {
    if (!hours || hours <= 0) return '0h';

    const weeks = Math.floor(hours / 40);
    const days = Math.floor((hours % 40) / 8);
    const h = Math.floor(hours % 8);
    const m = Math.round((hours % 1) * 60);

    if (format === 'short') {
      let parts: string[] = [];
      if (weeks > 0) parts.push(`${weeks}w`);
      if (days > 0) parts.push(`${days}d`);
      if (h > 0 || parts.length === 0) parts.push(`${h}h`);
      if (m > 0) parts.push(`${m}m`);
      return parts.join(' ');
    }

    let parts: string[] = [];
    if (weeks > 0) parts.push(`${weeks} week${weeks > 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (h > 0 || parts.length === 0) parts.push(`${h} hour${h !== 1 ? 's' : ''}`);
    if (m > 0) parts.push(`${m} min`);
    return parts.join(', ');
  }
}
```

### Step 7: Create the Custom Pipes Demo Component

```bash
ng generate component examples/custom-pipes-demo
```

**`custom-pipes-demo.component.ts`**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from '../../../pipes/highlight.pipe';
import { SortByPipe, SortConfig } from '../../../pipes/sort-by.pipe';
import { FilterByPipe } from '../../../pipes/filter-by.pipe';
import { DurationPipe } from '../../../pipes/duration.pipe';

interface DemoStudent {
  name: string;
  gpa: number;
  department: string;
  courses: number;
}

@Component({
  selector: 'app-custom-pipes-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightPipe, SortByPipe, FilterByPipe, DurationPipe],
  templateUrl: './custom-pipes-demo.component.html',
  styleUrl: './custom-pipes-demo.component.scss'
})
export class CustomPipesDemoComponent {
  // Highlight pipe
  searchText: string = 'angular';
  sampleText: string = 'Learn Angular from scratch. Master Angular components, services, and routing with this comprehensive Angular course.';

  // Sort & Filter pipe data
  students: DemoStudent[] = [
    { name: 'Alice Williams', gpa: 3.85, department: 'Computer Science', courses: 4 },
    { name: 'Bob Martinez', gpa: 3.40, department: 'Information Tech', courses: 3 },
    { name: 'Carol Nguyen', gpa: 3.92, department: 'Data Science', courses: 5 },
    { name: 'David Kim', gpa: 3.10, department: 'Software Eng', courses: 2 },
    { name: 'Eva Brown', gpa: 3.68, department: 'Design', courses: 3 },
    { name: 'Frank Patel', gpa: 3.55, department: 'Computer Science', courses: 4 },
  ];

  sortConfig: SortConfig = { key: 'gpa', direction: 'desc' };
  filterText: string = '';

  // Duration pipe
  courseDurations: number[] = [1.5, 4, 8, 24, 40, 65.5, 120, 200];
  selectedDurationFormat: 'long' | 'short' = 'long';
}
```

**`custom-pipes-demo.component.html`**
```html
<div class="custom-pipes-container">

  <!-- ===================== HIGHLIGHT PIPE ===================== -->
  <section class="demo-section">
    <h2>1. HighlightPipe — highlight:text</h2>
    <p>Wraps matching text in <code>&lt;mark&gt;</code> tags for search highlighting.</p>
    <div class="demo-card">
      <div class="form-group">
        <label>Search text to highlight:</label>
        <input type="text" [(ngModel)]="searchText" placeholder="Type 'angular'..." class="text-input">
      </div>
      <div class="highlight-result" [innerHTML]="sampleText | highlight:searchText"></div>
      <p class="hint-text">Try: angular, course, learn</p>
    </div>
  </section>

  <!-- ===================== SORT PIPE ===================== -->
  <section class="demo-section">
    <h2>2. SortByPipe — sortBy:config</h2>
    <p>Sort an array of objects by any property, ascending or descending.</p>
    <div class="demo-card">
      <div class="controls-row">
        <label>Sort by:
          <select [(ngModel)]="sortConfig.key" class="select-input">
            <option value="name">Name</option>
            <option value="gpa">GPA</option>
            <option value="department">Department</option>
            <option value="courses">Courses</option>
          </select>
        </label>
        <label>Direction:
          <select [(ngModel)]="sortConfig.direction" class="select-input">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <table class="demo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>GPA</th>
            <th>Department</th>
            <th>Courses</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let student of students | sortBy:sortConfig">
            <td>{{ student.name }}</td>
            <td [class.high-gpa]="student.gpa >= 3.7">{{ student.gpa.toFixed(2) }}</td>
            <td>{{ student.department }}</td>
            <td>{{ student.courses }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- ===================== FILTER PIPE ===================== -->
  <section class="demo-section">
    <h2>3. FilterByPipe — filterBy:key:value</h2>
    <p>Filter an array by a specific property value (case-insensitive by default).</p>
    <div class="demo-card">
      <div class="form-group">
        <label>Filter by department:</label>
        <input type="text" [(ngModel)]="filterText" placeholder="e.g. 'science', 'design', 'computer'" class="text-input">
      </div>
      <div class="filter-results">
        <div class="filter-card" *ngFor="let student of students | filterBy:'department':filterText">
          <span class="student-name">{{ student.name }}</span>
          <span class="student-dept">{{ student.department }}</span>
          <span class="student-gpa">{{ student.gpa }}</span>
        </div>
        <div class="empty-state" *ngIf="(students | filterBy:'department':filterText).length === 0">
          No students match "{{ filterText }}"
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== DURATION PIPE ===================== -->
  <section class="demo-section">
    <h2>4. DurationPipe — duration:format</h2>
    <p>Convert numeric hours into a human-readable duration string.</p>
    <div class="demo-card">
      <div class="controls-row">
        <label>Format:
          <select [(ngModel)]="selectedDurationFormat" class="select-input">
            <option value="long">Long (e.g. "2 weeks, 3 days, 4 hours")</option>
            <option value="short">Short (e.g. "2w 3d 4h")</option>
          </select>
        </label>
      </div>
      <div class="duration-list">
        <div class="duration-item" *ngFor="let hours of courseDurations">
          <span class="duration-hours">{{ hours }}h</span>
          <span class="duration-arrow">&rarr;</span>
          <span class="duration-result">{{ hours | duration:selectedDurationFormat }}</span>
        </div>
      </div>
    </div>
  </section>

</div>
```

**`custom-pipes-demo.component.scss`**
```scss
.custom-pipes-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Inter', sans-serif;

  h2 {
    color: #8b5cf6;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  > p { color: #64748b; margin-bottom: 1rem; }
}

.demo-section { margin-bottom: 3rem; }

.demo-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 0.75rem;
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
}

.text-input, .select-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.875rem;
  &:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1); }
}

.select-input { max-width: 300px; }

.controls-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #334155;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

// Highlight
.highlight-result {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #334155;
}

.hint-text {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.5rem;
}

// Table
.demo-table {
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 0.625rem 0.75rem;
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    background: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
  }

  td {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
  }

  .high-gpa { color: #10b981; font-weight: 700; }
}

// Filter Cards
.filter-results { display: flex; flex-direction: column; gap: 0.5rem; }

.filter-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.15s ease;
  &:hover { border-color: #8b5cf6; background: #faf5ff; }
}

.student-name { font-weight: 600; color: #1e293b; font-size: 0.875rem; }
.student-dept { color: #64748b; font-size: 0.8125rem; }
.student-gpa { font-weight: 700; color: #2563eb; font-size: 0.875rem; }

.empty-state {
  text-align: center;
  padding: 1.5rem;
  color: #94a3b8;
  font-size: 0.875rem;
}

// Duration
.duration-list { display: flex; flex-direction: column; gap: 0.5rem; }

.duration-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.625rem 0.875rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.duration-hours {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: #64748b;
  min-width: 60px;
}

.duration-arrow { color: #94a3b8; }

.duration-result {
  font-weight: 600;
  color: #8b5cf6;
  font-size: 0.875rem;
}
```

---

## Part C — Attribute Directives

### Overview
Attribute directives modify the appearance or behavior of a DOM element. They are applied as HTML attributes and don't create or destroy elements.

### Step 8: Create Custom Attribute Directives

**`style-toggle.directive.ts`** — Toggle CSS classes on hover/click
```typescript
import { Directive, Input, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appStyleToggle]',
  standalone: true
})
export class StyleToggleDirective implements OnInit {
  @Input() toggleColor: string = '#2563eb';
  @Input() toggleScale: number = 1.02;
  @Input() toggleRadius: string = '8px';
  @Input() toggleShadow: string = '0 4px 12px rgba(0, 0, 0, 0.15)';

  @HostBinding('style.transition') transition = 'all 0.25s ease';
  @HostBinding('style.borderRadius') borderRadius = this.toggleRadius;
  @HostBinding('class.style-toggle-active') isActive = false;

  ngOnInit(): void {
    this.borderRadius = this.toggleRadius;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.isActive = true;
    this.applyStyles(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isActive = false;
    this.applyStyles(false);
  }

  @HostListener('click') onClick() {
    this.isActive = !this.isActive;
    this.applyStyles(this.isActive);
  }

  private applyStyles(active: boolean): void {
    if (active) {
      this.toggleColor;
      this.toggleScale;
    }
  }
}
```

**`tooltip.directive.ts`** — Custom tooltip on hover
```typescript
import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() appTooltip: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() tooltipDelay: number = 300;
  @Input() tooltipColor: string = '#1e293b';

  private tooltipElement: HTMLElement | null = null;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.timeoutId = setTimeout(() => this.createTooltip(), this.tooltipDelay);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.removeTooltip();
  }

  private createTooltip(): void {
    if (this.tooltipElement || !this.appTooltip) return;

    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipElement, 'custom-tooltip');
    this.renderer.addClass(this.tooltipElement, `tooltip-${this.tooltipPosition}`);
    this.renderer.setStyle(this.tooltipElement, 'background-color', this.tooltipColor);
    this.renderer.setProperty(this.tooltipElement, 'textContent', this.appTooltip);

    this.renderer.appendChild(document.body, this.tooltipElement);

    // Position the tooltip
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    switch (this.tooltipPosition) {
      case 'top':
        this.renderer.setStyle(this.tooltipElement, 'top', `${hostPos.top - tooltipPos.height - 8}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${hostPos.left + hostPos.width / 2 - tooltipPos.width / 2}px`);
        break;
      case 'bottom':
        this.renderer.setStyle(this.tooltipElement, 'top', `${hostPos.bottom + 8}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${hostPos.left + hostPos.width / 2 - tooltipPos.width / 2}px`);
        break;
    }
  }

  private removeTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
```

**`mouse-track.directive.ts`** — Track mouse position within an element
```typescript
import { Directive, ElementRef, HostListener, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appMouseTrack]',
  standalone: true
})
export class MouseTrackDirective {
  @Output() mousePosition = EventEmitter<{ x: number; y: number; elementX: number; elementY: number }>();

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.el.nativeElement, '--mouse-x', `${event.offsetX}px`);
    this.renderer.setStyle(this.el.nativeElement, '--mouse-y', `${event.offsetY}px`);
    this.mousePosition.emit({
      x: event.clientX,
      y: event.clientY,
      elementX: event.offsetX,
      elementY: event.offsetY,
    });
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, '--mouse-x');
    this.renderer.removeStyle(this.el.nativeElement, '--mouse-y');
  }
}
```

**`credit-card-format.directive.ts`** — Auto-format credit card numbers
```typescript
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCreditCardFormat]',
  standalone: true
})
export class CreditCardFormatDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    let value: string = input.value.replace(/\D/g, '');

    // Limit to 16 digits
    value = value.substring(0, 16);

    // Format with spaces every 4 digits
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = formatted;
  }

  @HostListener('keydown.backspace', ['$event'])
  preventSpaceDeletion(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    if (input.selectionStart === input.selectionEnd && input.selectionStart > 0) {
      const beforeCursor = input.value.substring(0, input.selectionStart - 1);
      if (beforeCursor.endsWith(' ')) {
        input.setSelectionRange(input.selectionStart - 1, input.selectionStart - 1);
      }
    }
  }
}
```

### Step 9: Create the Attribute Directives Demo

```bash
ng generate component examples/attribute-directives-demo
```

**`attribute-directives-demo.component.ts`**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleToggleDirective } from '../../../directives/style-toggle.directive';
import { TooltipDirective } from '../../../directives/tooltip.directive';
import { MouseTrackDirective } from '../../../directives/mouse-track.directive';
import { CreditCardFormatDirective } from '../../../directives/credit-card-format.directive';

@Component({
  selector: 'app-attribute-directives-demo',
  standalone: true,
  imports: [
    CommonModule,
    StyleToggleDirective,
    TooltipDirective,
    MouseTrackDirective,
    CreditCardFormatDirective,
  ],
  templateUrl: './attribute-directives-demo.component.html',
  styleUrl: './attribute-directives-demo.component.scss'
})
export class AttributeDirectivesDemoComponent {
  cardNumber: string = '';

  // Mouse track
  trackX: number = 0;
  trackY: number = 0;

  onTrack(event: any): void {
    this.trackX = event.elementX;
    this.trackY = event.elementY;
  }
}
```

**`attribute-directives-demo.component.html`**
```html
<div class="directives-container">
  <h2>Attribute Directives</h2>
  <p>Custom attribute directives that modify the appearance and behavior of DOM elements.</p>

  <!-- Style Toggle -->
  <section class="demo-section">
    <h3>1. appStyleToggle</h3>
    <p>Hover or click to toggle visual effects on any element.</p>
    <div class="demo-card-grid">
      <div class="demo-card" appStyleToggle
           toggleColor="#2563eb" toggleRadius="12px">
        <h4>Blue Hover Effect</h4>
        <p>Hover or click me!</p>
      </div>
      <div class="demo-card" appStyleToggle
           toggleColor="#10b981" toggleRadius="50px">
        <h4>Green Pill Hover</h4>
        <p>Notice the border-radius change</p>
      </div>
      <div class="demo-card" appStyleToggle
           toggleColor="#8b5cf6" toggleScale="1.05">
        <h4>Purple Scale Effect</h4>
        <p>Slightly larger on hover</p>
      </div>
    </div>
  </section>

  <!-- Tooltip -->
  <section class="demo-section">
    <h3>2. appTooltip</h3>
    <p>Custom tooltip with configurable position, delay, and color.</p>
    <div class="demo-card-grid">
      <button appTooltip="Click to enroll in this course"
              tooltipPosition="top"
              tooltipColor="#2563eb"
              class="btn-demo">Enroll (top tooltip)</button>
      <button appTooltip="This course is very popular!"
              tooltipPosition="bottom"
              tooltipColor="#10b981"
              class="btn-demo btn-green">Popular (bottom)</button>
      <button appTooltip="Limited seats available"
              tooltipPosition="left"
              tooltipColor="#dc2626"
              class="btn-demo btn-red">Warning (left)</button>
      <span appTooltip="This is a text element with a tooltip"
            tooltipPosition="right"
            tooltipDelay="500"
            class="text-tooltip">Hover this text</span>
    </div>
  </section>

  <!-- Mouse Track -->
  <section class="demo-section">
    <h3>3. appMouseTrack</h3>
    <p>Track mouse position within an element and set CSS custom properties.</p>
    <div class="demo-card"
         appMouseTrack
         (mousePosition)="onTrack($event)"
         class="mouse-track-area">
      <p>Move your mouse here</p>
      <p class="track-coords">X: {{ trackX }}, Y: {{ trackY }}</p>
      <div class="cursor-glow"
           [style.left.px]="trackX"
           [style.top.px]="trackY"></div>
    </div>
  </section>

  <!-- Credit Card Format -->
  <section class="demo-section">
    <h3>4. appCreditCardFormat</h3>
    <p>Auto-formats input as credit card number (groups of 4 digits).</p>
    <div class="demo-card">
      <div class="form-group">
        <label>Card Number</label>
        <input type="text"
               appCreditCardFormat
               placeholder="0000 0000 0000 0000"
               class="card-input"
               maxlength="19">
      </div>
      <p class="hint-text">Type any digits — they will be auto-grouped in blocks of 4.</p>
    </div>
  </section>
</div>
```

**`attribute-directives-demo.component.scss`**
```scss
.directives-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Inter', sans-serif;

  h2 {
    color: #059669;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  > p { color: #64748b; margin-bottom: 1.5rem; }
}

.demo-section { margin-bottom: 3rem; }
.demo-section h3 {
  font-size: 1.125rem;
  color: #059669;
  margin-bottom: 0.25rem;
}
.demo-section > p { color: #64748b; font-size: 0.875rem; margin-bottom: 1rem; }

.demo-card-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.demo-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  cursor: pointer;
  flex: 1;
  min-width: 180px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  h4 { font-size: 0.9375rem; color: #1e293b; margin-bottom: 0.25rem; }
  p { font-size: 0.8125rem; color: #64748b; }
}

// Buttons
.btn-demo {
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: opacity 0.15s ease;
  &:hover { opacity: 0.9; }
}
.btn-green { background: #10b981; }
.btn-red { background: #dc2626; }

.text-tooltip {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border: 1px dashed #94a3b8;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #334155;
  cursor: help;
}

// Mouse Track
.mouse-track-area {
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
  border-color: #bbf7d0;
  overflow: hidden;
}

.track-coords {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: #059669;
  font-weight: 600;
}

.cursor-glow {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent);
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: left 0.05s linear, top 0.05s linear;
}

// Credit Card
.form-group {
  margin-bottom: 1rem;
  label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.375rem;
  }
}

.card-input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 1.25rem;
  letter-spacing: 2px;
  text-align: center;
  &:focus {
    outline: none;
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
  }
}

.hint-text { font-size: 0.75rem; color: #94a3b8; }

// Global tooltip styles (added via directive to document.body)
:host {
  ::ng-deep .custom-tooltip {
    position: fixed;
    z-index: 9999;
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    color: white;
    font-size: 0.75rem;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    white-space: nowrap;
    pointer-events: none;
    animation: tooltipFade 0.15s ease;
  }
  ::ng-deep .tooltip-top { transform: translateY(-4px); }
  ::ng-deep .tooltip-bottom { transform: translateY(4px); }
}

@keyframes tooltipFade {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

---

## Part D — Structural Directives

### Overview
Structural directives modify the DOM structure by adding, removing, or repeating elements. They start with an asterisk `*`.

| Built-in Structural | Purpose |
|-------------------|---------|
| `*ngIf` | Conditionally add/remove an element |
| `*ngFor` | Repeat an element for each item in a list |
| `*ngSwitch` | Display one of several alternatives |

### Step 10: Create Custom Structural Directives

**`unless.directive.ts`** — The opposite of `*ngIf`
```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
  standalone: true
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

**`repeat.directive.ts`** — Repeat an element N times
```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]',
  standalone: true
})
export class RepeatDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appRepeat(count: number) {
    this.viewContainer.clear();
    for (let i = 0; i < count; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: i,
        index: i,
        first: i === 0,
        last: i === count - 1,
        even: i % 2 === 0,
        odd: i % 2 !== 0,
        count: count,
      });
    }
  }
}
```

**`delay.directive.ts`** — Delay showing content
```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDelay]',
  standalone: true
})
export class DelayDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appDelay(ms: number) {
    this.viewContainer.clear();
    if (ms <= 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }
    setTimeout(() => {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }, ms);
  }
}
```

### Step 11: Create the Structural Directives Demo

```bash
ng generate component examples/structural-directives-demo
```

**`structural-directives-demo.component.ts`**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnlessDirective } from '../../../directives/unless.directive';
import { RepeatDirective } from '../../../directives/repeat.directive';
import { DelayDirective } from '../../../directives/delay.directive';

@Component({
  selector: 'app-structural-directives-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, UnlessDirective, RepeatDirective, DelayDirective],
  templateUrl: './structural-directives-demo.component.html',
  styleUrl: './structural-directives-demo.component.scss'
})
export class StructuralDirectivesDemoComponent {
  // Unless directive
  showContent: boolean = true;
  isAdmin: boolean = false;

  // Repeat directive
  repeatCount: number = 5;

  // Delay directive
  delayMs: number = 2000;
  showDelayed: boolean = false;
  delayTriggered: boolean = false;

  // NgSwitch
  selectedPlan: string = 'basic';
  plans = {
    basic: { name: 'Basic', price: 0, features: ['5 courses', 'Community support'] },
    pro: { name: 'Pro', price: 29, features: ['50 courses', 'Priority support', 'Certificates', 'Projects'] },
    enterprise: { name: 'Enterprise', price: 99, features: ['Unlimited courses', '24/7 support', 'Certificates', 'Projects', 'Mentorship', 'Team management'] },
  };

  // NgFor with index
  topCourses = [
    { title: 'Angular Fundamentals', students: 156 },
    { title: 'React Advanced', students: 98 },
    { title: 'Python Data Science', students: 210 },
    { title: 'AWS Cloud', students: 175 },
    { title: 'UI/UX Design', students: 132 },
  ];

  triggerDelay(): void {
    this.delayTriggered = true;
    this.showDelayed = false;
    setTimeout(() => { this.showDelayed = true; }, this.delayMs);
  }
}
```

**`structural-directives-demo.component.html`**
```html
<div class="structural-container">
  <h2>Structural Directives</h2>
  <p>Directives that modify the DOM structure by adding, removing, or repeating elements.</p>

  <!-- Built-in: *ngIf -->
  <section class="demo-section">
    <h3>Built-in: *ngIf</h3>
    <div class="demo-card">
      <div class="toggle-row">
        <button (click)="showContent = !showContent" class="btn-toggle">
          {{ showContent ? 'Hide Content' : 'Show Content' }}
        </button>
      </div>
      <div *ngIf="showContent; then contentBlock; else noContent"></div>
      <ng-template #contentBlock>
        <div class="content-block success">
          <h4>Content is Visible!</h4>
          <p>This element was added to the DOM because the condition is true.</p>
        </div>
      </ng-template>
      <ng-template #noContent>
        <div class="content-block warning">
          <h4>Content is Hidden</h4>
          <p>Element was removed from the DOM. The else block is shown instead.</p>
        </div>
      </ng-template>
    </div>
  </section>

  <!-- Built-in: *ngSwitch -->
  <section class="demo-section">
    <h3>Built-in: *ngSwitch</h3>
    <div class="demo-card">
      <div class="plan-selector">
        <button (click)="selectedPlan = 'basic'" [class.active]="selectedPlan === 'basic'" class="plan-btn">Basic</button>
        <button (click)="selectedPlan = 'pro'" [class.active]="selectedPlan === 'pro'" class="plan-btn">Pro</button>
        <button (click)="selectedPlan = 'enterprise'" [class.active]="selectedPlan === 'enterprise'" class="plan-btn">Enterprise</button>
      </div>
      <div [ngSwitch]="selectedPlan">
        <div *ngSwitchCase="'basic'" class="plan-card">
          <h4>{{ plans.basic.name }} Plan</h4>
          <p class="plan-price">Free</p>
          <ul>
            <li *ngFor="let feature of plans.basic.features">{{ feature }}</li>
          </ul>
        </div>
        <div *ngSwitchCase="'pro'" class="plan-card featured">
          <span class="popular-badge">Popular</span>
          <h4>{{ plans.pro.name }} Plan</h4>
          <p class="plan-price">${{ plans.pro.price }}/mo</p>
          <ul>
            <li *ngFor="let feature of plans.pro.features">{{ feature }}</li>
          </ul>
        </div>
        <div *ngSwitchCase="'enterprise'" class="plan-card">
          <h4>{{ plans.enterprise.name }} Plan</h4>
          <p class="plan-price">${{ plans.enterprise.price }}/mo</p>
          <ul>
            <li *ngFor="let feature of plans.enterprise.features">{{ feature }}</li>
          </ul>
        </div>
        <div *ngSwitchDefault class="plan-card">
          <p>Select a plan above</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Built-in: *ngFor with index -->
  <section class="demo-section">
    <h3>Built-in: *ngFor with index variables</h3>
    <div class="demo-card">
      <div class="course-rank-list">
        <div *ngFor="let course of topCourses; let i = index; let first = first; let last = last; let even = even; let odd = odd"
             class="rank-item"
             [class.first-item]="first"
             [class.last-item]="last"
             [class.even-item]="even"
             [class.odd-item]="odd">
          <span class="rank-number">{{ i + 1 }}</span>
          <span class="rank-title">{{ course.title }}</span>
          <span class="rank-students">{{ course.students }} students</span>
          <span class="rank-badge">
            {{ first ? 'Gold' : i === 1 ? 'Silver' : i === 2 ? 'Bronze' : even ? 'Even' : 'Odd' }}
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- Custom: *appUnless -->
  <section class="demo-section">
    <h3>Custom: *appUnless (opposite of *ngIf)</h3>
    <div class="demo-card">
      <div class="toggle-row">
        <label class="checkbox-label">
          <input type="checkbox" [(ngModel)]="isAdmin">
          <span>Is Admin?</span>
        </label>
      </div>
      <div *appUnless="isAdmin" class="unless-content">
        <div class="content-block info">
          <h4>Regular User View</h4>
          <p>You see the standard content because isAdmin is false.</p>
          <p>The *appUnless directive shows this block when the condition is <strong>false</strong>.</p>
        </div>
      </div>
      <div *ngIf="isAdmin" class="unless-content">
        <div class="content-block danger">
          <h4>Admin View</h4>
          <p>isAdmin is now true, so *appUnless hides the user view.</p>
          <p>This admin content is shown via *ngIf instead.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Custom: *appRepeat -->
  <section class="demo-section">
    <h3>Custom: *appRepeat</h3>
    <div class="demo-card">
      <div class="repeat-controls">
        <label>Repeat count:
          <input type="number" [(ngModel)]="repeatCount" min="1" max="10" class="num-input">
        </label>
      </div>
      <div class="repeat-grid">
        <div *appRepeat="repeatCount; let i = index; let first = first; let last = last; let even = even; let odd = odd; let count = count"
             class="repeat-item"
             [class.repeat-first]="first"
             [class.repeat-last]="last"
             [class.repeat-even]="even">
          <span class="repeat-num">{{ i + 1 }}</span>
          <span class="repeat-info">
            Index: {{ i }} | {{ even ? 'Even' : 'Odd' }}
            <span *ngIf="first">| First</span>
            <span *ngIf="last">| Last</span>
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- Custom: *appDelay -->
  <section class="demo-section">
    <h3>Custom: *appDelay</h3>
    <div class="demo-card">
      <div class="delay-controls">
        <label>Delay (ms):
          <input type="number" [(ngModel)]="delayMs" min="500" max="10000" step="500" class="num-input">
        </label>
        <button (click)="triggerDelay()" class="btn-toggle">Trigger Delay</button>
      </div>
      <div *ngIf="delayTriggered">
        <div *appDelay="delayMs" class="delay-content">
          <div class="content-block success">
            <h4>Content Appeared!</h4>
            <p>This content was delayed by {{ delayMs }}ms.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
```

**`structural-directives-demo.component.scss`**
```scss
.structural-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Inter', sans-serif;

  h2 {
    color: #dc2626;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  > p { color: #64748b; margin-bottom: 1.5rem; }
}

.demo-section { margin-bottom: 3rem; }
.demo-section h3 {
  font-size: 1.125rem;
  color: #dc2626;
  margin-bottom: 0.25rem;
}
.demo-section > p { color: #64748b; font-size: 0.875rem; margin-bottom: 1rem; }

.demo-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 0.75rem;
}

// Toggle / Controls
.toggle-row {
  margin-bottom: 1rem;
}

.btn-toggle {
  background: #f1f5f9;
  color: #334155;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 500;
  &:hover { background: #e2e8f0; }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #334155;
  cursor: pointer;
  input { width: 16px; height: 16px; }
}

.num-input {
  width: 70px;
  padding: 0.375rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.875rem;
  text-align: center;
  &:focus { outline: none; border-color: #dc2626; }
}

.repeat-controls, .delay-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: #475569;
    font-weight: 500;
  }
}

// Content Blocks
.content-block {
  padding: 1.25rem;
  border-radius: 8px;
  h4 { font-size: 0.9375rem; margin-bottom: 0.5rem; }
  p { font-size: 0.875rem; margin-bottom: 0.25rem; }
  &.success { background: #f0fdf4; border: 1px solid #bbf7d0; h4 { color: #166534; } p { color: #334155; } }
  &.warning { background: #fffbeb; border: 1px solid #fde68a; h4 { color: #92400e; } p { color: #334155; } }
  &.info    { background: #eff6ff; border: 1px solid #bfdbfe; h4 { color: #1e40af; } p { color: #334155; } }
  &.danger  { background: #fef2f2; border: 1px solid #fecaca; h4 { color: #991b1b; } p { color: #334155; } }
}

// Plan Selector
.plan-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.plan-btn {
  flex: 1;
  padding: 0.625rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8125rem;
  color: #334155;
  transition: all 0.15s ease;
  &:hover { border-color: #94a3b8; }
  &.active { border-color: #2563eb; background: #eff6ff; color: #2563eb; }
}

.plan-card {
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  position: relative;
  h4 { font-size: 1.0625rem; color: #1e293b; margin-bottom: 0.25rem; }
  .plan-price { font-size: 1.5rem; font-weight: 700; color: #2563eb; margin-bottom: 0.75rem; }
  &.featured { border-color: #2563eb; background: #f0f7ff; }
  ul { list-style: none; padding: 0; }
  li {
    padding: 0.375rem 0;
    font-size: 0.8125rem;
    color: #334155;
    &:before { content: '\2713 '; color: #10b981; font-weight: bold; }
  }
}

.popular-badge {
  position: absolute;
  top: -10px;
  right: 12px;
  background: #f59e0b;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
}

// Course Rank List
.course-rank-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rank-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  transition: background 0.15s ease;
  &:hover { background: #f8fafc; }
}

.rank-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  background: #e2e8f0;
  color: #475569;
}

.first-item .rank-number { background: #f59e0b; color: white; }

.rank-title { flex: 1; font-weight: 600; color: #1e293b; }
.rank-students { color: #64748b; }

.rank-badge {
  font-size: 0.6875rem;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-weight: 500;
}

.even-item { background: #f8fafc; }

// Repeat Grid
.repeat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.5rem;
}

.repeat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.8125rem;
  transition: all 0.15s ease;

  &.repeat-first { background: #eff6ff; border-color: #93c5fd; }
  &.repeat-last { background: #f0fdf4; border-color: #86efac; }
  &.repeat-even { background: #faf5ff; border-color: #d8b4fe; }
}

.repeat-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #dc2626;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.repeat-info {
  font-size: 0.75rem;
  color: #475569;
}

// Delay
.delay-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .plan-selector { flex-direction: column; }
  .demo-card-grid { flex-direction: column; }
  .course-rank-list { gap: 0; }
  .rank-item { border-radius: 0; }
  .repeat-grid { grid-template-columns: 1fr 1fr; }
}
```

---

## Key Concepts Summary

### Pipes Cheat Sheet

```
Built-in:
  {{ value | date:'shortDate' }}         — Format dates
  {{ value | uppercase }}                — String to UPPER
  {{ value | titlecase }}                — String to Title Case
  {{ value | slice:0:5 }}                — Slice string/array
  {{ value | currency:'USD' }}           — Format currency
  {{ value | percent:'1.2-2' }}          — Format percentage
  {{ value | number:'1.2-2' }}           — Format numbers
  {{ object | json }}                    — Debug as JSON
  {{ observable$ | async }}              — Unwrap Observable

Custom (create with @Pipe):
  {{ text | highlight:searchTerm }}      — Highlight search matches
  {{ items | sortBy:{key, direction} }}  — Sort by property
  {{ items | filterBy:'key':value }}     — Filter by property
  {{ hours | duration:'long' }}          — Format hours as duration
```

### Directives Cheat Sheet

```
Attribute Directives (modify element appearance/behavior):
  [appStyleToggle]         — Toggle hover/click effects
  [appTooltip]="text"      — Custom tooltip
  [appMouseTrack]          — Track mouse position
  [appCreditCardFormat]    — Auto-format input

Structural Directives (modify DOM structure):
  *ngIf="condition"               — Conditionally render
  *ngFor="let item of items"      — Loop through items
  *ngSwitch / *ngSwitchCase      — Switch between views
  *appUnless="condition"           — Opposite of *ngIf
  *appRepeat="count"              — Repeat N times
  *appDelay="milliseconds"        — Delay rendering
```

### How to Create

| Type | CLI Command | Decorator |
|------|-----------|-----------|
| Pipe | `ng generate pipe name` | `@Pipe({ name: 'name', standalone: true })` |
| Attribute Directive | `ng generate directive name` | `@Directive({ selector: '[name]', standalone: true })` |
| Structural Directive | Manual (no CLI shortcut) | `@Directive({ selector: '[name]', standalone: true })` + `TemplateRef` + `ViewContainerRef` |

---

## Troubleshooting

### Pipe change detection not updating
**Solution:** Pipes are pure by default. Use `pure: false` in the `@Pipe` decorator if your pipe depends on external mutable state. However, prefer `pure: true` for performance.

### Custom structural directive not rendering
**Solution:** Ensure you inject `TemplateRef` and `ViewContainerRef` in the constructor. Call `createEmbeddedView()` to render, and `clear()` to remove.

### Tooltip positioning is wrong
**Solution:** Ensure the directive appends the tooltip to `document.body` (not the component's template) so it isn't clipped by `overflow: hidden` containers.

### `*appRepeat` context variables not available
**Solution:** Use the syntax `*appRepeat="count; let i = index; let first = first"` to expose context variables created in `createEmbeddedView()`.

---

## Expected Output
See the `screenshots/` folder for expected screenshots:
- Built-in pipes: date formats, string transforms, currency formatting
- Custom pipes: search highlighting, sorted/filtered tables, duration formatting
- Attribute directives: hover effects, tooltips, mouse tracking, credit card input
- Structural directives: *ngIf toggle, *ngSwitch plans, *appUnless, *appRepeat, *appDelay

## Next Steps
Proceed to **HandsOn 4** to learn about Angular Services, HTTP Client, and RxJS Observables.
