import { select, Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { DiamondActions } from '../actions';
import { DiamondSelectors } from '../selectors';

@Injectable()
export class DiamondEffects {
  onDesktopMenu$ = createEffect(() =>
    this.actions.pipe(
      ofType(DiamondActions.toggleDesktopMenu),
      withLatestFrom(
        this.store$.pipe(
          select(DiamondSelectors.selectStaticMenuDesktopInactive)
        )
      ),
      map(([, open]) =>
        open
          ? DiamondActions.closeDesktopMenu()
          : DiamondActions.openDesktopMenu()
      )
    )
  );

  // onNavigeted$ = createEffect(
  //   () =>
  //     this.actions.pipe(
  //       ofType(ROUTER_NAVIGATED),
  //       map((action) => DiamondActions.openMobileMenu())
  //     ),
  //   { dispatch: true }
  // );

  constructor(private actions: Actions, private store$: Store<never>) {}
}
