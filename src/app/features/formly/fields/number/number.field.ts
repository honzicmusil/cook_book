import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  DoCheck,
} from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'ralba-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './number.field.html',
  styleUrls: ['./number.field.scss'],
})
export class NumberFieldComponent extends FieldType implements DoCheck {
  @ViewChild(InputNumber, { static: true }) inputNumber:
    | InputNumber
    | undefined;

  ngDoCheck() {
    if (this.inputNumber !== undefined) {
      if (this.to.placeholder !== undefined)
        this.inputNumber.placeholder = this.to.placeholder;
      if (this.to.min !== undefined) this.inputNumber.min = this.to.min;
      if (this.to.max !== undefined) this.inputNumber.max = this.to.max;
      if (this.to.step !== undefined) this.inputNumber.step = this.to.step;
    }
  }
}
