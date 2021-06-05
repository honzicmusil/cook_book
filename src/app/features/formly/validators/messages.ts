/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl } from "@angular/forms";
// import { translate } from '@ngneat/transloco';
import { FormlyFieldConfig } from "@ngx-formly/core";

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
			message: `You Must Aggree`,
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
	return `Minimum allowed length ${field?.templateOptions?.minLength}`;
}

/**
 * TODO: add description
 */
export function maxlengthValidationMessage(
	error: any,
	field: FormlyFieldConfig
) {
	return `Maximum allowed length ${field?.templateOptions?.maxLength}`;
}

/**
 * TODO: add description
 */
export function minValidationMessage(error: any, field: FormlyFieldConfig) {
	return `Minimum allowed value ${field?.templateOptions?.min}`;
}

/**
 * TODO: add description
 */
export const maxValidationMessage = (
	error: any,
	field: FormlyFieldConfig
): string => {
	return `Maximum allowed value ${field?.templateOptions?.max}`;
};

/**
 * TODO: add description
 */
export function requiredMessage(): string {
	return "This field is required.";
}

export function validateNullArray(control: AbstractControl) {
	const items = control.value as any[];
	if (items == null || items.length === 0)
		return {
			fieldMatch: {
				message: `Each recipe needs at least one material`,
			},
		};
	else {
		return null;
	}
}
