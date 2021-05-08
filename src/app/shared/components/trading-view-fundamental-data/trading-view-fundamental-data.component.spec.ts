import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingViewFundamentalDataComponent } from './trading-view-fundamental-data.component';

describe('TradingViewFundamentalDataComponent', () => {
  let component: TradingViewFundamentalDataComponent;
  let fixture: ComponentFixture<TradingViewFundamentalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingViewFundamentalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingViewFundamentalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
