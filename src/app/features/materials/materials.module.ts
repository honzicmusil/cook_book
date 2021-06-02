import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReactiveComponentModule } from "@ngrx/component";
import { FormlyModule } from "@ngx-formly/core";

import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { MaterialsRoutingModule } from "./materials.module.routing";
import { MATERIALS_PAGES } from "./pages";
import { TitleModule } from "../base-ui";
import { MaterialsGridModule } from "./components";
import { EditMaterialFormComponent } from "./components/edit-material-form/edit-material-form.component";

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
		MaterialsRoutingModule,
		MaterialsGridModule,
	],
	exports: [],
	declarations: [EditMaterialFormComponent, ...MATERIALS_PAGES],
	providers: [],
})
export class MaterialsModule {}
