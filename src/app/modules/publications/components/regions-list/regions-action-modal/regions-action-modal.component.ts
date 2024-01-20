import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-regions-action-modal',
  templateUrl: './regions-action-modal.component.html',
  styleUrls: ['./regions-action-modal.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormField, MatLabel, ReactiveFormsModule],
})
export class RegionsActionModalComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.modalType = data.type;
    this.modalData = data.data;
  }
  form!: FormGroup;
  modalType: string;
  modalData: any;
  ngOnInit(): void {
    this.setupForm();
  }
  setupForm() {
    this.form = this.formBuilder.group({
      RegionName: [this.modalData?.regionName, [Validators.required]],
    });
  }
}
