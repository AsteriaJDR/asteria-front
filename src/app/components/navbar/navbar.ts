import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  ShoppingCart,
  User,
  NotebookPen,
  ScrollText,
  LogIn,
  Bell,
  Menu,
  LogOut,
  Settings,
  X
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth/auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
})
export class NavbarComponent {
  readonly ShoppingCart = ShoppingCart;
  readonly User = User;
  readonly NotebookPen = NotebookPen;
  readonly ScrollText = ScrollText;
  readonly LogIn = LogIn;
  readonly Bell = Bell;
  readonly Menu = Menu;
  readonly LogOut = LogOut;
  readonly Settings = Settings;
  readonly X = X;

  isMobileMenuOpen = signal(false);
  isProfileMenuOpen = signal(false);
  isMobile = signal(false);

  notificationCount = signal(3);

  constructor(public authService: AuthService) {}

  isLoggedIn(): boolean {
    return !!this.authService.getCurrentUser();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen.update(v => !v);
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.isProfileMenuOpen.set(false);
  }

  checkMobile(): void {
    this.isMobile.set(window.innerWidth < 900);
  }
}

