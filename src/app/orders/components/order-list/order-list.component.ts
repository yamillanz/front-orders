import { OrderDetailsComponent } from './../order-details/order-details.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { OrderDTO } from '../../models/order';
import { OrdersService } from '../../services/orders.service';
import { firstValueFrom } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class OrderListComponent implements OnInit {
  orders: OrderDTO[] = [];

  constructor(
    private orderServices: OrdersService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.gettingDataOrders();
  }

  gettingDataOrders() {
    this.orderServices.getOrders().subscribe((data) => {
      console.log(data);
      this.orders = data;
    });
  }

  newOrderShow() {
    const ref = this.dialogService.open(OrderDetailsComponent, {
      header: 'Order Details',
      width: '50%',
      // contentStyle: {"max-height": "1000px", "overflow": "auto"},
      // baseZIndex: 10000
    });
    ref.onClose.subscribe(async (Order: OrderDTO) => {
      if (Order) {
        console.log('Order', Order);
        delete Order.idOrder;
        Order.totalValue = 333.333;
        Order.status = 1;
        await firstValueFrom(this.orderServices.saveOrder(Order));
        this.gettingDataOrders();
      }
    });
  }

  updateOrder(order: OrderDTO) {
    const ref = this.dialogService.open(OrderDetailsComponent, {
      data: order,
      header: 'Order Details',
      width: '50%',
    });
    ref.onClose.subscribe(async (Order: OrderDTO) => {
      if (Order) {
        // console.log('Order', Order);
        const { idOrder, ...restOrder } = Order;
        await firstValueFrom(
          this.orderServices.update(idOrder ?? -1, restOrder)
        );
        this.gettingDataOrders();
      }
    });
  }

  async deleteOrder(order: OrderDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const { idOrder, userName, dateCreated, ...restOrder } = order;
        restOrder.dateTime = restOrder.dateTime?.substring(
          0,
          restOrder.dateTime?.indexOf('T')
        );
        restOrder.status = 0;
        await firstValueFrom(
          this.orderServices.update(idOrder ?? -1, restOrder)
        );
        this.gettingDataOrders();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }
}
