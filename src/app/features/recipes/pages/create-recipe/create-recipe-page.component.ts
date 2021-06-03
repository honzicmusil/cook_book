import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MaterialService } from "src/app/features/api-services/meterials.service";
import { Material } from "src/app/features/models";
import { CreateRecipeFormType } from "./create-recipe-form.type";
import { CreateRecipePageStore } from "./create-recipe-page.store";

@Component({
	selector: "cook-book-create-recipe-page",
	templateUrl: "create-recipe-page.component.html",
	styleUrls: ["./create-recipe-page.component.scss"],
  providers: [CreateRecipePageStore]
})
export class CreateRecipePageComponent {

	form = new FormGroup({});
	model: CreateRecipeFormType = {
		name: "",
		defaultPortions: 0,
		description: "",
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
				label: "Název receptu",
				placeholder: "Cola s rumem",
				required: true,
        maxLength: 30
			},
		},
		{
			key: "description",
			type: "textarea",
			className: "p-col-12",
			templateOptions: {
				// translate: true,
				label: "Popis přípravy a receptu",
				placeholder: "Slejeme dohromdy",
				required: true,
        maxLength: 256
			},
		},
		{
			key: "defaultPortions",
			type: "number",
			className: "p-col-12",
			templateOptions: {
				// translate: true,
				label: "Počet porcí",
				placeholder: "1",
				required: true,
			},
		},
		{
			key: "preparationLength",
			type: "number",
			className: "p-col-12",
			templateOptions: {
				// translate: true,
        label: "Doba na přípravu (min)",
				placeholder: "v minutach",
				required: true,
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
	constructor(private materialService: MaterialService, public createRecipePageStore: CreateRecipePageStore) {}


	onFormSubmit(model: CreateRecipeFormType) {
		console.log(model);
		if (this.form.valid) {
      console.log(model);
			this.createRecipePageStore.postData(
				JSON.parse(JSON.stringify(model)) as CreateRecipeFormType
			);
		}
	}
}
