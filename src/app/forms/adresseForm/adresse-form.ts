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
import { CommonModule } from '@angular/common';
import { UtilisateurValidators } from '../../services/validators.service';

@Component({
  selector: 'app-adresse',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdresseForm),
      multi: true,
    },
  ],
  templateUrl: './adresse-form.html',
  styleUrls: ['./adresse-form.scss'],
})
export class AdresseForm implements ControlValueAccessor, OnDestroy {
  adresseForm = new FormGroup({
    rue: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required, UtilisateurValidators.onlyLetters()]),
    cp: new FormControl('', [Validators.required, UtilisateurValidators.codePostal()]),
    pays: new FormControl('', [Validators.required, UtilisateurValidators.onlyLetters()]),
  });

  private destroy$ = new Subject<void>();
  private onChange!: (value: any) => void;
  private onTouched!: () => void;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: any): void {
    if (value) this.adresseForm.patchValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    this.adresseForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => this.onChange(val));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.adresseForm.disable() : this.adresseForm.enable();
  }

  markTouched() {
    if (this.onTouched) this.onTouched();
  }

  getError(controlName: string): string | null {
    const control = this.adresseForm.get(controlName);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return 'Ce champ est requis.';
    if (control.errors['onlyLetters']) return 'Ce champ ne peut contenir que des lettres.';
    if (control.errors['codePostalInvalid']) return 'Code postal invalide.';
    return null;
  }
}
