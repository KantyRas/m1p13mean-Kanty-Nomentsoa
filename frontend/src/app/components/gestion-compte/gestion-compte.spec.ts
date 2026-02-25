import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCompte } from './gestion-compte';

describe('GestionCompte', () => {
  let component: GestionCompte;
  let fixture: ComponentFixture<GestionCompte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionCompte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCompte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
