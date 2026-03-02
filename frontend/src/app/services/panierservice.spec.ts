import { TestBed } from '@angular/core/testing';

import { Panierservice } from './panierservice';

describe('Panierservice', () => {
  let service: Panierservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Panierservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
