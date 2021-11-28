import {NgModule} from '@angular/core';

import {UserManagementRoutingModule} from './user-management-routing.module';
import {UserManagementComponent} from './user-management.component';
import {FuseSharedModule} from '@fuse/shared.module';
import {GetService} from 'app/project/services';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [FuseSharedModule, UserManagementRoutingModule],
  providers: [GetService],
})
export class UserManagementModule {}
