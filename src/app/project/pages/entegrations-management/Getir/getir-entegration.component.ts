import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UIResponse } from 'app/project/Models/UIResponse';
import { DxStoreService } from 'app/project/services/dx-store.service';
import { GetirService } from 'app/project/services/getir.service';
import { SwalService } from 'app/project/services/swal.service';
import { DxDataGridComponent, DxFormComponent, DxListComponent } from 'devextreme-angular';
import Store from 'devextreme/data/abstract_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-getir-entegration',
  templateUrl: './getir-entegration.component.html',
  styleUrls: ['./getir-entegration.component.scss']
})
export class GetirEntegrationComponent implements OnInit {
  restaurantPaymentMethodsDS: DataSource;
  allPaymentMethodsStore: Store;
  restaurantMenuAndOptionsDS: DataSource;
  // restaurantOptionsDS: DataSource;
  selectedItemsIds = [];
  CourierRestaurantStatus = { Courier: false, Restaurant: false };
  formSubmitButtonOptions = {};
  @ViewChild('paymentMethodsList') PaymentMethodsList: DxListComponent;
  @ViewChild('Grid') paymentMethodsGridInstance: DxDataGridComponent;
  @ViewChild('MenusOptionsGrid') menusOptionsGrid: DxDataGridComponent;

  @ViewChild("formInstance") formInstance: DxFormComponent;

  constructor(private dxStore: DxStoreService, private getirService: GetirService, private readonly swal: SwalService, private readonly translate: TranslateService) {
    this.restaurantMenuAndOptionsDS = new DataSource({
      store: this.dxStore.GetStore({
        loadUrl: "Getir/GetRestaurantMenusAndOptions", Key: "id"
      })
    });

  }

  panelItemChanged(e) {
    if (e.name == 'selectedItem') {
      if (e.value.dataField == 'Products') {

        this.restaurantMenuAndOptionsDS = new DataSource({
          store: this.dxStore.GetStore({
            loadUrl: "Getir/GetRestaurantMenusAndOptions", Key: "id"
          })
        });



      } else if (e.value.dataField == 'PaymentMethods') {


        this.restaurantPaymentMethodsDS = new DataSource({
          store: this.dxStore.GetStore({
            loadUrl: "Getir/GetRestaurantPaymentMethods", Key: "id", deleteUrl: 'Getir/DeleteRestaurantPaymentMethods', insertUrl: 'Getir/AddPaymentMethod'
          }),
          onInserted: () => this.paymentMethodsGridInstance.instance.refresh()
        });

        this.allPaymentMethodsStore = this.dxStore.GetStore({
          loadUrl: "Getir/GetAllPaymentMethods", Key: "id"
        });


      }
      // else if (e.value.dataField == 'Options') {
      //   this.restaurantOptionsDS = new DataSource({
      //     store: this.dxStore.GetStore({
      //       loadUrl: "Getir/GetOptionProdcuts", Key: "id"
      //     })
      //   });

      // }
      else if (e.value.dataField == 'CourierAvailibility') {
        this.formSubmitButtonOptions = {
          text: this.translate.instant('COMMON.SAVE'),
          type: "success",
          useSubmitBehavior: true,
          onClick: () => this.UpdateRestaurantAndCourierInfo()
        }
        this.GetRestaurantDetails();
        // await this.getirService.ActivateDeactivateRestaurantPaymentMethods().toPromise()
        // await this.getirService.ActivateDeactivateRestaurantPaymentMethods().toPromise()
      }
    }
  }


  async ActivateDeactivate(e, data) {
    const response = await this.getirService.ActivateDeactivateRestaurantPaymentMethods(data.id, e.value).toPromise()
    this.paymentMethodsGridInstance.instance.refresh()
    if (!response.IsError) {
      this.swal.showSuccessMessage();
    } else {
      this.swal.showErrorMessage();
    }
  }

  async ActivateDeactivateProductStatus(e, data) {
    const response = await this.getirService.ActivateDeactivateProductStatus(data.id, e.value ? 100 : 200).toPromise()
    this.menusOptionsGrid.instance.refresh()
    if (!response.IsError) {
      this.swal.showSuccessMessage();
    } else {
      this.swal.showErrorMessage();
    }
  }

  // async ActivateDeactivateCategoryStatus(e, data) {
  //   const response = await this.getirService.ActivateDeactivateCategoryStatus(data.id, e.value).toPromise()
  //   this.paymentMethodsGridInstance.instance.refresh()
  //   if (!response.IsError) {
  //     this.swal.showSuccessMessage();
  //   } else {
  //     this.swal.showErrorMessage();
  //   }
  // }
  async ActivateDeactivateOptionProduct(e, data) {
    const response = await this.getirService.ActivateDeactivateOptionProduct(data.id, e.value).toPromise()
    this.paymentMethodsGridInstance.instance.refresh()
    if (!response.IsError) {
      this.swal.showSuccessMessage();
    } else {
      this.swal.showErrorMessage();
    }
  }
  async GetRestaurantDetails() {
    const response = await this.getirService.GetRestaurantDetails().toPromise()
    if (!response.IsError) {
      this.formInstance.instance.option("formData", response.Result);
    } else {
      this.swal.showErrorMessage();
    }
  }

  FormFieldValueChanged(dataField, e) {
    // console.log(e)
    // console.log(dataField)
  }

  async UpdateRestaurantAndCourierInfo() {
    const formData = this.formInstance.instance.option("formData");
    const { status, averagePreparationTime, isCourierAvailable } = formData;
    const response = await this.getirService.UpdateRestaurantAndCourierInfo({ status, averagePreparationTime, isCourierAvailable }).toPromise()
    this.GetRestaurantDetails();
    if (!response.IsError) {
      this.swal.showSuccessMessage();
    } else {
      this.swal.showErrorMessage();
    }
  }

  async ActivateDeactivateSubOption(e, options, category) {
    console.log(e)
    console.log("options", options)
    console.log("category", category)
    let response: UIResponse<object>;
    if (options?.optionProduct) {
      response = await this.getirService.ActivateInActiveOptions(options.optionProduct, e.value).toPromise()
    } else {
      response = await this.getirService.ActivateInActiveProductsAsOptions(options.product, e.value).toPromise()
    }

    this.menusOptionsGrid.instance.refresh()
    if (!response.IsError) {
      this.swal.showSuccessMessage();
    } else {
      this.swal.showErrorMessage();
    }
  }

  menusOptionsGridOnRowPrepared(e) {
    if (e.rowType == 'data') {
      e.rowElement.style.backgroundColor = '#6b9b37';
      e.rowElement.className = e.rowElement.className.replace("dx-row-alt", "");
    }
  }

  productsGridOnRowPrepared(e) {
    if (e.rowType == 'data') {
      e.rowElement.style.backgroundColor = '#c68400';
      e.rowElement.className = e.rowElement.className.replace("dx-row-alt", "");
    }
  }

  subOptionsOnRowPrepared(e) {
    if (e.rowType == 'data') {
      e.rowElement.style.backgroundColor = '#ffe54c';
      e.rowElement.className = e.rowElement.className.replace("dx-row-alt", "");
    }
  }


  // async paymentMethodOnItemClick(e) {
  //   const isSelected = this.PaymentMethodsList.instance.isItemSelected(e.itemIndex);
  //   const response = await this.getirService.AddOrDeletePaymentMethod(e.itemData.id, isSelected).toPromise();
  //   if (!response.IsError) {
  //     this.swal.showSuccessMessage();
  //   } else {
  //     this.swal.showErrorMessage();
  //   }
  //   await this.restaurantPaymentMethodsDS.load();
  // }

  // paymentMethodsListDisplayExpr(item) {
  //   if (item) {
  //     return item.name.tr;
  //   }
  // }
  ngOnInit(): void {
  }

}
