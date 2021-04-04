import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DxStoreOptions } from 'app/project/Models/DxStoreOptions';
import { UIResponse } from 'app/project/Models/UIResponse';
import { DxStoreService } from 'app/project/services/dx-store.service';
import { PermessionsService } from 'app/project/services/permessions.service';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { result } from 'lodash';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @ViewChild('Grid') CategoriesGrid: DxDataGridComponent;
  store: CustomStore;
  constructor(
    private dxStore: DxStoreService,
    private permessionService: PermessionsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.filTable();
    this.InitlizePermessions();
  }


  AllowAdd = true;
  AllowDelete = true;
  AllowUpdate = false;
  private async InitlizePermessions() {
    const UIPermessions = await this.permessionService.permesions$.toPromise();
    // this.AllowAdd = UIPermessions.includes("ADD_CATEGORY");
    // this.AllowDelete = UIPermessions.includes("DELETE_CATEGORY");
    this.AllowUpdate = UIPermessions.includes("UPDATE_ORDER");
  }

  dataSource: DataSource;
  storeOption: DxStoreOptions;
  filTable() {
    this.storeOption = {
      loadUrl: "Orders/Get", insertUrl: "Orders/Insert", updateUrl: "Orders/Update", updateMethod: "POST", deleteUrl: "Orders/Delete", deleteMethod: "POST", Key: "Id",
      onInserted: () => this.CategoriesGrid.instance.refresh(),
      onRemoved: () => this.CategoriesGrid.instance.refresh(),
      onUpdated: () => this.CategoriesGrid.instance.refresh()
    };
    this.dataSource = new DataSource({
      store: this.dxStore.GetStore(this.storeOption),
    });
  }

  DirectToLocation(data) {
    if (data.customer.Location) {
      const coordinates = JSON.parse(data.customer.Location);
      window.open("https://www.google.com/maps/dir/?api=1&origin_place_id=ChIJ6_MMY8K1xRQRS7WWM5yBtOo&destination=" + coordinates.latitude + "," + coordinates.longitude + "&travelmode=driving&origin=corbana", '_blank')
    }

  }

  GetInTouch(data) {
    if (data.customer.Username) {
      window.open("https://telegram.me/" + data.customer.Username, '_blank')
    }

  }

  gridEditorPreparing(e) {

    if (e.parentType === 'dataRow' && (e.dataField === 'OrderNo' || e.dataField === 'CreateDate')) {
      e.editorOptions.disabled = true;
    }
    if ((e.dataField === 'OrderStatus' || e.dataField === 'customer.Username' || e.dataField === 'customer.Location') && e.parentType === 'dataRow') {
      e.editorOptions.disabled = !e.row.isNewRow;;
    }

    if (e.dataField === 'Description' && e.parentType === 'dataRow') {
      e.editorName = 'dxTextArea';
    }
  }

  gridInitNewRow(e) {
    e.data.CreateDate = new Date();
    // e.data.Location = '{"latitude":,"longitude":}'
  }

  items = [{ Value: 1, Text: this.translate.instant('ORDER.USER_CONFIRMED'), disabled: false }, { Value: 2, Text: this.translate.instant('ORDER.MERCHANT_CONFIRMED'), disabled: false }, { Value: 3, Text: this.translate.instant('ORDER.BEING_PREPARING'), disabled: false }, { Value: 4, Text: this.translate.instant('ORDER.SENT'), disabled: false }, { Value: 5, Text: this.translate.instant('ORDER.DELIVERED'), disabled: false }, { Value: 6, Text: this.translate.instant('ORDER.CANCELED'), disabled: false }];

  async onOperationItemClick(e, row) {
    let udpateResult: UIResponse<any> = await this.dataSource.store().update(row.data.Id, { OrderStatus: e.itemData.Value });
    if (!udpateResult.IsError) {
      e.itemData.disabled = true
    }
  }

}
