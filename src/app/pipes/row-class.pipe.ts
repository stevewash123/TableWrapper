import { Pipe, PipeTransform } from '@angular/core';
import { ColumnStructure } from '../models/column-structure.model';

@Pipe({
  name: 'rowClass',
  standalone: true
})
export class RowClassPipe implements PipeTransform {
  transform(rowData: any, columns: ColumnStructure[]): string {
    if (!rowData || !columns) {
      return '';
    }

    // Basic row styling based on data
    // You can extend this logic based on your needs
    return '';
  }
}