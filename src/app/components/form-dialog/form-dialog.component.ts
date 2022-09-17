import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import * as moment from 'moment';
import { TableUser } from '../table-register/table';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  userForm: FormGroup;
  currentDate: Date = new Date();
  @Output() datos = new EventEmitter<TableUser[]>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      startDate: [this.currentDate]
    })
  }

  onSave(){
    const users: TableUser[] = JSON.parse(localStorage.getItem('users'));
    users.push({ id: users[users.length - 1].id + 1, name: this.userForm.value.name, username: this.userForm.value.username, email: this.userForm.value.email, startDate: moment(this.userForm.value.startDate).format('YYYY-MM-DD')});
    localStorage.setItem('users', JSON.stringify(users));
    this.datos.emit(users);
    location.reload();
  }

}
