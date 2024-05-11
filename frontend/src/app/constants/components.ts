import { Components } from '../../shared/types';

export const components: Components[] = [
  {
    id: 'firstHeading001',
    image: '',
    name: 'FirstHeading',
    link: 'heading',
    displayName: 'Первый Заголовок',
    fields: {
      title: {
        type: 'text',
        fieldName: 'title',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Поместите заголовок',
      },
      buttonText: {
        type: 'text',
        fieldName: 'buttonText',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Поместите текст кнопки',
      },
      buttonUrl: {
        type: 'url',
        fieldName: 'buttonUrl',
        value: 'https://www.',
        typeField: 'short-text',
        required: true,
        placeholder: 'Поместите ссылку на кнопку',
      },
    },
  },
  {
    id: 'secondHeading002',
    image: '',
    name: 'SecondHeading',
    link: 'heading?second=true',
    displayName: 'Второй Заголовок',
    fields: {
      title: {
        type: 'text',
        fieldName: 'title',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Поместите заголовок',
      },
      buttonText: {
        type: 'text',
        fieldName: 'buttonText',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Поместите текст кнопки',
      },
      buttonUrl: {
        type: 'url',
        fieldName: 'buttonUrl',
        value: 'https://www.',
        typeField: 'short-text',
        required: true,
        placeholder: 'Поместите ссылку на кнопку',
      },
    },
  },
  {
    id: 'thirdHeading003',
    image: '',
    name: 'ThirdHeading',
    link: 'heading?third=true',
    displayName: 'Третий Заголовок',
    fields: {
      title: {
        type: 'text',
        fieldName: 'title',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Поместите заголовок',
      },
      buttonText: {
        type: 'text',
        fieldName: 'buttonText',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Поместите текст кнопки',
      },
      buttonUrl: {
        type: 'url',
        fieldName: 'buttonUrl',
        value: 'https://www.',
        typeField: 'short-text',
        required: true,
        placeholder: 'Поместите ссылку на кнопку',
      },
    },
  },
];
