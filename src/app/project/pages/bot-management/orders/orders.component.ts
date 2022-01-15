import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {OrderStatus} from 'app/project/enums/OrderStatus';
import {DeliveryType} from 'app/project/models';
import {DxStoreOptions} from 'app/project/models/dx-store-options';
import {UIResponse} from 'app/project/models/ui-response';
import {OrderService, SwalService} from 'app/project/services';
import {DxStoreService} from 'app/project/services/dx-store.service';
import {PermessionsService} from 'app/project/services/permessions.service';
import {DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChild('Grid') gridInstance: DxDataGridComponent;
  store: CustomStore;
  currentInterval;
  constructor(
    private dxStore: DxStoreService,
    private permessionService: PermessionsService,
    private translate: TranslateService,
    private orderService: OrderService,
    private swalService: SwalService,
  ) {
    this.orderStatusColumnCustomizeText =
      this.orderStatusColumnCustomizeText.bind(this);
    this.getirOrderStaus = this.getirOrderStaus.bind(this);
    this.paymentMethodsDisplayValue =
      this.paymentMethodsDisplayValue.bind(this);
  }

  ngOnDestroy(): void {
    clearInterval(this.currentInterval);
  }

  ngOnInit(): void {
    this.filTable();
    this.InitlizePermessions();

    this.currentInterval = setInterval(() => {
      this.gridInstance.instance.refresh();
    }, 10000);
  }

  AllowAdd = true;
  AllowDelete = true;
  AllowUpdate = false;
  private async InitlizePermessions() {
    const UIPermessions = await this.permessionService.permesions$.toPromise();
    // this.AllowAdd = UIPermessions.includes("ADD_CATEGORY");
    // this.AllowDelete = UIPermessions.includes("DELETE_CATEGORY");
    this.AllowUpdate = UIPermessions.includes('UPDATE_ORDER');
  }

  dataSource: DataSource;
  storeOption: DxStoreOptions;
  filTable() {
    this.storeOption = {
      loadUrl: 'Orders/Get',
      insertUrl: 'Orders/Insert',
      updateUrl: 'Orders/Update',
      updateMethod: 'POST',
      deleteUrl: 'Orders/Delete',
      deleteMethod: 'POST',
      Key: 'id',
      onInserted: () => this.gridInstance.instance.refresh(),
      onRemoved: () => this.gridInstance.instance.refresh(),
      onUpdated: (key, values) => {
        if (values.orderStatus === OrderStatus.FutureOrder) {
          this.swalService.showSuccessMessage(
            'Siparis bir saat once tekrar dusecektir.',
          );
        }
        this.gridInstance.instance.refresh();
      },
    };
    this.dataSource = new DataSource({
      store: this.dxStore.GetStore(this.storeOption),
      filter: ['orderStatus', '>', 0],
    });
  }

  directToLocation(data) {
    if (data.customer.location) {
      const coordinates = JSON.parse(data.customer.location);
      window.open(
        'https://www.google.com/maps/dir/?api=1&origin_place_id=ChIJ6_MMY8K1xRQRS7WWM5yBtOo&destination=' +
          (coordinates.latitude ?? coordinates.lat) +
          ',' +
          (coordinates.longitude ?? coordinates.lon) +
          '&travelmode=driving&origin=corbana',
        '_blank',
      );
    }
  }

  getInTouch(data) {
    console.log(data);
    if (data?.customer.telegramUserName) {
      window.open(
        'https://telegram.me/' + data?.customer.telegramUserName,
        '_blank',
      );

      // https://api.whatsapp.com/send/?phone=00905394679794
    }
  }

  gridInitNewRow(e) {
    e.data.createDate = new Date();
  }

  items = [
    {
      Value: 1,
      Text: this.translate.instant('ORDER.USER_CONFIRMED'),
      disabled: false,
    },
    {
      Value: 2,
      Text: this.translate.instant('ORDER.MERCHANT_CONFIRMED'),
      disabled: false,
    },
    {
      Value: 3,
      Text: this.translate.instant('ORDER.BEING_PREPARING'),
      disabled: false,
    },
    {Value: 4, Text: this.translate.instant('ORDER.SENT'), disabled: false},
    {
      Value: 5,
      Text: this.translate.instant('ORDER.DELIVERED'),
      disabled: false,
    },
    {Value: 6, Text: this.translate.instant('ORDER.CANCELED'), disabled: false},
  ];

  async onOperationItemClick(e, row) {
    let newOrderStatus = row.data.orderStatus;

    if (row.data.orderChannel === 'TELEGRAM') {
      newOrderStatus = row.data.orderStatus + 1;
    } else if (row.data.orderChannel === 'GETIR') {
      if (row.data.orderStatus === OrderStatus.Preparing) {
        newOrderStatus = OrderStatus.Delivered;
      } else if (row.data.orderStatus !== OrderStatus.FutureOrder) {
        newOrderStatus = row.data.orderStatus + 1;
      }
    }

    await this.dataSource
      .store()
      .update(row.data.id, {orderStatus: newOrderStatus});
  }

  async cancelOrder(e, row) {
    try {
      await this.orderService.CancelOrder(row.data.id).toPromise();
      this.gridInstance.instance.refresh();
    } catch (error) {
      this.swalService.showErrorMessage();
    }
  }

  onRowPrepared(e) {
    if (e.rowType === 'data') {
      if (e.data.orderChannel === 'TELEGRAM') {
        e.rowElement.style.backgroundColor = '#7fc8e8';
      } else if (e.data.orderChannel === 'GETIR') {
        e.rowElement.style.backgroundColor = '#a8a1d3';
      }
    }
  }

  orderStatusColumnCustomizeText(row) {
    switch (row.orderStatus) {
      case OrderStatus.UserConfirmed:
        return this.translate.instant('Onayla');

      case OrderStatus.MerchantConfirmed:
        return this.translate.instant('Hazirla');

      case OrderStatus.Preparing: {
        let text: string = '';
        if (row.orderChannel === 'TELEGRAM') {
          text = this.translate.instant('Gonder');
        } else if (row.orderChannel === 'GETIR') {
          text =
            row.getirOrder.deliveryType === DeliveryType.ByGetir
              ? 'Getir Kuryesine teslim et'
              : 'Müşteriye teslim et';
        }
        return text;
      }

      case OrderStatus.OrderSent:
        return this.translate.instant('Ulasti');

      case OrderStatus.Delivered:
        let text: string = '';
        if (row.orderChannel === 'TELEGRAM') {
          text = 'DELIVERED';
        } else if (row.orderChannel === 'GETIR') {
          text =
            row.getirOrder.deliveryType === DeliveryType.ByGetir
              ? 'Kuryeye verildi'
              : 'Teslim edildi';
        }
        return text;

      case OrderStatus.Canceled:
        return 'CANCELED';

      case OrderStatus.FutureOrder:
        return 'İleri tarihli siparişi onayla';
    }
  }

  getirOrderStaus(rowData) {
    if (rowData?.status === 400) {
      return this.translate.instant('ORDER.NEW_ORDER');
    } else {
      return this.translate.instant('ORDER.FUTURE_ORDER');
    }
  }

  paymentMethodsDisplayValue(rowData) {
    return this.translate.instant(rowData.paymentMethod.trim().toLowerCase());
  }
}
