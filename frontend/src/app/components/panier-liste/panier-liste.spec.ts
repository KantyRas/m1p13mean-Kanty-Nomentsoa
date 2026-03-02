import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierListe } from './panier-liste';

describe('PanierListe', () => {
  let component: PanierListe;
  let fixture: ComponentFixture<PanierListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanierListe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
