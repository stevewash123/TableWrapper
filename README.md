# TableWrapper

A clean-room implementation showcasing the powerful ESA Paged Grid architecture pattern that replaced 25+ table implementations and reduced 8000+ lines of code.

## 🚀 Architecture Overview

This project demonstrates the power of **declarative configuration** over imperative table implementations. Instead of writing custom table logic for every data display need, everything is configured through a simple `ColumnStructure[]` array.

## ✨ Key Features

### 🔧 Declarative Configuration
- **ColumnStructure[] array** defines all behavior
- Sorting, filtering, display types all configured via JSON-like structures
- No more custom table components per use case

### ⚡ Server-side Operations
- **Pagination** handled automatically via PageRequest emissions
- **Multi-column sorting** with default configurations
- **Smart filtering** with debouncing and match mode controls

### 🎨 Multiple Display Types
- **Text, Number, Date** - Standard data types with proper formatting
- **Checkbox** - Boolean data visualization
- **Links** - Configurable routing with query parameters
- **Dropdown** - Select options with filtering
- **Custom** - Extensible for specialized components

### 📊 Type Safety
- **Generic PagedGrid&lt;T&gt;** ensures compile-time type checking
- **IPagedGridRow interface** for standardized data contracts
- **Strongly typed** column configurations and events

### 🔍 Advanced Filtering
- **Text filters** with contains/equals/startsWith match modes
- **Dropdown filters** linked to option lists
- **Date filters** with configurable formats
- **Debounced input** to prevent excessive server calls

## 🏗️ Component Architecture

```typescript
// Simple usage - everything configured declaratively
<paged-grid
  [gridColumns]="userColumns"
  [data]="userData"
  [totalCount]="userTotalCount"
  [loading]="userLoading"
  [optionLists]="optionLists"
  [allowRowSelection]="true"
  (onDataRequested)="onUserDataRequested($event)"
  (onRowSelect)="onUserRowSelect($event)">
</paged-grid>
```

### Column Configuration Example

```typescript
{
  field: 'email',
  header: 'Email',
  displayType: 'link',
  canSort: true,
  matchMode: 'contains',
  routePath: '/user/{id}',
  queryParamFields: ['department']
}
```

## 💡 Impact Story

**Before**: 25+ separate table implementations
- Days to create new tables
- Inconsistent UX across application
- 25+ separate test suites
- Massive code duplication

**After**: Single reusable component
- **Minutes** to create new tables
- **Consistent** UX across entire application
- **Single** test suite
- **8000+ lines** of code removed

## 🛠️ Technology Stack

- **Angular 19** - Latest framework features
- **NgZorro Ant Design** - Enterprise-class UI components
- **TypeScript** - Full type safety
- **Reactive patterns** - Observable-based data flow

## 🎯 Core Classes

### Models
- `IPagedGridRow` - Base interface for data rows
- `ColumnStructure` - Declarative column configuration
- `PageRequest` - Server-side operation parameters
- `FilterMeta` & `SortMeta` - Data operation types

### Components
- `PagedGridComponent<T>` - Main generic grid component
- Custom pipes for field access and formatting

## 🚦 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm start
   ```

3. **View the demo**
   - Navigate to `http://localhost:4200`
   - Switch between Users and Products demos
   - Test sorting, filtering, and pagination

## 📋 Demo Features

### Users Demo
- Multi-column sorting with default order
- Department dropdown filtering
- Date range filtering
- Row selection with auto-select first
- Server-side pagination simulation

### Products Demo
- Category-based filtering
- Numeric filtering (price, rating)
- Boolean display (in stock)
- Mixed data type handling

## 🔄 Server Integration

The component emits `PageRequest` objects containing:
- **Page information** (index, size)
- **Sort metadata** (field, direction)
- **Filter criteria** (field, value, match mode)

Your backend receives clean, structured requests instead of parsing complex UI state.

## 🎨 Customization

Extend the component by:
1. Adding new `displayType` options
2. Creating custom pipes for data transformation
3. Implementing specialized filter controls
4. Adding new match modes for filtering

## 📦 Production Ready

- **Lazy loading** support
- **Memory efficient** with virtual scrolling capability
- **Accessibility** compliant
- **Mobile responsive** design
- **Enterprise tested** patterns

---

*This implementation showcases how thoughtful architecture can dramatically reduce code complexity while improving maintainability and user experience.*