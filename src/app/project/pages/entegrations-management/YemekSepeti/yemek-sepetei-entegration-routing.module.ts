import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {YemekSepeteiEntegrationComponent} from './yemek-sepetei-entegration.component';

const routes: Routes = [
  {path: '', component: YemekSepeteiEntegrationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YemekSepeteiEntegrationRoutingModule {}
