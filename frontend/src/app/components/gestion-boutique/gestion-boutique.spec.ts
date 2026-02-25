import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBoutique } from './gestion-boutique';

describe('GestionBoutique', () => {
  let component: GestionBoutique;
  let fixture: ComponentFixture<GestionBoutique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionBoutique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBoutique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
