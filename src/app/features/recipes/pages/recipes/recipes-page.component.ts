import { Component } from "@angular/core";
import { Recipe } from "src/app/features/models";
import { RecipesPageStore } from "./recipes-page.store";

@Component({
	selector: "cook-book-recipes-page",
	templateUrl: "recipes-page.component.html",
	styleUrls: ["./recipes-page.component.scss"],
	providers: [RecipesPageStore],
})
export class RecipesPageComponent {
	linkToDetail: (data: Recipe) => string[] = (data) => ["./", data.id];

	constructor(public recipesPageStore$: RecipesPageStore) {}
}
