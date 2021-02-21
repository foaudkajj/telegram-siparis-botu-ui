import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "stock", pathMatch: "full" },
  { path: 'rolemanagement', loadChildren: () => import('./pages/role_management/role-management.module').then(m => m.RoleManagementModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
