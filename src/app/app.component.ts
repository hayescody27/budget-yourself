import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { faBalanceScale, faChartPie, faCogs } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from './services/auth/login-service.service';
import { ThemeSwitcherService } from './services/theme-switcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'budget-yourself';

  // font awesome icons
  faBalanceScale = faBalanceScale;
  faChartPie = faChartPie;
  faCogs = faCogs;

  // styling
  posClass;

  loggedIn:boolean = false;

@HostListener('window:resize', ['$event'])
  getScreenHeight(event?) {
    if (window.innerHeight <= 412) {
      this.posClass = 'posRel';
    } else {
      this.posClass = 'posAbs';
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private router: Router, private ts: ThemeSwitcherService, public auth: LoginService) {
    this.getScreenHeight();
    this.ts.darkMode.subscribe(x => {
      this.switchMode(x);
    })
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setHostClass(savedTheme);
    }

    auth.user$.subscribe(x => {
      if (!x) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    })
  }

  ngOnInit(): void {
 
  }

  switchMode(isDark: boolean) {
    const hostClass = isDark ? 'theme-dark' : 'theme-light';
    this.setHostClass(hostClass);
    localStorage.setItem('theme', hostClass);
  }

  setHostClass(hostClass: string) {
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
  }

}
