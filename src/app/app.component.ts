import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  constructor(
    public dialog: MatDialog,
    private tservice: TableService
  ) {
    this.tservice.getData().subscribe((res: any) => {
      if(localStorage.getItem('firtsTime') === 'true'){
        // localStorage.setItem('firtsTime', 'false')
      } else{
        localStorage.setItem('users', JSON.stringify(res.data))
        localStorage.setItem('firtsTime', 'true')
      }
    });
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FormDialogComponent, {
      width: '600px',
      // enterAnimationDuration,
      // exitAnimationDuration,
    });
  }
  
}
