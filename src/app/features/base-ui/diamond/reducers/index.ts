import { createReducer, Action, on } from '@ngrx/store';
import { DiamondActions } from '../actions';
import { ColorSheme } from '../models';

export const FEATURE_KEY = 'Diamond';

export interface DiamondState {
  colorScheme: ColorSheme;
  staticMenuDesktopInactive: boolean;
}

const initialState: DiamondState = {
  colorScheme: ColorSheme.DARK,
  staticMenuDesktopInactive: false,
};

const r = createReducer(
  initialState,
  on(DiamondActions.changeColorScheme, (state, { colorScheme }) => ({
    ...state,
    colorScheme,
  })),
  on(DiamondActions.openDesktopMenu, (state) => ({
    ...state,
    staticMenuDesktopInactive: true,
  })),
  on(DiamondActions.closeDesktopMenu, (state) => ({
    ...state,
    staticMenuDesktopInactive: false,
  }))
);

export function reducer(state: DiamondState, action: Action) {
  return r(state, action);
}

export const colorScheme = (state: DiamondState) => state.colorScheme;
export const staticMenuDesktopInactive = (state: DiamondState) =>
  state.staticMenuDesktopInactive;
