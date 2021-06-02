import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { EditRecipeFormType } from "../../components/edit-recipe/edit-recipe-form.type";

import { CreateRecipeFormType } from "../create-recipe/create-recipe-form.type";
import { RecipeDetailPageStore } from "./recipe-detail-page.store";
@Component({
	selector: "cook-book-recipe-detail-page",
	templateUrl: "recipe-detail-page.component.html",
	styleUrls: ["./recipe-detail-page.component.scss"],
	providers: [RecipeDetailPageStore],
})
export class RecipeDetailPageComponent {
	data$ = this.recipeDetailPageStore.data$;
	combineddata$ = this.recipeDetailPageStore.combineddata$;

	form = new FormGroup({});
	model = {
		defaultPortions: 2,
	};
	options: FormlyFormOptions = {};
	fields: FormlyFieldConfig[] = [
		{
			key: "defaultPortions",
			type: "number",
			className: "p-col-12",
			templateOptions: {
				// translate: true,
				placeholder: "Počet porcí",
			},
			defaultValue: 2,
		},
	];

	constructor(public recipeDetailPageStore: RecipeDetailPageStore) {}

	recalculate(d: number, current: number): number {
		let i = (current / d) * this.model.defaultPortions;
		return i;
	}

	ngOnInit() {
		this.recipeDetailPageStore.init({});
	}

	toggleEdittiongMode() {
		this.recipeDetailPageStore.toggleEditMode();
	}

	formSubmit(model: EditRecipeFormType) {
		this.recipeDetailPageStore.editData(model);
	}
}
