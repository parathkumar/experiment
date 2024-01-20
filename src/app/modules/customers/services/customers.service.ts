import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { customerUrls } from '../urls/customerUrls';
import { ApiService } from '@core/services';
import { IApiResponse } from '@shared/interfaces/IApiResponse';
import { Icustomer } from '../interfaces/customers';


@Injectable()
export class CustomersService {

  constructor(private apiService:ApiService) { }
  getCustomersList():Observable<IApiResponse>{
    return this.apiService.getData(customerUrls.readCustomersList);
  }
  createCustomer(postObj: Icustomer):Observable<IApiResponse>{
    return this.apiService.postData(customerUrls.createCustomer,postObj);
  }
  updateCustomer(putObj: Icustomer):Observable<IApiResponse>{
    return this.apiService.putData(customerUrls.updateCustomer,putObj);
  }
  deleteCustomer(customerId: string | undefined):Observable<IApiResponse>{
    return this.apiService.deleteData(customerUrls.deleteCustomer,customerId);
  }
}
