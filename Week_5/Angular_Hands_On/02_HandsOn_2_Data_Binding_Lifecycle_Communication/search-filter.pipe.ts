import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true,
})
export class SearchFilterPipe implements PipeTransform {
  transform<T extends Record<string, any>>(
    items: T[],
    searchText: string,
    searchKeys: string[] = []
  ): T[] {
    if (!items || !searchText) return items;
    const lowerSearch = searchText.toLowerCase();

    return items.filter((item) => {
      if (searchKeys.length === 0) {
        return Object.values(item).some(
          (val) =>
            val != null &&
            String(val).toLowerCase().includes(lowerSearch)
        );
      }
      return searchKeys.some((key) => {
        const val = item[key];
        return val != null && String(val).toLowerCase().includes(lowerSearch);
      });
    });
  }
}
