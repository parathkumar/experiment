import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-alert',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.scss']
})
export class ConfirmationAlertComponent implements OnInit {

  isDelete?;
  identifier?: any;
  alertText?;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,public dialogRef: MatDialogRef<ConfirmationAlertComponent>,) {
    this.isDelete = data.isDelete
    if(data.text){
      this.alertText = data.text
    }
    else{
      this.alertText = "Are you sure?"
    }
   }

  ngOnInit(): void {

  }
  closeDialog(selection:boolean){
    this.dialogRef.close(selection);
  }

}
