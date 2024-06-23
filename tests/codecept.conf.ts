import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
setHeadlessWhen(process.env.HEADLESS);

setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:5173',
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