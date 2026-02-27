import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mb-4">Student Management</h2>
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <p class="text-muted">Manage student profiles, enrollments, and academic records.</p>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr><th>Admission No</th><th>Name</th><th>Section</th><th>RFID Tag</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr><td colspan="5" class="text-center text-muted">No students loaded. Connect the backend to view data.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class StudentComponent {}
