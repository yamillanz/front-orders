import { ProductDTO } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-products-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  submitted: boolean = false;
  formProduct: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      descriptionProd: ['', Validators.required],
      sku: ['', Validators.required],
      mark: [''],
      unit: [''],
      valueUnit: [''],
      quantity: [''],
      qtyBox: [''],
      weight: [''],
      volume: [''],
    });
  }

  hideDialog($event: any) {
    $event.preventDefault();
    this.ref.close(null);
  }

  saveProduct($event: any) {
    $event.preventDefault();
    if (this.formProduct.valid) {
      this.ref.close(<ProductDTO>this.formProduct.value);
      // let savedProduct: ProductDTO = {
      //   ...this.formProduct.value,
      //   // idOrder: this.inputOrderData.idOrder,
      // };
    }
  }
}
