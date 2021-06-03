import { Component } from "@angular/core";
import { Recipe } from "src/app/features/models";
import { RecipesFilterFormType } from "../../components/recipes-filter/recipes-filter-form.tyle";
import { RecipesPageStore } from "./recipes-page.store";

@Component({
	selector: "cook-book-recipes-page",
	templateUrl: "recipes-page.component.html",
	styleUrls: ["./recipes-page.component.scss"],
	providers: [RecipesPageStore],
})
export class RecipesPageComponent {
	filterShow = false;
	linkToDetail: (data: Recipe) => string[] = (data) => ["./", data.id];

	constructor(public recipesPageStore$: RecipesPageStore) {}

	toggle() {
		this.filterShow = !this.filterShow;
	}

  onFormSubmit(model: RecipesFilterFormType) {
    this.recipesPageStore$.updateFitler(model)

	}
}
