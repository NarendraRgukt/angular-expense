import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule,Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ExpensesComponent } from './expenses/expenses.component';

import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
    {path:'auth',component:AuthComponent},
  {path:'expenses',component:ExpensesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ExpensesComponent,
    ExpenseDetailComponent,
    ExpenseCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
