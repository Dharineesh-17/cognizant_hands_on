import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-page">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <div class="not-found-actions">
          <button class="btn btn-primary btn-lg" [routerLink]="['/']">
            <span class="material-icons">home</span>
            Go to Home
          </button>
          <button class="btn btn-secondary btn-lg" [routerLink]="['/courses']">
            <span class="material-icons">school</span>
            Browse Courses
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .not-found-page {
        min-height: 70vh; display: flex; align-items: center; justify-content: center;
        text-align: center; padding: 2rem;
      }

      .error-code {
        font-size: 8rem; font-weight: 700;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text; line-height: 1; margin-bottom: 1rem;
      }

      h1 {
        font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;
      }

      p {
        font-size: var(--font-size-base); color: var(--text-secondary);
        max-width: 400px; margin: 0 auto 2rem;
      }

      .not-found-actions {
        display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
      }
    `,
  ],
})
export class NotFoundComponent {}
