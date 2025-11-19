import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, X, Menu, Layers, ShoppingCart, Users, LogIn, UserPlus } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
})
export class NavbarComponent {
  readonly X = X;
  readonly Menu = Menu;
  readonly Layers = Layers;
  readonly ShoppingCart = ShoppingCart;
  readonly Users = Users;
  readonly LogIn = LogIn;
  readonly UserPlus = UserPlus;
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
