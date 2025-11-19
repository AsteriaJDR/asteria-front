import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h1>Login Page</h1>
      <p>Welcome to Asteria Login</p>
    </div>
  `,
  styles: [`
    .login-container {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class LoginComponent {}