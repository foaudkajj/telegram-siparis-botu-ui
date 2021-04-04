import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { GetService } from 'app/project/services/get.service';
import { DxTooltipModule } from 'devextreme-angular';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    FuseSharedModule,
    ProductsRoutingModule,
    DxTooltipModule
  ],
  providers: [GetService]
})
export class ProductsModule { }
