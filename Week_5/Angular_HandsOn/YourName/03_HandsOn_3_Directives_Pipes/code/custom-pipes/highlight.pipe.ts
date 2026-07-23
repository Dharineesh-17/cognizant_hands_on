import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string, caseSensitive: boolean = false): string {
    if (!text || !search) return text;

    const flags = caseSensitive ? 'g' : 'gi';
    const pattern = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${pattern})`, flags);

    return text.replace(regex, '<mark class="highlight-match">$1</mark>');
  }
}
