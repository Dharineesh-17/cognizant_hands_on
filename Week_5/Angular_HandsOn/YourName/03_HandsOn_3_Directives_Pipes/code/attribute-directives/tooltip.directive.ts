import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input() appTooltip: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' = 'top';
  @Input() tooltipDelay: number = 300;
  @Input() tooltipColor: string = '#1e293b';

  private tooltipElement: HTMLElement | null = null;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    this.timeoutId = setTimeout(() => this.createTooltip(), this.tooltipDelay);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.removeTooltip();
  }

  private createTooltip(): void {
    if (this.tooltipElement || !this.appTooltip) return;

    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipElement, 'custom-tooltip');
    this.renderer.addClass(this.tooltipElement, `tooltip-${this.tooltipPosition}`);
    this.renderer.setStyle(this.tooltipElement, 'background-color', this.tooltipColor);
    this.renderer.setProperty(this.tooltipElement, 'textContent', this.appTooltip);
    this.renderer.appendChild(document.body, this.tooltipElement);

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    if (this.tooltipPosition === 'top') {
      this.renderer.setStyle(this.tooltipElement, 'top', `${hostPos.top - tooltipPos.height - 8}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${hostPos.left + hostPos.width / 2 - tooltipPos.width / 2}px`);
    } else {
      this.renderer.setStyle(this.tooltipElement, 'top', `${hostPos.bottom + 8}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${hostPos.left + hostPos.width / 2 - tooltipPos.width / 2}px`);
    }
  }

  private removeTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
