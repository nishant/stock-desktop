/* eslint-disable max-classes-per-file */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// NG Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TypedTranslateService } from './core/services/translate/typed-translate.service';
import { DetailModule } from './detail/detail.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): any {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return from(import(`../assets/i18n/${lang}.ts`)).pipe(pluck('default'));
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader,
      },
    }),
  ],
  providers: [TypedTranslateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
