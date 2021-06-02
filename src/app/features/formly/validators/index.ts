

import {
  maxlengthValidationMessage,
  maxValidationMessage,
  minlengthValidationMessage,
  minValidationMessage,
  requiredMessage,
  requiredTrue,
} from './messages';
import {
  ValidationMessageOption,
  ValidatorOption,
} from '@ngx-formly/core/lib/services/formly.config';

export const FORMLY_VALIDATORS: ValidatorOption[] = [
  {
    name: 'requiredTrue',
    validation: requiredTrue,
  },

];

export const FORMLY_VALIDATIONMESSAGES: ValidationMessageOption[] = [
  { name: 'required', message: requiredMessage },
  { name: 'minlength', message: minlengthValidationMessage },
  { name: 'maxlength', message: maxlengthValidationMessage },
  { name: 'min', message: minValidationMessage },
  { name: 'max', message: maxValidationMessage },
];
