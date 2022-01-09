import {Component, OnInit, ViewChild} from '@angular/core';
import {DxStoreOptions} from 'app/project/models/dx-store-options';
import {DxStoreService} from 'app/project/services/dx-store.service';
import {PermessionsService} from 'app/project/services/permessions.service';
import {DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild('Grid') CategoriesGrid: DxDataGridComponent;
  store: CustomStore;
  constructor(
    private dxStore: DxStoreService,
    private permessionService: PermessionsService,
  ) {}

  ngOnInit(): void {
    this.filTable();
    this.InitlizePermessions();
  }

  AllowAdd = false;
  AllowDelete = false;
  AllowUpdate = false;
  private async InitlizePermessions() {
    const UIPermessions = await this.permessionService.permesions$.toPromise();
    this.AllowAdd = UIPermessions.includes('ADD_CATEGORY');
    this.AllowDelete = UIPermessions.includes('DELETE_CATEGORY');
    this.AllowUpdate = UIPermessions.includes('UPDATE_CATEGORY');
  }

  filTable() {
    let storeOption: DxStoreOptions = {
      loadUrl: 'Category/Get',
      insertUrl: 'Category/Insert',
      updateUrl: 'Category/Update',
      updateMethod: 'POST',
      deleteUrl: 'Category/Delete',
      deleteMethod: 'POST',
      Key: 'id',
      onInserted: () => this.CategoriesGrid.instance.refresh(),
      onRemoved: () => this.CategoriesGrid.instance.refresh(),
      onUpdated: () => this.CategoriesGrid.instance.refresh(),
    };
    this.store = this.dxStore.GetStore(storeOption);
  }
}
