import { Routes } from '@angular/router';
import { PortfolioHomeComponent } from './components/portfolio-home/portfolio-home.component';
import { TableWrapperDemoComponent } from './components/table-wrapper-demo/table-wrapper-demo.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'portfolio', component: PortfolioHomeComponent },
  { path: '', component: TableWrapperDemoComponent },
  { path: '**', redirectTo: '' }
];
