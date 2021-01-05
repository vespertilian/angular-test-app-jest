import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  TemplateRef,
} from "@angular/core"
import { FieldWrapper } from "@ngx-formly/core"
import { Observable, of } from "rxjs"

@Component({
  selector: 'app-mat-suffix',
  templateUrl: './mat-suffix.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatSuffixComponent extends FieldWrapper implements AfterViewInit {
  icon$: Observable<string> | null

  @ViewChild('matSuffix') matSuffix: TemplateRef<any>
  ngAfterViewInit() {
    if (this?.matSuffix && this?.to?.matSuffix?.icon) {
      this.to.suffix = this.matSuffix
      if (this.to.matSuffix.icon instanceof Observable) {
        this.icon$ = this.to.matSuffix.icon
      } else {
        this.icon$ = of(this.to.matSuffix.icon)
      }
      this.to.suffix = this.matSuffix
    }
  }

  suffixClick() {
    if (this?.to?.matSuffix?.onClick) {
      this.to.matSuffix.onClick()
    }
  }
}
