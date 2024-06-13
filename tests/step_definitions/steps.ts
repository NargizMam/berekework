const { I } = inject();

Given('я нахожусь на странице {string}', (page: string) => {
  console.log(page);
  I.amOnPage(page);
  I.wait(20);
});

Given('я ввожу {string} в поле {string}', () => {
  // From "features/auth.feature" {"line":9,"column":5}
  throw new Error('Not implemented yet');
});

Given('я ввожу {string} в поле {string}', () => {
  // From "features/auth.feature" {"line":10,"column":5}
  throw new Error('Not implemented yet');
});

Given('я нажимаю на кнопку {string}', () => {
  // From "features/auth.feature" {"line":11,"column":5}
  throw new Error('Not implemented yet');
});

Given('я вижу текст {string}', () => {
  // From "features/auth.feature" {"line":12,"column":5}
  throw new Error('Not implemented yet');
});
