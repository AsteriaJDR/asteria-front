import { afterNextRender, Component } from '@angular/core';
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
export class App {
  protected title = 'asteria-front';

  constructor(private authService: AuthService) {
    afterNextRender(() => {
      this.authService.getUserInfo().subscribe({
        next: (user) => this.authService.setCurrentUser(user),
        error: () => {},
      });
    });
  }
}
