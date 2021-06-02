import {
  Component,
  EventEmitter,
  Output,
  Input,
  ElementRef,
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { MaterialsGridColumnsType } from './materials-grid-columns.type';
// import { BaseGridComponent } from '@ralba/core/web/ui';
import { MATERIALS_GRID_TEST_DATA } from './materials-grid.test.data';

@Component({
  selector: 'cook-book-materials-grid',
  templateUrl: 'materials-grid.component.html',
  styleUrls: ['./materials-grid.component.scss'],
})
export class MaterialsGridComponent {
  @Input() detailLinkRelative = './';

  @Output()
  lazyLoad: EventEmitter<LazyLoadEvent> = new EventEmitter<LazyLoadEvent>();


  @Output()
  deleteBtnClick: EventEmitter<string> = new EventEmitter<string>();

  _gridState: LazyLoadEvent = {
    first: 0,
    rows: 10,
    multiSortMeta: [],
  };

  @Input()
  set gridState(value: LazyLoadEvent) {
    this._gridState = {
      first: value.first,
      rows: value.rows,
      multiSortMeta:
        JSON.stringify(this._gridState.multiSortMeta) ==
        JSON.stringify(value.multiSortMeta)
          ? this._gridState.multiSortMeta
          : value.multiSortMeta,
    };
  }

  @Input() data: MaterialsGridColumnsType[] = [];

  @Input()
  totalRecords = 0;

  @Input()
  loading: boolean | undefined;

  @Input()
  linkToDetail: (data: MaterialsGridColumnsType) => string[] = () => {
    return [];
  };

  flag = true;
  onLazyLoad(event: LazyLoadEvent) {
    // prevent double call by store
    if (
      this.flag ||
      this._gridState.rows != event.rows ||
      this._gridState.first != event.first ||
      JSON.stringify(this._gridState.multiSortMeta) !=
        JSON.stringify(event.multiSortMeta)
    ) {
      this.flag = false;
      this.lazyLoad.emit(JSON.parse(JSON.stringify(event)));
    }
  }

  get gridState(): LazyLoadEvent {
    return this._gridState;
  }

  @Input()
  rowsPerPageOptions = [10, 25, 50];

  constructor(private elRef: ElementRef) {}
}
