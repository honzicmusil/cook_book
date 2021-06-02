import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { CreateRecipeFormType } from '../create-recipe/create-recipe-form.type';

@Component({
  selector: 'cook-book-recipe-detail-page',
  templateUrl: 'recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.scss'],
})
export class RecipeDetailPageComponent {
  data = {
    id: '1',
    name: 'Luxusní kola s rumem',
    defaultPortions: 2,
    ingredients: [
      {
        material: {
          id: '1',
          name: 'Limetka',
          unit: 'ks',
        },
        amount: 0,
      },
      {
        material: {
          id: '2',
          name: 'Plantation XO',
          unit: 'ml',
        },
        amount: 200,
      },
      {
        material: {
          id: '3',
          name: 'Coca Cola',
          unit: 'ml',
        },
        amount: 300,
      },
    ],
  };

  form = new FormGroup({});
  model = {
    defaultPortions: 2,
  };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'defaultPortions',
      type: 'number',
      className: 'p-col-12',
      templateOptions: {
        // translate: true,
        placeholder: 'Počet porcí',
      },
      defaultValue: 2,
    },
  ];

  @Output() formSubmit = new EventEmitter<CreateRecipeFormType>();

  onFormSubmit(model: { defaultPortions: number }) {
    if (this.form.valid) {
      this.formSubmit.emit(
        JSON.parse(JSON.stringify(model)) as CreateRecipeFormType
      );
    }
  }

  recalculate(d: number, current: number): number {
    let i = (current / d) * this.model.defaultPortions;
    return i;
  }
}
