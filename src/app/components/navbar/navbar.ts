import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  ShoppingCart,
  User,
  NotebookPen,
  ScrollText,
  LogIn
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

  constructor(public authService: AuthService) {}

  isLoggedIn(): boolean {
    return !!this.authService.getCurrentUser();
  }
}


