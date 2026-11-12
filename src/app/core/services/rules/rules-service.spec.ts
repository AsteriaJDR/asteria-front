import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { RulesService } from './rules-service';

describe('RulesService', () => {
  let service: RulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(RulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
