import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mb-4">Teacher Management</h2>
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <p class="text-muted">Manage teacher profiles, subject assignments, and class assignments.</p>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr><th>Name</th><th>Subject</th><th>Class Teacher</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr><td colspan="4" class="text-center text-muted">No teachers loaded. Connect the backend to view data.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class TeacherComponent {}
