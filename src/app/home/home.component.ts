import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TypedTranslateService } from '../core/services/translate/typed-translate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value = 'Clear Me';

  constructor(
    private router: Router,
    public translate: TypedTranslateService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('en');
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);
  }

  ngOnInit(): void {}
}
