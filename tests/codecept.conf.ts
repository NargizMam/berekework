import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:5183',
      show: process.env['CI'] !== 'true',
      windowSize: '1200x900',
    }
  },
  gherkin: {
    "features": "./features/*.feature",
    "steps": [
      "./step_definitions/steps.ts"
    ]
  },
  include: {
    I: './steps_file'
  },
  name: 'tests'
}