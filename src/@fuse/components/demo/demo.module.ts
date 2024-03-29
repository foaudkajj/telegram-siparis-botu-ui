import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import {FuseDemoContentComponent} from './demo-content/demo-content.component';
import {FuseDemoSidebarComponent} from './demo-sidebar/demo-sidebar.component';

@NgModule({
  declarations: [FuseDemoContentComponent, FuseDemoSidebarComponent],
  imports: [RouterModule, MatDividerModule, MatListModule],
  exports: [FuseDemoContentComponent, FuseDemoSidebarComponent],
})
export class FuseDemoModule {}
