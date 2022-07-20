import { ProductDTO } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-products-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  submitted: boolean = false;
  formProduct: FormGroup = new FormGroup({});
  inputProductData: ProductDTO = {};

  constructor(
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.inputProductData = { ...this.config.data };

    this.formProduct = this.fb.group({
      descriptionProd: [
        this.inputProductData.descriptionProd ?? '',
        Validators.required,
      ],
      sku: [this.inputProductData.sku ?? '', Validators.required],
      mark: [this.inputProductData.mark ?? ''],
      unit: [this.inputProductData.unit ?? ''],
      valueUnit: [this.inputProductData.valueUnit ?? ''],
      quantity: [this.inputProductData.quantity ?? ''],
      qtyBox: [this.inputProductData.qtyBox ?? ''],
      weight: [this.inputProductData.weight ?? ''],
      volume: [this.inputProductData.volume ?? ''],
    });
  }

  hideDialog($event: any) {
    $event.preventDefault();
    this.ref.close(null);
  }

  saveProduct($event: any) {
    $event.preventDefault();
    if (this.formProduct.valid) {
      let savedProduct: ProductDTO = {
        ...this.formProduct.value,
        idOrderProduct: this.inputProductData.idOrder,
        idOrder: this.inputProductData.idOrder,
      };
      this.ref.close(savedProduct);
    }
  }
}
