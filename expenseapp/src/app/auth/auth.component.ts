import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  private subscription?:Subscription;
  errormsg:any=null;
  constructor(private http: HttpClient,private router:Router) { }

  onSubmit(authForm: NgForm) {
    if (authForm.valid) {
      const email = authForm.value.email;
      const password = authForm.value.password;
      console.log(email)
      console.log(password)

    
   

      const postData = {
        email: email,
        password: password
      };

      // Sending the POST request to the API
      this.subscription=this.http.post('http://127.0.0.1:8000/api/account/login/token/', postData).subscribe(
        (response: any) => {
          
          localStorage.setItem('user', JSON.stringify(response))
          this.router.navigate(['/expenses'])


          
        },
        (error: any) => {

          this.errormsg=error.error.error
          
          
          
        }
      );
    }
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe()
  }
}


