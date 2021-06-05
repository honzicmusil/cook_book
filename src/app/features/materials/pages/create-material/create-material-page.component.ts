import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { CreateMaterialFormType } from "./create-material-form.type";
import { CreateMaterialPageStore } from "./create-material-page.store";

@Component({
	selector: "cook-book-create-material-page",
	templateUrl: "create-material-page.component.html",
	styleUrls: ["./create-material-page.component.scss"],
	providers: [CreateMaterialPageStore],
})
export class CreateMaterialPageComponent {
	form = new FormGroup({});
	model: CreateMaterialFormType = {
		name: "",
		unit: "",
	};
	options: FormlyFormOptions = {};
	fields: FormlyFieldConfig[] = [
		{
			key: "name",
			type: "input",
			className: "p-col-12",
			templateOptions: {
				label: "Name of the material",
				placeholder: "Cola",
				maxLength: 30,
				required: true,
			},
		},
		{
			key: "unit",
			type: "input",
			className: "p-col-12",
			templateOptions: {
				label: "Unit",
				placeholder: "ml",
				maxLength: 10,
				required: true,
			},
		},
	];

	@Output() formSubmit = new EventEmitter<CreateMaterialFormType>();

	constructor(public createMaterialPageStore: CreateMaterialPageStore) {}

	onFormSubmit(model: CreateMaterialFormType) {
		if (this.form.valid) {
			this.createMaterialPageStore.postData(
				JSON.parse(JSON.stringify(model)) as CreateMaterialFormType
			);
		}
	}
}
