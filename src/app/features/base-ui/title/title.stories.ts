import { CommonModule } from '@angular/common';
import { Story } from '@storybook/angular/types-6-0';
import { TitleComponent } from './title.component';
import { ButtonModule } from 'primeng/button';

export default {
  title: 'Ralba Components/Title Component',
  component: TitleComponent,
  props: {
    heading: 'Heading of section',
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (storyFunc: any) => {
      const story = storyFunc();
      return {
        ...story,
        template: `${story.template}`,
      };
    },
  ],
};

const Template: Story<TitleComponent> = (args) => ({
  component: TitleComponent,
  moduleMetadata: {
    declarations: [TitleComponent],
    imports: [CommonModule, ButtonModule],
  },
  props: {
    heading: 'Heading of section',
    ...args,
  },
  template: `<ral-title [heading]="heading"></ral-title>`,
});

export const Simple = Template.bind({});

export const WithControl: Story<TitleComponent> = (args) => ({
  component: TitleComponent,
  moduleMetadata: {
    declarations: [TitleComponent],
    imports: [CommonModule, ButtonModule],
  },
  props: {
    heading: 'Heading of section',
    ...args,
  },
  template: `<ral-title [heading]="heading"><button class="e-btn e-lib e-primary">Primary</button></ral-title>`,
});

export const WithMultipleControl: Story<TitleComponent> = (args) => ({
  component: TitleComponent,
  moduleMetadata: {
    declarations: [TitleComponent],
    imports: [CommonModule, ButtonModule],
  },
  props: {
    heading: 'Heading of section',
    ...args,
  },
  template: `
  <ral-title [heading]="heading">
    <div class="p4-grid">
      <div class="p-col-fixed">
          <button class="e-btn e-lib e-primary">Primary</button>
      </div>
      <div class="p-col-fixed">
          <button class="e-btn e-lib" >Secondary</button>
      </div>
    </div>
  </ral-title>`,
});
