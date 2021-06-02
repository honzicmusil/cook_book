import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MaterialsGridComponent } from './materials-grid.component';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    TableModule,
    BadgeModule,
    TableModule,
  ],
  exports: [MaterialsGridComponent],
  declarations: [MaterialsGridComponent],
})
export class MaterialsGridModule {}
