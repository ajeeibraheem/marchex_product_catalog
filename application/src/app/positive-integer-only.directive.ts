import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPositiveIntegerOnly]',
  standalone: true
})
export class PositiveIntegerOnlyDirective {
  private regex = /^[0-9]*$/;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const invalidKeys = ['-', '+', 'e', 'E', '.', ',', ' '];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/[^0-9]/g, '');
    const cursor = input.selectionStart ?? cleaned.length;
    input.value = cleaned;
    input.setSelectionRange(cursor, cursor);
  }
}
