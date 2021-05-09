import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TypedTranslateService } from '../../../core/services/translate/typed-translate.service';

@Component({
  selector: 'trading-view-company-profile',
  templateUrl: './trading-view-company-profile.component.html',
  styleUrls: ['./trading-view-company-profile.component.scss'],
})
export class TradingViewCompanyProfileComponent
  implements OnInit, AfterViewInit {
  @Input()
  src: string;

  @Input() exchange = '';

  @Input()
  type: string;

  @Input()
  stockSymbol: string;

  @Input() widgetWidth = 700;

  @ViewChild('script') script: ElementRef;

  constructor(
    protected translateService: TranslateService,
    protected translate: TypedTranslateService,
  ) {
    this.translateService.setDefaultLang('en');
  }

  convertToScript(): void {
    const element = this.script.nativeElement;
    const script = document.createElement('script');

    script.type = this.type ? this.type : 'text/javascript';
    script.async = true; // false if not asnyc

    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';

    const scriptContent = {
      symbol: `${this.exchange}:${this.stockSymbol}`,
      // width: `${Math.floor(this.widgetWidth * 0.83)}`,
      // height: `${Math.floor(this.widgetWidth / 1.7)}`,
      height: 'auto',
      width: '100%',
      colorTheme: 'light',
      isTransparent: false,
      locale: 'en',
    };

    script.innerHTML = JSON.stringify(scriptContent);

    const parent = element.parentElement;
    parent.parentElement.replaceChild(script, parent);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.convertToScript();
  }
}
