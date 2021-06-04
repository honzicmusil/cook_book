/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl } from '@angular/forms';
// import { translate } from '@ngneat/transloco';
import { FormlyFieldConfig } from '@ngx-formly/core';

// TODO: transalte - add right translate keys

/**
 * TODO: add description
 */
export function requiredTrue(control: AbstractControl) {
  if (control.value === true) {
    return null;
  }
  return {
    fieldMatch: {
      message: `Validation.YouMustAggree')}`,
    },
  };
}

/**
 * TODO: add description
 */
export function minlengthValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return `Validation.LeastCharacters{0}`;
}

/**
 * TODO: add description
 */
export function maxlengthValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return `Validation.LeastValue{0}`;
}

/**
 * TODO: add description
 */
export function minValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Validation.MostValue{0}`;
}

/**
 * TODO: add description
 */
export const maxValidationMessage = (
  error: any,
  field: FormlyFieldConfig
): string => {
  return `Validation.LessValue{0}`;
};

/**
 * TODO: add description
 */
export function requiredMessage(): string {
  return 'This field is required.';
}
