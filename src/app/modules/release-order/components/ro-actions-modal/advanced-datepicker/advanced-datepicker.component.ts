import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdvancedDatepickerService } from '../../../services/advanced-datepicker.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ManualMultiDatepickerComponent } from './manual-multi-datepicker/manual-multi-datepicker.component';
import { ConditionalMultiDatepickerComponent } from './conditional-multi-datepicker/conditional-multi-datepicker.component';

@Component({
  selector: 'app-advanced-datepicker',
  templateUrl: './advanced-datepicker.component.html',
  styleUrls: ['./advanced-datepicker.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatTabsModule, ManualMultiDatepickerComponent, ConditionalMultiDatepickerComponent]
})
export class AdvancedDatepickerComponent implements OnInit {

  dateRangeSelected!: string[];
  constructor(public dialogRef: MatDialogRef<AdvancedDatepickerComponent>,private selectedDatesService:AdvancedDatepickerService) {}

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close('close');
  }
}
