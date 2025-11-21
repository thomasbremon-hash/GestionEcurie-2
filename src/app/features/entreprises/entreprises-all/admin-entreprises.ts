import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-entreprises',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-entreprises.html',
})
export class AdminEntreprises {}
