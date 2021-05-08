import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingViewCompanyProfileComponent } from './trading-view-company-profile.component';

describe('TradingViewCompanyProfileComponent', () => {
  let component: TradingViewCompanyProfileComponent;
  let fixture: ComponentFixture<TradingViewCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingViewCompanyProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingViewCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
