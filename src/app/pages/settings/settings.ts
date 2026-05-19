import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Lock, Bell, Trash2, User, Settings as SettingsIcon } from 'lucide-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrl: './settings.css',
  imports: [LucideAngularModule, FormsModule, RouterLink],
})
export class Settings {
  readonly Lock = Lock;
  readonly Bell = Bell;
  readonly Trash2 = Trash2;
  readonly User = User;
  readonly Settings = SettingsIcon;

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
