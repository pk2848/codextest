import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mb-4">System Administration</h2>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="display-4 mb-2">&#x1F465;</div>
            <h5>User Management</h5>
            <p class="text-muted">Create and manage user accounts with role assignments.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="display-4 mb-2">&#x1F3EB;</div>
            <h5>Classes &amp; Sections</h5>
            <p class="text-muted">Manage classrooms, sections, and enrollments.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="display-4 mb-2">&#x1F4E2;</div>
            <h5>Notices</h5>
            <p class="text-muted">Create and publish school-wide notices.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent {}
