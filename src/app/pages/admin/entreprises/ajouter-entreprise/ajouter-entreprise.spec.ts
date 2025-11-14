import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEntreprise } from './ajouter-entreprise';

describe('AjouterEntreprise', () => {
  let component: AjouterEntreprise;
  let fixture: ComponentFixture<AjouterEntreprise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterEntreprise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterEntreprise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
