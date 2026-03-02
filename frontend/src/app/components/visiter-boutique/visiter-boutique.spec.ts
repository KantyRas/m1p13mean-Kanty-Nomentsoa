import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiterBoutique } from './visiter-boutique';

describe('VisiterBoutique', () => {
  let component: VisiterBoutique;
  let fixture: ComponentFixture<VisiterBoutique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisiterBoutique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisiterBoutique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
