import { Injectable, signal, computed } from '@angular/core';

/**
 * CommunicationService — A shared singleton service
 * Demonstrates how unrelated components can communicate
 * by sharing state through an injectable service.
 *
 * Key pattern: providedIn: 'root' ensures a single instance
 * is shared across the entire application.
 */
@Injectable({ providedIn: 'root' })
export class CommunicationService {
  // ===== Shared State using Angular Signals =====
  private notifications = signal<string[]>([]);
  private activeUsers = signal<number>(0);

  // Read-only computed signals (derived state)
  readonly notificationCount = computed(() => this.notifications().length);
  readonly hasNotifications = computed(() => this.notifications().length > 0);
  readonly userStatus = computed(() =>
    this.activeUsers() > 0
      ? `${this.activeUsers()} user${this.activeUsers() > 1 ? 's' : ''} online`
      : 'No users online'
  );

  // ===== Notification Methods =====

  getNotifications(): string[] {
    return this.notifications();
  }

  addNotification(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.notifications.update(prev => [
      `[${timestamp}] ${message}`,
      ...prev,
    ]);
    // Keep at most 50 notifications
    if (this.notifications().length > 50) {
      this.notifications.update(prev => prev.slice(0, 50));
    }
    console.log('CommunicationService: Notification added —', message);
  }

  clearNotifications(): void {
    this.notifications.set([]);
    console.log('CommunicationService: All notifications cleared');
  }

  removeNotification(index: number): void {
    this.notifications.update(prev => prev.filter((_, i) => i !== index));
  }

  // ===== User Tracking Methods =====

  getActiveUsers(): number {
    return this.activeUsers();
  }

  userJoined(): void {
    this.activeUsers.update(n => n + 1);
    this.addNotification('A new user joined the platform');
  }

  userLeft(): void {
    this.activeUsers.update(n => Math.max(0, n - 1));
    this.addNotification('A user left the platform');
  }

  resetUsers(): void {
    this.activeUsers.set(0);
  }
}
