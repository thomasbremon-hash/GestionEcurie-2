import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-chevaux',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-chevaux.html',
})
export class AdminChevaux {}
