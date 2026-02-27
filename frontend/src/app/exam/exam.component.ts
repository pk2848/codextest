import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mb-4">Exam Management</h2>
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <p class="text-muted">Schedule exams, enter marks, and view results.</p>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr><th>Exam</th><th>Section</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td colspan="4" class="text-center text-muted">No exams loaded. Connect the backend to view data.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class ExamComponent {}
