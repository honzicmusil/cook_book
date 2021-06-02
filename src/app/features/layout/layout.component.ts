import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { MenuItem } from 'primeng/api';
import { DiamondActions, DiamondSelectors } from '../base-ui/diamond';

@Component({
  selector: 'cook-book--layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isMenuOpen$ = this.store$.pipe(
    select(DiamondSelectors.selectStaticMenuDesktopInactive)
  );
  colorScheme$ = this.store$.pipe(select(DiamondSelectors.selectColorScheme));

  displayName = 'admin';

  constructor(
    //private readonly http: HttpClient,
     public store$: Store<never>) {}

  ngOnInit(): void {}

  toggleSideNav() {
    this.store$.dispatch(DiamondActions.toggleDesktopMenu());
  }

  logout() {
    // this.auth.logout();
  }
}
