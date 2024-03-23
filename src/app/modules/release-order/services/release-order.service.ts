import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { releaseOrderUrls } from '../urls/releaseOrderUrls';
import { ApiService } from '@core/services';
import { IApiResponse } from '@shared/interfaces/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ReleaseOrderService {

  constructor(private apiService:ApiService) { }
  getReleaseOrdersList():Observable<IApiResponse>{
    return this.apiService.getData(releaseOrderUrls.readReleaseOrderList);
  }
  createReleaseOrder(roObject: any):Observable<IApiResponse>{
    return this.apiService.postData(releaseOrderUrls.createReleaseOrder,roObject);
  }
  deleteReleaseOrder(RoId: number):Observable<IApiResponse>{
    return this.apiService.deleteData(releaseOrderUrls.deleteReleaseOrder,RoId);
  }
  editReleaseOrder(roObject: any):Observable<IApiResponse>{
    return this.apiService.putData(releaseOrderUrls.editReleaseOrder,roObject);
  }
}
