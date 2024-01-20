import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards';
import { LayoutContainerComponent } from './shared';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
    {
      path: '', component: LayoutContainerComponent, children: [
        {
          path: '',
          redirectTo: '/auth/login',
          pathMatch: 'full',
        },
        {
          path: 'dashboard',
          loadComponent: () => import('../app/modules/dashboard/dashboard-container/dashboard-container.component').then(m => m.DashboardContainerComponent),
          canActivate:[AuthGuard]
        },
        {
          path: 'customers',
          loadComponent: () => import('../app/modules/customers/components/customers-container/customers-container.component').then(m => m.CustomersContainerComponent),
          canActivate:[AuthGuard],
          providers:[HttpClientModule]
        },
        {
          path: 'releaseOrder',
          loadComponent: () => import('../app/modules/release-order/components/release-order-container/release-order-container.component').then(m => m.ReleaseOrderContainerComponent)
        },
        {
          path: 'bills',
          loadComponent: () => import('../app/modules/bills/bills-container/bills-container.component').then(m => m.BillsContainerComponent)
        },
        {
          path: 'publications',
          loadComponent: () => import('../app/modules/publications/components/publications-container/publications-container.component').then(m => m.PublicationsContainerComponent),
          canActivate:[AuthGuard]
        }
      ]
    },
    // {
    //   path:'auth',
    //   loadChildren: () => import('../app/core/auth/auth.module').then(m => m.AuthModule)//component:LoginComponent
    // }
  ];
