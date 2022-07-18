import { Component } from '@angular/core';
import { OrderDTO } from '../../models/order';
import { OrdersService } from '../../services/orders.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  orders: OrderDTO[] = [];

  constructor(private orderServices: OrdersService) {
    // this.orders$ = this.orderServices.getOrders();
    // this.orders$.pipe(tap((data) => console.log(data))).subscribe();
    this.orderServices.getOrders().subscribe((data) => {
      console.log(data);
      this.orders = data;
    });
  }

}
