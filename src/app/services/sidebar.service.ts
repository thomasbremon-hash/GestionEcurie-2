import { Injectable, signal } from '@angular/core';

export interface SubMenuItem {
  label: string;
  route: string; // ex: 'utilisateurs/liste' ou 'utilisateurs/ajouter'
}

export interface MenuItem {
  label: string;
  subItems?: SubMenuItem[];
}

@Injectable({ providedIn: 'root' })
export class SidebarService {
  isVisible = signal(false);
  currentSection = signal('');
  menuItems = signal<MenuItem[]>([]);

  private menus = {
    admin: [
      {
        label: 'Utilisateurs',
        subItems: [
          { label: 'Voir', route: 'utilisateurs/liste' },
          { label: 'Ajouter', route: 'utilisateurs/ajouter' },
          // { label: 'Modifier', route: 'utilisateurs/modifier/:id' },
        ],
      },
      {
        label: 'Entreprises',
        subItems: [
          { label: 'Voir', route: 'entreprises/liste' },
          { label: 'Ajouter', route: 'entreprises/ajouter' },
        ],
      },
      {
        label: 'Chevaux',
        subItems: [
          { label: 'Voir', route: 'chevaux/liste' },
          // { label: 'Ajouter', route: 'chevaux/ajouter' },
        ],
      },
    ],
    // autres sections...
  };

  showSidebar(section: string) {
    this.currentSection.set(section);
    this.menuItems.set(this.menus.admin)
   
    this.isVisible.set(true);
  }

  hideSidebar() {
    this.isVisible.set(false);
  }
}
