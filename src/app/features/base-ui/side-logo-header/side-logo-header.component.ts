import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ral-side-logo-header',
  templateUrl: './side-logo-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideLogoHeaderComponent {
  @Input() title = 'Admin';
  // By default takes faviicon
  @Input() logo = 'assets/favicon/android-chrome-512x512.png';

  @Output() toggleClick: EventEmitter<void> = new EventEmitter();
}
