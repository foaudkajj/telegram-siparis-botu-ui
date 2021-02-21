import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleManagementComponent } from './role-management.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { DxTreeListModule } from 'devextreme-angular/ui/tree-list';
import { MatButtonModule } from '@angular/material/button';
import { RoleService } from 'app/project/services/Role.Service';


@NgModule({
  declarations: [RoleManagementComponent],
  imports: [
    FuseSharedModule,
    RoleManagementRoutingModule,
    DxTreeListModule,
    MatButtonModule
  ],
  providers: [
    RoleService
  ]
})
export class RoleManagementModule { }
