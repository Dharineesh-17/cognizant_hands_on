import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-container">
        <div class="login-card">
          <div class="login-header">
            <span class="login-icon">📚</span>
            <h1>Welcome Back</h1>
            <p>Sign in to your CourseHub account</p>
          </div>

          <form class="login-form" (ngSubmit)="onLogin()">
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" [(ngModel)]="email" name="email" required>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <div class="password-field">
                <input [type]="showPassword ? 'text' : 'password'" id="password"
                       placeholder="Enter your password" [(ngModel)]="password" name="password" required>
                <button type="button" class="toggle-password" (click)="showPassword = !showPassword">
                  <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="rememberMe" name="remember">
                <span>Remember me</span>
              </label>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" class="btn btn-primary btn-lg full-width" [disabled]="isLoading">
              <span *ngIf="!isLoading">Sign In</span>
              <span *ngIf="isLoading" class="spinner"></span>
            </button>

            <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>
          </form>

          <div class="login-footer">
            <p>Don't have an account? <a [routerLink]="['/register']">Create one</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-page {
        min-height: 100vh; display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, #1e3a8a, #2563eb);
        padding: 2rem;
      }

      .login-card {
        background: white; border-radius: var(--border-radius-xl);
        padding: 2.5rem; width: 100%; max-width: 440px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.25);
      }

      .login-header {
        text-align: center; margin-bottom: 2rem;
        .login-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
        h1 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
        p { font-size: var(--font-size-sm); color: var(--text-secondary); }
      }

      .password-field {
        position: relative;
        input { padding-right: 2.5rem; }
        .toggle-password {
          position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; padding: 0.25rem;
          .material-icons { font-size: 20px; color: var(--text-light); }
        }
      }

      .form-options {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 1.5rem;
      }

      .checkbox-label {
        display: flex; align-items: center; gap: 0.5rem;
        font-size: var(--font-size-sm); color: var(--text-secondary); cursor: pointer;
      }

      .forgot-link {
        font-size: var(--font-size-sm); color: var(--primary-color); font-weight: 500;
        &:hover { color: var(--primary-dark); }
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

      .login-footer {
        text-align: center; margin-top: 1.5rem; padding-top: 1.25rem;
        border-top: 1px solid var(--border-color);
        p { font-size: var(--font-size-sm); color: var(--text-secondary); }
        a { color: var(--primary-color); font-weight: 600; text-decoration: none; }
      }
    `,
  ],
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  private router = inject(Router);

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    // Simulate login
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoading = false;
      this.router.navigate(['/']);
    }, 1000);
  }
}
