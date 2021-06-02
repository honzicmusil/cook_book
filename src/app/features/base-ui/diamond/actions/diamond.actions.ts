import { createAction, props } from '@ngrx/store';
import { ColorSheme } from '../models';

const changeColorScheme = createAction(
  '[Diamond] changeColorScheme',
  props<{ colorScheme: ColorSheme }>()
);

const changeRiple = createAction(
  '[Diamond] changeRiple',
  props<{ ripple: boolean }>()
);

const toggleDesktopMenu = createAction('[Diamond] toggle desktop menu');

const openDesktopMenu = createAction('[Diamond] open desktop menu');

const closeDesktopMenu = createAction('[Diamond] close desktop menu');

export const DiamondActions = {
  changeColorScheme,
  changeRiple,
  toggleDesktopMenu,
  openDesktopMenu,
  closeDesktopMenu,
};
