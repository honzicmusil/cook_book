import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
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

import { ToastActions } from "src/app/features/toasts";
import { Material } from "src/app/features/models";
import { MaterialService } from "src/app/features/api-services/meterials.service";
import { httpError } from "src/app/features/helper";

export interface MaterialsPageState {
	data: Material[];
	totalCount: number;
	loading: boolean;
}

@Injectable()
export class MaterialsPageStore extends ComponentStore<MaterialsPageState> {
	constructor(
		protected store$: Store<never>,
		private service: MaterialService
	) {
		super({
			data: [],
			totalCount: 10,
			loading: true,
		});
	}

	readonly loading$ = this.select((state) => state.loading);

	readonly data$ = this.select((state) => state.data);

	readonly totalCount$ = this.select((state) => state.totalCount);

	public readonly requesting = this.updater((state) => ({
		...state,
		loading: true,
	}));

	public readonly requestFinished = this.updater((state) => ({
		...state,
		loading: false,
	}));

	private readonly updateData = this.updater((state, input: Material[]) => ({
		...state,
		totalCount: input.length,
		data: input,
	}));

	readonly onLazyLoad = this.effect((input: Observable<LazyLoadEvent>) => {
		return input.pipe(
			// tap((data) => this.onLazyLoad(data)),
			tap(() => this.fetchData())
		);
	});

	readonly fetchData = this.effect((input: Observable<never>) => {
		return input.pipe(
			tap(() => this.requesting()),
			exhaustMap(() =>
				this.service.getAll().pipe(
					map((data) => {
						if (data.error) throw data;
						else if (data.itemList) this.updateData(data.itemList);
					}),
					tap(() => this.requestFinished()),
					catchError((p) => httpError(this.store$, p))
				)
			)
		);
	});

	readonly delete = this.effect((input: Observable<string>) => {
		return input.pipe(
			tap(() => this.requesting()),
			exhaustMap((p) =>
				this.service.delete(p).pipe(
					map((data) => {
						if (data.error) throw data;
						else if (!data.error) {
							this.store$.dispatch(
								ToastActions.showToast({
									message: {
										severity: "info",
										summary: "Deleted",
										detail: `Material was deleted`,
									},
								})
							);
						}
					}),

					tap(() => this.requestFinished()),
					tap(() => this.fetchData()),
					catchError((p) => httpError(this.store$, p))
				)
			)
		);
	});
}
