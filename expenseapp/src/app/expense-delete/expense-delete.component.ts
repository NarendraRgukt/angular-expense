import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-expense-delete',
  templateUrl: './expense-delete.component.html',
  styleUrls: ['./expense-delete.component.css']
})
export class ExpenseDeleteComponent {
  @Output() deleteInfo=new EventEmitter<boolean>();
  @Input() expenseID?:number;
  user:any;
  accessToken?:string;
  
  constructor(private http:HttpClient){

  }
  ngOnInit(){
    const storedUser = localStorage.getItem('user');
  this.user= storedUser ? JSON.parse(storedUser) : null;
  this.accessToken = this.user && this.user.token ? this.user.token : '';
  }

  onClose(){
    this.deleteInfo.emit(false)
  }
  onDelete() {
    
    
    const url = `http://127.0.0.1:8000/api/expenses/delete/expense/${this.expenseID}/`;
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.accessToken}`,
    });
    const options = {
      headers: headers
    };
  
    this.http.delete(url, options).subscribe(
      () => {
        console.log('Expense deleted successfully.');
        this.deleteInfo.emit(true);
        // Perform any additional tasks after successful deletion if needed.
      },
      (error) => {
        console.error('Error deleting expense:', error);
        // Handle errors if necessary.
      }
    );
  }
}
