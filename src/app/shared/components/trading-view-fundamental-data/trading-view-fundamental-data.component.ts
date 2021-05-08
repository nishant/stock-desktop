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
  selector: 'trading-view-fundamental-data',
  templateUrl: './trading-view-fundamental-data.component.html',
  styleUrls: ['./trading-view-fundamental-data.component.scss'],
})
export class TradingViewFundamentalDataComponent
implements OnInit, AfterViewInit {
  @Input()
  src: string;

  @Input()
  type: string;

  @Input()
  stockSymbol: string;

  @ViewChild('script') script: ElementRef;

  constructor(
    private translateService: TranslateService,
    public translate: TypedTranslateService,
  ) {
    this.translateService.setDefaultLang('en');
  }

  convertToScript(): void {
    const element = this.script.nativeElement;
    const script = document.createElement('script');

    script.type = this.type ? this.type : 'text/javascript';
    script.async = true; // false if not asnyc

    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';

    const scriptContent = {
      symbol: `NASDAQ:${this.stockSymbol}`,
      colorTheme: 'dark',
      isTransparent: false,
      largeChartUrl: '',
      displayMode: 'regular',
      // width: 480,
      // height: 830,
      width: '100%',
      height: '785',
      locale: 'en',
    };

    script.innerHTML = JSON.stringify(scriptContent);

    const parent = element.parentElement;
    parent.parentElement.replaceChild(script, parent);
  }

  ngAfterViewInit(): void {
    this.convertToScript();
  }

  ngOnInit(): void {}
}
