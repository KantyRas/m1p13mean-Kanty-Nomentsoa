import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueDash } from './boutique-dash';

describe('BoutiqueDash', () => {
  let component: BoutiqueDash;
  let fixture: ComponentFixture<BoutiqueDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoutiqueDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
