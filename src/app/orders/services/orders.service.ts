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
  constructor(private http: HttpClient, private usrServ: UsersService) {}

  getOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(environment.URL_ORDERS).pipe(
      map((data) => data.filter((order) => order.status === 1)),
      tap(async (data) => {
        for (const order of data) {
          let user: UserDTO = {};
          user = {
            ...(await firstValueFrom(
              this.usrServ.getAUser(order.idUser || -1)
            )),
          };
          order.userName = user.name;
        }
      })
    );
  }

  saveOrder(newOrder: OrderDTO): Observable<any> {
    typeof newOrder.orderNumber === 'string' &&
      (newOrder.orderNumber = +newOrder.orderNumber);
    return this.http.post(environment.URL_ORDERS, newOrder);
  }

  update(idOrder: number, orderUpdated: OrderDTO): Observable<any> {
    typeof orderUpdated.orderNumber === 'string' &&
      (orderUpdated.orderNumber = +orderUpdated.orderNumber);
    // restOrder.orderNumber = restOrder.orderNumber ? +restOrder.orderNumber : -1;

    return this.http.put(environment.URL_ORDERS + idOrder, orderUpdated);
  }
}
