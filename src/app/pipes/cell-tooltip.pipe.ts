import { Pipe, PipeTransform } from '@angular/core';
import { ColumnStructure } from '../models/column-structure.model';

@Pipe({
  name: 'cellTooltip',
  standalone: true
})
export class CellTooltipPipe implements PipeTransform {
  transform(rowData: any, column: ColumnStructure): string {
    if (!rowData || !column) {
      return '';
    }

    const value = rowData[column.field];

    // Return the value as tooltip for long text, or empty for short text
    if (typeof value === 'string' && value.length > 50) {
      return value;
    }

    return '';
  }
}