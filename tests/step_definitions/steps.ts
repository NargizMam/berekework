const {I} = inject();

Given('я нахожусь на странице {string}', (page: string) => {
  console.log(page);
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

Given('я нахожусь на главной странице {string}', (page: string) => {
  I.amOnPage(page);
});

Then('я вижу ссылку {string} в футере', (linkText: string) => {
  I.scrollTo('footer');
  I.see(linkText, 'footer');
});

When('я нажимаю на ссылку {string}', (linkText: string) => {
  I.click(linkText, 'footer');
});

Then('я перехожу к блоку на странице {string}', (url: string) => {
  I.seeInCurrentUrl(url);
  I.scrollTo(url.split('#')[1]);
  I.seeElement(url.split('#')[1]);
});

Then('я вижу заголовок {string} на странице', (heading: string) => {
  I.see(heading);
});

Then('я вижу заголовок {string} на странице', (heading: string) => {
  I.see(heading);
});

Then('я вижу ссылку {string} в футере', (linkText: string) => {
  I.scrollTo('footer');
  I.see(linkText, 'footer');
});

When('я нажимаю на ссылку {string}', (linkText: string) => {
  I.click(linkText, 'footer');
});

Then('я перехожу к блоку на странице {string}', (url: string) => {
  I.seeInCurrentUrl(url);
  I.waitForElement(`#${url.split('#')[1]}`, 5); // ожидание до 5 секунд
  I.scrollTo(`#${url.split('#')[1]}`);
  I.seeElement(`#${url.split('#')[1]}`);
});

Then('я вижу заголовок {string} на странице', (heading: string) => {
  I.see(heading);
});

When('я перехожу на страницу {string}', (page: string) => {
  I.amOnPage(page);
});

Then('я перехожу на страницу {string}', (url: string) => {
  I.seeInCurrentUrl(url);
  I.waitForElement('h1', 5);
  I.see('Последние вакансии', 'h1');
});

Given('я нахожусь на странице {string}', (page: string) => {
  I.amOnPage(page);
});

When('я нажимаю на кнопку {string}', (button: string) => {
  I.click(button);
});

When('я вижу текст {string}', (text: string) => {
  I.see(text);
});

Given('я нахожусь на главной странице {string}', (page: string) => {
  I.amOnPage(page);
});

Then('я вижу ссылку {string} в блоке вакансий', (linkText: string) => {
  I.scrollTo('.vacancy_block');
  I.see(linkText, '.vacancy_block');
});

When('я нажимаю на ссылку {string}', (linkText: string) => {
  I.click(linkText, '.vacancy_block');
});

Then('я перехожу на страницу {string}', (url: string) => {
  I.seeInCurrentUrl(url);
});
