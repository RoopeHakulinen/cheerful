import { PlaywrightTestConfig } from '@playwright/test';

const BASE_URL = process.env.BASE_URL;

const config: PlaywrightTestConfig = {
  use: {
    trace: 'retain-on-failure'
  }
};

if (BASE_URL) {
  console.log('BASE_URL defined, using that instead of the local development server.');
  config.use!.baseURL = BASE_URL;
} else {
  console.log('BASE_URL not defined, using local development server.');
  config.webServer = {
    command: 'npm start',
    port: 4200,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  };
}

export default config;
