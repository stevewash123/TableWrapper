import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { PagedGridComponent } from './components/paged-grid/paged-grid.component';
import { ColumnConfigPanelComponent } from './components/column-config-panel/column-config-panel.component';
import { ColumnStructure } from './models/column-structure.model';
import { PageRequest } from './models/page-request.model';
import { SelectItem } from './models/select-item.model';
import { DEMO_USERS, DEMO_PRODUCTS, User, Product } from './models/demo-data.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, PagedGridComponent, ColumnConfigPanelComponent, NzButtonModule, NzIconModule, NzModalModule, NzSelectModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'TableWrapper Demo';

  constructor(private modal: NzModalService) {}

  // User grid data
  userColumns: ColumnStructure[] = [];
  userData: User[] = [];
  userTotalCount = 0;
  userLoading = false;

  // Product grid data
  productColumns: ColumnStructure[] = [];
  productData: Product[] = [];
  productTotalCount = 0;
  productLoading = false;

  // Option lists for dropdowns
  optionLists = new Map<string, SelectItem[]>();

  // Current active demo
  activeDemo: 'users' | 'products' | 'customers' | 'orders' | 'employees' = 'users';
  selectedTable = 'users';

  tableOptions = [
    { label: 'Northwind Users', value: 'users', description: 'Employee and user management data' },
    { label: 'Northwind Products', value: 'products', description: 'Product catalog with pricing and inventory' },
    { label: 'Northwind Customers', value: 'customers', description: 'Customer contact and company information' },
    { label: 'Northwind Orders', value: 'orders', description: 'Order history and transaction details' },
    { label: 'Northwind Employees', value: 'employees', description: 'Staff directory and organizational data' }
  ];

  ngOnInit(): void {
    this.setupOptionLists();
    this.setupUserGrid();
    this.setupProductGrid();
    this.loadUserData();
  }

  private setupOptionLists(): void {
    // Department options
    this.optionLists.set('departments', [
      { label: 'Engineering', value: 'Engineering' },
      { label: 'Marketing', value: 'Marketing' },
      { label: 'Sales', value: 'Sales' },
      { label: 'HR', value: 'HR' }
    ]);

    // Product categories
    this.optionLists.set('categories', [
      { label: 'Electronics', value: 'Electronics' },
      { label: 'Audio', value: 'Audio' },
      { label: 'Mobile', value: 'Mobile' },
      { label: 'Accessories', value: 'Accessories' }
    ]);
  }

  private setupUserGrid(): void {
    this.userColumns = [
      {
        field: 'id',
        header: 'ID',
        displayType: 'number',
        canSort: true,
        defaultSortOrder: 1,
        sortAscending: true,
        width: '80px'
      },
      {
        field: 'firstName',
        header: 'First Name',
        displayType: 'text',
        canSort: true,
        matchMode: 'contains'
      },
      {
        field: 'lastName',
        header: 'Last Name',
        displayType: 'text',
        canSort: true,
        matchMode: 'contains'
      },
      {
        field: 'email',
        header: 'Email',
        displayType: 'link',
        canSort: true,
        matchMode: 'contains',
        routePath: '/user/{id}',
        queryParamFields: ['department']
      },
      {
        field: 'department',
        header: 'Department',
        displayType: 'dropdown',
        canSort: true,
        dropdownFilterOptions: 'departments',
        matchMode: 'equals'
      },
      {
        field: 'salary',
        header: 'Salary',
        displayType: 'number',
        canSort: true,
        matchMode: 'equals'
      },
      {
        field: 'startDate',
        header: 'Start Date',
        displayType: 'date',
        displayOption: 'mediumDate',
        canSort: true,
        matchMode: 'contains'
      },
      {
        field: 'isActive',
        header: 'Active',
        displayType: 'checkbox',
        canSort: true,
        width: '80px'
      }
    ];
  }

  private setupProductGrid(): void {
    this.productColumns = [
      {
        field: 'id',
        header: 'ID',
        displayType: 'number',
        canSort: true,
        defaultSortOrder: 1,
        sortAscending: true,
        width: '80px'
      },
      {
        field: 'name',
        header: 'Product Name',
        displayType: 'text',
        canSort: true,
        matchMode: 'contains'
      },
      {
        field: 'category',
        header: 'Category',
        displayType: 'dropdown',
        canSort: true,
        dropdownFilterOptions: 'categories',
        matchMode: 'equals'
      },
      {
        field: 'price',
        header: 'Price',
        displayType: 'number',
        canSort: true,
        matchMode: 'equals'
      },
      {
        field: 'rating',
        header: 'Rating',
        displayType: 'number',
        canSort: true,
        matchMode: 'equals'
      },
      {
        field: 'inStock',
        header: 'In Stock',
        displayType: 'checkbox',
        canSort: true,
        width: '100px'
      },
      {
        field: 'createdDate',
        header: 'Created',
        displayType: 'date',
        displayOption: 'shortDate',
        canSort: true,
        matchMode: 'contains'
      }
    ];
  }

  onTableChange(selectedValue: string): void {
    this.selectedTable = selectedValue;

    // Map selected table to demo type
    switch (selectedValue) {
      case 'users':
      case 'employees':
        this.activeDemo = 'users';
        this.loadUserData();
        break;
      case 'products':
      case 'customers':
      case 'orders':
      default:
        this.activeDemo = 'products';
        this.loadProductData();
        break;
    }
  }

  onUserDataRequested(pageRequest: PageRequest): void {
    console.log('User data requested:', pageRequest);
    this.userLoading = true;

    // Simulate server call
    setTimeout(() => {
      this.loadUserData(pageRequest);
    }, 500);
  }

  onProductDataRequested(pageRequest: PageRequest): void {
    console.log('Product data requested:', pageRequest);
    this.productLoading = true;

    // Simulate server call
    setTimeout(() => {
      this.loadProductData(pageRequest);
    }, 500);
  }

  private loadUserData(pageRequest?: PageRequest): void {
    let filteredUsers = [...DEMO_USERS];

    // Apply filters
    if (pageRequest?.filters) {
      pageRequest.filters.forEach(filter => {
        filteredUsers = filteredUsers.filter(user => {
          const fieldValue = user[filter.fieldName as keyof User];

          if (fieldValue === null || fieldValue === undefined) {
            return false;
          }

          const stringValue = fieldValue.toString().toLowerCase();
          const filterValue = filter.value.toString().toLowerCase();

          switch (filter.matchMode) {
            case 'contains':
              return stringValue.includes(filterValue);
            case 'equals':
              return stringValue === filterValue;
            case 'startsWith':
              return stringValue.startsWith(filterValue);
            default:
              return stringValue.includes(filterValue);
          }
        });
      });
    }

    // Apply sorting
    if (pageRequest?.sorts && pageRequest.sorts.length > 0) {
      filteredUsers.sort((a, b) => {
        for (const sort of pageRequest.sorts) {
          const aValue = a[sort.field as keyof User];
          const bValue = b[sort.field as keyof User];

          if (aValue < bValue) return sort.order * -1;
          if (aValue > bValue) return sort.order * 1;
        }
        return 0;
      });
    }

    this.userTotalCount = filteredUsers.length;

    // Apply pagination
    const startIndex = ((pageRequest?.pageIndex || 1) - 1) * (pageRequest?.pageSize || 50);
    const endIndex = startIndex + (pageRequest?.pageSize || 50);
    this.userData = filteredUsers.slice(startIndex, endIndex);

    this.userLoading = false;
  }

  private loadProductData(pageRequest?: PageRequest): void {
    let filteredProducts = [...DEMO_PRODUCTS];

    // Apply filters
    if (pageRequest?.filters) {
      pageRequest.filters.forEach(filter => {
        filteredProducts = filteredProducts.filter(product => {
          const fieldValue = product[filter.fieldName as keyof Product];

          if (fieldValue === null || fieldValue === undefined) {
            return false;
          }

          const stringValue = fieldValue.toString().toLowerCase();
          const filterValue = filter.value.toString().toLowerCase();

          switch (filter.matchMode) {
            case 'contains':
              return stringValue.includes(filterValue);
            case 'equals':
              return stringValue === filterValue;
            case 'startsWith':
              return stringValue.startsWith(filterValue);
            default:
              return stringValue.includes(filterValue);
          }
        });
      });
    }

    // Apply sorting
    if (pageRequest?.sorts && pageRequest.sorts.length > 0) {
      filteredProducts.sort((a, b) => {
        for (const sort of pageRequest.sorts) {
          const aValue = a[sort.field as keyof Product];
          const bValue = b[sort.field as keyof Product];

          if (aValue < bValue) return sort.order * -1;
          if (aValue > bValue) return sort.order * 1;
        }
        return 0;
      });
    }

    this.productTotalCount = filteredProducts.length;

    // Apply pagination
    const startIndex = ((pageRequest?.pageIndex || 1) - 1) * (pageRequest?.pageSize || 50);
    const endIndex = startIndex + (pageRequest?.pageSize || 50);
    this.productData = filteredProducts.slice(startIndex, endIndex);

    this.productLoading = false;
  }

  onUserRowSelect(user: User): void {
    console.log('Selected user:', user);
  }

  onProductRowSelect(product: Product): void {
    console.log('Selected product:', product);
  }

  getSelectedTableLabel(): string {
    const selectedOption = this.tableOptions.find(option => option.value === this.selectedTable);
    return selectedOption ? selectedOption.label : 'Table';
  }

  showArchitectureDialog(): void {
    this.modal.create({
      nzTitle: '🏗️ TableWrapper Architecture',
      nzContent: `
        <div class="architecture-content">
          <h3>🎯 The Problem</h3>
          <p>1) We had <strong>25+ separate table implementations</strong> across our application, each requiring nearly identical code for sorting, filtering, pagination, and display formatting.</p>
          <p>2) We wanted to update all tables to use a different vendor library.</p>

          <h3>💡 The Solution: A Table Wrapper</h3>
          <p>I developed a wrapper to act as a "black box" around the vendor's table implementation.  All interactions with
          the table pass through the wrapper layer, which can then interact with the table internally in a consistent
          manner for all tables.</p>

          <p>Each application of the wrapper requires configuration, with very little custom coding.  Most of the configuration
          is done on the individual columns.</p>
          <ul>
            <li><strong>Display Types:</strong> text, number, date, checkbox, dropdown, link</li>
            <li><strong>Sorting:</strong> Configurable per column with default sort orders</li>
            <li><strong>Filtering:</strong> Smart filters based on data type</li>
            <li><strong>Formatting:</strong> Automatic data formatting and tooltips</li>
            <li><strong>Routing:</strong> Dynamic link generation with query parameters</li>
          </ul>

          <h3>📊 Results</h3>
          <ul>
            <li>✅ <strong>8000+ lines of code</strong> removed</li>
            <li>✅ <strong>Minutes</strong> to create new tables (vs days)</li>
            <li>✅ <strong>Consistent UX</strong> across entire application</li>
            <li>✅ <strong>Single test suite</strong> covers all use cases</li>
          </ul>

          <h3>🔧 How It Works</h3>
          <p>Each column is defined by a simple configuration object:</p>
          <pre class="code-block">{
  field: 'email',
  header: 'Email',
  displayType: 'link',
  canSort: true,
  matchMode: 'contains',
  routePath: '/user/{id}',
  queryParamFields: ['department']
}</pre>

          <p>The grid automatically handles the rest - sorting logic, filter UI, data formatting, and link generation!</p>

          <h3>🚀 Enterprise Impact</h3>
          <p>This pattern has been proven in production environments with:</p>
          <ul>
            <li>Thousands of records per table</li>
            <li>Complex multi-column sorting</li>
            <li>Real-time server-side filtering</li>
            <li>Dynamic data source switching</li>
          </ul>
        </div>
      `,
      nzWidth: '800px',
      nzFooter: null,
      nzBodyStyle: { 'max-height': '70vh', 'overflow-y': 'auto' }
    });
  }
}