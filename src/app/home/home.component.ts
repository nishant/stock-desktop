import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TypedTranslateService } from '../core/services/translate/typed-translate.service';
import { YahooFinanceService } from '../core/services/yahoo-finance/yahoo-finance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value = '';

  form: FormGroup;

  submitted = false;

  constructor(
    private router: Router,
    public translate: TypedTranslateService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private stockService: YahooFinanceService,
  ) {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      stockSymbol: [Validators.minLength(1), Validators.pattern(/[a-zA-Z]+/)],
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.onSuccess();
  }

  onSuccess(): void {
    // const data = this.stockService.fetch( this.value);
    // alert(JSON.stringify(data));
    // alert(this.value);
    this.stockService.requestHTML(this.value).subscribe((data) => {
      alert(JSON.stringify(data));
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }
}
