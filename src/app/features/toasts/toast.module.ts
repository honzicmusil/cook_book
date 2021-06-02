import { NgModule } from '@angular/core';
import { RalToastComponent } from './toast.component';
import { MessageService } from 'primeng/api';
import { ToastModule as PrimeNGToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ToastEffects } from './toast.effects';

@NgModule({
  imports: [
    CommonModule,
    PrimeNGToastModule,
    EffectsModule.forFeature([ToastEffects]),
  ],
  exports: [RalToastComponent],
  declarations: [RalToastComponent],
  providers: [MessageService],
})
export class ToastModule {}
