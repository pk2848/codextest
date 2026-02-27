import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" routerLink="/dashboard">
          &#x1F393; SmartSchool ERP
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <span class="nav-link text-light">
                <span class="badge bg-info text-dark me-2">{{ role | uppercase }}</span>
                {{ userName }}
              </span>
            </li>
            <li class="nav-item">
              <button class="btn btn-outline-light btn-sm" (click)="logout()">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid" style="padding-top: 56px;">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block sidebar py-3">
          <ul class="nav flex-column">
            <li class="nav-item" *ngFor="let item of visibleNavItems">
              <a class="nav-link" [routerLink]="item.route" routerLinkActive="active">
                {{ item.icon }} {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
        <main class="col-md-10 ms-sm-auto content-area p-4">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class LayoutComponent {
  role = '';
  userName = '';
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: '\u{1F4CA}', route: '/dashboard', roles: ['super_admin', 'principal', 'admin_staff', 'teacher', 'student', 'parent', 'accountant'] },
    { label: 'Students', icon: '\u{1F393}', route: '/student', roles: ['super_admin', 'principal', 'admin_staff'] },
    { label: 'Teachers', icon: '\u{1F468}\u{200D}\u{1F3EB}', route: '/teacher', roles: ['super_admin', 'principal'] },
    { label: 'Attendance', icon: '\u{1F4CB}', route: '/attendance', roles: ['super_admin', 'principal', 'admin_staff', 'teacher', 'student', 'parent'] },
    { label: 'Exams', icon: '\u{1F4DD}', route: '/exam', roles: ['super_admin', 'principal', 'admin_staff', 'teacher', 'student', 'parent'] },
    { label: 'Fees', icon: '\u{1F4B0}', route: '/fees', roles: ['super_admin', 'accountant'] },
    { label: 'Timetable', icon: '\u{1F4C5}', route: '/timetable', roles: ['super_admin', 'principal', 'admin_staff', 'teacher', 'student', 'parent'] },
    { label: 'Admin', icon: '\u{2699}\u{FE0F}', route: '/admin', roles: ['super_admin'] }
  ];

  get visibleNavItems(): NavItem[] {
    return this.navItems.filter(item => item.roles.includes(this.role));
  }

  constructor(private auth: AuthService, private router: Router) {
    this.role = this.auth.userRole();
    this.userName = this.auth.userName();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
