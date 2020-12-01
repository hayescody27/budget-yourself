import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetWizardComponent } from './budget-wizard/budget-wizard/budget-wizard.component';
import { ExpenseHistoryComponent } from './expense-history/expense-history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'budget-wizard', component: BudgetWizardComponent},
  { path: 'expense-history', component: ExpenseHistoryComponent},
  { path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
