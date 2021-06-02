import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesPageComponent , RecipeDetailPageComponent, CreateRecipePageComponent} from './pages';

const routes: Routes = [
  {
    path: '',
    component: RecipesPageComponent,
  },
  {
    path: 'create-recipe',
    component: CreateRecipePageComponent,
  },
  {
    path: ':id',
    component: RecipeDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
