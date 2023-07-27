import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.css']
})
export class ExpenseCreateComponent {
  user:any;
  subscription?:Subscription;
  accessToken?:string;
  newExpense = {}; // An empty object to store the data for the new expense
  @Output() onAddExpense: EventEmitter<any> = new EventEmitter<any>();
  constructor(private http:HttpClient,private router:Router){

  }
  ngOnInit(){
    const storedUser = localStorage.getItem('user');
    this.user= storedUser ? JSON.parse(storedUser) : {};
     this.accessToken = this.user && this.user.token ? this.user.token : '';
  }

  onSubmit(form:NgForm){
 
  

    if (form.valid) {
      
      const name = form.value.name;
      const date_of_expense = form.value.date;
      const category = form.value.category;
      const description = form.value.description;
      const amount = form.value.amount;
      const postData={
        name:name,
        date_of_expense:date_of_expense,
        category:category,
        description:description,
        amount:amount
      }
      const headers=new HttpHeaders({
        'Authorization': `Token ${this.accessToken}`,
      })
      const options={
        'headers':headers
      }

      this.subscription=this.http.post('http://127.0.0.1:8000/api/expenses/create/expense/',postData,options).subscribe(((data)=>{
        this.onAddExpense.emit(true);
      }))
      form.reset()
      
      
  }
 

}
oncancel(){
  this.onAddExpense.emit(false)
}


}
