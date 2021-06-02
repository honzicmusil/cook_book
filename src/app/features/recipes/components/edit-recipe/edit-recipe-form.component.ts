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
			key: "materials",
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
							label: "Množství",
							required: true,
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
