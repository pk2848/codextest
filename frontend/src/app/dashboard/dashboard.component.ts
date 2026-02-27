import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Dashboard</h2>
      <span class="badge bg-primary fs-6">{{ role | uppercase }}</span>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-3" *ngFor="let card of roleCards">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center">
            <div class="display-4 mb-2">{{ card.icon }}</div>
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text text-muted">{{ card.description }}</p>
            <a [routerLink]="card.route" class="btn btn-outline-primary btn-sm">Go to {{ card.title }}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Welcome, {{ userName }}</h5>
        <p class="card-text text-muted">
          You are logged in as <strong>{{ role }}</strong>. Use the sidebar to navigate to the modules available to your role.
        </p>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  role = '';
  userName = '';
  roleCards: { icon: string; title: string; description: string; route: string }[] = [];

  private cardConfig: Record<string, { icon: string; title: string; description: string; route: string }[]> = {
    super_admin: [
      { icon: '\u{1F468}\u{200D}\u{1F393}', title: 'Students', description: 'Manage student records', route: '/student' },
      { icon: '\u{1F468}\u{200D}\u{1F3EB}', title: 'Teachers', description: 'Manage teachers', route: '/teacher' },
      { icon: '\u{1F4CB}', title: 'Attendance', description: 'RFID attendance tracking', route: '/attendance' },
      { icon: '\u{2699}\u{FE0F}', title: 'Admin', description: 'System administration', route: '/admin' }
    ],
    principal: [
      { icon: '\u{1F468}\u{200D}\u{1F393}', title: 'Students', description: 'View student records', route: '/student' },
      { icon: '\u{1F468}\u{200D}\u{1F3EB}', title: 'Teachers', description: 'Manage teachers', route: '/teacher' },
      { icon: '\u{1F4CB}', title: 'Attendance', description: 'Attendance reports', route: '/attendance' },
      { icon: '\u{1F4DD}', title: 'Exams', description: 'Exam management', route: '/exam' }
    ],
    admin_staff: [
      { icon: '\u{1F468}\u{200D}\u{1F393}', title: 'Students', description: 'Manage student records', route: '/student' },
      { icon: '\u{1F4CB}', title: 'Attendance', description: 'Attendance records', route: '/attendance' },
      { icon: '\u{1F4C5}', title: 'Timetable', description: 'Schedule management', route: '/timetable' }
    ],
    teacher: [
      { icon: '\u{1F4CB}', title: 'Attendance', description: 'Mark daily attendance', route: '/attendance' },
      { icon: '\u{1F4DD}', title: 'Exams', description: 'Enter marks', route: '/exam' },
      { icon: '\u{1F4C5}', title: 'Timetable', description: 'View schedule', route: '/timetable' }
    ],
    student: [
      { icon: '\u{1F4CB}', title: 'Attendance', description: 'View your attendance', route: '/attendance' },
      { icon: '\u{1F4DD}', title: 'Exams', description: 'View exam results', route: '/exam' },
      { icon: '\u{1F4C5}', title: 'Timetable', description: 'View timetable', route: '/timetable' }
    ],
    parent: [
      { icon: '\u{1F4CB}', title: 'Attendance', description: "Child's attendance", route: '/attendance' },
      { icon: '\u{1F4DD}', title: 'Exams', description: 'Exam results', route: '/exam' }
    ],
    accountant: [
      { icon: '\u{1F4B0}', title: 'Fees', description: 'Fee management', route: '/fees' },
      { icon: '\u{1F4CA}', title: 'Dashboard', description: 'Financial overview', route: '/dashboard' }
    ]
  };

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.role = this.auth.userRole();
    this.userName = this.auth.userName();
    this.roleCards = this.cardConfig[this.role] || this.cardConfig['student'];
  }
}
