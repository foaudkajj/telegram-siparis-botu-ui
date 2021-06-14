import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetirEntegrationRoutingModule } from './getir-entegration-routing.module';
import { GetirEntegrationComponent } from './getir-entegration.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { DxTabPanelModule } from 'devextreme-angular/ui/tab-panel';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxCheckBoxModule, DxFormModule, DxSwitchModule, DxTemplateModule } from 'devextreme-angular';
import { GetirService } from 'app/project/services/getir.service';


@NgModule({
  declarations: [GetirEntegrationComponent],
  imports: [
    FuseSharedModule,
    GetirEntegrationRoutingModule,
    DxTabPanelModule,
    DxListModule,
    DxTemplateModule,
    DxSwitchModule,
    DxFormModule,
    DxCheckBoxModule
  ],
  providers: [GetirService]
})
export class GetirEntegrationModule { }
