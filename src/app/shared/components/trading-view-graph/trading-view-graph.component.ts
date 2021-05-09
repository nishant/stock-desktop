import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TypedTranslateService } from '../../../core/services/translate/typed-translate.service';

declare let TradingView: any;

@Component({
  selector: 'trading-view-graph',
  templateUrl: './trading-view-graph.component.html',
  styleUrls: ['./trading-view-graph.component.scss'],
})
export class TradingViewGraphComponent implements OnInit, AfterViewInit {
  @Input() stockSymbol = '';

  @Input() exchange = '';

  @Input() widgetWidth = 700;

  constructor(
    private translateService: TranslateService,
    public translate: TypedTranslateService,
  ) {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.widgetWidth);
    console.log(this.exchange.trim(), '!!');
    // eslint-disable-next-line no-new,new-cap
    new TradingView.widget({
      width: 'auto',
      height: Math.floor(this.widgetWidth / 1.4),
      symbol: `${this.exchange}:${this.stockSymbol}`,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      hide_top_toolbar: true,
      withdateranges: true,
      save_image: false,
      container_id: 'myWidgetContainer',
      details: false,
    });
  }
}
