import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { FuseSharedModule } from '@fuse/shared.module';


@NgModule({
  declarations: [],
  imports: [
    FuseSharedModule,
    MainModuleRoutingModule
  ]
})
export class MainModuleModule { }
