import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBudget } from './gestion-budget';

describe('GestionBudget', () => {
  let component: GestionBudget;
  let fixture: ComponentFixture<GestionBudget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionBudget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBudget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
