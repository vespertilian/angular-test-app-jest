import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class OnDestroyService implements OnDestroy {

  triggered$ = new Subject()

  ngOnDestroy() {
    this.triggered$.next()
    this.triggered$.complete()
  }
}
