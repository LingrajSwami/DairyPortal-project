import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, RouterLink],
  providers: [FormBuilder]
})
export class DetailsComponent implements OnInit {
  Details: any = FormGroup;
  mobileNo: any;
  Data: any;
  constructor(private logobj: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.mobileNo = params['mobileNo'];
    })

    this.http.post('http://localhost:3000/details', { mobileNo: this.mobileNo }).subscribe((response: any) => {
      console.log('Success:', response);
      this.Data = response;
    })
    this.Details = this.logobj.group({
      mobileNo: [''],
      Name: [''],

      Qty: [''],
      Fat: [''],
      SNF: [''],
      Rate: [''],
      Amount: ['']
    })

    this.Details.get('Qty').valueChanges.subscribe(() => this.calculateAmount());
    this.Details.get('Rate').valueChanges.subscribe(() => this.calculateAmount());
  }

  calculateAmount() {
    const qty = this.Details.get('Qty').value;
    const rate = this.Details.get('Rate').value;

    // Check if both Qty and Rate have valid values
    if (qty !== null && rate !== null) {
      const amount = qty * rate;
      // Update the Amount control value
      this.Details.get('Amount').setValue(amount);
    }
  }


  submitForm() {
    console.log(this.Details.value);
    const milkDetails = this.Details.value;
    this.http.post('http://localhost:3000/createMilkdetails', milkDetails).subscribe({
      next: (res) => {
        console.log('success:', res);
        alert('Data submitted successfully');
      }
    })
    console.log("data submitted")
    alert('Thank You ! Data submitted successfully');
    this.Details.Qty = 0;
    this.Details.Fat = 0;
    this.Details.SNF = 0;
    this.Details.Rate = 0;
    this.router.navigate(['/Json-table'], { queryParams: { mobileNo: this.Data.mobileNo } });

  }

  fetchHistory() {
    console.log("in fetchHistory ")
    this.router.navigate(['/Json-table'], { queryParams: { mobileNo: this.Data.mobileNo } });

  }
}
