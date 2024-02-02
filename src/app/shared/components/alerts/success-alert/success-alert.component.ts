import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.scss'],
  standalone: true,
  imports: [MatDialogModule],
})
export class SuccessAlertComponent implements OnInit {
  successText: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,public dialogRef: MatDialogRef<SuccessAlertComponent>) {
    dialogRef.disableClose = true;
    if(data.text){
      this.successText = data.text
    }
    else{
      this.successText = "Completed Successfully"
    }
   }

  ngOnInit(): void {
  }
  closeDialog(selection:boolean){
    this.dialogRef.close(selection);
  }

}
