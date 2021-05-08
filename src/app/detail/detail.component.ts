import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TypedTranslateService } from '../core/services/translate/typed-translate.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  @Input() stockSymbol = '';

  constructor(
    private translateService: TranslateService,
    public translate: TypedTranslateService,
  ) {
    this.translateService.setDefaultLang('en');
  }
}
