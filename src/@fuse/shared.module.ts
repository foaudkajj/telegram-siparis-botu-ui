import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { FlexLayoutModule } from "@angular/flex-layout";

import { FuseDirectivesModule } from "@fuse/directives/directives";
import { FusePipesModule } from "@fuse/pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";
import { DevExtremeModule } from "devextreme-angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,
        DevExtremeModule,
        TranslateModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,
        DevExtremeModule,
        TranslateModule,
    ],
})
export class FuseSharedModule {}
