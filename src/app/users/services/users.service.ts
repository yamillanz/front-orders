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
  /**
   * function to get a user from the rest api
   * @param id
   * @returns a user DTO into a Observable object
   */
  getAUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(environment.URL_USERS + id);
  }
  /**
   * function to get all user from the rest api
   * @returns a array of users DTO into a Observable Object
   */
  getAllUser(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(environment.URL_USERS);
  }
}
