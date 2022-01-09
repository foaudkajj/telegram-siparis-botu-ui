import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesComponent} from './categories.component';
import {FuseSharedModule} from '@fuse/shared.module';
import {GetService} from 'app/project/services/get.service';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [FuseSharedModule, CategoriesRoutingModule],
  providers: [GetService],
})
export class CategoriesModule {}
