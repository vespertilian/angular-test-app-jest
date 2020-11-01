import { TestBed } from '@angular/core/testing';
import { TimePickerControlComponent } from './time-picker-control.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MockComponent, MockedComponent, ngMocks } from "ng-mocks";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatSelect } from "@angular/material/select";
import { MatOption } from "@angular/material/core";

describe('TimePickerControlComponent', () => {
  function setup() {
    TestBed.configureTestingModule({
      declarations: [
        TimePickerControlComponent,
        MockComponent(MatLabel),
        MockComponent(MatFormField),
        MockComponent(MatSelect),
        MockComponent(MatOption)
      ],
      imports: [
        ReactiveFormsModule
      ]
    })

    const fixture = TestBed.createComponent(TimePickerControlComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    return {component, fixture}
  }

  const getSelect = (fixture) => ngMocks.find<MockedComponent<MatSelect>>(fixture.debugElement, 'mat-select').componentInstance

  describe('controlValueAccessor interface', () => {
    describe('.writeValue', () => {
      it('sets the value on the select', () => {
        const {fixture, component} = setup()

        let valueChange = null
        const sub = component.control.valueChanges
          .subscribe((v) => valueChange = v)

        const matSelect = getSelect(fixture)
        jest.spyOn(matSelect, 'writeValue')

        component.writeValue('12:00:00Z')
        expect(matSelect.writeValue).toHaveBeenCalledWith('12:00:00Z')

        expect(valueChange).toBe(null)
        sub.unsubscribe()
      })

      it('does nothing if the value is falsy', () => {
        const {fixture, component} = setup()

        const matSelect = getSelect(fixture)
        jest.spyOn(matSelect, 'writeValue')

        component.writeValue(null)
        expect(matSelect.writeValue).not.toHaveBeenCalled()
      })
    })

    describe('.registerOnChange', () => {
      it('registers change events to the select form control value changes, and unsubscribes when destroyed', () => {
        const {fixture, component} = setup()

        const changeSpy = jest.fn()

        component.registerOnChange(changeSpy)
        const matSelect = getSelect(fixture)

        matSelect.__simulateChange('12:00:00Z')
        expect(changeSpy).toHaveBeenCalledWith('12:00:00Z')
        expect(changeSpy).toHaveBeenCalledTimes(1)

        component.onDestroy.ngOnDestroy()
        matSelect.__simulateChange('14:00:00Z')
        expect(changeSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('.registerOnTouched', () => {
      it('registers change events to the select form control value changes, and unsubscribes when destroyed', () => {
        const {fixture, component} = setup()

        const touchedSpy = jest.fn()

        component.registerOnTouched(touchedSpy)
        const matSelect = getSelect(fixture)

        matSelect.__simulateChange('12:00:00Z')
        expect(touchedSpy).toHaveBeenCalledTimes(1)

        component.onDestroy.ngOnDestroy()
        matSelect.__simulateChange('14:00:00Z')
        expect(touchedSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('.setDisabledState', () => {
      it('disables the inner form control, does not emit status changes', () => {
        const {component} = setup()

        let statusChange = null
        const sub = component.control.statusChanges
          .subscribe((v) => statusChange = v)

        component.setDisabledState(true)
        expect(component.control.disabled).toBeTruthy()

        component.setDisabledState(false)
        expect(component.control.disabled).toBeFalsy()

        expect(statusChange).toBe(null)
        sub.unsubscribe()
      })
    })
  })
});
