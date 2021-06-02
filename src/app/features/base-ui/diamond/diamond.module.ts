import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTAINERS } from './containers';
import { DiamondEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { FEATURE_KEY, reducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_KEY, reducer),
    EffectsModule.forFeature([DiamondEffects]),
  ],
  declarations: [...CONTAINERS],
  //exports: [...CONTAINERS],
})
export class DiamondModule {}
