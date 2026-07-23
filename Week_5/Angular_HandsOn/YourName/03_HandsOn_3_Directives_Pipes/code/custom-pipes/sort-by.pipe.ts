import { Pipe, PipeTransform } from '@angular/core';

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

@Pipe({
  name: 'sortBy',
  standalone: true,
})
export class SortByPipe implements PipeTransform {
  transform<T>(items: T[], config: SortConfig): T[] {
    if (!items || !config) return items;

    return [...items].sort((a, b) => {
      const aVal = a[config.key as keyof T];
      const bVal = b[config.key as keyof T];

      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      else if (aVal > bVal) comparison = 1;

      return config.direction === 'desc' ? -comparison : comparison;
    });
  }
}
