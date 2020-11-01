import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, forwardRef, Self } from "@angular/core";
import { createTimeOptions, TimeOptions } from "./time-options";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { OnDestroyService } from '../on-destroy-service/on-destroy.service';

interface TimePickerTemplateOptions  {
  label
}

@Component({
  selector: 'app-time-picker-control',
  templateUrl: './time-picker-control.component.html',
  styleUrls: ['./time-picker-control.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    OnDestroyService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerControlComponent),
      multi: true
    }
  ]
})
export class TimePickerControlComponent implements ControlValueAccessor {

  control = new FormControl()
  options: TimeOptions[] = createTimeOptions(15)

  @Input() templateOptions: TimePickerTemplateOptions
  constructor(@Self() readonly onDestroy: OnDestroyService) { }
  writeValue(val: string | null): void {
    if (!val) {
      return
    }
    this.control.setValue(val, {emitEvent: false})
  }

  registerOnChange(fn): void {
    this.control
      .valueChanges
      .pipe(takeUntil(this.onDestroy.triggered$))
      .subscribe(fn)
  }

  registerOnTouched(fn): void {
    this.control
      .valueChanges
      .pipe(takeUntil(this.onDestroy.triggered$))
      .subscribe(() => fn())
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({onlySelf: true, emitEvent: false})
      return;
    }
    this.control.enable({onlySelf: true, emitEvent: false})
  }
}

