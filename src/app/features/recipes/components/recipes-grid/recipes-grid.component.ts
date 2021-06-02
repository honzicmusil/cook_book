import { Component, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { RECIPES_GRID_TEST_DATA } from './recipes-grid.test.data';
import { RecipesGridColumnsType } from './recipes-grid-columns.type';

@Component({
  selector: 'cook-book-recipes-grid',
  templateUrl: 'recipes-grid.component.html',
  styleUrls: ['./recipes-grid.component.scss'],
})
export class RecipesGridComponent {
  // comment this after test
  @Input() data: RecipesGridColumnsType[] = RECIPES_GRID_TEST_DATA;

  @Input() detailLinkRelative = './';

  @Output()
  lazyLoad: EventEmitter<LazyLoadEvent> = new EventEmitter<LazyLoadEvent>();

  @Output()
  deleteBtnClick: EventEmitter<RecipesGridColumnsType> = new EventEmitter<RecipesGridColumnsType>();

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

  @Input()
  totalRecords = 0;

  @Input()
  loading: boolean | undefined;

  @Input()
  linkToDetail: (data: RecipesGridColumnsType) => string[] = () => {
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
