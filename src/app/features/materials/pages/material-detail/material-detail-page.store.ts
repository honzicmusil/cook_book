import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { ComponentStore } from "@ngrx/component-store";

import { Observable, of } from "rxjs";
import {
	catchError,
	exhaustMap,
	map,
	tap,
	withLatestFrom,
} from "rxjs/operators";
import { MATERIALS_GRID_TEST_DATA } from "../../components";
import { LazyLoadEvent } from "primeng/api";
import { selectRouteParam } from "src/app/root.state";
import { ToastActions } from "src/app/features/toasts";
import { Material } from "src/app/features/models";
import { MaterialService } from "src/app/features/api-services/meterials.service";

export interface MaterialDetailPageState {
	data: Material | undefined | null;
	loading: boolean;
	editMode: boolean;
}

@Injectable()
export class MaterialDetailPageStore extends ComponentStore<MaterialDetailPageState> {
	constructor(
		protected store$: Store<never>,
		private service: MaterialService
	) {
		super({
			data: null,
			loading: false,
			editMode: false,
		});
	}

	readonly loading$ = this.select((state) => state.loading);

	readonly data$ = this.select((state) => state.data);
	readonly editMode$ = this.select((state) => state.editMode);
	readonly editNonMode$ = this.select((state) => !state.editMode);

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

	readonly toggleEditMode = this.updater((state) => ({
		...state,
		editMode: !state.editMode,
	}));

	readonly fetchData = this.effect((input: Observable<unknown>) => {
		return input.pipe(
			withLatestFrom(this.store$.pipe(select(selectRouteParam("id")))),
			tap(() => this.requesting()),
			exhaustMap(([p, id]) =>
				this.service.get(id).pipe(
					map((data) => {
						if (data.error) throw data;
						else if (!data.error) {
							this.updateData(data);
						}
					}),
					tap(() => this.requestFinished()),
					catchError((p) =>
						this.httpError(
							(p.hasOwnProperty("error") && p.error) ||
								"HTTP error Connection error"
						)
					)
				)
			)
		);
	});

	readonly editData = this.effect((input: Observable<Omit<Material, "id">>) => {
		return input.pipe(
			tap(() => this.requesting()),
			exhaustMap((p) =>
				this.service.put(p).pipe(
					map((data) => {
						if (data.error) throw data;
						else if (!data.error) {
							this.store$.dispatch(
								ToastActions.showToast({
									message: {
										severity: "success",
										summary: "Saved",
										detail: `${data.name} was created`,
									},
								})
                );
              this.updateData(data)
						}
					}),
					tap(() => this.requestFinished()),
					catchError((p) =>
						this.httpError(
							(p.hasOwnProperty("error") && p.error) ||
								"HTTP error Connection error"
						)
					)
				)
			)
		);
	});

	httpError(p: string) {
		// Obecnej toad na HTTP error Connection error
		this.store$.dispatch(
			ToastActions.showToast({
				message: {
					severity: "error",
					summary: "Server Error",
					detail: p,
				},
			})
		);
		return of({});
	}
}
