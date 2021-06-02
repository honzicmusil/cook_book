import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import {
  getSelectors,
  RouterReducerState,
  routerReducer,
  SerializedRouterStateSnapshot,
} from '@ngrx/router-store';

// Tu se mohou přidat další CORE věci.
// Popřípadě rozšířit v app

export interface RootState {
  router: RouterReducerState<SerializedRouterStateSnapshot>;
}

export const rootReducers: ActionReducerMap<RootState> = {
  router: routerReducer,
};

export const selectRouter = createFeatureSelector<
  RootState,
  RouterReducerState<SerializedRouterStateSnapshot>
>('router');

export const {
  selectCurrentRoute,
  selectQueryParam,
  selectRouteParam,
  selectQueryParams, // select the current route query params
  selectRouteParams, // select the current route params
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(selectRouter);
