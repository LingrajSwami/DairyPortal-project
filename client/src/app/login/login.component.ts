import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, RouterLink],
  providers: [FormBuilder]

})
export class LoginComponent implements OnInit {
  MyDairyLogin: any = FormGroup;
  users: any;
  constructor(public logobj: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.MyDairyLogin = this.logobj.group({
      mobileNo: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submitForm(): void {
    console.log('Form Data :', this.MyDairyLogin.value);

    const loginData = this.MyDairyLogin.value;

    this.http.post('http://localhost:3000/login', loginData).subscribe((response: any) => {
      console.log('Success:', response.message);

      if (response.message == 'No Account on this number') {
        alert("Your Mobile Number is not registered");
        console.log("Your Mobile Number is not registered");
      }
      else {
        if (response.message == 'Invalid Mobile no or password') {
          alert("Invalid Mobile no or password");
        }
        else if (response.message === 'Credential Matched') {
          alert("Login sucessfull");
          console.log("Login sucessful");
          this.MyDairyLogin.reset();
          this.router.navigate(['/Details'], { queryParams: { mobileNo: loginData.mobileNo } });
        }
      }

    })
  }
}





