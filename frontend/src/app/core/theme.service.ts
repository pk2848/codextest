import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  toggleDarkMode(enabled: boolean) {
    document.body.classList.toggle('dark-mode', enabled);
    localStorage.setItem('darkMode', String(enabled));
  }

  applySavedTheme() {
    this.toggleDarkMode(localStorage.getItem('darkMode') === 'true');
  }
}
