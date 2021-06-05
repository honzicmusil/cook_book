import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { map } from "rxjs/operators";
import { MaterialService } from "src/app/features/api-services/meterials.service";
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
		description: "",
		defaultPortions: 0,
		preparationLength: 0,
		materials: [],
	};
	options: FormlyFormOptions = {};
	fields: FormlyFieldConfig[] = [
		{
			key: "name",
			type: "input",
			className: "p-col-12",
			templateOptions: {
				// translate: true,,
				label: "Name of the recipe",
				placeholder: "Cola s rumem",
				required: true,
				maxLength: 30,
			},
		},
		{
			key: "description",
			type: "textarea",
			className: "p-col-12",
			templateOptions: {
				// translate: true,
				label: "Preparation description",
				placeholder: "Preparation text",
				required: true,
				maxLength: 256,
			},
		},
		{
			key: "defaultPortions",
			type: "number",
			className: "p-col-12",
			defaultValue: 1,
			templateOptions: {
				// translate: true,
				label: "Default number of portions",
				placeholder: "1",
				required: true,
				min: 1,
			},
		},
		{
			key: "preparationLength",
			type: "number",
			className: "p-col-12",
			defaultValue: 1,
			templateOptions: {
				// translate: true,
				label: "Preparation time in minutes",
				placeholder: "v minutach",
				required: true,
				min: 1,
			},
		},
		{
			key: "materials",
			type: "repeat",
			className: "p-col-12",
			templateOptions: {
				//TODO: Translate Add Text
				addText: "Add ingredient",
				attributes: {
					allowAdd: "true",
					allowRemove: "true",
				},

			},
      validators: {
        validation: [{ name: 'nullArray' }],
      },
			fieldArray: {
				fieldGroup: [
					{
						key: "material",
						type: "select",
						className: "p-col-12",
						templateOptions: {
							translate: true,
							label: "Ingredient",
							required: true,
							options: this.materialService.getAll().pipe(
								map((p) =>
									p.itemList.map((item) => ({
										label: item.name + "(" + item.unit + ")",
										value: item.id,
									}))
								)
							),
						},
					},
					{
						key: "amount",
						type: "number",
						className: "p-col-12",
						templateOptions: {
							translate: true,
							label: "Amount",
							required: true,
							min: 1,
						},
					},
				],
			},
		},
	];

	@Output() formSubmit = new EventEmitter<EditRecipeFormType>();

  @Input() set data(value: EditRecipeFormType) {
		this.model = JSON.parse(JSON.stringify(value));
	}

  constructor(private materialService: MaterialService) {}

	onFormSubmit(model: EditRecipeFormType) {
		if (this.form.valid) {
			this.formSubmit.emit(
				JSON.parse(JSON.stringify(model)) as EditRecipeFormType
			);
		}
	}
}
