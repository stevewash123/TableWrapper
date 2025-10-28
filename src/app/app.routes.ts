import { Routes } from '@angular/router';
import { PortfolioHomeComponent } from './components/portfolio-home/portfolio-home.component';
import { TableWrapperDemoComponent } from './components/table-wrapper-demo/table-wrapper-demo.component';

export const routes: Routes = [
  { path: '', component: PortfolioHomeComponent },
  { path: 'table-wrapper', component: TableWrapperDemoComponent },
  { path: '**', redirectTo: '' }
];
