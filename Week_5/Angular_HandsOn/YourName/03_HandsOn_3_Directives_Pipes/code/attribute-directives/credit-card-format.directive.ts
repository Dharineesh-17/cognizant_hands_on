import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCreditCardFormat]',
  standalone: true,
})
export class CreditCardFormatDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(): void {
    const input = this.el.nativeElement;
    let value: string = input.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = formatted;
  }
}
