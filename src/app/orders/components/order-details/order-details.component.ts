import { OrderDTO } from './../../models/order';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  submitted: boolean = false;
  formOrder: FormGroup = new FormGroup({});
  userSelectedId: string = '';
  inputOrderData: OrderDTO = {};

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inputOrderData = { ...this.config.data };
    this.inputOrderData.dateTime &&
      (this.inputOrderData.dateTime = this.inputOrderData.dateTime?.substring(
        0,
        this.inputOrderData.dateTime?.indexOf('T')
      ));
    this.formOrder = this.fb.group({
      orderNumber: [this.inputOrderData.orderNumber ?? '', Validators.required],
      idUser: [this.inputOrderData.idUser ?? null],
      dateTime: [this.inputOrderData.dateTime ?? '', Validators.required],
      providerName: [this.inputOrderData.providerName ?? ''],
      observation: [this.inputOrderData.observation ?? ''],
    });
    // this.formOrder.value
  }

  saveProduct($event: any) {
    $event.preventDefault();
    if (this.formOrder.valid) {
      let savedOrder: OrderDTO = {
        ...this.formOrder.value,
        idOrder: this.inputOrderData.idOrder,
      };
      this.ref.close(savedOrder);
    }
  }

  hideDialog($event: any) {
    $event.preventDefault();
    this.ref.close(null);
  }
}
