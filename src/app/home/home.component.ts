import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(
    private router: Router,
    public translate: TypedTranslateService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
  ) {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      stockSymbol: [Validators.minLength(1), Validators.pattern(/[a-zA-Z]+/)],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // display form values on success
    alert(`SUCCESS!! :-)\n\n${JSON.stringify(this.form.value, null, 4)}`);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }
}
