import { Component, forwardRef, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UtilisateurValidators } from '../../services/validators.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entreprise-base',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntrepriseBase),
      multi: true,
    },
  ],
  templateUrl: './entreprise-base.html',
  styleUrl: './entreprise-base.scss',
})
export class EntrepriseBase implements ControlValueAccessor, OnDestroy {
  entrepriseBaseForm = new FormGroup({
    nom: new FormControl('', [Validators.required, UtilisateurValidators.onlyLetters()]),
    email: new FormControl('', [Validators.required, UtilisateurValidators.emailValid()]),
    siret: new FormControl('', [Validators.required]),
    siren: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
  });

  private destroy$ = new Subject<void>();
  private onChange!: (value: any) => void;
  private onTouched!: () => void;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: any): void {
    if (value) this.entrepriseBaseForm.patchValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    this.entrepriseBaseForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => this.onChange(val));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.entrepriseBaseForm.disable() : this.entrepriseBaseForm.enable();
  }

  markTouched() {
    if (this.onTouched) this.onTouched();
  }

  // Helper pour affichage d’erreurs dans le template
  getError(controlName: string): string | null {
    const control = this.entrepriseBaseForm.get(controlName);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return 'Ce champ est requis.';
    if (control.errors['onlyLetters']) return 'Ce champ ne peut contenir que des lettres.';
    if (control.errors['emailInvalid']) return 'Adresse email invalide.';
    return null;
  }
}
