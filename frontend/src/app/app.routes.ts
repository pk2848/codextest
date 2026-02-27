import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './core/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES) },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES) },
      { path: 'student', canActivate: [roleGuard(['super_admin', 'principal', 'admin_staff'])], loadChildren: () => import('./student/student.routes').then((m) => m.STUDENT_ROUTES) },
      { path: 'teacher', canActivate: [roleGuard(['super_admin', 'principal'])], loadChildren: () => import('./teacher/teacher.routes').then((m) => m.TEACHER_ROUTES) },
      { path: 'attendance', loadChildren: () => import('./attendance/attendance.routes').then((m) => m.ATTENDANCE_ROUTES) },
      { path: 'exam', loadChildren: () => import('./exam/exam.routes').then((m) => m.EXAM_ROUTES) },
      { path: 'fees', canActivate: [roleGuard(['accountant', 'super_admin'])], loadChildren: () => import('./fees/fees.routes').then((m) => m.FEES_ROUTES) },
      { path: 'timetable', loadChildren: () => import('./timetable/timetable.routes').then((m) => m.TIMETABLE_ROUTES) },
      { path: 'admin', canActivate: [roleGuard(['super_admin'])], loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'auth/login' }
];
