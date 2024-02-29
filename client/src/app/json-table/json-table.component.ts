import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-json-table',
  standalone: true,
  templateUrl: './json-table.component.html',
  styleUrl: './json-table.component.css',
  imports: [CommonModule, RouterLink]
})
export class JsonTableComponent implements OnInit {
  mobileNo: any;
  dataList: any;
  constructor(private logobj: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private route1: Router) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mobileNo = params['mobileNo'];

      const requestData = { mobileNo: this.mobileNo };
      this.http.post('http://localhost:3000/fetchMilkdetails', requestData).subscribe({
        next: (res) => {
          console.log('A success:', res);
          this.dataList = res;
        }
      })
    })


  }
  BackFunc() {
    console.log("in BackFunc");
    this.route1.navigate(['/Details'], { queryParams: { mobileNo: this.mobileNo } });

  }
}
