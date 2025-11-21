import { Component, signal } from '@angular/core';
import { form, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-cheval-form',
  imports: [Field],
  templateUrl: './cheval-form.html',
  styleUrl: './cheval-form.scss',
})
export class ChevalForm {
  chevalModel = signal({
    nom: '',
    dateNaissance: '',
  });

  chevalForm = form(this.chevalModel);
}
