// eslint-disable-next-line max-classes-per-file
import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { LookupData } from '../core/services/stock/lookup-data';
import { StockData } from '../core/services/stock/stock-data';
import { StockService } from '../core/services/stock/stock.service';
import { TypedTranslateService } from '../core/services/translate/typed-translate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  value = '';

  form: FormGroup;

  submitted = false;

  renderData = false;

  stockData: StockData;

  lookupData: LookupData;

  isChecked = false;

  dayChangeColor = '';

  trendColor = '';

  valueColor = '';

  exchange = '';

  constructor(
    private router: Router,
    public translate: TypedTranslateService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private stockService: StockService,
  ) {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      stockSymbol: [Validators.minLength(1), Validators.pattern(/[a-zA-Z]+/)],
      lookupCheckbox: [false],
    });
  }

  onSubmit(): Promise<void> {
    this.submitted = true;
    this.resetRenderData();

    if (this.form.invalid) {
      return;
    }
    this.onSuccess();
  }

  onSuccess(): void {
    if (this.isChecked) {
      this.stockService
        .fetchLookupData(this.value)
        .pipe(first())
        .subscribe((data) => {
          this.lookupData = data as LookupData;
          this.value = this.lookupData.symbol;
          // this.onSuccess();
          // this.displayDataFromApi();

          this.stockService
            .fetchStockData(this.value)
            .subscribe((stockData) => {
              this.stockData = stockData as StockData;
              this.exchange = '';

              this.assignCssClasses();
              this.getExchange(this.stockData.exchange);

              this.renderData = true;
              console.log(this.exchange);
              // this.displayDataFromApi();
            });
        });
    } else {
      this.stockService.fetchStockData(this.value).subscribe((data) => {
        this.stockData = data as StockData;
        this.exchange = '';

        this.assignCssClasses();
        this.getExchange(this.stockData.exchange);

        this.renderData = true;
        console.log(this.exchange);
        // this.displayDataFromApi();
      });
    }

    // this.isChecked = false;

    // this.stockForm.nativeElement.scrollIntoView();
  }

  onReset(): void {
    this.submitted = false;
    this.renderData = false;
    this.form.reset();
  }

  resetRenderData(): void {
    this.renderData = false;
    this.valueColor = '';
    this.trendColor = '';
    this.dayChangeColor = '';
    this.exchange = '';
  }

  assignCssClasses(): void {
    // eslint-disable-next-line no-unused-expressions
    if (this.stockData.dayChangeDollar) {
      this.stockData.dayChangeDollar[0] === '+'
        ? (this.dayChangeColor = 'green')
        : (this.dayChangeColor = 'red');
    }

    if (
      this.stockData.chartEventValue &&
      this.stockData.chartEventValue !== 'N/A' &&
      this.stockData.chartEventValue.toLowerCase().includes('bear')
    ) {
      this.trendColor = 'red';
    }

    if (
      this.stockData.chartEventValue &&
      this.stockData.chartEventValue !== 'N/A' &&
      this.stockData.chartEventValue.toLowerCase().includes('bull')
    ) {
      this.trendColor = 'green';
    }

    if (
      this.stockData.fairValue &&
      this.stockData.fairValue !== 'N/A' &&
      this.stockData.fairValue.toLowerCase().includes('over')
    ) {
      this.valueColor = 'red';
    }

    if (
      this.stockData.fairValue &&
      this.stockData.fairValue !== 'N/A' &&
      this.stockData.fairValue.toLowerCase().includes('under')
    ) {
      this.valueColor = 'green';
    }
  }

  displayDataFromApi(): void {
    alert(JSON.stringify(this.stockData));
    alert(JSON.stringify(this.lookupData));
  }

  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  private getExchange(exchange: string) {
    console.log(exchange);

    switch (exchange) {
      case 'NasdaqGS':
      case 'NasdaqGM':
      case 'NasdaqCM':
        this.exchange = 'NASDAQ';
        break;

      case 'NYSE':
        this.exchange = 'NYSE';
        break;

      case 'NYSEArca':
      case 'BATS':
        this.exchange = 'AMEX';
        break;

      case 'Other OTC':
        this.exchange = 'OTC';
        break;

      default:
        this.exchange = 'OTC';
    }
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line new-cap,no-new
  }
}

@Directive({ selector: '[scrollTo]' }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ScrollToDirective implements AfterViewInit {
  // eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    // this.elRef.nativeElement.scrollIntoView();
    const margin = 48;
    const bounds = this.elRef.nativeElement.getBoundingClientRect();

    window.scrollTo(window.scrollX, bounds.top - margin);
  }
}
