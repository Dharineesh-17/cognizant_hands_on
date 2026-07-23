import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(hours: number, format: 'short' | 'long' = 'long'): string {
    if (!hours || hours <= 0) return '0h';

    const weeks = Math.floor(hours / 40);
    const days = Math.floor((hours % 40) / 8);
    const h = Math.floor(hours % 8);
    const m = Math.round((hours % 1) * 60);

    if (format === 'short') {
      let parts: string[] = [];
      if (weeks > 0) parts.push(`${weeks}w`);
      if (days > 0) parts.push(`${days}d`);
      if (h > 0 || parts.length === 0) parts.push(`${h}h`);
      if (m > 0) parts.push(`${m}m`);
      return parts.join(' ');
    }

    let parts: string[] = [];
    if (weeks > 0) parts.push(`${weeks} week${weeks > 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (h > 0 || parts.length === 0) parts.push(`${h} hour${h !== 1 ? 's' : ''}`);
    if (m > 0) parts.push(`${m} min`);
    return parts.join(', ');
  }
}
