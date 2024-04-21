import { Components } from '../../shared/api/admin/types';

export const components: Components[] = [
  {
    id: '123',
    image: '',
    name: 'MainBlock',
    displayName: 'Main block',
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
        required: true,
        placeholder: 'Put description',
      },
       image: {
        type: 'string',
        fieldName: 'image',
        value: '',
        typeField: 'image',
        required: true,
        placeholder: 'Put image',
      },
    },
  },
  {
    id: '1233',
    image: '',
    name: 'MainBlockTest',
    displayName: 'Test Main block',
    fields: {
      title_test: {
        type: 'string',
        fieldName: 'title_test',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Put test title',
      },
      text_test: {
        type: 'string',
        fieldName: 'text_test',
        value: '',
        typeField: 'long-text',
        required: true,
        placeholder: 'Put test text',
      },
      description_test: {
        type: 'string',
        fieldName: 'description_test',
        value: '',
        typeField: 'long-text',
        required: true,
        placeholder: 'Put test description',
      },
    },
  },
];