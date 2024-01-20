import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomersService } from '../../services/customers.service';
import { MatPaginator } from '@angular/material/paginator';
import { Icustomer } from '../../interfaces/customers';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerActionsModalComponent } from '../customer-actions-modal/customer-actions-modal.component';

import { CustomerMultipleFields } from '../../constants/constants';
import { actionConstants } from 'src/app/shared/constants/common-constants';
import { ConfirmationAlertComponent } from '@shared/components';
import { customMethods } from '@shared/methods/methods';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-customers-container',
  templateUrl: './customers-container.component.html',
  styleUrls: ['./customers-container.component.scss'],
  standalone: true,
  imports: [NgFor, MatFormField,MatLabel,MatOption,MatIconModule,MatTableModule,MatPaginator,MatSelect],
  providers:[CustomersService]
})
export class CustomersContainerComponent implements OnInit{

  constructor(private customerService:CustomersService,private dialog:MatDialog) { }
  customers!: Icustomer[];
  ngOnInit(): void {
    this.getCustomersList()
  }
  displayedColumns: string[] = ['Name','Email','Phone Number','Landmark','Actions'];
  columnMap:any[] = [
    {
      displayText:'Name',
      objName:'name'
    },
    {
      displayText:'Email',
      objName:'email'
    },
    {
      displayText:'Phone Number',
      objName:'phoneNumbers'
    },
    {
      displayText:'Landmark',
      objName:'businessLandmark'
    },
  ];
  dataSource!: MatTableDataSource<Icustomer>;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  get Columns(){
    return Object.values(this.columnMap)
  }
  changeFilterColumn(column: { objName: string | number; }){
    this.dataSource.filterPredicate = (data: Icustomer, filter: string) => {
      return data[column.objName as keyof Icustomer].trim().toLowerCase().indexOf(filter) != -1
    };
  }
  applyFilter(event: any){
    //console.log(event.target.value)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  onAddCustomer(){
    let dialogRef = this.dialog.open(CustomerActionsModalComponent,{
      width:'1000px',
      height:'510px',
      data:{type:actionConstants.create,data:{}}
    })
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getCustomersList();
      }
    });
  }

  onEditCustomer(customer:Icustomer){
    let customerData = customMethods.reduceToPrimary(customer,CustomerMultipleFields.fields);
    let dialogRef = this.dialog.open(CustomerActionsModalComponent,{
      width:'1000px',
      height:'510px',
      data:{type:actionConstants.edit,data:customerData}
    })
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getCustomersList();
      }
    });
  }

  onDelete(customer:Icustomer){
    let isDeleted:boolean;
    let dialogRef = this.dialog.open(ConfirmationAlertComponent,{
      width:'350px',
      height:'120px',
      data:{
        text:"Are sure you want to delete customer "+customer.name +'?',
        isDelete:true
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.customerService.deleteCustomer(customer.id).subscribe((res)=>{
          isDeleted = res.result;
        },()=>{},
        ()=>{
          if(isDeleted){
            this.getCustomersList();
          }
        })
        
      }
    })
  }
  
  // api call functions
  getCustomersList(){
    this.customerService.getCustomersList().subscribe((res)=>{      
      this.customers = res.result;
    },
    ()=>{},
    ()=>{
      for(let i=0;i<this.customers.length;i++){
        this.customers[i] = customMethods.reduceToPrimary(this.customers[i],CustomerMultipleFields.fields);
      }
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
    })
  }


}
