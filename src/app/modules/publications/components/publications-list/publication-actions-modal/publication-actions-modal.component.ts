import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { actionConstants } from 'src/app/shared/constants/common-constants';
import { IPublication, IPublicationCreation, IuploadedImage } from '../../../interfaces/publicationModels';
import { PublicationsService } from '../../../services/publications.service';
import { IApiResponse } from '@shared/interfaces/IApiResponse';
import { SuccessAlertComponent, ErrorAlertComponent } from '@shared/components';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-publication-actions-modal',
  templateUrl: './publication-actions-modal.component.html',
  styleUrls: ['./publication-actions-modal.component.scss'],
  standalone: true,
  imports: [MatIconModule,MatLabel,MatFormField,MatDialogModule,ReactiveFormsModule,]
})
export class PublicationActionsModalComponent implements OnInit {
modalType:string;
data:IPublication;
  constructor(private formBuilder : FormBuilder,@Inject(MAT_DIALOG_DATA) data: any,private publicationsService:PublicationsService,private dialog:MatDialog,private publicationsActionModalRef:MatDialogRef<PublicationActionsModalComponent>) { 
    this.modalType=data.type;
    this.data=data.data;
  }

  form!: FormGroup;
  uploadedImage!: IuploadedImage;
  ngOnInit(): void {
    this.setupForm()
  }
  setupForm(){
    this.form = this.formBuilder.group({
      name : [this.data.publicationName,Validators.required]
    })
  }
  onImageUpload(event:IuploadedImage){
    this.uploadedImage = event;
  }
  onSubmit(formData: { name: any; }){
  if(this.modalType==actionConstants.create)
  {
    this.createPublication(formData);
  }
  else{
    this.editPublication(formData);
  }
    
  }
  createPublication(Publicationobj: { name: any; })
  {
    let apiResult:IApiResponse;
    const postObject = {
      PublicationName:Publicationobj.name,
      PublicationLogo:this.uploadedImage.base64
    }
    console.log('final',postObject)
    this.publicationsService.createPublication(postObject).subscribe((res)=>{
      console.log(res)
      apiResult = res
    },err=>{
      console.log(err)
    },
    ()=>{
      if(apiResult.statusCode === 1){
        const dialogRef = this.dialog.open(SuccessAlertComponent,{
          width:'350px',
          height:'120px',
          data:{
            text:apiResult.message
          }
        })
        dialogRef.afterClosed().subscribe(result=>{
          if(result){
            console.log(result);
            this.publicationsActionModalRef.close(result);
          }
        })
      }
      else{
        this.dialog.open(ErrorAlertComponent,{
          width:'350px',
          height:'120px',
          data:{
            text:apiResult.message
          }
        })
      }
    })
  }
  editPublication(Publicationobj: { name: any; })
  {
    const postObject= {
      PublicationId: this.data.publicationId,
      PublicationName: Publicationobj.name,
      PublicationLogo:(this.uploadedImage?this.uploadedImage.base64:this.data.publicationLogo.toString().split(',')[1])
    }
    this.publicationsService.editPublication(postObject).subscribe((res:IApiResponse)=>{
      if(res.result)
      {
      this.publicationsActionModalRef.close(res);
      }
      else
      {
        const dialogRef=this.dialog.open(ErrorAlertComponent,{
          width:'350px',
          height:'125px',
          data:{
            text: res.message
          }
        })
      }
    })
  }
  getImage(){
    //console.log(this.uploadedImage?this.uploadedImage.base64:this.data.publicationLogo.toString().split(',')[1])
    return this.uploadedImage?this.uploadedImage?.base64:this.data?.publicationLogo?.toString().split(',')[1];
  }
  getImageType(){
    //console.log(this.uploadedImage?this.uploadedImage?.type:this.data?.publicationLogo?.toString().split(',')[0])
    return this.uploadedImage?this.uploadedImage?.type:this.data?.publicationLogo?.toString().split(',')[0];
  }
}
