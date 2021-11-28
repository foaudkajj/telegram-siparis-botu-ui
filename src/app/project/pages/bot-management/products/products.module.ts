import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { GetService } from 'app/project/services/get.service';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    FuseSharedModule,
    ProductsRoutingModule
  ],
  providers: [GetService]
})
export class ProductsModule { }
