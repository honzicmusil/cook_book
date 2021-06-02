import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextAreaComponent extends FieldType {
  defaultOptions = {
    templateOptions: {
      options: [],
      attributes: {
        autocomplete: '',
        autoresize: 'yes',
      },
    },
  };
}
