import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'ralba-form-field-wrapper',
  templateUrl: './form-field-wrapper.wrapper.html',
  styleUrls: ['./form-field-wrapper.wrapper.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldWrapperWrapperComponent extends FieldWrapper {}
