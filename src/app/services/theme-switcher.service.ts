import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {

  darkMode = new BehaviorSubject<boolean>(localStorage.getItem('theme') === 'theme-light' ? false : true);

  constructor() { }


  toggleDarkMode(isDark: boolean) {
    this.darkMode.next(isDark);
  }
}
