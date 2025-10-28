import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldAccess',
  standalone: true
})
export class FieldAccessPipe implements PipeTransform {
  transform(obj: any, field: string): any {
    if (!obj || !field) {
      return '';
    }

    // Support nested field access with dot notation
    const fields = field.split('.');
    let result = obj;

    for (const f of fields) {
      result = result?.[f];
      if (result === undefined || result === null) {
        return '';
      }
    }

    return result;
  }
}