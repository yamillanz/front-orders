import { UserDTO } from './../../users/models/user';
import { OrderDTO } from './../models/order';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { UsersService } from './../../users/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient, private usrServ: UsersService) {}

  getOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(environment.URL_ORDERS).pipe(
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
}
