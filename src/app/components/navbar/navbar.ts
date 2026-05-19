import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  User,
  NotebookPen,
  ScrollText,
  LogIn,
  Bell,
  Menu,
  LogOut,
  Settings,
  X,
  Info,
  CheckCircle,
  AlertTriangle,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth/auth-service';
import { NotificationService } from '../../core/services/notification/notification-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
})
export class NavbarComponent {
  readonly User = User;
  readonly NotebookPen = NotebookPen;
  readonly ScrollText = ScrollText;
  readonly LogIn = LogIn;
  readonly Bell = Bell;
  readonly Menu = Menu;
  readonly LogOut = LogOut;
  readonly Settings = Settings;
  readonly X = X;
  readonly Info = Info;
  readonly CheckCircle = CheckCircle;
  readonly AlertTriangle = AlertTriangle;

  isMobileMenuOpen = signal(false);
  isProfileMenuOpen = signal(false);
  isNotificationMenuOpen = signal(false);

  constructor(
    public authService: AuthService,
    public notificationService: NotificationService,
  ) {}

  isLoggedIn(): boolean {
    return !!this.authService.getCurrentUser();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen.update(v => !v);
    if (this.isProfileMenuOpen()) this.isNotificationMenuOpen.set(false);
  }

  toggleNotificationMenu(): void {
    this.isNotificationMenuOpen.update(v => !v);
    if (this.isNotificationMenuOpen()) this.isProfileMenuOpen.set(false);
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen.set(false);
  }

  logout(): void {
    this.authService.logout().subscribe();
    this.isProfileMenuOpen.set(false);
  }

  notificationIcon(type: string) {
    if (type === 'success') return this.CheckCircle;
    if (type === 'warning') return this.AlertTriangle;
    return this.Info;
  }

  formatDate(date: Date): string {
    const diff = Date.now() - new Date(date).getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return 'À l\'instant';
    if (h < 24) return `Il y a ${h}h`;
    const d = Math.floor(h / 24);
    return `Il y a ${d}j`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-container') && !target.closest('.profile-menu-container')) {
      this.isNotificationMenuOpen.set(false);
      this.isProfileMenuOpen.set(false);
    }
  }
}

