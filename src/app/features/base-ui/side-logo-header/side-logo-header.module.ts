import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { SideLogoHeaderComponent } from './side-logo-header.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [SideLogoHeaderComponent],
  declarations: [SideLogoHeaderComponent],
  providers: [],
})
export class SideLogoHeaderModule {}
