import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReactiveComponentModule } from "@ngrx/component";
import { FormlyModule } from "@ngx-formly/core";

import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { RecipesRoutingModule } from "./recipes.module.routing";
import { RECIPES_PAGES } from "./pages";
import { TitleModule } from "../base-ui";
import { RecipesGridModule } from "./components/recipes-grid";
import { SidebarModule } from "primeng/sidebar";
import { RECIPES_COMPONENTS } from "./components";
@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,

		ReactiveComponentModule,
		ButtonModule,
		TitleModule,
		CardModule,
		FormlyModule,
		RecipesRoutingModule,
		RecipesGridModule,
		SidebarModule,
	],
	exports: [],
	declarations: [...RECIPES_PAGES, ...RECIPES_COMPONENTS],
	providers: [],
})
export class RecipesModule {}
