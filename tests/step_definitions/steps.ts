const { I } = inject();

Given('I have a defined step', () => {
  // TODO: replace with your own step
});

Given('я нахожусь на странице {string}', (page: string) => {
  console.log(page);
  I.amOnPage(page);
  I.wait(2);
});

Given('я ввожу {string} в поле {string}', (text: string, field: string) => {
  I.fillField(field, text);
});

Given('я нажимаю на кнопку {string}', (button: string) => {
  I.click(button);
});

Given('я вижу текст {string}', (text: string) => {
  I.see(text);
});
