import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  X,
  Menu,
  Layers,
  ShoppingCart,
  Users,
  LogIn,
  NotebookPen,
  User,
  ScrollText
} from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
})
export class NavbarComponent {
  // Icônes exposées au template
  readonly X = X;
  readonly Menu = Menu;
  readonly Layers = Layers;
  readonly ShoppingCart = ShoppingCart;
  readonly Users = Users;
  readonly LogIn = LogIn;
  readonly NotebookPen = NotebookPen;
  readonly User = User;
  readonly ScrollText = ScrollText;
  
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  /** Ferme le menu mobile lors d'un clic en dehors */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.isMobileMenuOpen && !target.closest('app-navbar')) {
      this.isMobileMenuOpen = false;
    }
  }

  /** Ferme le menu mobile lors d'un appui sur Echap */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }
}
