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

@Component({
  selector: 'app-user-base',
  standalone: true,
   templateUrl: './user-base.html',
  styleUrls: ['./user-base.scss'],
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserBase),
      multi: true,
    }
  ],
 
})
export class UserBase implements ControlValueAccessor, OnDestroy {
  userForm = new FormGroup({
    prenom: new FormControl('', [Validators.required, UtilisateurValidators.onlyLetters()]),
    nom: new FormControl('', [Validators.required, UtilisateurValidators.onlyLetters()]),
    email: new FormControl('', [Validators.required, UtilisateurValidators.emailValid()]),
  });

  private destroy$ = new Subject<void>();
  private onChange!: (value: any) => void;
  private onTouched!: () => void;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: any): void {
    if (value) this.userForm.patchValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    this.userForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => this.onChange(val));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.userForm.disable() : this.userForm.enable();
  }

  markTouched() {
    if (this.onTouched) this.onTouched();
  }

  // Helper pour affichage d’erreurs dans le template
  getError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return 'Ce champ est requis.';
    if (control.errors['onlyLetters']) return 'Ce champ ne peut contenir que des lettres.';
    if (control.errors['emailInvalid']) return 'Adresse email invalide.';
    return null;
  }
}
