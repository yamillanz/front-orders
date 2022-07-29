import { OrderDetailsComponent } from './../order-details/order-details.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { OrderDTO } from '../../models/order';
import { OrdersService } from '../../services/orders.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class OrderListComponent implements OnInit {
  // orders: OrderDTO[] = [];
  // orders$: Observable<OrderDTO[]> = this.orderServices.orders$;
  orders$: Observable<OrderDTO[]> = new Observable<OrderDTO[]>();

  constructor(
    private orderServices: OrdersService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.gettingDataOrders();
  }

  /**
   * create a dialog object of "OrderDetailsComponent" type with certain characteristics
   * @param dataInput data to pass to the dialog
   * @returns
   */
  private createOrderDetailsDialog(dataInput: any = null) {
    return this.dialogService.open(OrderDetailsComponent, {
      header: 'Order Details',
      width: '60%',
      data: dataInput,
    });
  }
  /**
   * get all orders calling the rest api and put it into "orders" variable
   */
  private gettingDataOrders() {
    this.orders$ = this.orderServices.getOrders();
  }
  /**
   * create and show the dialog with order's form, next, after close the dialog
   * get the data and send it to the rest api""
   */
  newOrderShow() {
    const dialog = this.createOrderDetailsDialog();
    dialog.onClose.subscribe(async (Order: OrderDTO) => {
      if (Order) {
        delete Order.idOrder;
        Order.status = 1;
        await firstValueFrom(this.orderServices.saveOrder(Order));
        this.gettingDataOrders();
      }
    });
  }
  /**
   * create and show the dialog with order's form, next, after close the dialog
   * get the data and send it to the rest api ""
   * @param order a order to update
   */
  updateOrder(order: OrderDTO) {
    const dialog = this.createOrderDetailsDialog(order);
    dialog.onClose.subscribe(async (Order: OrderDTO) => {
      if (Order) {
        const { idOrder, ...restOrder } = Order;
        await firstValueFrom(
          this.orderServices.update(idOrder ?? -1, restOrder)
        );
        this.gettingDataOrders();
      }
    });
  }
  /**
   * function to do a logical delete to the order, first ask for confirm, then send
   * the data to the rest api and finally send a confirmation messages
   * @param order the order to delete
   */
  async deleteOrder(order: OrderDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected order?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const { idOrder, userName, dateCreated, ...restOrder } = order;
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
