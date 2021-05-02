import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Tile } from '@angular/material/grid-list/tile-coordinator';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StockData } from '../../../api/yahoo-finance/stock-data';
import { StockService } from '../core/services/stock/stock.service';
import { TypedTranslateService } from '../core/services/translate/typed-translate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value = '';

  form: FormGroup;

  submitted = false;

  renderData = false;

  data: StockData;

  tiles: Tile[] = ([
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ] as unknown) as Tile[];

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
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.onSuccess();
  }

  onSuccess(): void {
    this.stockService.fetch(this.value).subscribe((data) => {
      this.data = data as StockData;
      this.renderData = true;
      // this.displayData();
    });
  }

  onReset(): void {
    this.submitted = false;
    this.renderData = false;
    this.form.reset();
  }

  displayData(): void {
    alert(JSON.stringify(this.data));
  }

  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }
}
