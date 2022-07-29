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
  /**
   * angular life cycle to implements the construction of the form for data of order
   * and put into "inputOrderData" variable the information in case it was a modifying
   */
  ngOnInit(): void {
    this.inputOrderData = { ...this.config.data };
    this.inputOrderData.dateTime &&
      (this.inputOrderData.dateTime = this.inputOrderData.dateTime?.substring(
        0,
        this.inputOrderData.dateTime?.indexOf('T')
      ));
    this.formOrder = this.fb.group({
      orderNumber: [this.inputOrderData.orderNumber ?? '', Validators.required],
      dateTime: [this.inputOrderData.dateTime ?? '', Validators.required],
      idUser: [this.inputOrderData.idUser ?? null, Validators.required],
      totalValue: [this.inputOrderData.totalValue ?? ''],
      providerName: [this.inputOrderData.providerName ?? ''],
      observation: [this.inputOrderData.observation ?? ''],
    });
  }
  /**
   * get de form order information and put into "savedOrder" variable for send it to
   * the component "OrderListComponent", as long the form as valid
   * @param $event the input form
   */
  saveProduct($event: any) {
    $event.preventDefault();
    this.formOrder.markAllAsTouched();
    if (this.formOrder.valid) {
      let savedOrder: OrderDTO = {
        ...this.formOrder.value,
        idOrder: this.inputOrderData.idOrder,
      };
      this.ref.close(savedOrder);
    }
  }
  /**
   * close the dialog component
   * @param $event the input form
   */
  hideDialog($event: any) {
    $event.preventDefault();
    this.ref.close(null);
  }
}
