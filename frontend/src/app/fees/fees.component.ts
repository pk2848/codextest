import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mb-4">Fee Management</h2>
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <p class="text-muted">Manage fee structures, invoices, and payment records.</p>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr><th>Invoice #</th><th>Student</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr><td colspan="5" class="text-center text-muted">No fee records loaded. Connect the backend to view data.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class FeesComponent {}
