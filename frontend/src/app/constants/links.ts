export const API_URL = 'http://localhost:8000';

//ADMIN SIDE BAR LINKS

export const SIDE_BAR_LINKS = [
  { id: parseFloat(Math.random().toString()), value: 'Pages', path: 'pages' },
  { id: parseFloat(Math.random().toString()), value: 'Users', path: 'users' },
  { id: parseFloat(Math.random().toString()), value: 'Vacancy', path: 'vacancy' },
  { id: parseFloat(Math.random().toString()), value: 'Employers', path: 'employers' },
];

interface CategoryVacancyI {
  id: string;
  title: string;
  values: { id: string; value: string }[];
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
      { id: Math.random().toString(), value: 'от 1300 сом' },
      { id: Math.random().toString(), value: 'от 17700 сом' },
      { id: Math.random().toString(), value: 'от 34200 сом' },
      { id: Math.random().toString(), value: 'от 50150 сом' },
      { id: Math.random().toString(), value: 'от 67000 сом' },
      { id: Math.random().toString(), value: 'от 83450 сом' },
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
      { id: Math.random().toString(), value: 'IT и телекоммуникации' },
      { id: Math.random().toString(), value: 'Финансы и бухгалтерия' },
      { id: Math.random().toString(), value: 'Маркетинг и реклама' },
      { id: Math.random().toString(), value: 'Производство и инженерия' },
      { id: Math.random().toString(), value: 'Образование и наука' },
      { id: Math.random().toString(), value: 'Медицина и здоровье' },
    ],
    name: 'salary',
    value: 'salary',
    input: {
      isInput: true,
      placeholder: 'Ваша сфера деятельности',
    },
  },
  {
    id: Math.random().toString(),
    title: 'Возрастная категория',
    values: [
      { id: Math.random().toString(), value: '18-25 лет' },
      { id: Math.random().toString(), value: '26-35 лет' },
      { id: Math.random().toString(), value: '36-45 лет' },
      { id: Math.random().toString(), value: '46-55 лет' },
      { id: Math.random().toString(), value: '56-65 лет' },
      { id: Math.random().toString(), value: '65+ лет' },
    ],
    name: 'salary',
    value: 'salary',
    input: {
      isInput: true,
      placeholder: 'Введите возрат',
    },
  },
  {
    id: Math.random().toString(),
    title: 'Образование',
    values: [
      { id: Math.random().toString(), value: 'Среднее образование' },
      { id: Math.random().toString(), value: 'Среднее специальное' },
      { id: Math.random().toString(), value: 'Высшее образование' },
      { id: Math.random().toString(), value: 'Магистратура' },
      { id: Math.random().toString(), value: 'Аспирантура' },
      { id: Math.random().toString(), value: 'Докторантура' },
    ],
    name: 'salary',
    value: 'salary',
    input: {
      isInput: false,
      placeholder: '',
    },
  },
  {
    id: Math.random().toString(),
    title: 'Тип занятости',
    values: [
      { id: Math.random().toString(), value: 'Полная занятость' },
      { id: Math.random().toString(), value: 'Частичная занятость' },
      { id: Math.random().toString(), value: 'Удаленная работа' },
      { id: Math.random().toString(), value: 'Временная работа' },
      { id: Math.random().toString(), value: 'Стажировка' },
      { id: Math.random().toString(), value: 'Фриланс' },
    ],
    name: 'salary',
    value: 'salary',
    input: {
      isInput: false,
      placeholder: '',
    },
  },
];
