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
  selector: 'trading-view-analysis',
  templateUrl: './trading-view-analysis.component.html',
  styleUrls: ['./trading-view-analysis.component.scss'],
})
export class TradingViewAnalysisComponent implements OnInit, AfterViewInit {
  @Input()
  stockSymbol: string;

  @Input()
  src: string;

  @Input()
  type: string;

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
      'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';

    const scriptContent = {
      interval: '1M',
      width: '100%',
      height: '480',
      // width: 425,
      isTransparent: false,
      // height: 450,
      symbol: `NASDAQ:${this.stockSymbol}`,
      showIntervalTabs: true,
      locale: 'en',
      colorTheme: 'dark',
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
