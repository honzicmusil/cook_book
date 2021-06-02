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
import { LazyLoadEvent } from "primeng/api";
import { selectRouteParam } from "src/app/root.state";
import { ToastActions } from "src/app/features/toasts";
import { Recipe } from "src/app/features/models";
import { RecipesService } from "src/app/features/api-services/recipes.service";

export interface RecipesPageState {
	data: Recipe[];
	totalCount: number;
	loading: boolean;
}

@Injectable()
export class RecipesPageStore extends ComponentStore<RecipesPageState> {
	constructor(
		protected store$: Store<never>,
		private service: RecipesService
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

	private readonly updateData = this.updater((state, input: Recipe[]) => ({
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
						console.log(data);
						if (data.error) throw data;
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
						if (data.error) throw data;
						else if (!data.error) {
							this.store$.dispatch(
								ToastActions.showToast({
									message: {
										severity: "info",
										summary: "Deleted",
										detail: `${data.name} was deleted`,
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



	httpError(p: string) {
		// Obecnej toad na HTTP error Connection error
		console.log(p);
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
