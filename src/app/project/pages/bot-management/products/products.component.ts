import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from 'app/project/models/Category';
import {DxStoreOptions} from 'app/project/Models/DxStoreOptions';
import {
  DxStoreService,
  PermessionsService,
  ProductService,
  SwalService,
} from 'app/project/services';
import {GetService} from 'app/project/services/get.service';
import {DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('Grid') gridInstance: DxDataGridComponent;
  DS: DataSource;
  categoryList: Category[] = [];
  ToolTipVisibility: boolean = false;
  ToolTipContent: string = 'Hello How Are';
  toolTipTarget: string = '';
  constructor(
    private dxStore: DxStoreService,
    private permessionService: PermessionsService,
    private getService: GetService,
    private productService: ProductService,
    private swal: SwalService,
  ) {
    this.InitlizePermessions();
  }

  async ngOnInit(): Promise<void> {
    this.filTable();

    this.getCategories();
  }

  AllowAdd = false;
  AllowDelete = false;
  AllowUpdate = false;
  private async InitlizePermessions() {
    const UIPermessions = await this.permessionService.permesions$.toPromise();
    this.AllowAdd = UIPermessions.includes('ADD_PRODUCT');
    this.AllowDelete = UIPermessions.includes('DELETE_PRODUCT');
    this.AllowUpdate = UIPermessions.includes('UPDATE_PRODUCT');
  }

  getCategories() {
    this.getService
      .GetCategories()
      .toPromise()
      .then(res => (this.categoryList = res.data as Category[]));
  }

  filTable() {
    let storeOption: DxStoreOptions = {
      loadUrl: 'Products/Get',
      insertUrl: 'Products/Insert',
      updateUrl: 'Products/Update',
      updateMethod: 'POST',
      deleteUrl: 'Products/Delete',
      deleteMethod: 'POST',
      Key: 'Id',
      onInserted: () => this.gridInstance.instance.refresh(),
      onRemoved: () => this.gridInstance.instance.refresh(),
      onUpdated: () => this.gridInstance.instance.refresh(),
    };
    this.DS = new DataSource({
      store: this.dxStore.GetStore(storeOption),
    });
  }

  gridEditorPreparing(e) {
    if (e.dataField === 'Type' && e.parentType === 'dataRow') {
      e.editorOptions.disabled = true;
      e.editorOptions.value = 'article';
      this.toolTipTarget = '#productType';
      e.editorElement.id = 'productType';
      e.editorElement.addEventListener('mouseenter', e => {
        this.toggleDefault();
      });
      e.setValue(e.editorOptions.value);
    }
  }

  onInitNewRow(e) {
    e.data.Type = 'article';
  }

  toggleDefault() {
    this.ToolTipVisibility = !this.ToolTipVisibility;
  }

  async importUpdateGetirProducts(e) {
    try {
      await this.productService.importUpdateGetirProducts().toPromise();
      this.gridInstance.instance.refresh();
    } catch (e) {
      this.swal.showErrorMessage();
    }
  }
}
