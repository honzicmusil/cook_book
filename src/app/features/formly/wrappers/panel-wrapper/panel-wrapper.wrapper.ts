import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'ralba-panel-wrapper',
  templateUrl: './panel-wrapper.wrapper.html',
  styleUrls: ['./panel-wrapper.wrapper.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelWrapperComponent extends FieldWrapper {}
