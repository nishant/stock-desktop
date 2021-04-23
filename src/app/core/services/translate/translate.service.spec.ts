import { TestBed } from '@angular/core/testing';
import { TypedTranslateService } from './typed-translate.service';

describe('TranslateService', () => {
  let service: TypedTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypedTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
