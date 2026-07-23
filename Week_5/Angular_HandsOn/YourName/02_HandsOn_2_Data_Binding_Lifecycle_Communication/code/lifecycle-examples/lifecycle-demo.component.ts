import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lifecycle-demo.component.html',
  styleUrl: './lifecycle-demo.component.scss'
})
export class LifecycleDemoComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // @Input — triggers ngOnChanges when modified by parent
  @Input() courseTitle: string = 'Angular Fundamentals';
  @Input() studentCount: number = 100;

  // @ViewChild — access a DOM element afterViewInit
  @ViewChild('lifecycleLog') logContainer!: ElementRef<HTMLDivElement>;

  // Internal state
  logs: string[] = [];
  private changeDetectionCount = 0;
  isVisible: boolean = true;

  constructor() {
    this.addLog('1. constructor — Component instance created');
    console.log('LifecycleDemo: constructor');
  }

  // Called when ANY @Input property changes (first time + every subsequent change)
  ngOnChanges(changes: SimpleChanges): void {
    const courseTitleChange = changes['courseTitle'];
    const studentCountChange = changes['studentCount'];

    let message = '2. ngOnChanges — ';
    if (courseTitleChange?.isFirstChange()) {
      message += `First: courseTitle="${courseTitleChange.currentValue}"`;
    } else if (courseTitleChange) {
      message += `courseTitle: "${courseTitleChange.previousValue}" -> "${courseTitleChange.currentValue}"`;
    }
    if (studentCountChange) {
      message += ` | studentCount: ${studentCountChange.currentValue}`;
    }
    this.addLog(message);
    console.log('LifecycleDemo: ngOnChanges', changes);
  }

  // Called ONCE after first ngOnChanges — ideal for initial data fetching
  ngOnInit(): void {
    this.addLog('3. ngOnInit — Component initialized (fetch data here!)');
    console.log('LifecycleDemo: ngOnInit');
    // TYPICAL USES:
    // - HTTP calls to fetch initial data
    // - Initialize subscriptions
    // - Setup form controls
  }

  // Called during EVERY change detection cycle — use sparingly
  ngDoCheck(): void {
    this.changeDetectionCount++;
    if (this.changeDetectionCount % 5 === 0) {
      this.addLog(`4. ngDoCheck (change detection count: ${this.changeDetectionCount})`);
    }
  }

  // Called once after Angular projects external content into the view
  ngAfterContentInit(): void {
    this.addLog('5. ngAfterContentInit — External content projected');
    console.log('LifecycleDemo: ngAfterContentInit');
  }

  // Called after every check of projected content
  ngAfterContentChecked(): void {
    if (this.changeDetectionCount % 10 === 0) {
      this.addLog('6. ngAfterContentChecked — Projected content checked');
    }
  }

  // Called once after the component view AND its child views are initialized
  ngAfterViewInit(): void {
    this.addLog('7. ngAfterViewInit — View & child views are ready');
    console.log('LifecycleDemo: ngAfterViewInit');
    // DOM is available — safe to access ViewChild elements
    if (this.logContainer?.nativeElement) {
      console.log('Log container found:', !!this.logContainer.nativeElement);
    }
  }

  // Called after every check of the component view
  ngAfterViewChecked(): void {
    if (this.changeDetectionCount % 10 === 0) {
      this.addLog('8. ngAfterViewChecked — Component view checked');
    }
  }

  // Called just before Angular destroys the component
  ngOnDestroy(): void {
    this.addLog('9. ngOnDestroy — Component about to be destroyed!');
    console.log('LifecycleDemo: ngOnDestroy — CLEANUP HERE');
    // CRITICAL: You MUST cleanup here:
    // - Unsubscribe from Observables
    // - Clear intervals/timeouts
    // - Detach event listeners
    // - Abort pending HTTP requests
  }

  // ===== Demo Interaction Methods =====

  private addLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `[${timestamp}] ${message}`;
    this.logs.push(entry);
    if (this.logs.length > 50) {
      this.logs.shift();
    }
  }

  changeTitle(): void {
    this.courseTitle =
      this.courseTitle === 'Angular Fundamentals'
        ? 'React Advanced Patterns'
        : 'Angular Fundamentals';
  }

  incrementStudents(): void {
    this.studentCount += 10;
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    if (!this.isVisible) {
      this.addLog('>>> Section hidden (would trigger destroy with *ngIf on component)');
    } else {
      this.addLog('>>> Section shown again');
    }
  }

  clearLogs(): void {
    this.logs = [];
  }
}
