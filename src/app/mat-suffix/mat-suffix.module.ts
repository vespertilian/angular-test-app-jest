import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSuffixComponent } from "./mat-suffix.component";
import { MatIconModule } from "@angular/material/icon";
import { FormlyModule } from "@ngx-formly/core";
import { onPopulate } from "./on-populate";

const WRAPPER_NAME = "mat-suffix";

export const SUFFIX_EXTENSION_CONFIG = {
  wrappers: [{ name: WRAPPER_NAME, component: MatSuffixComponent }],
  extensions: [
    {
      name: "mat-suffix",
      extension: {
        onPopulate
      }
    }
  ]
}

@NgModule({
  declarations: [MatSuffixComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormlyModule.forChild(SUFFIX_EXTENSION_CONFIG)
  ],
  exports: [MatSuffixComponent]
})
export class MatSuffixModule {}
