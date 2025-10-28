import { FilterDictionary } from './filter-meta.model';
import { PageRequest } from './page-request.model';
import { SortMeta } from './sort-meta.model';

export interface ColumnStructure {
  field: string;
  header: string;
  dbColumn?: string;
  displayType?: 'text' | 'number' | 'date' | 'checkbox' | 'link' | 'dropdown' | 'custom';
  displayOption?: string;
  canSort?: boolean;
  defaultSortOrder?: number;
  sortAscending?: boolean;
  matchMode?: string;
  dropdownFilterOptions?: string;
  dropdownEditOptions?: string;
  cellClass?: string;
  width?: string;
  routePath?: string;
  queryParamFields?: string[];
  // Enhanced styling options
  cellStyle?: string;           // Free-form CSS styles
  textAlign?: 'left' | 'center' | 'right';
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder';
  backgroundColor?: string;     // Background color
  textColor?: string;          // Text color
  fontSize?: string;           // Font size (e.g., '12px', '1.2em')
}

export class ReportRequestEventData {
  filters: FilterDictionary = {};
  pageRequest: PageRequest = new PageRequest();
  multiSortMeta: SortMeta[] = [];
}