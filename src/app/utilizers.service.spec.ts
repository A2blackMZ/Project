import { TestBed } from '@angular/core/testing';

import { UtilizersService } from './utilizers.service';

describe('UtilizersService', () => {
  let service: UtilizersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilizersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
