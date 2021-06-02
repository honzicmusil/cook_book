import { FormFieldWrapperWrapperComponent } from './form-field-wrapper/form-field-wrapper.wrapper';
import { PanelWrapperComponent } from './panel-wrapper/panel-wrapper.wrapper';

export { FormFieldWrapperWrapperComponent, PanelWrapperComponent };

export const FORMLY_WRAPPER = [
  {
    name: 'form-field',
    component: FormFieldWrapperWrapperComponent,
  },
  {
    name: 'panel-wrapper',
    component: PanelWrapperComponent,
  },
];

export const FORMLY_WRAPPER_DECLARATION = [
  FormFieldWrapperWrapperComponent,
  PanelWrapperComponent,
];
