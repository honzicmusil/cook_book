import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ral-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  @Input() menuItems: string[] | null = null;
}
