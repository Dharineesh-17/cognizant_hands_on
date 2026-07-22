import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <h3>📚 CourseHub</h3>
          <p>Empowering students with quality education and hands-on learning experiences.</p>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h4>Quick Links</h4>
            <a routerLink="/">Home</a>
            <a routerLink="/courses">Courses</a>
            <a routerLink="/students">Students</a>
            <a routerLink="/dashboard">Dashboard</a>
          </div>

          <div class="footer-column">
            <h4>Resources</h4>
            <a href="#">Documentation</a>
            <a href="#">API Reference</a>
            <a href="#">Tutorials</a>
            <a href="#">Blog</a>
          </div>

          <div class="footer-column">
            <h4>Contact</h4>
            <a href="#">support@coursehub.com</a>
            <a href="#">+1 (555) 123-4567</a>
            <a href="#">Help Center</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} CourseHub Student Portal. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: var(--text-primary);
        color: #cbd5e1;
        margin-top: auto;
      }

      .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 3rem 1.5rem 2rem;
        display: grid;
        grid-template-columns: 1.5fr 2fr;
        gap: 3rem;
      }

      .footer-brand h3 {
        font-size: 1.25rem;
        color: white;
        margin-bottom: 0.75rem;
      }

      .footer-brand p {
        font-size: 0.875rem;
        line-height: 1.6;
        max-width: 300px;
      }

      .footer-links {
        display: flex;
        gap: 3rem;
      }

      .footer-column {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        h4 {
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        a {
          font-size: 0.875rem;
          color: #94a3b8;
          text-decoration: none;
          transition: color var(--transition-fast);

          &:hover {
            color: white;
          }
        }
      }

      .footer-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1.25rem 1.5rem;
        text-align: center;
        font-size: 0.8125rem;

        p {
          max-width: 1200px;
          margin: 0 auto;
        }
      }

      @media (max-width: 768px) {
        .footer-container {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .footer-links {
          flex-wrap: wrap;
          gap: 2rem;
        }
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
