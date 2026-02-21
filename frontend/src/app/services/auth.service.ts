import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  login(email: string, password: string) {
    return this.api.post<{ accessToken: string; refreshToken: string; user: { role: { name: string } } }>('/auth/login', { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('role', res.user.role.name);
      })
    );
  }

  isLoggedIn() { return !!localStorage.getItem('accessToken'); }
  userRole() { return localStorage.getItem('role') || ''; }
}
