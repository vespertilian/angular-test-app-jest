import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimePickerControlComponent } from './time-picker-control/time-picker-control.component';

@NgModule({
  declarations: [
    AppComponent,
    TimePickerControlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
