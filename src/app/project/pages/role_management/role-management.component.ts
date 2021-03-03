import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DxStoreOptions } from 'app/project/Models/DxStoreOptions';
import { RoleIdAndPermessions } from 'app/project/models/RoleIdAndPermessions';
import { UIResponse } from 'app/project/Models/UIResponse';
import { DxStoreService } from 'app/project/services/dx-store.service';
import { PermessionsService } from 'app/project/services/permessions.service';
import { RoleService } from 'app/project/services/Role.Service';
import { SwalService } from 'app/project/services/swal.service';
import { DxDataGridComponent, DxTreeListComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  @ViewChild('RolesGrid') RolesGrid: DxDataGridComponent;
  @ViewChild('PermessionsTree') PermessionsTree: DxTreeListComponent;
  UIPermessions: string[] = [];
  AllowAdd = false;
  AllowDelete = false;
  AllowUpdate = false;
  AllowUpdatingPermessions = false;
  rolesGridStore: CustomStore;
  permessionsListStore: CustomStore;
  constructor(public translate: TranslateService,
    private dxStore: DxStoreService,
    private RolesService: RoleService,
    private swal: SwalService,
    private permessionService: PermessionsService) {
    this.treeListTitleDisplayValue = this.treeListTitleDisplayValue.bind(this)

  }

  async ngOnInit(): Promise<void> {
    await this.InitlizePermessions();
    this.filGrid();
  }

  private async InitlizePermessions() {
    const UIPermessions = await this.permessionService.permesions$.toPromise();
    this.AllowAdd = UIPermessions.includes("ADD_ROLE");
    this.AllowDelete = UIPermessions.includes("DELETE_ROLE");
    this.AllowUpdate = UIPermessions.includes("UPDATE_ROLE");
    this.AllowUpdatingPermessions = UIPermessions.includes("UPATE_PERMESSIONS");
  }

  filGrid() {
    let usersGridStoreOption: DxStoreOptions = {
      loadUrl: "Roles/Get", insertUrl: "Roles/Insert", updateUrl: "Update", deleteUrl: "Roles/Delete", deleteMethod: "POST", Key: "Id",
      onInserted: () => this.RolesGrid.instance.refresh(),
      onRemoved: () => this.RolesGrid.instance.refresh(),
      onUpdated: () => this.RolesGrid.instance.refresh()
    };
    this.rolesGridStore = this.dxStore.GetStore(usersGridStoreOption);

    let permessionsListStoreOption: DxStoreOptions = {
      loadUrl: "Roles/GetPermessions", Key: "PermessionKey",
      onInserted: () => this.PermessionsTree.instance.refresh(),
      onRemoved: () => this.PermessionsTree.instance.refresh(),
      onUpdated: () => this.PermessionsTree.instance.refresh()
    };
    this.permessionsListStore = this.dxStore.GetStore(permessionsListStoreOption);

  }

  async Save(selectedRows: any, roleId: number) {
    const roleIdAndPermessions: RoleIdAndPermessions = { roleId: roleId, rolePermessions: selectedRows.map(mp => mp.Id) };
    await this.RolesService.SaveRolePermessions(roleIdAndPermessions).pipe(tap((t: UIResponse<any>) => t.IsError ? this.swal.showErrorMessage() : this.swal.showSuccessMessage())).toPromise();
  }

  treeListTitleDisplayValue(rowData) {
    return this.translate.instant(rowData.PermessionKey);
  }
}
