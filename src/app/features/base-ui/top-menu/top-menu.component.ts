import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'ral-admin-top-bar',
  templateUrl: './top-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  @Input() displayName: string | undefined;
  @Input() title: string | undefined;
  @Input() accountImage: string | null = null;
  @Output() logoutClick: EventEmitter<void> = new EventEmitter();
  @Output() profileClick: EventEmitter<void> = new EventEmitter();
  @Output() toggleClick: EventEmitter<void> = new EventEmitter();
}
