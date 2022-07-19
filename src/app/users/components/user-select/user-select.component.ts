import { UserDTO } from './../../models/user';
import { UsersService } from './../../services/users.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
})
export class UserSelectComponent {
  @Input() userSelectedId: string = '';
  @Output() userSelectedIdChange: EventEmitter<string> = new EventEmitter();

  users: UserDTO[] = [];
  constructor(private usrSrv: UsersService) {
    this.usrSrv.getAllUser().subscribe((data) => (this.users = [...data]));
  }

  userSelected(idUser: string) {
    this.userSelectedIdChange.emit(idUser);
  }
}
