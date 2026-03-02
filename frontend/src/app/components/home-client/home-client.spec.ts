import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClient } from './home-client';

describe('HomeClient', () => {
  let component: HomeClient;
  let fixture: ComponentFixture<HomeClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
