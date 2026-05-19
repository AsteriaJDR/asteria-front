import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth-service';
import { LucideAngularModule, User, Mail, Shield, Settings, Lock, Bell, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  imports: [LucideAngularModule, FormsModule],
})
export class Profile implements OnInit {
  readonly User = User;
  readonly Mail = Mail;
  readonly Shield = Shield;
  readonly Settings = Settings;
  readonly Lock = Lock;
  readonly Bell = Bell;
  readonly Trash2 = Trash2;

  activeTab = signal<'profile' | 'settings'>('profile');

  constructor(public authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const tab = this.route.snapshot.data['tab'];
    if (tab) this.activeTab.set(tab);
  }

  get user() { return this.authService.getCurrentUser(); }

  notificationsEnabled = signal(true);
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  passwordError = signal('');
  passwordSuccess = signal(false);

  toggleNotifications(): void {
    this.notificationsEnabled.update(v => !v);
  }

  savePassword(): void {
    this.passwordError.set('');
    this.passwordSuccess.set(false);
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.passwordError.set('Tous les champs sont requis.');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError.set('Les mots de passe ne correspondent pas.');
      return;
    }
    if (this.newPassword.length < 6) {
      this.passwordError.set('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    this.passwordSuccess.set(true);
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
