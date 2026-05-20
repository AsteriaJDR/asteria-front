import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  Users,
  ScrollText,
  ShoppingCart,
  User,
  NotebookPen,
  Home,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth/auth-service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
})
export class BottomNavComponent {
  readonly Users = Users;
  readonly ScrollText = ScrollText;
  readonly ShoppingCart = ShoppingCart;
  readonly User = User;
  readonly NotebookPen = NotebookPen;
  readonly Home = Home;

  private readonly authService = inject(AuthService);

  get profileLink(): string {
    return this.authService.getCurrentUser() ? '/profile' : '/auth';
  }
}
