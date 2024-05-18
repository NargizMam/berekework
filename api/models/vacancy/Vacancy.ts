import { model, Schema } from 'mongoose';

const vacancySchema = new Schema(
  {
    // Значение которое будет в карточке
    vacancyTitle: {
      type: String,
      required: true,
    },
    salary: {
      minSalary: {
        type: Number,
        required: true,
      },
      maxSalary: {
        type: Number,
        required: true,
      },
    },
    city: {
      type: String,
      required: true,
    },
    aboutVacancy: { // О вакансии (минимум 200 символов)
      type: String,
    },
    responsibilities: {// Обязанности (минимум 150 символов)
      type: String,
    },
    workConditions: {  // Условия работы (Минимум 100 символов)
      type: String,
    },
    country: {
      type: String,
    },
    fieldOfWork: { // Сфера деятельности
      type: String,
    },
    age: { // Возрастная категория (17-30, 30-45, 45+
      minAge: {
        type: Number,
      },
      maxAge: {
        type: Number,
      },
    },
    education: { // Образование (среднее, средне-специальное, высшее, высшее-неполное магистратура, без образования)
      type: String,
    },
    employmentType: {  // Тип занятости: Полная, Неполная, Подработка
      type: String,
    },
    /*users: [
      {
        userId: ref - на соискателя
        chosenBy: Boolean, // true - Когда соискатель сам выбрал
      }                    // false - когда рабодатель выбрал себе соискателя
    ],*/
    employer: {
      type: Schema.Types.ObjectId,
      ref: 'Employer',
    },
  },
  { timestamps: true },
);

const Vacancy = model('Vacancy', vacancySchema);

export default Vacancy;

