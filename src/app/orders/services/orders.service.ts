import { UserDTO } from './../../users/models/user';
import { OrderDTO } from './../models/order';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, tap, map } from 'rxjs';
import { UsersService } from './../../users/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders$: Observable<OrderDTO[]> = new Observable<OrderDTO[]>();

  constructor(private http: HttpClient, private usrService: UsersService) {
    this.orders$ = this.getOrders();
  }
  /**
   * get all data from the orders rest api. First filter only the active order (status == 1) and next
   * get de data information from the user's order (name, email, etc...)
   * return a array of Observables of DTO class
   */
  getOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(environment.URL_ORDERS).pipe(
      map((data) => data.filter((order) => order.status === 1)),
      tap(async (data) => {
        const users: UserDTO[] = await firstValueFrom(
          this.usrService.getAllUser()
        );
        for (const order of data) {
          const user: UserDTO | undefined = users.find(
            (userdata) => userdata.idUser === order.idUser
          );
          order.userName = user?.name;
        }
      })
    );
  }
  /**
   * save the data order calls the rest api post method
   */
  saveOrder(newOrder: OrderDTO): Observable<any> {
    typeof newOrder.orderNumber === 'string' &&
      (newOrder.orderNumber = +newOrder.orderNumber);
    return this.http.post(environment.URL_ORDERS, newOrder);
  }
  /**
   * update the data order calls the rest api put method
   */
  update(idOrder: number, orderUpdated: OrderDTO): Observable<any> {
    typeof orderUpdated.orderNumber === 'string' &&
      (orderUpdated.orderNumber = +orderUpdated.orderNumber);
    orderUpdated.dateTime = orderUpdated.dateTime?.substring(0, 10);

    return this.http.put(environment.URL_ORDERS + idOrder, orderUpdated);
  }
}
