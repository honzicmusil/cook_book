import { Component, OnInit } from "@angular/core";
import { EditMaterialFormType } from "../../components/edit-material-form/edit-material-form.type";
import { MaterialDetailPageStore } from "./material-detail-page.store";

@Component({
	selector: "cook-book-material-detail-page",
	templateUrl: "material-detail-page.component.html",
	styleUrls: ["./material-detail-page.component.scss"],
	providers: [MaterialDetailPageStore],
})
export class MaterialDetailPageComponent implements OnInit {
	editMode = false;
	constructor(public materialDetailPageStore: MaterialDetailPageStore) {}

	ngOnInit() {
		this.materialDetailPageStore.fetchData({});
	}

	toggleEdittiongMode() {
		this.editMode = !this.editMode;
	}

	onFormSubmit(model: EditMaterialFormType) {
		this.materialDetailPageStore.postData(model);
	}
}
