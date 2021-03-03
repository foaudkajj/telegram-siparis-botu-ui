import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { RoleService } from 'app/project/services/Role.Service';


@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    FuseSharedModule,
    UserManagementRoutingModule
  ],
  providers: [RoleService]
})
export class UserManagementModule { }
