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

export interface RecipePageState {
	data: Recipe | undefined | null;
	loading: boolean;
}

@Injectable()
export class CreateRecipePageStore extends ComponentStore<RecipePageState> {
	constructor(
		protected store$: Store<never>,
		private service: RecipesService
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

	private readonly updateData = this.updater((state, input: Recipe) => ({
		...state,
		data: input,
	}));

	readonly postData = this.effect((input: Observable<Omit<Recipe, "id">>) => {
		return input.pipe(
			tap(() => this.requesting()),
			exhaustMap((p) =>
				this.service.create(p).pipe(
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
								//TODO: redirect to grid?
							);
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
