import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../_model/Photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceService {
  PATH_OF_API = 'http://localhost:8086';

  constructor(private http: HttpClient) { }
  public addPhoto(photo: Photo,id:number) {
    return this.http.post<Photo>("http://localhost:8086/photos?id="+id, photo);
  }
  public getPhotos() {
    return this.http.get<Photo[]>("http://localhost:8086/photos");
  }


}
