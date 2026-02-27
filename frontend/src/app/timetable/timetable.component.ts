import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mb-4">Timetable</h2>
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <p class="text-muted">View and manage class timetable entries.</p>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="table-light">
              <tr><th>Time</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>
            </thead>
            <tbody>
              <tr><td colspan="7" class="text-center text-muted">No timetable loaded. Connect the backend to view data.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class TimetableComponent {}
