import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GetirEntegrationComponent} from './getir-entegration.component';

const routes: Routes = [{path: '', component: GetirEntegrationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetirEntegrationRoutingModule {}
