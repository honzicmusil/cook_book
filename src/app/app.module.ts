import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnFormlyModule } from './features/formly';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SideLogoHeaderModule,
  SideMenuItemModule,
  TitleModule,
  TopBarModule,
  SideMenuModule,
} from './features/base-ui';
import { DiamondModule } from './features/base-ui/diamond';
import { RouterState } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { rootReducers } from './root.state';
import { LayoutComponent } from './features/layout';
import { ToastModule } from './features/toasts';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent,LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    OwnFormlyModule,
    SideMenuModule,
    SideLogoHeaderModule,
    TitleModule,
    SideMenuItemModule,
    TopBarModule,
    DiamondModule,
    HttpClientModule,
    // AppConfigModule.forRoot(),
    // BrowserAnimationsModule,
    StoreModule.forRoot(rootReducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true,
        strictActionWithinNgZone: true,
        strictStateImmutability: true,
        strictStateSerializability: true,
      },
    }),
    EffectsModule.forRoot([]),
    // StoreDevtoolsModule.instrument(),
    // ToastModule,
    // HttpClientModule,
    ButtonModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
