# HandsOn 1: Environment Setup & First Component

## Objective
Set up your Angular development environment and create your first Angular component from scratch. By the end of this exercise, you will have a working Angular application running locally with a custom component displaying on the page.

## Prerequisites
- **Node.js** v18+ installed ([Download here](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)
- A code editor (VS Code recommended)
- Terminal / Command Prompt

---

## Steps

### Step 1: Verify Node.js Installation
Open your terminal and run:
```bash
node --version    # Should output v18.x.x or higher
npm --version     # Should output 9.x.x or higher
```

### Step 2: Install Angular CLI
```bash
npm install -g @angular/cli@18
```

Verify the installation:
```bash
ng version
```

### Step 3: Create a New Angular Project
```bash
ng new student-course-portal --routing --style=scss --standalone
```

When prompted:
- Choose your preferred package manager (npm recommended)
- Enable Server-Side Rendering (SSR)? → No (for learning purposes)

### Step 4: Navigate into the Project
```bash
cd student-course-portal
```

### Step 5: Understand the Project Structure
```
student-course-portal/
├── src/
│   ├── app/
│   │   ├── app.component.ts       ← Root component (TypeScript)
│   │   ├── app.component.html     ← Root component (Template)
│   │   ├── app.component.scss     ← Root component (Styles)
│   │   └── app.routes.ts          ← Application routes
│   ├── assets/                    ← Static assets (images, fonts)
│   ├── environments/              ← Environment configs
│   ├── index.html                 ← Entry HTML file
│   ├── main.ts                    ← Application bootstrap
│   └── styles.scss               ← Global styles
├── angular.json                   ← Angular workspace config
├── package.json                   ← Dependencies & scripts
├── tsconfig.json                  ← TypeScript config
└── .gitignore                     ← Git ignore rules
```

### Step 6: Create Your First Component
```bash
ng generate component components/hello-world
```

This creates 4 files:
- `hello-world.component.ts` — Component class with logic
- `hello-world.component.html` — Component template
- `hello-world.component.scss` — Component-specific styles
- `hello-world.component.spec.ts` — Unit test file

### Step 7: Edit the Hello World Component
Replace the auto-generated template with your own:

**`hello-world.component.ts`**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [],
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.scss'
})
export class HelloWorldComponent {
  name: string = 'Angular Developer';
  currentDate: Date = new Date();

  getGreeting(): string {
    const hour = this.currentDate.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }
}
```

**`hello-world.component.html`**
```html
<div class="hello-container">
  <h1>{{ getGreeting() }}, {{ name }}!</h1>
  <p>Welcome to your first Angular component.</p>
  <div class="info-card">
    <h2>Current Date & Time</h2>
    <p>{{ currentDate | date:'fullDate' }}</p>
    <p>{{ currentDate | date:'shortTime' }}</p>
  </div>
  <div class="tech-stack">
    <h3>Your Tech Stack</h3>
    <ul>
      <li>Angular {{ angularVersion }}</li>
      <li>TypeScript</li>
      <li>SCSS</li>
      <li>RxJS</li>
    </ul>
  </div>
</div>
```

**`hello-world.component.scss`**
```scss
.hello-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  font-family: 'Inter', sans-serif;

  h1 {
    color: #2563eb;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    font-size: 1.1rem;
  }

  .info-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border: 1px solid #e2e8f0;

    h2 { color: #1e293b; margin-bottom: 0.5rem; }
    p { margin: 0.25rem 0; font-weight: 500; }
  }

  .tech-stack {
    text-align: left;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);

    h3 { text-align: center; color: #1e293b; margin-bottom: 1rem; }
    ul { list-style: none; padding: 0; }

    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;

      &:before {
        content: '✓ ';
        color: #10b981;
        font-weight: bold;
      }

      &:last-child { border-bottom: none; }
    }
  }
}
```

### Step 8: Use the Component in App
Update `app.component.ts` to include your new component:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HelloWorldComponent],
  template: `
    <main>
      <app-hello-world></app-hello-world>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main { padding: 1rem; }
  `]
})
export class AppComponent {
  title = 'student-course-portal';
}
```

### Step 9: Run the Application
```bash
ng serve --open
```

Your browser will open at **http://localhost:4200**. You should see your Hello World component rendered!

---

## Key Concepts Learned

| Concept | Description |
|---------|-------------|
| **Component** | Building blocks of Angular apps (class + template + styles) |
| **@Component Decorator** | Metadata that tells Angular how to process the class |
| **selector** | Custom HTML tag to use the component |
| **standalone** | Component is self-contained (Angular 14+) |
| **Template Binding** | `{{ }}` for interpolation, `[]` for property binding, `()` for event binding |
| **Angular CLI** | Command-line tool for generating components, services, etc. |

---

## Useful Angular CLI Commands

| Command | Description |
|---------|-------------|
| `ng new <name>` | Create a new Angular project |
| `ng serve` | Start the development server |
| `ng build` | Build for production |
| `ng generate component <name>` | Create a new component |
| `ng generate service <name>` | Create a new service |
| `ng generate module <name>` | Create a new module |
| `ng test` | Run unit tests |
| `ng lint` | Lint the project |

---

## Troubleshooting

### Issue: `ng command not found`
**Solution:** Angular CLI not installed globally. Run `npm install -g @angular/cli@18`

### Issue: Port 4200 already in use
**Solution:** Kill the process or use `ng serve --port 4300` for a different port

### Issue: Node version too old
**Solution:** Install Node.js v18+ from [nodejs.org](https://nodejs.org/) or use nvm:
```bash
nvm install 18
nvm use 18
```

---

## Expected Output
See the `screenshots/` folder for expected output screenshots of this HandsOn exercise.

## Next Steps
Proceed to **HandsOn 2** to learn about Angular Routing and Navigation.
