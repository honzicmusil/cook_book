import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialsPageComponent, MaterialDetailPageComponent, CreateMaterialPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: MaterialsPageComponent,
  },
  {
    path: 'create-material',
    component: CreateMaterialPageComponent,
  },
  {
    path: 'create-material',
    component: CreateMaterialPageComponent,
  },
  {
    path: ':id',
    component: MaterialDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialsRoutingModule {}
