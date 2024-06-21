// import { getAllVacancy, vacancyGetByCategory } from './vacancyThunk';
//
// jest.mock('axios', () => ({
//   get: jest.fn(() =>
//     Promise.resolve({
//       data: [
//         {
//           "salary": {
//             "minSalary": 50000,
//             "maxSalary": 80000
//           },
//           "age": {
//             "minAge": 25,
//             "maxAge": 40
//           },
//           "_id": "66758cb549f94aa952d26607",
//           "vacancyTitle": "Software Developer",
//           "city": "Moscow",
//           "aboutVacancy": "We are looking for a talented Software Developer to join our team. The ideal candidate will have experience with full-stack development and a passion for technology. You will be responsible for developing and maintaining web applications.",
//           "responsibilities": "Develop and maintain web applications. Collaborate with cross-functional teams to define, design, and ship new features. Ensure the performance, quality, and responsiveness of applications. Identify and correct bottlenecks and fix bugs.",
//           "workConditions": "Full-time position. Flexible working hours. Remote work options available. Competitive salary and benefits.",
//           "country": "Russia",
//           "fieldOfWork": "Information Technology",
//           "education": "Высшее",
//           "employmentType": "Полная",
//           "employer": {
//             "_id": "66758cb649f94aa952d26617",
//             "email": "muradil.koychubekob@gmail.com",
//             "token": "138bde83-1b2d-44cf-8fa6-db1732eda597",
//             "companyName": "Company A",
//             "industry": "Technology",
//             "description": "Company A is a leading technology firm specializing in software development.",
//             "address": "123 Main St, City, Country",
//             "contacts": "+1 (123) 456-7890",
//             "documents": "fixtures/dummy.pdf",
//             "foundationYear": "2020",
//             "role": "employer",
//             "isPublished": true,
//             "avatar": "fixtures/logo_company_megaservice.png",
//             "tariff": "Годовой",
//             "vacancies": [
//               "66758cb549f94aa952d26607",
//               "66758cb549f94aa952d26608",
//               "66758cb549f94aa952d26609",
//               "66758cb549f94aa952d2660d"
//             ],
//             "createdAt": "2024-06-21T14:22:46.158Z",
//             "updatedAt": "2024-06-21T14:22:46.158Z",
//             "__v": 0
//           },
//           "archive": false,
//           "createdAt": "2024-06-21T14:22:45.884Z",
//           "updatedAt": "2024-06-21T14:22:46.494Z",
//           "__v": 0
//         }
//       ],
//     }),
//   ),
// }));
//
// describe('vacancyGetByCategory', () => {
//   test('getAll',  () => {
//     const response = getAllVacancy();
//
//     expect();
//   });
// });
