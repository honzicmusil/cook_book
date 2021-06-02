import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  DiamondState,
  colorScheme,
  staticMenuDesktopInactive,
  FEATURE_KEY,
} from '../reducers';

const diamondFeatureSelect = createFeatureSelector<DiamondState>(FEATURE_KEY);

const selectColorScheme = createSelector(diamondFeatureSelect, colorScheme);
const selectStaticMenuDesktopInactive = createSelector(
  diamondFeatureSelect,
  staticMenuDesktopInactive
);

export const DiamondSelectors = {
  selectColorScheme,
  selectStaticMenuDesktopInactive,
};
