import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBoutique } from './register-boutique';

describe('RegisterBoutique', () => {
  let component: RegisterBoutique;
  let fixture: ComponentFixture<RegisterBoutique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterBoutique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBoutique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
