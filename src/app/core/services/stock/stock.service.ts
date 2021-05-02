import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private static readonly BASE_URL = 'http://localhost:4201';

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public fetch(stockSymbol: string): Observable<unknown> {
    try {
      console.log(
        `[StockService] Scraping HTML for stock symbol '${stockSymbol}'...`,
      );

      return (
        this.httpClient
          .get(`${StockService.BASE_URL}`, {
            params: new HttpParams().set('stockSymbol', stockSymbol),
            responseType: 'json',
          })
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          .pipe(
            tap((data) => console.log('[StockService] Fetched data:\n', data)),
          )
      );
    } catch (e: unknown) {
      throw new Error('Error making GET request!');
    }
  }
}
