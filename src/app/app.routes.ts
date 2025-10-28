import { Routes } from '@angular/router';
import { PortfolioHomeComponent } from './components/portfolio-home/portfolio-home.component';
import { TableWrapperDemoSimpleComponent } from './components/table-wrapper-demo/table-wrapper-demo-simple.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'table-wrapper', component: TableWrapperDemoSimpleComponent },
  { path: '', component: PortfolioHomeComponent },
  { path: '**', redirectTo: '' }
];
