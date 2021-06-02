import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './features/layout';


@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'app', pathMatch: 'full' },

        {
          path: 'app',

          component: LayoutComponent,
          children: [
            { path: '', redirectTo: 'recipes', pathMatch: 'full' },
            {
              path: 'recipes',
              loadChildren: () =>
                import('./features/recipes').then(
                  ({ RecipesModule }) => RecipesModule
                ),
            },
            {
              path: 'materials',
              loadChildren: () =>
                import('./features/materials').then(
                  ({ MaterialsModule }) => MaterialsModule
                ),
            },
          ],
        },
      ],
      { initialNavigation: 'enabled', paramsInheritanceStrategy: 'always' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
