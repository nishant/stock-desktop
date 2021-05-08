import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmbeddedScriptComponent } from './embedded-script.component';

describe('ComponentScriptComponent', () => {
  let component: EmbeddedScriptComponent;
  let fixture: ComponentFixture<EmbeddedScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmbeddedScriptComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
