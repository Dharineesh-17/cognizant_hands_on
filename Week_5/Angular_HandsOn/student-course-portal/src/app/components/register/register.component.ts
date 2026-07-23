import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-page">
      <div class="register-container">
        <div class="register-card">
          <div class="register-header">
            <span class="register-icon">📚</span>
            <h1>Create Account</h1>
            <p>Join CourseHub and start learning today</p>
          </div>

          <form class="register-form" (ngSubmit)="onRegister()">
            <div class="name-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="John" [(ngModel)]="firstName" name="firstName" required>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Doe" [(ngModel)]="lastName" name="lastName" required>
              </div>
            </div>

            <div class="form-group">
              <label for="regEmail">Email Address</label>
              <input type="email" id="regEmail" placeholder="john.doe@email.com" [(ngModel)]="email" name="regEmail" required>
            </div>

            <div class="form-group">
              <label for="regPassword">Password</label>
              <input type="password" id="regPassword" placeholder="Min 8 characters" [(ngModel)]="password" name="regPassword" required minlength="8">
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Re-enter password" [(ngModel)]="confirmPassword" name="confirmPassword" required>
            </div>

            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="agreeTerms" name="agreeTerms">
              <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
            </label>

            <button type="submit" class="btn btn-primary btn-lg full-width" [disabled]="isLoading">
              <span *ngIf="!isLoading">Create Account</span>
              <span *ngIf="isLoading" class="spinner"></span>
            </button>

            <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>
          </form>

          <div class="register-footer">
            <p>Already have an account? <a [routerLink]="['/login']">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .register-page {
        min-height: 100vh; display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, #1e3a8a, #2563eb);
        padding: 2rem;
      }

      .register-card {
        background: white; border-radius: var(--border-radius-xl);
        padding: 2.5rem; width: 100%; max-width: 480px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.25);
      }

      .register-header {
        text-align: center; margin-bottom: 2rem;
        .register-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
        h1 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
        p { font-size: var(--font-size-sm); color: var(--text-secondary); }
      }

      .name-row {
        display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
      }

      .checkbox-label {
        display: flex; align-items: flex-start; gap: 0.5rem;
        font-size: var(--font-size-sm); color: var(--text-secondary);
        margin-bottom: 1.5rem; cursor: pointer;
        a { color: var(--primary-color); text-decoration: none; font-weight: 500; }
      }

      .full-width { width: 100%; }

      .error-message {
        margin-top: 1rem; padding: 0.75rem;
        background: #fee2e2; color: #991b1b;
        border-radius: var(--border-radius); font-size: var(--font-size-sm); text-align: center;
      }

      .spinner {
        display: inline-block; width: 20px; height: 20px;
        border: 2px solid rgba(255,255,255,0.3); border-top-color: white;
        border-radius: 50%; animation: spin 0.6s linear infinite;
      }

      @keyframes spin { to { transform: rotate(360deg); } }

      .register-footer {
        text-align: center; margin-top: 1.5rem; padding-top: 1.25rem;
        border-top: 1px solid var(--border-color);
        p { font-size: var(--font-size-sm); color: var(--text-secondary); }
        a { color: var(--primary-color); font-weight: 600; text-decoration: none; }
      }
    `,
  ],
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeTerms = false;
  isLoading = false;
  errorMessage = '';

  private router = inject(Router);

  onRegister(): void {
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    if (!this.agreeTerms) {
      this.errorMessage = 'Please agree to the Terms of Service';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoading = false;
      this.router.navigate(['/']);
    }, 1000);
  }
}
