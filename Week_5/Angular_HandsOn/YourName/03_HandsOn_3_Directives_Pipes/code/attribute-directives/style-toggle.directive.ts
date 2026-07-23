import { Directive, Input, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appStyleToggle]',
  standalone: true,
})
export class StyleToggleDirective implements OnInit {
  @Input() toggleColor: string = '#2563eb';
  @Input() toggleScale: number = 1.02;
  @Input() toggleRadius: string = '12px';

  @HostBinding('style.transition') transition = 'all 0.25s ease';
  @HostBinding('style.borderRadius') borderRadius = this.toggleRadius;
  @HostBinding('class.style-toggle-active') isActive = false;

  ngOnInit(): void {
    this.borderRadius = this.toggleRadius;
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.isActive = true;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.isActive = false;
  }

  @HostListener('click') onClick(): void {
    this.isActive = !this.isActive;
  }
}
