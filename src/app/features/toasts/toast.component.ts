import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { Store, select } from '@ngrx/store';
// import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
// import { tap } from 'rxjs/operators';

// import { Actions, ofType } from '@ngrx/effects';
// import { ToastActions } from './toast.actions';

@Component({
  selector: 'ral-toast',
  template: `<p-toast position="bottom-right"></p-toast> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
//implements OnInit, AfterContentInit
export class RalToastComponent {
  // interval: any;
  // @ViewChild(ToastComponent, { static: true }) element: ToastComponent;
  // public position = { X: 'Right', Y: 'Bottom' };
  // constructor(private store$: Store<any>, private actions$: Actions) {}
  // ngAfterContentInit(): void {
  //   this.actions$
  //     .pipe(
  //       ofType(ToastActions.showToastMessage),
  //       tap(({ toast }) => {
  //         this.element.show(toast);
  //       })
  //     )
  //     .subscribe();
  // }
}
