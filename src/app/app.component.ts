import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBalanceScale, faChartPie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budget-banking-app';
  faBalanceScale = faBalanceScale;
  faChartPie = faChartPie;

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    this.router.navigate(['/home']);
  }
}
