import { SortMeta } from './sort-meta.model';
import { FilterMeta } from './filter-meta.model';

export class PageRequest {
  pageIndex: number = 1;
  pageSize: number = 50;
  sorts: SortMeta[] = [];
  filters: FilterMeta[] = [];

  constructor(pageIndex: number = 1, pageSize: number = 50) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }
}