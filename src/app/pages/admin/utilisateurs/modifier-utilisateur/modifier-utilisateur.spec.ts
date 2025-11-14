import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierUtilisateur } from './modifier-utilisateur';

describe('ModifierUtilisateur', () => {
  let component: ModifierUtilisateur;
  let fixture: ComponentFixture<ModifierUtilisateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierUtilisateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierUtilisateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
