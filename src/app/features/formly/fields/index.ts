import { CheckboxComponent } from './checkbox/checkbox.component';

import { CustomCalendarComponent } from './date-picker/date-picker-with-value-accesor.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { InputFieldComponent } from './input/input.field';
import { NumberFieldComponent } from './number/number.field';
import { RadioComponent } from './radio/radio.component';
import { RepeatFieldComponent } from './repeat/repeat.component';
import { SelectComponent } from './select/select.component';
import { TextAreaComponent } from './textarea/textarea.component';

import { MultiSelectComponent } from './multiselect/multiselect.input';

import { SelectButtonComponent } from './select-button/select-button.componet';

export const FORMLY_TYPES = [
  { name: 'input', component: InputFieldComponent, wrappers: ['form-field'] },
  { name: 'textarea', component: TextAreaComponent, wrappers: ['form-field'] },
  { name: 'number', component: NumberFieldComponent, wrappers: ['form-field'] },
  {
    name: 'date-picker',
    component: DatePickerComponent,
    wrappers: ['form-field'],
  },
  {
    name: 'select-button',
    component: SelectButtonComponent,
    wrappers: ['form-field'],
  },

  {
    name: 'checkbox',
    component: CheckboxComponent,
    wrappers: ['form-field'],
    className: 'p-col-align-center', // TOODO: mkl check
  },
  {
    name: 'radio',
    component: RadioComponent,
    wrappers: ['form-field'],
  },
  {
    name: 'select',
    component: SelectComponent,
    wrappers: ['form-field'],
  },
  { name: 'repeat', component: RepeatFieldComponent },

  {
    name: 'multiselect',
    component: MultiSelectComponent,
    wrappers: ['form-field'],
  },
];

export const FORMLY_INPUTS = [
  InputFieldComponent,
  TextAreaComponent,
  DatePickerComponent,
  CustomCalendarComponent,
  CheckboxComponent,
  RadioComponent,
  SelectComponent,
  RepeatFieldComponent,
  NumberFieldComponent,
  MultiSelectComponent,
  SelectButtonComponent,
];

export {
  InputFieldComponent,
  TextAreaComponent,
  DatePickerComponent,
  CheckboxComponent,
  RadioComponent,
  SelectComponent,
  CustomCalendarComponent,
  RepeatFieldComponent,
  NumberFieldComponent,
  MultiSelectComponent,
  SelectButtonComponent,
};
