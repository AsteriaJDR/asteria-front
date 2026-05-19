import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth-service';
import { LucideAngularModule, User, Mail, Shield } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  imports: [LucideAngularModule],
})
export class Profile {
  readonly User = User;
  readonly Mail = Mail;
  readonly Shield = Shield;

  constructor(public authService: AuthService) {}

  get user() {
    return this.authService.getCurrentUser();
  }
}
