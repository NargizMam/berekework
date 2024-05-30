export const API_URL = 'http://localhost:8000';

//ADMIN SIDE BAR LINKS

export const SIDE_BAR_LINKS = [
  { id: parseFloat(Math.random().toString()), value: 'Users', path: 'users' },
  { id: parseFloat(Math.random().toString()), value: 'Vacancy', path: 'vacancy' },
  { id: parseFloat(Math.random().toString()), value: 'Employers', path: 'employers' },
];

interface CategoryVacancyI {
  id: string;
  title: string;
  values: { id: string; value: string; valueSend: string }[];
  input: {
    isInput: boolean;
    placeholder: string;
  };
  name: string;
  value: string;
}

export const vacancyCategory: CategoryVacancyI[] = [
  {
    id: Math.random().toString(),
    title: 'Уровень дохода',
    values: [
      { id: Math.random().toString(), value: 'от 1300 сом', valueSend: '1300' },
      { id: Math.random().toString(), value: 'от 17700 сом', valueSend: '17700' },
      { id: Math.random().toString(), value: 'от 34200 сом', valueSend: '34200' },
      { id: Math.random().toString(), value: 'от 50150 сом', valueSend: '50150' },
      { id: Math.random().toString(), value: 'от 67000 сом', valueSend: '67000' },
      { id: Math.random().toString(), value: 'от 83450 сом', valueSend: '83450' },
    ],
    name: 'salary',
    value: 'salary',
    input: {
      isInput: true,
      placeholder: 'от',
    },
  },
  {
    id: Math.random().toString(),
    title: 'Сфера деятельности',
    values: [
      { id: Math.random().toString(), value: 'IT', valueSend: 'IT' },
      { id: Math.random().toString(), value: 'Финансы', valueSend: 'Финансы' },
      { id: Math.random().toString(), value: 'Бухгалтерия', valueSend: 'Бухгалтерия' },
      { id: Math.random().toString(), value: 'Маркетинг', valueSend: 'Маркетинг' },
      { id: Math.random().toString(), value: 'Производство', valueSend: 'Производство' },
      { id: Math.random().toString(), value: 'Инженерия', valueSend: 'Инженерия' },
      { id: Math.random().toString(), value: 'Образование', valueSend: 'Образование' },
    ],
    name: 'fieldOfWork',
    value: 'fieldOfWork',
    input: {
      isInput: false,
      placeholder: '',
    },
  },
  {
    id: Math.random().toString(),
    title: 'Возрастная категория',
    values: [
      { id: Math.random().toString(), value: '18-25 лет', valueSend: '18-25' },
      { id: Math.random().toString(), value: '26-35 лет', valueSend: '26-35' },
      { id: Math.random().toString(), value: '36-45 лет', valueSend: '36-45' },
      { id: Math.random().toString(), value: '46-55 лет', valueSend: '46-55' },
      { id: Math.random().toString(), value: '56-65 лет', valueSend: '56-65' },
      { id: Math.random().toString(), value: '65+ лет', valueSend: '65-100' },
    ],
    name: 'age',
    value: 'minAge',
    input: {
      isInput: true,
      placeholder: 'Введите возрат',
    },
  },
  {
    id: Math.random().toString(),
    title: 'Образование',
    values: [
      { id: Math.random().toString(), value: 'Среднее образование', valueSend: 'Среднее образование' },
      { id: Math.random().toString(), value: 'Среднее специальное', valueSend: 'Среднее специальное' },
      { id: Math.random().toString(), value: 'Высшее образование', valueSend: 'Высшее образование' },
      { id: Math.random().toString(), value: 'Магистратура', valueSend: 'Магистратура' },
      { id: Math.random().toString(), value: 'Аспирантура', valueSend: 'Аспирантура' },
      { id: Math.random().toString(), value: 'Докторантура', valueSend: 'Докторантура' },
    ],
    name: 'education',
    value: 'education',
    input: {
      isInput: false,
      placeholder: '',
    },
  },
  {
    id: Math.random().toString(),
    title: 'Тип занятости',
    values: [
      { id: Math.random().toString(), value: 'Полная занятость', valueSend: 'Полная занятость' },
      { id: Math.random().toString(), value: 'Частичная занятость', valueSend: 'Частичная занятость' },
      { id: Math.random().toString(), value: 'Удаленная работа', valueSend: 'Удаленная работа' },
      { id: Math.random().toString(), value: 'Временная работа', valueSend: 'Временная работа' },
      { id: Math.random().toString(), value: 'Стажировка', valueSend: 'Стажировка' },
      { id: Math.random().toString(), value: 'Фриланс', valueSend: 'Фриланс' },
    ],
    name: 'employmentType',
    value: 'employmentType',
    input: {
      isInput: false,
      placeholder: '',
    },
  },
];
