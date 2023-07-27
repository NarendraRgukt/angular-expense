import { Component,ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';





@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {


  subscription?:Subscription;
  subscription1?:Subscription;
  expenseData:any;
  user:any;
  accessToken:any;
  searchText: string = '';
  selectedDate: string = '';
  msg:any | null=null;
  filteredExpenseData?:[]| any;
  isAddExpenseModalOpen = false;
  isEditExpenseModalOpen = false;
  isDeleteExpenseModel=false;
  selectedExpenseData: any;
  expenseId?:number;


  constructor(private http:HttpClient,private modalService:NgbModal,private router:Router){

  }
  // Filter methods

  applyDateFilter() {
    console.log("date filter called")
    this.filteredExpenseData = this.expenseData.filter(
      (expense: any) => expense.date_of_expense === this.selectedDate
    );
  }


  LogOut(){
    localStorage.removeItem('user')
    this.router.navigate(["/auth"])
  }
  
  applySearchFilter() {
    console.log("search filter called")
    this.filteredExpenseData = this.expenseData.filter(
      (expense: any) =>{
      const nameMatch = expense.name.toLowerCase().includes(this.searchText.toLowerCase());
      const categoryMatch = expense.category.toLowerCase().includes(this.searchText.toLowerCase());
  
  
      return nameMatch || categoryMatch;
  
      }
      );
  }


  reloadPage(){
    window.location.reload()
    
  }


  ngOnInit(){
    const storedUser = localStorage.getItem('user');
  this.user= storedUser ? JSON.parse(storedUser) : null;
  this.accessToken = this.user && this.user.token ? this.user.token : '';
  const headers = new HttpHeaders({
    
    'Authorization': `Token ${this.accessToken}`,
  });
  
  const options = { headers: headers };

this.subscription=this.http.get('http://127.0.0.1:8000/api/expenses/get/expenses/',options).subscribe(data=>{
 this.expenseData=data
 this.filteredExpenseData = data;
 console.log(this.expenseData)
})
  }


  

  

  openAddExpenseModal() {
    this.isAddExpenseModalOpen = true;
  }

  onAddNewData(expense:any){
    this.filteredExpenseData=expense

  }

  onAddExpense(newExpense: any) {
    this.msg="expense added succesfully"
    this.isAddExpenseModalOpen = false;
    if(newExpense){
    setTimeout(() => {
      alert(this.msg)
      this.reloadPage(); 
    }, 1000);
  }
};
    
  

  openEditExpenseModal(expenseData: any) {
    this.selectedExpenseData = { ...expenseData };
    this.isEditExpenseModalOpen = true;
  }

  onSaveExpense(updatedExpense: any) {
    
    this.isEditExpenseModalOpen = false;
    if(updatedExpense){
      setTimeout(() => {
        alert("expense updated successfully")
        this.reloadPage(); 
      }, 2000);
    }
    if(updatedExpense==="error"){
      setTimeout(() => {
        alert("something went wrong")
    }
      )
  }
}
deleteExpense(id:number){
  this.isDeleteExpenseModel=true;
  this.expenseId=id;
  
}
  onDelete(success:boolean){
   this.isDeleteExpenseModel=false
   if(success){
    this.reloadPage()
   }
   
  }
  
 
  onOnDestroy(){
    this.subscription1?.unsubscribe()
    this.subscription?.unsubscribe()
  }
}



 


