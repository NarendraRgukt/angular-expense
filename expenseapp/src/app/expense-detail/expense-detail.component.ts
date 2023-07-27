import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent {
subscription?:Subscription;
@Input() expenseData:any;
@Output() onSave: EventEmitter<any> = new EventEmitter<any>();
user:any;
accessToken:any;
constructor(private http:HttpClient){

}
ngOnInit(){
  const storedUser = localStorage.getItem('user');
  this.user= storedUser ? JSON.parse(storedUser) : {};
  this.accessToken = this.user && this.user.token ? this.user.token : '';
}

oncancel(){
  this.onSave.emit(false);
}
onSubmit(form: NgForm) {
  

  const name = form.value.name;
  const date_of_expense = form.value.date;
  const category = form.value.category;
  const description = form.value.description;
  const amount = form.value.amount;
  const postData = {
    name: name,
    date_of_expense: date_of_expense,
    category: category,
    description: description,
    amount: amount
  };

  const expense_id = this.expenseData.id;
  const url = `http://127.0.0.1:8000/api/expenses/update/expense/${expense_id}/`;
  const headers = new HttpHeaders({
    'Authorization': `Token ${this.accessToken}`,
  });
  const options = {
    headers: headers
  };

  
  this.http.patch(url, postData, options).subscribe((data) => {
    console.log('PATCH request successful:', data);
    this.onSave.emit(true);
    
  }, (error) => {
    console.error('PATCH request failed:', error);
    this.onSave.emit("error")
    
  });

  form.reset();
}

ngOnDestroy(){
  this.subscription?.unsubscribe()
}
}
