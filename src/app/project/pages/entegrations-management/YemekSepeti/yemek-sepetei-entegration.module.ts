import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {YemekSepeteiEntegrationRoutingModule} from './yemek-sepetei-entegration-routing.module';
import {YemekSepeteiEntegrationComponent} from './yemek-sepetei-entegration.component';
import {FuseSharedModule} from '@fuse/shared.module';

@NgModule({
  declarations: [YemekSepeteiEntegrationComponent],
  imports: [FuseSharedModule, YemekSepeteiEntegrationRoutingModule],
})
export class YemekSepeteiEntegrationModule {}
