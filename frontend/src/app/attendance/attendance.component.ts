import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2 class="mb-4">Attendance &mdash; RFID Scanner</h2>

    <div class="row g-4">
      <!-- RFID Scan Card -->
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">&#x1F4F6; Scan RFID Card</h5>
          </div>
          <div class="card-body">
            <p class="text-muted">Place the RFID card near the reader or enter the tag manually.</p>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control form-control-lg"
                [(ngModel)]="rfidTag"
                placeholder="RFID Tag ID"
                (keyup.enter)="scanRfid()"
                autofocus
              />
              <button class="btn btn-primary" (click)="scanRfid()" [disabled]="scanning">
                <span *ngIf="scanning" class="spinner-border spinner-border-sm me-1"></span>
                {{ scanning ? 'Scanning...' : 'Mark Present' }}
              </button>
            </div>

            <div *ngIf="scanResult" class="alert" [ngClass]="scanSuccess ? 'alert-success' : 'alert-warning'" role="alert">
              {{ scanResult }}
            </div>

            <!-- Scan Log -->
            <div *ngIf="scanLog.length > 0" class="mt-3">
              <h6>Today's Scan Log</h6>
              <div class="table-responsive">
                <table class="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>RFID Tag</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let log of scanLog; let i = index">
                      <td>{{ i + 1 }}</td>
                      <td><code>{{ log.rfidTag }}</code></td>
                      <td>
                        <span class="badge" [ngClass]="log.success ? 'bg-success' : 'bg-warning'">
                          {{ log.success ? 'Present' : 'Failed' }}
                        </span>
                      </td>
                      <td>{{ log.time }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Card -->
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-secondary text-white">
            <h5 class="mb-0">&#x2139;&#xFE0F; Attendance Info</h5>
          </div>
          <div class="card-body">
            <p>This module uses <strong>RFID-based attendance tracking</strong>.</p>
            <ul>
              <li>Each student is assigned a unique RFID tag linked to their profile.</li>
              <li>When a student scans their card, attendance is automatically marked as <strong>present</strong>.</li>
              <li>Duplicate scans on the same day are prevented.</li>
              <li>Attendance data is stored securely in the system database.</li>
            </ul>
            <div class="alert alert-info" role="alert">
              <strong>Role:</strong> {{ role | uppercase }} &mdash;
              <span *ngIf="role === 'teacher' || role === 'admin_staff' || role === 'super_admin' || role === 'principal'">
                You can scan RFID cards and view reports.
              </span>
              <span *ngIf="role === 'student' || role === 'parent'">
                You can view attendance records.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AttendanceComponent {
  rfidTag = '';
  scanning = false;
  scanResult = '';
  scanSuccess = false;
  role = '';
  scanLog: { rfidTag: string; success: boolean; time: string }[] = [];

  constructor(private api: ApiService, private auth: AuthService) {
    this.role = this.auth.userRole();
  }

  scanRfid() {
    if (!this.rfidTag.trim()) return;
    this.scanning = true;
    this.scanResult = '';
    this.api.post<any>('/attendance/rfid-scan', { rfidTag: this.rfidTag.trim() }).subscribe({
      next: (res) => {
        this.scanSuccess = true;
        this.scanResult = res.message || 'Attendance marked successfully!';
        this.scanLog.unshift({ rfidTag: this.rfidTag, success: true, time: new Date().toLocaleTimeString() });
        this.rfidTag = '';
        this.scanning = false;
      },
      error: (err: any) => {
        this.scanSuccess = false;
        this.scanResult = err?.error?.message || 'Failed to record attendance.';
        this.scanLog.unshift({ rfidTag: this.rfidTag, success: false, time: new Date().toLocaleTimeString() });
        this.rfidTag = '';
        this.scanning = false;
      }
    });
  }
}
