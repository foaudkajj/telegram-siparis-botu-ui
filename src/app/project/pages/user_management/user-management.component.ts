import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DxStoreOptions } from 'app/project/Models/DxStoreOptions';
import { Role } from 'app/project/models/Role';
import { DxStoreService } from 'app/project/services/dx-store.service';
import { PermessionsService } from 'app/project/services/permessions.service';
import { RoleService } from 'app/project/services/Role.Service';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  rolList: Role[];
  UsersGridDataSource: any;
  @ViewChild('UsersGrid') UsersGrid: DxDataGridComponent
  store: CustomStore;
  UserStatus = [{ Id: 1, Name: 'Aktif' }, { Id: 0, Name: 'Pasif' }];
  constructor(public translate: TranslateService,
    private roleService: RoleService,
    private dxStore: DxStoreService,
    private permessionService: PermessionsService) { }

  ngOnInit(): void {
    this.getRoles();
    this.filTable();
    this.InitlizePermessions();
  }

  AllowAdd = false;
  AllowDelete = false;
  AllowUpdate = false;
  private async InitlizePermessions() {
    const UIPermessions = await this.permessionService.permesions$.toPromise();
    this.AllowAdd = UIPermessions.includes("ADD_USER");
    this.AllowDelete = UIPermessions.includes("DELETE_USER");
    this.AllowUpdate = UIPermessions.includes("UPDATE_USER");
  }

  getRoles() {
    this.roleService.GetRoles().toPromise().then(res => this.rolList = (res.data as Role[]));
  }
  filTable() {
    let storeOption: DxStoreOptions = {
      loadUrl: "User/Get", insertUrl: "User/Insert", updateUrl: "User/Update", updateMethod: "POST", deleteUrl: "User/Delete", deleteMethod: "POST", Key: "Id",
      onInserted: () => this.UsersGrid.instance.refresh(),
      onRemoved: () => this.UsersGrid.instance.refresh(),
      onUpdated: () => this.UsersGrid.instance.refresh()
    };
    this.store = this.dxStore.GetStore(storeOption);

  }

}
