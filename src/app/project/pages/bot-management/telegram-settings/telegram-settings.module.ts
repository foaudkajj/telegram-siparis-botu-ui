import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TelegramSettingsRoutingModule} from './telegram-settings-routing.module';
import {TelegramSettingsComponent} from './telegram-settings.component';
import {FuseSharedModule} from '@fuse/shared.module';

@NgModule({
  declarations: [TelegramSettingsComponent],
  imports: [FuseSharedModule, TelegramSettingsRoutingModule],
})
export class TelegramSettingsModule {}
