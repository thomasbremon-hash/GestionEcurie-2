import { Component, inject, signal } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { SidebarService, SubMenuItem } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-layout',

  imports: [RouterModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {
  auth = inject(AuthService);
 sidebarService = inject(SidebarService);
 router = inject(Router);


  hover = signal(false);
  openMenu = signal('');

   

  userConnected = this.auth.utilisateur;


  toggleMenu(label: string) {
    this.openMenu.set(label ? '' : label) ;
  }

  onSubClick(sub: SubMenuItem, event: MouseEvent) {
    event.stopPropagation();
    const section = this.sidebarService.currentSection();
    const normalizedRoute = sub.route.startsWith(section)
      ? `/${sub.route}`
      : `/${section}/${sub.route}`;

    const finalRoute = normalizedRoute.replace(':id', '1');
  //  this.router.navigateByUrl(finalRoute);
  }

  onLogout() {
    this.auth.logout();
  }
}
