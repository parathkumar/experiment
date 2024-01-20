import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { regionUrls } from '../urls/regionUrls';
import { IApiResponse } from '@shared/interfaces/IApiResponse';
import { IRegionCreate } from '../interfaces/regionModels';
import { ApiService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(private _apiService:ApiService) { }

  getRegionsList():Observable<IApiResponse>{
    return this._apiService.getData(regionUrls.readRegionList);
  }
  createRegion(postObj: IRegionCreate):Observable<IApiResponse>{
    return this._apiService.postData(regionUrls.createRegion,postObj);
  }
  updateRegion(postObj: IRegionCreate):Observable<IApiResponse>{
    return this._apiService.putData(regionUrls.updateRegion,postObj)
  }
  deleteRegion(postObj: any):Observable<IApiResponse>{
    return this._apiService.deleteData(regionUrls.deleteRegion,postObj)
  }
}
