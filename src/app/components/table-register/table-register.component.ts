import { Component, OnInit, Input } from '@angular/core';
import { TableUser } from './table';
import { TableService } from '../../services/table.service';
@Component({
  selector: 'app-table-register',
  templateUrl: './table-register.component.html',
  styleUrls: ['./table-register.component.scss']
})
export class TableRegisterComponent implements OnInit {

  @Input() users: TableUser[] = [];

  settings = {
    actions: { delete: false, add: false, edit: true, position: 'right', columnTitle: 'Acción'},
    edit: {
      editButtonContent: '<span class="material-icons">mode_edit</span>',
      saveButtonContent: '<span class="material-icons">save</span>',
      cancelButtonContent: '<span class="material-icons">cancel</span>'
    },
    columns: {
      id: {
        title: 'Id',
        width: '10%'
        // width: '10%'
      },
      name: {
        title: 'Nombre',
        width: '20%'
      },
      username: {
        title: 'Usuario',
        width: '10%'
      },
      email: {
        title: 'Email',
        width: '20%'
      },
      startDate: {
        title: 'Fecha Ingreso',
        width: '20%'
      }
    }
  }

  constructor(
    private tservice: TableService
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('firtsTime'));
    if(localStorage.getItem('firtsTime') === null){
      this.tservice.getData().subscribe((res: any) => {
        this.users = res.data;
      });
    } else {
      this.users = JSON.parse(localStorage.getItem('users'));
    }
  }

}
