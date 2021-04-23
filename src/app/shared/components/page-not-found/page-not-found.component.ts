import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TypedTranslateService } from '../../../core/services/translate/typed-translate.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    public translate: TypedTranslateService,
  ) {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit(): void {}
}
