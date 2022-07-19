import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  submitted: boolean = false;
  // cities = [
  //   { name: 'New York', code: 'NY' },
  //   { name: 'Rome', code: 'RM' },
  //   { name: 'London', code: 'LDN' },
  //   { name: 'Istanbul', code: 'IST' },
  //   { name: 'Paris', code: 'PRS' },
  // ];
  userSelectedId: string = 'algo';
  constructor(public ref: DynamicDialogRef) {}

  ngOnInit(): void {}

  hideDialog() {
    this.ref.close({});
  }
  saveProduct() {}
}
