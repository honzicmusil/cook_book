import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './side-menu.component';
import { SideMenuItemModule } from '../side-menu-item/side-menu-item.module';

@NgModule({
  imports: [CommonModule, RouterModule, SideMenuItemModule],
  exports: [SideMenuComponent],
  declarations: [SideMenuComponent],
  providers: [],
})
export class SideMenuModule {}
