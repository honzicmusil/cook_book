import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { RecipesGridComponent } from './recipes-grid.component';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, ButtonModule, BadgeModule, TableModule],
  exports: [RecipesGridComponent],
  declarations: [RecipesGridComponent],
})
export class RecipesGridModule {}
