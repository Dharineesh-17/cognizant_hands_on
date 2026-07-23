import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true,
})
export class FilterByPipe implements PipeTransform {
  transform<T extends Record<string, any>>(
    items: T[],
    key: string,
    value: any,
    strict: boolean = false
  ): T[] {
    if (!items || !key || value === undefined || value === null) return items;

    return items.filter(item => {
      const itemValue = item[key];
      if (strict) return itemValue === value;
      return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
    });
  }
}
