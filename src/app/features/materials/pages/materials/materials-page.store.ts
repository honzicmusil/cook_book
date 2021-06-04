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
						if (data.error) throw data.error;
						else if (data.itemList) this.updateData(data.itemList);
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

	readonly delete = this.effect((input: Observable<string>) => {
		return input.pipe(
			tap(() => this.requesting()),
			exhaustMap((p) =>
				this.service.delete(p).pipe(
					map((data) => {
						if (data.error) throw data.error;
						else if (!data.error) {
							this.store$.dispatch(
								ToastActions.showToast({
									message: {
										severity: "info",
										summary: "Deleted",
										detail: `Material was deleted`,
									},
								})
								//TODO: redirect to grid?
							);
						}
					}),

					tap(() => this.requestFinished()),
					tap(() => this.fetchData()),
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

	// readonly fetchData = this.effect((input: Observable<never>) => {
	//   return input.pipe(
	//     // withLatestFrom(
	//     //   this.store$.pipe(select(selectRouteParam('id')))
	//     // ),
	//     tap(() => this.requesting()),
	//     exhaustMap(([, materialId]) =>
	//       this.materialService.getMeterials().pipe(
	//         map(({ data, errors }) => {
	//           this.commonError(data, errors);
	//           if (data.company.project && data.company.project.task)
	//             this.updateData(data.company.project?.task.clientSolvers);
	//         }),
	//         tap(() => this.gridStore$.requestFinished()),
	//         catchError((p) => this.httpError(p))
	//       )
	//     )
	//   );
	// });

	httpError(p: any) {
		// Obecnej toad na HTTP error Connection error
		console.log(p);
		let message = p;
		if (p && p.error && p.error.code) message = p.error.code;
		this.store$.dispatch(
			ToastActions.showToast({
				message: {
					severity: "error",
					summary: "Server Error",
					detail: message,
				},
			})
		);
		return of({});
	}
}
