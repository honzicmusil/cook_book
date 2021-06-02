import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ralba-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input.field.html',
  styleUrls: ['./input.field.scss'],
})
export class InputFieldComponent extends FieldType {}
