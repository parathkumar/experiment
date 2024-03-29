export interface IuploadedImage{
    base64: string;
    type: string;
}

export interface IPublicationCreation{
    name: string;
    image: IuploadedImage;
}
export interface IPublication{
 publicationId:number;
 publicationName:string;
 publicationLogo:IuploadedImage;
}