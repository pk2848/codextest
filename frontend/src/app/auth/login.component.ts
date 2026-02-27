import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-wrapper">
      <div class="card card-login">
        <div class="card-body p-4">
          <h3 class="card-title text-center mb-1">SmartSchool ERP</h3>
          <p class="text-center text-muted mb-4">Sign in to your account</p>

          <div *ngIf="error" class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ error }}
            <button type="button" class="btn-close" (click)="error = ''"></button>
          </div>

          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input id="email" type="email" class="form-control" formControlName="email" placeholder="name@school.com" />
              <div class="invalid-feedback d-block" *ngIf="form.get('email')?.touched && form.get('email')?.invalid">
                Please enter a valid email.
              </div>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input id="password" type="password" class="form-control" formControlName="password" placeholder="Password" />
              <div class="invalid-feedback d-block" *ngIf="form.get('password')?.touched && form.get('password')?.invalid">
                Password is required.
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-100" [disabled]="loading">
              <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';
    this.auth.login(this.form.value.email!, this.form.value.password!).subscribe({
      next: () => {
        this.loading = false;
        const role = this.auth.userRole();
        switch (role) {
          case 'super_admin':
            this.router.navigate(['/admin']);
            break;
          case 'principal':
          case 'admin_staff':
            this.router.navigate(['/dashboard']);
            break;
          case 'teacher':
            this.router.navigate(['/attendance']);
            break;
          case 'student':
          case 'parent':
            this.router.navigate(['/dashboard']);
            break;
          case 'accountant':
            this.router.navigate(['/fees']);
            break;
          default:
            this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err?.error?.message || 'Invalid credentials. Please try again.';
      }
    });
  }
}
