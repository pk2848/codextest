import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<form [formGroup]="form" (ngSubmit)="submit()">
    <input formControlName="email" placeholder="Email" />
    <input formControlName="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>`
})
export class LoginComponent {
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
  submit() { if (this.form.valid) this.auth.login(this.form.value.email!, this.form.value.password!).subscribe(() => this.router.navigate(['/dashboard'])); }
}
