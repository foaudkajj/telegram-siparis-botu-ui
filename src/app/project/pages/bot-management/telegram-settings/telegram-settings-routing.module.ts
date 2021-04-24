import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelegramSettingsComponent } from './telegram-settings.component';

const routes: Routes = [
  { path: '', component: TelegramSettingsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelegramSettingsRoutingModule { }
