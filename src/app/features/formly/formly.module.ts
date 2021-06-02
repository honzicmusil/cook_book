import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FORMLY_INPUTS, FORMLY_TYPES } from './fields';
import { FORMLY_WRAPPER, FORMLY_WRAPPER_DECLARATION } from './wrappers';
import { FormlyModule } from '@ngx-formly/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FORMLY_VALIDATORS, FORMLY_VALIDATIONMESSAGES } from './validators';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    CheckboxModule,
    ButtonModule,
    DropdownModule,
    TooltipModule,
    InputNumberModule,
    RadioButtonModule,
    FormlySelectModule,
    FormsModule,
    MultiSelectModule,
    TagModule,
    ChipModule,
    SelectButtonModule,
    FormlyModule.forRoot({
      types: FORMLY_TYPES,
      wrappers: FORMLY_WRAPPER,
      validators: FORMLY_VALIDATORS,
      validationMessages: FORMLY_VALIDATIONMESSAGES,
    }),
  ],
  exports: [FormlyModule],
  declarations: [...FORMLY_INPUTS, ...FORMLY_WRAPPER_DECLARATION],
})
export class OwnFormlyModule {}
