import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Dropdown } from 'primeng/dropdown';
@Component({
  selector: 'ralba-select-button',
  template: `
    <p-selectButton
      [formControl]="$any(formControl)"
      [options]="(to.options | formlySelectOptions: field | async) || []"
      (onChange)="to.change && to.change(field, $event)"
      [formlyAttributes]="field"
    ></p-selectButton>
  `,
  styles: ['::ng-deep .p-dropdown{width:100%}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
//implements DoCheck
export class SelectButtonComponent extends FieldType {
  @ViewChild(Dropdown, { static: true }) dropDown: Dropdown | undefined;

  defaultOptions = {
    templateOptions: {
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
