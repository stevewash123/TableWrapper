import { Routes } from '@angular/router';
import { PortfolioHomeComponent } from './components/portfolio-home/portfolio-home.component';
import { TableWrapperDemoComponent } from './components/table-wrapper-demo/table-wrapper-demo.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: '', component: PortfolioHomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'table-wrapper', component: TableWrapperDemoComponent },
  { path: '**', redirectTo: '' }
];
