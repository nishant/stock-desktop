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

  data: StockData;

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
    });
  }

  onSubmit(): Promise<void> {
    this.renderData = false;
    this.submitted = true;
    this.valueColor = '';
    this.trendColor = '';
    this.dayChangeColor = '';
    this.exchange = '';

    if (this.form.invalid) {
      return;
    }
    this.onSuccess();
  }

  onSuccess(): void {
    this.stockService.fetch(this.value).subscribe((data) => {
      this.data = data as StockData;
      this.exchange = '';

      this.assignCssClasses();
      this.getExchange(this.data.exchange.trim());

      this.renderData = true;
      console.log(this.exchange);
      // this.displayData();
    });
    // this.stockForm.nativeElement.scrollIntoView();
  }

  onReset(): void {
    this.submitted = false;
    this.renderData = false;
    this.form.reset();
  }

  assignCssClasses(): void {
    // eslint-disable-next-line no-unused-expressions
    if (this.data.dayChangeDollar) {
      this.data.dayChangeDollar[0] === '+'
        ? (this.dayChangeColor = 'green')
        : (this.dayChangeColor = 'red');
    }

    if (
      this.data.chartEventValue &&
      this.data.chartEventValue !== 'N/A' &&
      this.data.chartEventValue.toLowerCase().includes('bear')
    ) {
      this.trendColor = 'red';
    }

    if (
      this.data.chartEventValue &&
      this.data.chartEventValue !== 'N/A' &&
      this.data.chartEventValue.toLowerCase().includes('bull')
    ) {
      this.trendColor = 'green';
    }

    if (
      this.data.fairValue &&
      this.data.fairValue !== 'N/A' &&
      this.data.fairValue.toLowerCase().includes('over')
    ) {
      this.valueColor = 'red';
    }

    if (
      this.data.fairValue &&
      this.data.fairValue !== 'N/A' &&
      this.data.fairValue.toLowerCase().includes('under')
    ) {
      this.valueColor = 'green';
    }
  }

  displayData(): void {
    alert(JSON.stringify(this.data));
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
    this.elRef.nativeElement.scrollIntoView();
  }
}
