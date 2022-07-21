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
  readonlySKU: boolean = false;
  constructor(
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.inputProductData = { ...this.config.data };
    this.readonlySKU = this.inputProductData.sku ? true : false;
    this.formProduct = this.fb.group({
      descriptionProd: [
        this.inputProductData.descriptionProd ?? '',
        Validators.required,
      ],
      sku: [
        { value: this.inputProductData.sku ?? '', disabled: this.readonlySKU },
        Validators.required,
      ],
      unit: [this.inputProductData.unit ?? '', Validators.required],
      valueUnit: [this.inputProductData.valueUnit ?? '', Validators.required],
      mark: [this.inputProductData.mark ?? ''],
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
