import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ralba-checkbox',
  template: `
    <div class="checkbox-field">
      <p-checkbox
        [class.ng-dirty]="showError"
        [binary]="true"
        [formControl]="$any(formControl)"
        [formlyAttributes]="field"
        [label]="to.checkboxLabel"
        (onChange)="to.change && to.change(field, $event)"
      >
      </p-checkbox>
      <!-- [label]="to.label" -->
      <div></div>
    </div>
  `,
  styles: [
    `
      .checkbox-field {
        padding-top: 7px;
        padding-bottom: 6px;
      }
    `,
  ],
})
export class CheckboxComponent extends FieldType {
  defaultOptions = {
    templateOptions: {
      hideLabel: true,
      checkboxLabel: '',
    },
  };
}
