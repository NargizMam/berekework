import { CategoryVacancyI } from '../types';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export const API_URL = 'http://localhost:8000';

//ADMIN SIDE BAR LINKS

export const SIDE_BAR_LINKS = [
  { id: parseFloat(Math.random().toString()), value: 'Пользователи', path: 'users' },
  { id: parseFloat(Math.random().toString()), value: 'Вакансии', path: 'vacancy' },
  { id: parseFloat(Math.random().toString()), value: 'Работодатели', path: 'employers' },
];

export const vacancyCategory: CategoryVacancyI[] = [
  {
    id: Math.random().toString(),
    title: 'Уровень дохода',
    name: 'salary',
    values: [
      { id: Math.random().toString(), value: 'от 1300 сом', valueSend: '1300' },
      { id: Math.random().toString(), value: 'от 17700 сом', valueSend: '17700' },
      { id: Math.random().toString(), value: 'от 34200 сом', valueSend: '34200' },
      { id: Math.random().toString(), value: 'от 50150 сом', valueSend: '50150' },
      { id: Math.random().toString(), value: 'от 67000 сом', valueSend: '67000' },
      { id: Math.random().toString(), value: 'от 83450 сом', valueSend: '83450' },
    ],
    input: {
      isInput: true,
      placeholder: 'от',
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
    input: {
      isInput: true,
      placeholder: 'Введите возрат',
    },
  },
];

export const titleVacancyFilter = {
  country: 'Страна',
  city: 'Город',
  fieldOfWork: 'Сфера деятельности',
  education: 'Образование',
  employmentType: 'Тип занятости',
};

export const dashboardAdminRouters = [
  {
    id: 'page_admin_panel',
    title: 'Админ Панель',
    tooltip: 'Админ панель',
    url: '',
    icon: HomeIcon,
  },
  {
    id: 'page_home111',
    title: 'Пользователи',
    tooltip: 'Добавить пользователя',
    url: 'users',
    icon: PeopleIcon,
  },
  {
    id: 'page_schedule111',
    title: 'Вакансии',
    tooltip: 'Вакансии',
    url: 'vacancy',
    icon: FolderSharedIcon,
  },
  {
    id: 'page_work_out_111',
    title: 'Работодатели',
    tooltip: 'Добавить работодателя',
    url: 'employers',
    icon: PersonAddAltIcon,
  },
];

export const dashboardSuperAdminRoutes = [
  {
    id: 'page_create_active_333',
    title: 'Модераторы',
    tooltip: 'Добавить модератора',
    url: 'admin/moderators',
    icon: PersonAddAltIcon,
  },
];
