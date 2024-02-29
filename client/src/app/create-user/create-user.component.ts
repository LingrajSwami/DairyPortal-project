import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, RouterLink],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [FormBuilder, Validators]
})
export class CreateUserComponent implements OnInit {
  MyDairyCreateUser: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.MyDairyCreateUser = this.fb.group({
      mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
    });
  }



  submitForm(): void {
    console.log('Form Data:', this.MyDairyCreateUser.value);

    const formData = this.MyDairyCreateUser.value;

    this.http.post('http://localhost:3000/createUserDetails', formData).subscribe({
      next: (res) => {
        console.log('Success:', res);

        if (res == 'Already registered') {
          alert('This number is already registered');
          this.router.navigate(['/Login']);
        } else {
          alert('Signup Successfully');
          this.MyDairyCreateUser.reset();
          this.router.navigate(['/Login']);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

}
