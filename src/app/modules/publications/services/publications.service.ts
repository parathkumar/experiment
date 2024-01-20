import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { publicationUrls } from '../urls/publicationsUrl';
import { ApiService } from '@core/services';
import { IApiResponse } from '@shared/interfaces/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private apiService:ApiService) { }
  getPublicationsList():Observable<IApiResponse>{
    return this.apiService.getData(publicationUrls.readPublicationList);
  }
  createPublication(publicationObject: { PublicationName: any; PublicationLogo: string; }):Observable<IApiResponse>{
    return this.apiService.postData(publicationUrls.createPublication,publicationObject);
  }
  deletePublication(PubId: number):Observable<IApiResponse>{
    return this.apiService.deleteData(publicationUrls.deletePublication,PubId);
  }
  editPublication(Publicationobj: { PublicationId: number; PublicationName: any; PublicationLogo: string; }):Observable<IApiResponse>{
    return this.apiService.putData(publicationUrls.editPublication,Publicationobj);
  }
}
