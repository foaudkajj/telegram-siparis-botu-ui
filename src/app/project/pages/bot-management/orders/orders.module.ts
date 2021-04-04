import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { DxDropDownButtonModule } from 'devextreme-angular';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    FuseSharedModule,
    OrdersRoutingModule,
    MatButtonModule,
    DxDropDownButtonModule
  ]
})
export class OrdersModule { }
