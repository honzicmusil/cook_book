import {
  ChangeDetectionStrategy,
  Component,
  //DoCheck,
  ViewChild,
} from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Dropdown } from 'primeng/dropdown';
@Component({
  selector: 'ralba-select',
  templateUrl: 'multiselect.input.html',
  styles: [
    `
      ::ng-deep .p-multiselect {
        width: 100%;
      }

      ::ng-deep .primary-multiselect .p-multiselect-token {
        background: var(--primary-color) !important;
        color: var(--primary-color-text) !important;
      }
      ::ng-deep .secondary-multiselect .p-multiselect-token {
        background: var(--secondary-color) !important;
        color: var(--secondary-color-text) !important;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
//implements DoCheck
export class MultiSelectComponent extends FieldType {
  @ViewChild(Dropdown, { static: true }) dropDown: Dropdown | undefined;

  defaultOptions = {
    templateOptions: {
      showClear: true,
      placeholder: 'Choose',
      options: [],
    },
  };
}
