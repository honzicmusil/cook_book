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
  template: `
    <p-dropdown
      [class.ng-dirty]="showError"
      [placeholder]="to.placeholder || ''"
      [options]="(to.options | formlySelectOptions: field | async) || []"
      [formControl]="$any(formControl)"
      [formlyAttributes]="field"
      [showClear]="to.showClear"
      dropdownIcon="fa fa-chevron-down"
      (onChange)="to.change && to.change(field, $event)"
    >
    </p-dropdown>
  `,
  styles: ['::ng-deep .p-dropdown{width:100%}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
//implements DoCheck
export class SelectComponent extends FieldType {
  @ViewChild(Dropdown, { static: true }) dropDown: Dropdown | undefined;

  defaultOptions = {
    templateOptions: {
      showClear: true,
      placeholder: 'Choose',
      options: [],
    },
  };

  // ngDoCheck() {
  // if(this.dropDown){
  //   if(this.to.placeholder)
  //     this.dropDown.placeholder = this.to.placeholder;
  // }
  // }
}
