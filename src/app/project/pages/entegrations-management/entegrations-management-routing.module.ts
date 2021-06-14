import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "getir-entegration", pathMatch: "full" },
  { path: 'getir-entegration', loadChildren: () => import('./Getir/getir-entegration.module').then(m => m.GetirEntegrationModule) },
  { path: 'yemeksepeti-entegration', loadChildren: () => import('./YemekSepeti/yemek-sepetei-entegration.module').then(m => m.YemekSepeteiEntegrationModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntegrationsManagementRoutingModule { }
