import { browser, by, element } from 'protractor';

export class Login {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-registration .reg_title')).getText() as Promise<string>;
  }
}
