import { Observable } from 'rxjs';
import { UserDTO } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(environment.URL_USERS + id);
  }
}
