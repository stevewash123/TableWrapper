import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { PageRequest } from '../../models/page-request.model';
import { IPagedGridRow } from '../../models/paged-grid-row.interface';
import { ColumnStructure } from '../../models/column-structure.model';
import { FilterDictionary, FilterMeta } from '../../models/filter-meta.model';
import { SelectItem } from '../../models/select-item.model';
import { SortMeta } from '../../models/sort-meta.model';

import { FieldAccessPipe } from '../../pipes/field-access.pipe';
import { CellTooltipPipe } from '../../pipes/cell-tooltip.pipe';
import { RowClassPipe } from '../../pipes/row-class.pipe';

@Component({
    selector: 'paged-grid',
    templateUrl: './paged-grid.component.html',
    styleUrls: ['./paged-grid.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NzTableModule,
        NzSelectModule,
        NzInputModule,
        NzDatePickerModule,
        NzCheckboxModule,
        NzButtonModule,
        NzToolTipModule,
        FieldAccessPipe,
        CellTooltipPipe,
        RowClassPipe
    ]
})
export class PagedGridComponent<T extends IPagedGridRow> implements OnInit, OnChanges {
    @Input() gridColumns: ColumnStructure[] = [];
    @Input() data: T[] = [];
    @Input() totalCount: number = 0;
    @Input() optionLists: Map<string, Array<SelectItem>> = new Map<string, Array<SelectItem>>();

    @Input() pageLinks: number = 3;
    @Input() pageSizes: number[] = [50, 100, 250];
    @Input() rowsShown: number = 50;
    @Input() loading: boolean = false;
    @Input() allowRowSelection: boolean = false;

    @Output() onDataRequested: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
    @Output() onRowSelect: EventEmitter<T> = new EventEmitter<T>();

    // NgZorro specific properties
    public pageSize: number = 50;
    public pageIndex: number = 1;
    public displayTotalCountText: string = '';

    // Filter values
    public textFilterValues: { [key: string]: string } = {};
    public dropdownFilterValues: { [key: string]: any } = {};
    public dateFilterValues: { [key: string]: Date } = {};

    // Debouncing for filters
    private filterTimeout: any;
    private lastFilterRequest: string = '';

    // Sort tracking
    public currentSort: NzTableQueryParams | null = null;

    public currentFilters: FilterDictionary = {};
    private _filters: FilterDictionary = {};

    public selectedItem: T | null = null;
    private _pageRequest: PageRequest = new PageRequest(1, 50);

    constructor() { }

    ngOnInit(): void {
        this.pageSize = this.rowsShown;
        this._pageRequest.pageSize = this.rowsShown;

        // Set initial sorts
        const initialSorts = this.gridColumns
            .filter((c: ColumnStructure) => c.defaultSortOrder && c.defaultSortOrder > 0)
            .sort((a, b) => (a.defaultSortOrder || 0) - (b.defaultSortOrder || 0))
            .map((c: ColumnStructure) => ({
                field: c.dbColumn || c.field,
                order: c.sortAscending ? 1 : -1
            } as SortMeta));

        this._pageRequest.sorts = initialSorts;
        this.updateDisplayTotalCountText();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && this.allowRowSelection) {
            if (this.data && this.data.length > 0) {
                this.selectedItem = this.data[0];
                this.onRowSelect.emit(this.data[0]);
            }
        }
        if (changes['totalCount']) {
            this.updateDisplayTotalCountText();
        }
    }

    private updateDisplayTotalCountText(): void {
        this.displayTotalCountText = this.totalCount > 0 ? this.totalCount + ' records' : 'No records';
    }

    onQueryParamsChange(params: NzTableQueryParams): void {
        const { pageSize, pageIndex, sort } = params;

        this.currentSort = params;
        this._pageRequest.pageIndex = pageIndex;
        this._pageRequest.pageSize = pageSize;

        // Convert NgZorro sort to our SortMeta format
        const sorts: SortMeta[] = [];
        sort.forEach(s => {
            if (s.value) {
                sorts.push({
                    field: s.key,
                    order: s.value === 'ascend' ? 1 : -1
                } as SortMeta);
            }
        });
        this._pageRequest.sorts = sorts;

        // Convert filters to array format expected by PageRequest
        const filterArray: FilterMeta[] = [];
        Object.keys(this._filters).forEach(key => {
            const filterValue = this._filters[key];

            if (Array.isArray(filterValue)) {
                filterValue.forEach(f => {
                    filterArray.push({
                        fieldName: f.fieldName,
                        value: f.value,
                        matchMode: f.matchMode
                    });
                });
            } else {
                filterArray.push({
                    fieldName: filterValue.fieldName,
                    value: filterValue.value,
                    matchMode: filterValue.matchMode
                });
            }
        });
        this._pageRequest.filters = filterArray;
        this.onDataRequested.emit(this._pageRequest);
    }

    // Row selection
    onRowClick(rowData: T): void {
        if (this.allowRowSelection) {
            this.selectedItem = rowData;
            this.onRowSelect.emit(rowData);
        }
    }

    // Input change handlers with debouncing
    onInputChange(event: Event, column: ColumnStructure): void {
        const target = event.target as HTMLInputElement;
        const value = target.value;

        this.textFilterValues[column.field] = value;
        this.applyTextFilterWithDebounce(column, 300);
    }

    onInputKeyUp(event: KeyboardEvent, column: ColumnStructure): void {
        if (event.key === 'Enter') {
            if (this.filterTimeout) {
                clearTimeout(this.filterTimeout);
            }
            this.applyTextFilter(column);
        }
    }

    onInputBlur(event: Event, column: ColumnStructure): void {
        const target = event.target as HTMLInputElement;
        this.textFilterValues[column.field] = target.value;

        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        this.applyTextFilter(column);
    }

    private applyTextFilterWithDebounce(column: ColumnStructure, delay: number): void {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(() => {
            this.applyTextFilter(column);
            this.filterTimeout = null;
        }, delay);
    }

    // Filter methods
    applyTextFilter(column: ColumnStructure): void {
        const value = this.textFilterValues[column.field];

        if (value && value.trim()) {
            this._filters[column.field] = {
                fieldName: column.field,
                value: value.trim(),
                matchMode: column.matchMode || 'contains'
            } as FilterMeta;
        } else {
            delete this._filters[column.field];
        }

        this.currentFilters = { ...this._filters };
        this.triggerDataRequest();
    }

    applyDropdownFilter(column: ColumnStructure, value: any): void {
        if (value !== null && value !== undefined && value !== '') {
            this._filters[column.field] = {
                fieldName: column.field,
                value: value,
                matchMode: column.matchMode || 'equals'
            } as FilterMeta;
        } else {
            delete this._filters[column.field];
        }

        this.currentFilters = { ...this._filters };
        this.triggerDataRequest();
    }

    applyDateFilter(column: ColumnStructure, date: Date | null): void {
        if (date) {
            const format = column.displayOption || 'dd-MMM-yyyy';
            const formattedDate = this.formatDateForFilter(date, format);

            this._filters[column.field] = {
                fieldName: column.field,
                value: formattedDate,
                matchMode: column.matchMode || 'contains'
            } as FilterMeta;
        } else {
            delete this._filters[column.field];
        }

        this.currentFilters = { ...this._filters };
        this.triggerDataRequest();
    }

    private formatDateForFilter(date: Date, format: string): string {
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    private triggerDataRequest(): void {
        const filterKey = JSON.stringify(this._filters) + '_' + this._pageRequest.pageIndex + '_' + this._pageRequest.pageSize;

        if (filterKey === this.lastFilterRequest && this.loading) {
            return;
        }

        this.lastFilterRequest = filterKey;

        this.pageIndex = 1;
        this._pageRequest.pageIndex = 1;

        const filterArray: FilterMeta[] = [];
        Object.keys(this._filters).forEach(key => {
            const filterValue = this._filters[key];

            if (Array.isArray(filterValue)) {
                filterValue.forEach(filter => {
                    filterArray.push({
                        fieldName: filter.fieldName,
                        value: filter.value,
                        matchMode: filter.matchMode
                    });
                });
            } else {
                filterArray.push({
                    fieldName: filterValue.fieldName,
                    value: filterValue.value,
                    matchMode: filterValue.matchMode
                });
            }
        });
        this._pageRequest.filters = filterArray;

        this.onDataRequested.emit(this._pageRequest);
    }

    // Sort methods
    getSortOrder(column: ColumnStructure): string | null {
        if (!this.currentSort) {
            if (column.defaultSortOrder && column.defaultSortOrder > 0) {
                return column.sortAscending ? 'ascend' : 'descend';
            }
            return null;
        }

        const sortItem = this.currentSort.sort.find(s => s.key === (column.dbColumn || column.field));
        return sortItem ? sortItem.value : null;
    }



    // Helper methods for templates
    getFilterOptions(column: ColumnStructure): SelectItem[] {
        if (!column.dropdownFilterOptions) {
            return [];
        }

        const options = this.optionLists.get(column.dropdownFilterOptions);
        return options || [];
    }

    getDropdownEditOptions(column: ColumnStructure): SelectItem[] {
        if (!column.dropdownEditOptions) {
            return [];
        }
        return this.optionLists.get(column.dropdownEditOptions) || [];
    }

    // Route building for link columns
    buildRouterLink(rowData: T, column: ColumnStructure): string[] | null {
        if (!column.routePath) {
            return null;
        }

        let route = column.routePath;

        // Replace placeholders in route with actual values
        const regex = /{(\w+)}/g;
        let match;
        while ((match = regex.exec(column.routePath)) !== null) {
            const fieldName = match[1];
            const fieldValue = rowData[fieldName];
            route = route.replace(match[0], fieldValue?.toString() || '');
        }

        return [route];
    }

    buildQueryParams(rowData: T, column: ColumnStructure): any {
        if (!column.queryParamFields || column.queryParamFields.length === 0) {
            return {};
        }

        const params: any = {};
        column.queryParamFields.forEach(field => {
            if (rowData[field] !== undefined && rowData[field] !== null) {
                params[field] = rowData[field];
            }
        });

        return params;
    }
}