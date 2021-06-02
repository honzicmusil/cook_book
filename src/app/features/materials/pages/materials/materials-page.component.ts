import { Component } from '@angular/core';
import { Material } from 'src/app/features/models';
import { MaterialsPageStore } from './materials-page.store';

@Component({
  selector: 'cook-book-materials-page',
  templateUrl: 'materials-page.component.html',
  styleUrls: ['./materials-page.component.scss'],
  providers: [MaterialsPageStore],
})
export class MaterialsPageComponent {
  linkToDetail: (data: Material) => string[] = (data) => ['./', data.id];
  constructor(public materialsPageStore$: MaterialsPageStore) {}
}
