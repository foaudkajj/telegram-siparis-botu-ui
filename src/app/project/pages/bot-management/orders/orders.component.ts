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
  newOrderAudio;

  constructor(
    private dxStore: DxStoreService,
    private permessionService: PermessionsService,
    private translate: TranslateService,
    private orderService: OrderService,
    private swalService: SwalService,
  ) {
    this.orderStatusColumnCustomizeText =
      this.orderStatusColumnCustomizeText.bind(this);
    this.paymentMethodsDisplayValue =
      this.paymentMethodsDisplayValue.bind(this);
    this.runVoiceWhenNonConfirmedOrdersExist =
      this.runVoiceWhenNonConfirmedOrdersExist.bind(this);
  }

  ngOnDestroy(): void {
    clearInterval(this.currentInterval);
  }

  ngOnInit(): void {
    this.newOrderAudio = new Audio('../../../../../assets/new-order.mp3');
    this.newOrderAudio.load();
    this.filTable();
    this.InitlizePermessions();

    this.currentInterval = setInterval(async () => {
      await this.gridInstance.instance.refresh();
      this.runVoiceWhenNonConfirmedOrdersExist();
    }, 10000);
  }
  runVoiceWhenNonConfirmedOrdersExist() {
    if (
      this.gridInstance.instance
        .getDataSource()
        ?.items()
        ?.some(s => s.orderStatus === OrderStatus.UserConfirmed)
    ) {
      this.newOrderAudio.play();
    }
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

  directToLocation(e) {
    if (e.row.data.customer.location) {
      const coordinates = JSON.parse(e.row.data.customer.location);
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

  async onOperationItemClick(e, row) {
    let newOrderStatus = row.data.orderStatus;

    if (row.data.orderChannel === 'TELEGRAM') {
      newOrderStatus = row.data.orderStatus + 1;
    } else if (row.data.orderChannel === 'GETIR') {
      if (row.data.orderStatus === OrderStatus.Prepared) {
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
        return this.translate.instant(
          'ORDER.ORDER_OPERATION_BUTTONS.CONFIRM_ORDER',
        );

      case OrderStatus.MerchantConfirmed:
        return this.translate.instant('ORDER.ORDER_OPERATION_BUTTONS.READY');

      case OrderStatus.Prepared: {
        let text: string = '';
        if (row.orderChannel === 'TELEGRAM') {
          text = this.translate.instant('ORDER.ORDER_OPERATION_BUTTONS.SENT');
        } else if (row.orderChannel === 'GETIR') {
          text =
            row.getirOrder.deliveryType === DeliveryType.ByGetir
              ? this.translate.instant(
                  'ORDER.ORDER_OPERATION_BUTTONS.HANDED_TO_GETIR',
                )
              : this.translate.instant(
                  'ORDER.ORDER_OPERATION_BUTTONS.DELIVERED',
                );
        }
        return text;
      }

      case OrderStatus.OrderSent:
        return this.translate.instant('ORDER.ORDER_OPERATION_BUTTONS.SENT');

      case OrderStatus.Delivered:
        let text: string = '';
        if (row.orderChannel === 'TELEGRAM') {
          text = this.translate.instant(
            'ORDER.ORDER_OPERATION_BUTTONS.DELIVERED',
          );
        } else if (row.orderChannel === 'GETIR') {
          text =
            row.getirOrder.deliveryType === DeliveryType.ByGetir
              ? this.translate.instant(
                  'ORDER.ORDER_OPERATION_BUTTONS.HANDED_TO_GETIR',
                )
              : this.translate.instant(
                  'ORDER.ORDER_OPERATION_BUTTONS.DELIVERED',
                );
        }
        return text;

      case OrderStatus.Canceled:
        return this.translate.instant('ORDER.ORDER_OPERATION_BUTTONS.CANCELED');

      case OrderStatus.FutureOrder:
        return this.translate.instant(
          'ORDER.ORDER_OPERATION_BUTTONS.CONFIRM_FUTURE_ORDER',
        );

      case OrderStatus.ConfirmedFutureOrder:
        return this.translate.instant(
          'ORDER.ORDER_OPERATION_BUTTONS.FUTURE_ORDER_CONFIRMED',
        );
    }
  }

  paymentMethodsDisplayValue(rowData) {
    return this.translate.instant(rowData.paymentMethod.trim().toLowerCase());
  }
}
