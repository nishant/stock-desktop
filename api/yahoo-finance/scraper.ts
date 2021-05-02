import axios from 'axios';
import cheerio from 'cheerio';
import { DomIds } from './dom-ids';
import { StockData } from './stock-data';
import { logger } from '../logger';

export class Scraper {
  private static readonly BASE_URL = 'https://finance.yahoo.com/quote/';

  private static client = axios.create();

  public static async fetch(stockSymbol: string) {
    logger.info('Scraper running!');

    const html = await this.requestHTML(stockSymbol);
    const stockData = this.parseHTML(html);
    logger.info(stockData)
    return stockData;
  }

  private static parseHTML(html: string): StockData {
    const DOM = cheerio.load(html);

    const headerInfo = DOM(DomIds.HEADER_INFO_ID);
    const leftTable = DOM(DomIds.LEFT_SUMMARY_TABLE);
    const rightTable = DOM(DomIds.RIGHT_SUMMARY_TABLE);

    const marketNoticeNode = DOM(DomIds.MARKET_NOTICE_ID);
    const fairValueNode = DOM(DomIds.FAIR_VALUE_ID);
    const chartEventNode = DOM(DomIds.CHART_EVENT_ID);

    const getText = (dom: unknown, context: string) =>
      DOM(dom).find(context).text();

    const name = getText(headerInfo, `h1`);

    // if it exists, return first idx, otherwise N/A
    const symbol = name.match(/\((.+)\)/)?.[1] ?? 'N/A';

    const currentPrice = marketNoticeNode.prev().prev().text();

    const dayChangeText = marketNoticeNode.prev().text();
    const dayChangeMatch = dayChangeText.match(/(.+)\s\((.+%)\)/);
    const [_, dayChangeDollar, dayChangePercent] = dayChangeMatch ?? [
      '',
      'N/A',
      'N/A',
    ];

    // Left Table
    const previousClosePrice = getText(leftTable, DomIds.PREV_CLOSE_VALUE);

    const openPrice = getText(leftTable, DomIds.OPEN_VALUE);

    const bidPrice = getText(leftTable, DomIds.BID_VALUE);

    const askPrice = getText(leftTable, DomIds.ASK_VALUE);

    const dayRange = getText(leftTable, DomIds.DAYS_RANGE_VALUE);

    const yearRange = getText(leftTable, DomIds.FIFTY_TWO_WK_RANGE);

    const volume = getText(leftTable, DomIds.TD_VOLUME_VALUE);

    const avgVolume = getText(leftTable, DomIds.AVERAGE_VOLUME_3MONTH_VALUE);

    // Right Table
    const marketCap = getText(rightTable, DomIds.MARKET_CAP_VALUE);

    const fiveYearMonthly = getText(rightTable, DomIds.BETA_5Y_VALUE);

    const peRatio = getText(rightTable, DomIds.PE_RATIO);

    const eps = getText(rightTable, DomIds.EPS_RATIO_VALUE);

    const earningsDate = getText(rightTable, DomIds.EARNINGS_DATE_VALUE);

    const forwardDividendAndYield = getText(
      rightTable,
      DomIds.DIVIDEND_AND_YIELD_VALUE,
    );

    const exDividendDate = getText(rightTable, DomIds.EX_DIVEND_DATE_VALUE);

    let oneYearTarget = getText(
      rightTable,
      DomIds.ONE_YEAR_TARGET_PRICE_VALUE,
    );

    if (oneYearTarget === undefined || oneYearTarget === '') {
      oneYearTarget = 'N/A'
    }

    // Other Values
    let fairValue = getText(fairValueNode, `div:contains('XX'):lt(1)`).split(
      'XX',
    )[2];

    if (fairValue === undefined || fairValue === '') {
      fairValue = 'N/A'
    }

    const patternDetectedNode = chartEventNode.find(
      `span:contains('pattern detected')`,
    );
    let chartEventValue = patternDetectedNode.prev().text();
    if (chartEventValue === undefined || chartEventValue === '') {
      chartEventValue = 'N/A'
    }

    const stockData: StockData = {
      name,
      symbol,
      currentPrice,
      dayChangeDollar,
      dayChangePercent,
      previousClosePrice,
      openPrice,
      bidPrice,
      askPrice,
      dayRange,
      yearRange,
      volume,
      avgVolume,
      marketCap,
      fiveYearMonthly,
      peRatio,
      eps,
      earningsDate,
      forwardDividendAndYield,
      exDividendDate,
      oneYearTarget,
      fairValue,
      chartEventValue,
    };

    return stockData;
  }

  private static async requestHTML(stockSymbol: string): Promise<string> {
    try {
      logger.info(`Scraping HTML for stock symbol '${stockSymbol}'...`);
      const { data } = await this.client.get(`${this.BASE_URL}${stockSymbol}`);
      return data;
    } catch (e: unknown) {
      logger.error(e);
      throw new Error('Error making GET request!');
    }
  }
}
