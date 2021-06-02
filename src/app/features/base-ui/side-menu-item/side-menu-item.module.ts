import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SideMenuItemComponent } from './side-menu-item.component';
import { BadgeModule } from 'primeng/badge';
@NgModule({
  imports: [CommonModule, RouterModule, BadgeModule],
  exports: [SideMenuItemComponent],
  declarations: [SideMenuItemComponent],
  providers: [],
})
export class SideMenuItemModule {}
