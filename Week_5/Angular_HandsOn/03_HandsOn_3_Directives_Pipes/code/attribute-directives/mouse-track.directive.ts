import { Directive, ElementRef, HostListener, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appMouseTrack]',
  standalone: true,
})
export class MouseTrackDirective {
  @Output() mousePosition = new EventEmitter<{ x: number; y: number; elementX: number; elementY: number }>();

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.renderer.setStyle(this.el.nativeElement, '--mouse-x', `${event.offsetX}px`);
    this.renderer.setStyle(this.el.nativeElement, '--mouse-y', `${event.offsetY}px`);
    this.mousePosition.emit({
      x: event.clientX,
      y: event.clientY,
      elementX: event.offsetX,
      elementY: event.offsetY,
    });
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.removeStyle(this.el.nativeElement, '--mouse-x');
    this.renderer.removeStyle(this.el.nativeElement, '--mouse-y');
  }
}
