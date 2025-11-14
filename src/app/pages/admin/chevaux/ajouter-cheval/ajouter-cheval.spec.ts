import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCheval } from './ajouter-cheval';

describe('AjouterCheval', () => {
  let component: AjouterCheval;
  let fixture: ComponentFixture<AjouterCheval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterCheval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterCheval);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
