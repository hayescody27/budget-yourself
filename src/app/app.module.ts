import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseRowComponent } from './expense-row/expense-row.component';
import { ExpenseRowContainerComponent } from './expense-row-container/expense-row-container.component';
import { AppService } from './services/app-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseRowComponent,
    ExpenseRowContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppService]
})
export class AppModule { }
