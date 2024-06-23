const {I} = inject();

Given('я нахожусь на странице {string}', async (page) => {
  console.log(page);
  await page.goto(page, { timeout: 60000, waitUntil: 'networkidle0' });
  I.amOnPage(page);
});

When('я ввожу {string} в поле {string}', (text: string, field: string) => {
  I.fillField(`input[name="${field}"]`, text);
});

When('я нажимаю на кнопку {string}', (button: string) => {
  I.click(button);
});

When('я вижу текст {string}', (text: string) => {
  I.see(text);
});
