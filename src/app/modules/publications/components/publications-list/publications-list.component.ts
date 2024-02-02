import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PublicationsService } from '../../services/publications.service';
import { MatDialog } from '@angular/material/dialog';
import { PublicationActionsModalComponent } from './publication-actions-modal/publication-actions-modal.component';
import { actionConstants } from 'src/app/shared/constants/common-constants';
import { SuccessAlertComponent, ConfirmationAlertComponent, ErrorAlertComponent } from '@shared/components';
import { IApiResponse } from '@shared/interfaces/IApiResponse';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatIconModule]
})
export class PublicationsListComponent implements OnInit {

  constructor(private publicationsService:PublicationsService,private dialog : MatDialog) { }
  matcards = [1,2,3];
  publications:any[] = [];
  ngOnInit(): void {
    this.ResolveData();
  }
  ResolveData(){
    let calls=[
      this.publicationsService.getPublicationsList()
    ];
    forkJoin(calls).subscribe((resp:IApiResponse[])=>{
      this.publications = resp[0].result.map((rec: { publicationLogo: string; })=>{
        rec.publicationLogo = 'data:image/jpg;base64,'+rec.publicationLogo;
        return rec;
      });
    },err=>{
      console.log(err);
    })
  }
  onEdit(publication: any)
  {
    let dialogRef=this.dialog.open(PublicationActionsModalComponent,{
      width:'750px',
      height:'490px',
      data:{type:actionConstants.edit,data:publication }

    })
    dialogRef.afterClosed().subscribe((res)=>{
      if(res?.result)
      {
        let successdialogref=this.dialog.open(SuccessAlertComponent,{
          width:'350px',
          height:'125px',
          data:{
            text:res.message
          }
        })
        this.ResolveData();
      }
    })
  }
 onDelete(publication: { publicationName: string; publicationId: number; })
 {
    let dialogref=this.dialog.open(ConfirmationAlertComponent,{
      width:'350px',
    height:'120px',
    data:{
      text:"Are you sure want to Delete publication: "+publication.publicationName +"?"
    }
  });
dialogref.afterClosed().subscribe(result=>{
  if(result)
  {
  this.publicationsService.deletePublication(publication.publicationId).subscribe((res:IApiResponse)=>
  {
    if(res.result)
    {
      let diaogref=this.dialog.open(SuccessAlertComponent,{
        width:'350px',
        height:'125px',
        data:{
          text: res.message
        }
      }).afterClosed().subscribe(res=>{
        this.ResolveData();
      })
    }
    else
    {
      let dialogRef=this.dialog.open(ErrorAlertComponent,{
        width:'350px',
        height:'125px',
        data:{
          text: res.message
        }
      })
    }
  })
 }
 else
 {
return;
 }
  })
}

}
