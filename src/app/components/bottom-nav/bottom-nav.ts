import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  ScrollText,
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
  readonly ScrollText = ScrollText;
  readonly User = User;
  readonly NotebookPen = NotebookPen;
  readonly Home = Home;

  private readonly authService = inject(AuthService);

  get profileLink(): string {
    return this.authService.getCurrentUser() ? '/profile' : '/auth';
  }
}
