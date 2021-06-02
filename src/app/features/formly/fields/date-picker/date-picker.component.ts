import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ralba-date-picker',
  template: `
    <ralba-custom-calendar
      [formControl]="$any(formControl)"
    ></ralba-custom-calendar>
    <!-- [attr.minDate]="to.attributes?.min"
      [attr.maxDate]="to.attributes?.max" -->
    <!-- [locale]="to.attributes.locale" -->
    <!-- [placeholder]="placeholder" -->
  `,
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent extends FieldType {
  defaultOptions = {
    templateOptions: {
      options: [],
      attributes: {
        min: '',
        max: '', // TODO: // implement max and min
        //format: null, //'dd. MM. yyyy'
        //locale: this.locale,
      },
    },
  };
}
