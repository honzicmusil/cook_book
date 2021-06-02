import { Component, ChangeDetectorRef } from '@angular/core';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'ralba-repeate',
  templateUrl: 'repeat.component.html',
  styleUrls: ['./repeat.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  // tpa issue
})
export class RepeatFieldComponent extends FieldArrayType {
  // TODO: add explicit constructor

  // onPopulate example
  // https://stackblitz.com/edit/angular-5xverj-8qrxmc?file=src%2Fapp%2Frepeat-section.type.ts

  constructor(private readonly cdRef: ChangeDetectorRef) {
    super();
  }

  defaultOptions = {
    templateOptions: {
      initialModel: {},
      options: [],
      addText: 'Add',
      removeTextTitle: 'Remove',
      attributes: {
        grid: 12,
        allowAdd: 'false',
        allowRemove: 'false',
        //addClass: 'e-primary',
        removeClass: '', // floatRemove
      },
    },
  };

  onPopulate(field: FormlyFieldConfig) {
    //https://github.com/ngx-formly/ngx-formly/blob/60bece9b9dd4e1719bb6cdf3e49d804453438fb3/src/core/src/lib/templates/field-array.type.ts#L9
    super.onPopulate(field);
    this.cdRef.markForCheck();
    this.cdRef.detectChanges();
  }

  get allowAdd() {
    if (this.to.change) this.to.change(this.field, 'add');
    return this.to.attributes?.allowAdd === 'true';
  }

  get allowRemove() {
    if (this.to.change) this.to.change(this.field, 'remove');
    return this.to.attributes?.allowRemove === 'true';
  }

  onChange() {
    this.formControl.markAsTouched();
  }

  byFieldIndex(index: number, field: FormlyFieldConfig) {
    return field.id;
  }
}
