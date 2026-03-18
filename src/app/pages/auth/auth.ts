import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth/auth-service';
import {
  ArrowRight,
  AtSign,
  AlertCircle,
  Eye,
  EyeOff,
  LockKeyhole,
  LucideAngularModule,
  Mail,
  Square,
  SquareCheckBig,
  User,
} from 'lucide-angular';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, LucideAngularModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  isSignup = this.route.snapshot.queryParams['mode'] === 'signup';
  showPassword = false;
  showConfirmPassword = false;
  stayChecked = false;
  errorMessage = '';

  protected readonly icons = {
    ArrowRight, AtSign, AlertCircle, Eye, EyeOff, LockKeyhole, Mail, Square, SquareCheckBig, User,
  };

  readonly signinForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  readonly signupForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  get canSubmit(): boolean {
    const form = this.isSignup ? this.signupForm : this.signinForm;
    if (!form.valid) return false;
    if (this.isSignup) {
      return this.signupForm.value.password === this.signupForm.value.confirmPassword;
    }
    return true;
  }

  switchMode(toSignup: boolean): void {
    this.isSignup = toSignup;
    this.errorMessage = '';
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.signinForm.reset();
    this.signupForm.reset();
    this.router.navigate([], {
      queryParams: { mode: toSignup ? 'signup' : null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  onSubmit(): void {
    if (this.isSignup) {
      this.signup();
    } else {
      this.signin();
    }
  }

  private signin(): void {
    this.authService
      .signin({
        email: this.signinForm.value.email!,
        password: this.signinForm.value.password!,
      })
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err: HttpErrorResponse) => {
          this.errorMessage =
            err.status === 401
              ? 'Email ou mot de passe incorrect'
              : 'Erreur de connexion au serveur';
        },
      });
  }

  private signup(): void {
    this.authService
      .signup({
        username: this.signupForm.value.username!,
        email: this.signupForm.value.email!,
        password: this.signupForm.value.password!,
      })
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err: HttpErrorResponse) => {
          this.errorMessage =
            err.status === 409
              ? "Ce nom d'utilisateur est déjà pris"
              : 'Erreur de connexion au serveur';
        },
      });
  }
}
