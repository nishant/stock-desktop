import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingViewGraphComponent } from './trading-view-graph.component';

describe('TradingViewGraphComponent', () => {
  let component: TradingViewGraphComponent;
  let fixture: ComponentFixture<TradingViewGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingViewGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingViewGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
