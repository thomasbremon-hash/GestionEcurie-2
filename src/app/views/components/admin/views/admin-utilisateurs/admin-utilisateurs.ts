import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-utilisateurs',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-utilisateurs.html',
  styleUrl: './admin-utilisateurs.scss',
})
export class AdminUtilisateurs {}
