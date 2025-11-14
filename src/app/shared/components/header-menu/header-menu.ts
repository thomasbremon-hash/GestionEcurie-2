import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.scss',
})
export class HeaderMenu {
  show = signal(false);
  navigations = [
    {
      path: '/admin',
      name: 'Admin',
    },
    // {
    //   path: '/gestionnaire',
    //   name: 'Gestionnaire',
    // },
    // {
    //   path: '/client',
    //   name: 'Client',
    // },
    // {
    //   path: '/collaborateur',
    //   name: 'Collaborateur',
    // },
    // {
    //   path: '/comptabilité',
    //   name: 'Comptabilité',
    // },
  ];

  toggleMenu() {
    this.show.update((s) => !s);
  }
}
