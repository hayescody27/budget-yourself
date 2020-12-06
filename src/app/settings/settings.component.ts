import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemeSwitcherService } from '../services/themes/theme-switcher.service';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  faMoon = faMoon;

  @ViewChild('darkMode')
  darkModeToggle: MatSlideToggle;

  constructor(private ts: ThemeSwitcherService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.ts.darkMode.getValue()) {
      this.darkModeToggle.checked = true;
    }
  }

  onDarkModeToggle({ checked }: MatSlideToggleChange) {
    this.ts.toggleDarkMode(checked);
  }

}
