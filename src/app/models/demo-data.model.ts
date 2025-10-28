import { IPagedGridRow } from './paged-grid-row.interface';

export interface User extends IPagedGridRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  salary: number;
  startDate: Date;
  isActive: boolean;
  city: string;
  country: string;
}

export interface Product extends IPagedGridRow {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  createdDate: Date;
  description: string;
  rating: number;
}

export const DEMO_USERS: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    salary: 75000,
    startDate: new Date('2020-01-15'),
    isActive: true,
    city: 'New York',
    country: 'USA'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    department: 'Marketing',
    salary: 65000,
    startDate: new Date('2019-03-20'),
    isActive: true,
    city: 'Los Angeles',
    country: 'USA'
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@company.com',
    department: 'Sales',
    salary: 55000,
    startDate: new Date('2021-07-10'),
    isActive: false,
    city: 'Chicago',
    country: 'USA'
  },
  {
    id: 4,
    firstName: 'Alice',
    lastName: 'Brown',
    email: 'alice.brown@company.com',
    department: 'Engineering',
    salary: 80000,
    startDate: new Date('2018-11-05'),
    isActive: true,
    city: 'Seattle',
    country: 'USA'
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Wilson',
    email: 'charlie.wilson@company.com',
    department: 'HR',
    salary: 60000,
    startDate: new Date('2022-02-14'),
    isActive: true,
    city: 'Austin',
    country: 'USA'
  }
];

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Laptop Pro 15"',
    category: 'Electronics',
    price: 1299.99,
    inStock: true,
    createdDate: new Date('2023-01-15'),
    description: 'High-performance laptop for professionals',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    category: 'Audio',
    price: 199.99,
    inStock: true,
    createdDate: new Date('2023-02-20'),
    description: 'Premium noise-canceling headphones',
    rating: 4.2
  },
  {
    id: 3,
    name: 'Smartphone X',
    category: 'Mobile',
    price: 799.99,
    inStock: false,
    createdDate: new Date('2023-03-10'),
    description: 'Latest smartphone with advanced features',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Gaming Mouse',
    category: 'Accessories',
    price: 59.99,
    inStock: true,
    createdDate: new Date('2023-04-05'),
    description: 'High-precision gaming mouse',
    rating: 4.0
  },
  {
    id: 5,
    name: 'Monitor 27"',
    category: 'Electronics',
    price: 299.99,
    inStock: true,
    createdDate: new Date('2023-05-12'),
    description: '4K UHD monitor for work and gaming',
    rating: 4.3
  }
];