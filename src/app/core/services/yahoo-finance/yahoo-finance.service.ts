import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YahooFinanceService {
  private static readonly BASE_URL = 'http://localhost:4201';

  // eslint-disable-next-line no-empty-function
  private static httpClient: HttpClient;

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public fetch(stockSymbol: string): void {
    console.log('Fetching data...');

    let myData = 'N/A';

    const html = this.requestHTML(stockSymbol).subscribe(
      // eslint-disable-next-line no-return-assign
      (data) => (myData = JSON.stringify(data)),
    );
    console.log(html);
    console.log(myData);
  }

  public requestHTML(stockSymbol: string) {
    console.log('service got: ', stockSymbol);
    try {
      console.log(`Scraping HTML for stock symbol '${stockSymbol}'...`);

      return this.httpClient
        .get(`${YahooFinanceService.BASE_URL}`, {
          params: new HttpParams().set('stockSymbol', stockSymbol),
          responseType: 'json',
        })
        .pipe(tap((x) => console.log(x)));
    } catch (e: unknown) {
      throw new Error('Error making GET request!');
    }
  }
}
