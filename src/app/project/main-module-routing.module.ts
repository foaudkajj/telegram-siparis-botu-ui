import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "stock", pathMatch: "full" },
  { path: 'rolemanagement', loadChildren: () => import('./pages/role_management/role-management.module').then(m => m.RoleManagementModule) },
  { path: 'usermanagement', loadChildren: () => import('./pages/user_management/user-management.module').then(m => m.UserManagementModule) },
  { path: 'bot', loadChildren: () => import('./pages/bot-management/bot-management.module').then(m => m.BotManagementModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
