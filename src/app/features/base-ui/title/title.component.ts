import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ral-title',
  templateUrl: 'title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  /**
   * input for simple string, if it is null,
   * &lt;ng-content select="[header]"&gt;&lt;/ng-content&gt;
   *  can be used as altarnative. This Input has
   *  not default value
   */
  @Input() heading: string | undefined;
}
