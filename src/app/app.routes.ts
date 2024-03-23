import { Routes } from "@angular/router";
import { authGuard } from "./core/guards";
import { LayoutContainerComponent } from "./shared";
import { HttpClientModule } from "@angular/common/http";

export const routes: Routes = [
  {
    path: "",
    component: LayoutContainerComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        loadComponent: () =>
          import(
            "../app/modules/dashboard/dashboard-container/dashboard-container.component"
          ).then((m) => m.DashboardContainerComponent)
      },
      {
        path: "customers",
        loadComponent: () =>
          import(
            "../app/modules/customers/components/customers-container/customers-container.component"
          ).then((m) => m.CustomersContainerComponent),
        providers: [HttpClientModule],
      },
      {
        path: "releaseOrder",
        loadComponent: () =>
          import(
            "../app/modules/release-order/components/release-order-container/release-order-container.component"
          ).then((m) => m.ReleaseOrderContainerComponent),
      },
      {
        path: "bills",
        loadComponent: () =>
          import(
            "../app/modules/bills/bills-container/bills-container.component"
          ).then((m) => m.BillsContainerComponent),
      },
      {
        path: "publications",
        loadComponent: () =>
          import(
            "../app/modules/publications/components/publications-container/publications-container.component"
          ).then((m) => m.PublicationsContainerComponent)
      },
    ],
  },
  {
    path: "login",
    loadComponent: () =>
      import(
        "../app/modules/auth/login/login.component"
      ).then((m) => m.LoginComponent),
  }
];
