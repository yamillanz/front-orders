import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor() {}
  submitted: boolean = false;
  ngOnInit(): void {}

  hideDialog($event: any) {
    $event.preventDefault();
    // this.ref.close(null);
  }
  saveProduct($event: any) {}
}
