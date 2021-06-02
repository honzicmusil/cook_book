import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { ToastActions } from './toast.actions';

@Injectable()
export class ToastEffects {
  onShowToast$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ToastActions.showToast),
        tap((p) => this.messageService.add(p.message))
      );
    },
    { dispatch: false }
  );

  /**
   *
   */
  constructor(
    private readonly actions$: Actions,
    private readonly messageService: MessageService // private readonly formService: UpdatePaymentFormService
  ) {}
}
