import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ColumnStructure } from '../../models/column-structure.model';

@Component({
  selector: 'column-config-panel',
  templateUrl: './column-config-panel.component.html',
  styleUrls: ['./column-config-panel.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzModalModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    NzToolTipModule,
    NzSpaceModule,
    NzGridModule,
    NzTabsModule
  ]
})
export class ColumnConfigPanelComponent {
  @Input() columns: ColumnStructure[] = [];
  @Input() title: string = 'Column Configuration';

  editingColumn: ColumnStructure | null = null;
  isEditModalVisible = false;

  displayTypeOptions = [
    { label: 'Text', value: 'text' },
    { label: 'Number', value: 'number' },
    { label: 'Date', value: 'date' },
    { label: 'Checkbox', value: 'checkbox' },
    { label: 'Dropdown', value: 'dropdown' },
    { label: 'Link', value: 'link' },
    { label: 'Custom', value: 'custom' }
  ];

  filterModeOptions = [
    { label: 'None', value: null },
    { label: 'Contains', value: 'contains' },
    { label: 'Equals', value: 'equals' },
    { label: 'Starts With', value: 'startsWith' }
  ];

  dateFormatOptions = [
    { label: 'Short (12/25/2023)', value: 'short' },
    { label: 'Medium (Dec 25, 2023)', value: 'medium' },
    { label: 'Long (December 25, 2023)', value: 'long' },
    { label: 'Medium Date', value: 'mediumDate' },
    { label: 'Short Date', value: 'shortDate' }
  ];

  textAlignOptions = [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' }
  ];

  fontWeightOptions = [
    { label: 'Normal', value: 'normal' },
    { label: 'Bold', value: 'bold' },
    { label: 'Lighter', value: 'lighter' },
    { label: 'Bolder', value: 'bolder' }
  ];

  presetStyles = [
    { label: 'Default', value: '', preview: 'Normal text' },
    { label: 'Important (Red Bold)', value: 'color: #ff4d4f; font-weight: bold;', preview: 'Important text' },
    { label: 'Success (Green)', value: 'color: #52c41a; font-weight: 500;', preview: 'Success text' },
    { label: 'Warning (Orange)', value: 'color: #fa8c16; font-weight: 500;', preview: 'Warning text' },
    { label: 'Muted (Gray)', value: 'color: #8c8c8c; font-style: italic;', preview: 'Muted text' },
    { label: 'Currency (Green Bold)', value: 'color: #389e0d; font-weight: bold; text-align: right;', preview: '$1,234.56' },
    { label: 'Highlight (Yellow BG)', value: 'background-color: #fff7e6; padding: 2px 4px; border-radius: 3px;', preview: 'Highlighted' },
    { label: 'Badge (Blue BG)', value: 'background-color: #1890ff; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;', preview: 'Badge' },
    { label: 'Code Style', value: 'font-family: monospace; background-color: #f5f5f5; padding: 2px 4px; border-radius: 3px;', preview: 'code' }
  ];

  constructor(private modal: NzModalService) {}

  getDisplayTypeColor(displayType: string | undefined): string {
    if (!displayType) return 'default';
    const colorMap: { [key: string]: string } = {
      'text': 'blue',
      'number': 'green',
      'date': 'orange',
      'checkbox': 'purple',
      'dropdown': 'cyan',
      'link': 'red',
      'custom': 'magenta'
    };
    return colorMap[displayType] || 'default';
  }

  getFeatureList(column: ColumnStructure): string[] {
    const features: string[] = [];

    if (column.canSort) features.push('Sortable');
    if (column.matchMode) features.push('Filterable');
    if (column.dropdownFilterOptions) features.push('Dropdown Filter');
    if (column.routePath) features.push('Linkable');
    if (column.defaultSortOrder) features.push(`Default Sort #${column.defaultSortOrder}`);
    if (column.width) features.push('Fixed Width');
    if (column.displayOption) features.push('Custom Format');

    return features;
  }

  get sortableCount(): number {
    return this.columns.filter(c => c.canSort).length;
  }

  get filterableCount(): number {
    return this.columns.filter(c => c.matchMode).length;
  }

  onColumnClick(column: ColumnStructure): void {
    this.showColumnEditDialog(column);
  }

  showColumnEditDialog(column: ColumnStructure): void {
    // Create a copy of the column to edit
    this.editingColumn = { ...column };
    this.isEditModalVisible = true;
  }

  handleEditCancel(): void {
    this.isEditModalVisible = false;
    this.editingColumn = null;
  }

  handleEditOk(): void {
    if (this.editingColumn) {
      // Find the original column and update it
      const index = this.columns.findIndex(c => c.field === this.editingColumn!.field);
      if (index !== -1) {
        this.columns[index] = { ...this.editingColumn };
      }

      // Show success message
      this.modal.success({
        nzTitle: 'Column Updated',
        nzContent: `Column "${this.editingColumn.field}" has been updated successfully.`,
        nzOkText: 'Close'
      });
    }

    this.isEditModalVisible = false;
    this.editingColumn = null;
  }

  applyPresetStyle(styleValue: string): void {
    if (this.editingColumn) {
      this.editingColumn.cellStyle = styleValue;
    }
  }

  getComputedCellStyle(): string {
    if (!this.editingColumn) return '';

    let style = '';

    // Add individual style properties
    if (this.editingColumn.textAlign) {
      style += `text-align: ${this.editingColumn.textAlign}; `;
    }
    if (this.editingColumn.fontWeight) {
      style += `font-weight: ${this.editingColumn.fontWeight}; `;
    }
    if (this.editingColumn.backgroundColor) {
      style += `background-color: ${this.editingColumn.backgroundColor}; `;
    }
    if (this.editingColumn.textColor) {
      style += `color: ${this.editingColumn.textColor}; `;
    }
    if (this.editingColumn.fontSize) {
      style += `font-size: ${this.editingColumn.fontSize}; `;
    }

    // Add free-form style (this takes precedence)
    if (this.editingColumn.cellStyle) {
      style += this.editingColumn.cellStyle;
    }

    return style;
  }

  clearAllStyles(): void {
    if (this.editingColumn) {
      this.editingColumn.cellStyle = '';
      this.editingColumn.textAlign = undefined;
      this.editingColumn.fontWeight = undefined;
      this.editingColumn.backgroundColor = '';
      this.editingColumn.textColor = '';
      this.editingColumn.fontSize = '';
    }
  }
}