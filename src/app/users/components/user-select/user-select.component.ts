import { UserDTO } from './../../models/user';
import { UsersService } from './../../services/users.service';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  AfterContentChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
})
export class UserSelectComponent implements AfterContentChecked {
  @Input() userSelectedId: string = '';
  @Output() userSelectedIdChange: EventEmitter<string> = new EventEmitter();
  @Input() parentForm: FormGroup = new FormGroup({});

  users: UserDTO[] = [];
  constructor(private usrSrv: UsersService, private ref: ChangeDetectorRef) {
    this.usrSrv.getAllUser().subscribe((data) => (this.users = [...data]));
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  userSelected(idUser: string) {
    this.userSelectedIdChange.emit(idUser);
  }
}
