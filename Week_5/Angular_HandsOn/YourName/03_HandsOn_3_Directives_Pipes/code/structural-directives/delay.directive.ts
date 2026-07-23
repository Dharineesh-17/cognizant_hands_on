import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDelay]',
  standalone: true,
})
export class DelayDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appDelay(ms: number) {
    this.viewContainer.clear();
    if (ms <= 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }
    setTimeout(() => {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }, ms);
  }
}
