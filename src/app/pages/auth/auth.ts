import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../core/services/auth/auth-service';

@Component({
  selector: 'app-auth',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnInit {

  private formBuilder: FormBuilder = new FormBuilder();

  protected errorMessage: string = "";

  authFormGroup = this.formBuilder.group({
    username: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['']
  });

  constructor(
    protected router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.router.url === '/auth/signup') {
      this.authFormGroup.get('username')?.setValidators(Validators.required);
      this.authFormGroup.get('username')?.updateValueAndValidity();
      this.authFormGroup.get('confirmPassword')?.setValidators(Validators.required);
      this.authFormGroup.get('confirmPassword')?.updateValueAndValidity();
    }
  }

  enableSubmitButton() {
    if (this.authFormGroup.valid) {
      if (this.router.url === '/auth/signup') {
        return this.authFormGroup.value.password === this.authFormGroup.value.confirmPassword;
      } else {
        return true;
      }
    }
    return false;
  }

  onSubmit() {
    if (this.router.url === '/auth/signin') {
      this.signin();
    } else {
      this.signup();
    }
  }

  signin() {
    this.authService.signin({
      email: this.authFormGroup.value.email!,
      password: this.authFormGroup.value.password!
    }).subscribe({
        next: () => {
          this.router.navigateByUrl('/').then();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorMessage = 'Email ou mot de passe incorrect';
          }
          if (error.status === 500) {
            this.errorMessage = 'Erreur de connexion au serveur';
          }
        }
      }
    );
  }

  signup() {
    this.authService.signup({
      username: this.authFormGroup.value.username!,
      email: this.authFormGroup.value.email!,
      password: this.authFormGroup.value.password!
    }).subscribe({
        next: () => {
          this.router.navigateByUrl('/').then();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.errorMessage = 'Ce nom d\'utilisateur est déjà pris';
          }
          if (error.status === 500) {
            this.errorMessage = 'Erreur de connexion au serveur';
          }
        }
      }
    );
  }
}
