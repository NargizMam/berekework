import { Country } from './types';

export const educationTypes: string[] = [
  'среднее общее образование',
  'среднее профессиональное образование',
  'высшее образование - бакалавриат;',
  'высшее образование - магистратура',
];

export const workTypes: string[] = ['Полная', 'Неполная'];

export const countries: Country[] = [
  { name: 'Кыргызстан', cities: ['Бишкек', 'Ош', 'Жалал-Абад', 'Каракол', 'Нарын', 'Талас', 'Карабалта'] },
  {
    name: 'Казахстан',
    cities: [
      'Нур-Султан',
      'Алматы',
      'Караганда',
      'Шымкент',
      'Актобе',
      'Тараз',
      'Павлодар',
      'Усть-Каменогорск',
      'Семей',
      'Костанай',
      'Атырау',
      'Кызылорда',
      'Уральск',
      'Петропавловск',
      'Темиртау',
    ],
  },
  {
    name: 'Узбекистан',
    cities: [
      'Ташкент',
      'Самарканд',
      'Бухара',
      'Наманган',
      'Андижан',
      'Фергана',
      'Навои',
      'Карши',
      'Ургенч',
      'Гулистан',
      'Джизак',
      'Коканд',
      'Маргилан',
      'Нукус',
    ],
  },
];