import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { EditRecipeFormType } from "./edit-recipe-form.type";

@Component({
	selector: "cook-book-edit-recipe-form",
	templateUrl: "edit-recipe-form.component.html",
	styleUrls: ["./edit-recipe-form.component.scss"],
})
export class EditRecipeFormComponent {
	form = new FormGroup({});
	model: EditRecipeFormType = {
		name: "",
		defaultPortions: 0,
		ingredients: [],
	};
	options: FormlyFormOptions = {};
	fields: FormlyFieldConfig[] = [
		{
			key: "name",
			type: "input",
			className: "p-col-12",
			templateOptions: {
				// translate: true,
				placeholder: "Název receptu",
			},
		},
		{
			key: "defaultPortions",
			type: "number",
			className: "p-col-12",
			templateOptions: {
				// translate: true,
				placeholder: "Počet porcí",
			},
		},
		{
			key: "ingredients",
			type: "repeat",
			className: "p-col-12",
			defaultValue: [{}],
			templateOptions: {
				//TODO: Translate Add Text
				addText: "Přidat ingredienci",
				attributes: {
					allowAdd: "true",
					allowRemove: "true",
				},
			},
			fieldArray: {
				fieldGroup: [
					{
						key: "material",
						type: "select",
						className: "p-col-12",
						templateOptions: {
							translate: true,
							label: "Ingredience",
							required: true,
						},
					},
					{
						key: "amount",
						type: "number",
						className: "p-col-12",
						templateOptions: {
							translate: true,
							label: "Množství",
							required: true,
						},
					},
				],
			},
		},
	];

	@Output() formSubmit = new EventEmitter<EditRecipeFormType>();

	onFormSubmit(model: EditRecipeFormType) {
		if (this.form.valid) {
			this.formSubmit.emit(
				JSON.parse(JSON.stringify(model)) as EditRecipeFormType
			);
		}
	}
}
