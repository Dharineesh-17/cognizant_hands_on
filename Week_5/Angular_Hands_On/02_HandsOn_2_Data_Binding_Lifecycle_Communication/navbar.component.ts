import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a class="navbar-brand" [routerLink]="['/']">
          <span class="brand-icon">📚</span>
          <span class="brand-text">CourseHub</span>
        </a>

        <button class="navbar-toggle" (click)="toggleMenu()" [attr.aria-expanded]="isMenuOpen()">
          <span class="hamburger" [class.active]="isMenuOpen()">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div class="navbar-menu" [class.open]="isMenuOpen()">
          <a class="nav-link"
             routerLink="/"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{ exact: true }">
            <span class="material-icons">home</span>
            Home
          </a>
          <a class="nav-link"
             routerLink="/courses"
             routerLinkActive="active">
            <span class="material-icons">school</span>
            Courses
          </a>
          <a class="nav-link"
             routerLink="/students"
             routerLinkActive="active">
            <span class="material-icons">people</span>
            Students
          </a>
          <a class="nav-link"
             routerLink="/dashboard"
             routerLinkActive="active">
            <span class="material-icons">dashboard</span>
            Dashboard
          </a>
        </div>

        <div class="navbar-actions">
          <a class="btn btn-primary btn-sm" routerLink="/login">Login</a>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--border-color);
        height: 70px;
      }

      .navbar-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
      }

      .navbar-brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        text-decoration: none;

        .brand-icon {
          font-size: 1.5rem;
        }

        .brand-text {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      .navbar-menu {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.5rem 0.875rem;
        border-radius: var(--border-radius);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
        text-decoration: none;
        transition: all var(--transition-fast);

        .material-icons {
          font-size: 18px;
        }

        &:hover {
          color: var(--primary-color);
          background: rgba(37, 99, 235, 0.05);
        }

        &.active {
          color: var(--primary-color);
          background: rgba(37, 99, 235, 0.1);
          font-weight: 600;
        }
      }

      .navbar-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
      }

      .hamburger {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 24px;

        span {
          display: block;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all var(--transition-fast);
        }

        &.active span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }
        &.active span:nth-child(2) {
          opacity: 0;
        }
        &.active span:nth-child(3) {
          transform: rotate(-45deg) translate(4px, -4px);
        }
      }

      @media (max-width: 768px) {
        .navbar-toggle {
          display: block;
        }
        .navbar-menu {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background: white;
          flex-direction: column;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: all var(--transition-normal);

          &.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
          }
        }
        .nav-link {
          width: 100%;
          padding: 0.75rem 1rem;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }
}
