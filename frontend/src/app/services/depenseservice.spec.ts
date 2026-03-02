import { TestBed } from '@angular/core/testing';

import { Depenseservice } from './depenseservice';

describe('Depenseservice', () => {
  let service: Depenseservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Depenseservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
