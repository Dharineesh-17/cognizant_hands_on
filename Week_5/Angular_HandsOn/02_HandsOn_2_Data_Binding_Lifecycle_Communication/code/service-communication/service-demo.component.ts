import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationService } from './communication.service';

@Component({
  selector: 'app-service-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-demo.component.html',
  styleUrl: './service-demo.component.scss'
})
export class ServiceDemoComponent implements OnDestroy {
  // Inject the shared service — same singleton instance across all components
  private commService = inject(CommunicationService);

  constructor() {
    this.commService.addNotification('ServiceDemoComponent initialized');
  }

  ngOnDestroy(): void {
    this.commService.addNotification('ServiceDemoComponent destroyed — this is where you clean up!');
  }

  // Expose service signals for the template
  get notifications() {
    return this.commService.getNotifications();
  }
  get notificationCount() {
    return this.commService.notificationCount();
  }
  get hasNotifications() {
    return this.commService.hasNotifications();
  }
  get activeUsers() {
    return this.commService.getActiveUsers();
  }
  get userStatus() {
    return this.commService.userStatus();
  }

  // Demo action methods
  addCustomNotification(): void {
    this.commService.addNotification('Custom notification from ServiceDemo');
  }

  clearAll(): void {
    this.commService.clearNotifications();
  }

  userJoin(): void {
    this.commService.userJoined();
  }

  userLeave(): void {
    this.commService.userLeft();
  }
}
