import {NgModule} from '@angular/core';

import {RoleManagementRoutingModule} from './role-management-routing.module';
import {RoleManagementComponent} from './role-management.component';
import {FuseSharedModule} from '@fuse/shared.module';
import {DxTreeListModule} from 'devextreme-angular/ui/tree-list';
import {MatButtonModule} from '@angular/material/button';
import {RoleService, GetService} from 'app/project/services';

@NgModule({
  declarations: [RoleManagementComponent],
  imports: [
    FuseSharedModule,
    RoleManagementRoutingModule,
    DxTreeListModule,
    MatButtonModule,
  ],
  providers: [RoleService, GetService],
})
export class RoleManagementModule {}
