import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { map } from "rxjs/operators";

import { MaterialService } from "src/app/features/api-services/meterials.service";
import { CreateRecipePageStore } from "../../pages/create-recipe/create-recipe-page.store";
import { RecipesFilterFormType } from "./recipes-filter-form.tyle";

@Component({
	selector: "cook-book-recipes-filter-form",
	templateUrl: "recipes-filter-form.component.html",
	styleUrls: ["./recipes-filter-form.component.scss"],
})
export class RecipesFilterFormComponent {
	form = new FormGroup({});
	model: RecipesFilterFormType = {
		name: "",
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
				maxLength: 30,
			},
		},
		{
			key: "materials",
			type: "multiselect",
			className: "p-col-12",
			templateOptions: {
				translate: true,
				label: "Ingredients",
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
	];
	@Output() formSubmit = new EventEmitter<RecipesFilterFormType>();

	constructor(private materialService: MaterialService) {}

	onFormSubmit(model: RecipesFilterFormType) {
		console.log(model);
		if (this.form.valid) {
			this.formSubmit.emit(
				JSON.parse(JSON.stringify(model)) as RecipesFilterFormType
			);
		}
	}
}
