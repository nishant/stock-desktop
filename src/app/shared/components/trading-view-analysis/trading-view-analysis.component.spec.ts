import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingViewAnalysisComponent } from './trading-view-analysis.component';

describe('TradingViewAnalysisComponent', () => {
  let component: TradingViewAnalysisComponent;
  let fixture: ComponentFixture<TradingViewAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingViewAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingViewAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
