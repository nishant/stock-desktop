/* eslint-disable no-console */

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { ElectronService } from './core/services';
import { TypedTranslateService } from './core/services/translate/typed-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    public translate: TypedTranslateService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('en');

    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);
  }
}
