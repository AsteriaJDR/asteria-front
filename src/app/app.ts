import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav';
import { AuthService } from './core/services/auth/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, BottomNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'asteria-front';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (user) => this.authService.setCurrentUser(user),
      error: () => {},
    });
  }
}
