import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ComponentStore } from "@ngrx/component-store";

import { Observable } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { ToastActions } from "src/app/features/toasts";
import { Material } from "src/app/features/models";
import { MaterialService } from "src/app/features/api-services/meterials.service";
import { ActivatedRoute, Router } from "@angular/router";
import { httpError } from "src/app/features/helper";

export interface MaterialPageState {
	data: Material | undefined | null;
	loading: boolean;
}

@Injectable()
export class CreateMaterialPageStore extends ComponentStore<MaterialPageState> {
	constructor(
		protected store$: Store<never>,
		private service: MaterialService,
		private router: Router,
		private route: ActivatedRoute
	) {
		super({
			data: null,
			loading: false,
		});
	}

	readonly loading$ = this.select((state) => state.loading);

	public readonly requesting = this.updater((state) => ({
		...state,
		loading: true,
	}));

	public readonly requestFinished = this.updater((state) => ({
		...state,
		loading: false,
	}));

	private readonly updateData = this.updater((state, input: Material) => ({
		...state,
		data: input,
	}));

	readonly postData = this.effect((input: Observable<Omit<Material, "id">>) => {
		return input.pipe(
			tap(() => this.requesting()),
			exhaustMap((p) =>
				this.service.create(p).pipe(
					map((data) => {
						if (data.error) throw data;
						else if (!data.error) {
							this.router.navigate([".."], { relativeTo: this.route });
							this.store$.dispatch(
								ToastActions.showToast({
									message: {
										severity: "success",
										summary: "Saved",
										detail: `${data.name} was created`,
									},
								})
							);
						}
					}),
					tap(() => this.requestFinished()),
					catchError((p) => httpError(this.store$, p))
				)
			)
		);
	});
}
