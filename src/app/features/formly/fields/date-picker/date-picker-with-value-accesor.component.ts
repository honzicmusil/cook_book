import {
  Component,
  ExistingProvider,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import * as moment from 'moment';

const CUSTOM_CALENDAR_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomCalendarComponent),
  multi: true,
};

@Component({
  selector: 'ralba-custom-calendar',
  template: `
    <p-calendar
      [(ngModel)]="model"
      dataType="string"
      [disabled]="disabled"
      (onSelect)="valueChanged($event)"
      (onTodayClick)="valueChanged($event)"
      (onClearClick)="valueChanged(null)"
      (onInput)="valueChanged($event.target.value)"
      [showButtonBar]="true"
    ></p-calendar>
  `,
  providers: [CUSTOM_CALENDAR_CONTROL_VALUE_ACCESSOR],
})
export class CustomCalendarComponent implements ControlValueAccessor {
  model: Date = new Date();
  @Input() formControl: FormControl = new FormControl();
  @Input() disabled = false;

  @ViewChild(Calendar) private _calendar: Calendar | undefined;

  validInputMapping: Map<string, Date> = new Map<string, Date>();

  private onChange = (_: string | null) => {
    return _;
  };

  private onTouched = () => {
    return;
  };

  writeValue(value: string) {
    if (value) {
      this.model = moment(value).toDate();
      this._calendar?.updateModel(this.model);
      this._calendar?.updateInputfield();
    }
  }

  valueChanged($event: Date | null | string) {
    if (moment($event).isValid()) this.onChange(moment($event).toISOString());
    else this.onChange(null);
  }

  registerOnChange(fn: () => string | null): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
