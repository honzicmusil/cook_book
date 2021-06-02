import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopBarComponent } from './top-menu.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [TopBarComponent],
  declarations: [TopBarComponent],
  providers: [],
})
export class TopBarModule {}
