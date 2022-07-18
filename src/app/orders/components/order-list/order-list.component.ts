import { OrderDetailsComponent } from './../order-details/order-details.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component } from '@angular/core';
import { OrderDTO } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [DialogService],
})
export class OrderListComponent {
  orders: OrderDTO[] = [];
  // orderDetailsDialog: boolean = false;
  // ref: DynamicDialogRef;

  constructor(
    private orderServices: OrdersService,
    public dialogService: DialogService
  ) {
    this.orderServices.getOrders().subscribe((data) => {
      console.log(data);
      this.orders = data;
    });
  }

  newOrderShow() {
    // this.orderDetailsDialog = true;
    const ref = this.dialogService.open(OrderDetailsComponent, {
      header: 'Order Details',
      width: '50%',
      // contentStyle: {"max-height": "1000px", "overflow": "auto"},
      // baseZIndex: 10000
    });
  }
}
