import { NgModule } from '@angular/core';

import { TitleComponent } from './title.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [TitleComponent],
  declarations: [TitleComponent],
  providers: [],
})
export class TitleModule {}
