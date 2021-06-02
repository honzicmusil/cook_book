import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ralba-radio-radio',
  template: `
    <p-radioButton
      *ngFor="let option of to.options | formlySelectOptions: field | async"
      [class.ng-dirty]="showError"
      [name]="field.name || id"
      [formControl]="$any(formControl)"
      [label]="option.label"
      [value]="option.value"
    >
    </p-radioButton>
  `,
})
export class RadioComponent extends FieldType {
  defaultOptions = {
    templateOptions: { options: [] },
  };
}
