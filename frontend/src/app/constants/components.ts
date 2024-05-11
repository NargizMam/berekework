import { Components } from '../../shared/types';

export const components: Components[] = [
  {
    id: 'heading2313213',
    image: '',
    name: 'FirstHeading',
    link: 'heading',
    displayName: 'Заголовок',
    fields: {
      title: {
        type: 'string',
        fieldName: 'title',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Put title',
      },
      description: {
        type: 'string',
        fieldName: 'description',
        value: '',
        typeField: 'long-text',
        required: false,
        placeholder: 'Put description',
      },
      image: {
        type: 'string',
        fieldName: 'image',
        value: '',
        typeField: 'image',
        required: false,
        placeholder: 'Put image',
      },
    },
  },
  {
    id: 'tariff2313213',
    image: '',
    name: 'Tariff',
    link: 'tariff',
    displayName: 'Тарифы',
    fields: {
      mainTitle: {
        type: 'string',
        fieldName: 'mainTitle',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Put title',
      },
      description: {
        type: 'string',
        fieldName: 'description',
        value: '',
        typeField: 'long-text',
        required: true,
        placeholder: 'Put description',
      },
      url: {
        type: 'string',
        fieldName: 'url',
        value: '',
        typeField: 'short-text',
        required: false,
        placeholder: 'Put url',
      },
    },
  },
];
