import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CreateRecipeFormType } from './create-recipe-form.type'

@Component({
  selector: 'cook-book-create-recipe-page',
  templateUrl: 'create-recipe-page.component.html',
  styleUrls: ['./create-recipe-page.component.scss'],
})
export class CreateRecipePageComponent {
  form = new FormGroup({});
  model: CreateRecipeFormType = {
    name: "",
     defaultPortions: 0,
     ingredients: []
  };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
      {
        key: 'name',
        type: 'input',
        className: 'p-col-12',
        templateOptions: {
          // translate: true,
          placeholder: 'Název receptu',
        },
      },
      {
        key: 'defaultPortions',
        type: 'number',
        className: 'p-col-12',
        templateOptions: {
          // translate: true,
          placeholder: 'Počet porcí',
        },
      },
      {
        key: 'ingredients',
        type: 'repeat',
        className: 'p-col-12',
        defaultValue: [{}],
        templateOptions: {
          //TODO: Translate Add Text
          addText: 'Přidat ingredienci',
          attributes: {
            allowAdd: 'true',
            allowRemove: 'true',
          },
        },
        fieldArray: {
          fieldGroup: [
            {
              key: 'material',
              type: 'select',
              className: 'p-col-12',
              templateOptions: {
                translate: true,
                label: 'Ingredience',
                required: true,
              },
            },
            {
              key: 'amount',
              type: 'number',
              className: 'p-col-12',
              templateOptions: {
                translate: true,
                label: 'Množství',
                required: true,
              },
            },
          ],
        },
      },
  ];

  @Output() formSubmit = new EventEmitter<CreateRecipeFormType>();

  onFormSubmit(model: CreateRecipeFormType) {
    if (this.form.valid) {
      this.formSubmit.emit(
        JSON.parse(JSON.stringify(model)) as CreateRecipeFormType
      );
    }
  }
}
