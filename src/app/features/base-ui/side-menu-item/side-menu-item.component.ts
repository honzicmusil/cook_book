import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ral-side-menu-item',
  templateUrl: 'side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuItemComponent {
  @Input() label: string | undefined;
  @Input() icon: string | undefined;
  @Input() routerLink: string[] | null = null;
  @Input() visible = true;
  @Input() disabled: boolean | undefined;
  @Input() badge: string | undefined;
  @Input() badgeStyle = 'p-mr-2';
  /**
   * options
   * "success|info|warning|danger"
   */
  @Input() severity = 'default';
}

// TODO: test change detection -> onpush
