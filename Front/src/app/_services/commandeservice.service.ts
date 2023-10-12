import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../_model/Commande';
import { Observable } from 'rxjs';
const baseUrl ="http://localhost:8086/commande/"

@Injectable({
  providedIn: 'root'
})
export class CommandeserviceService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Commande[]> {
    return this.http.get<Commande[]>(baseUrl+"getAll");
  }

  get(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${baseUrl}get/${id}`);
  }

  create(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(baseUrl+'post', commande);
  }
  validcommand(commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(baseUrl+'valid', commande);
  }
  RefuseCommand(commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(baseUrl+'refuse', commande);
  }
  delete(num: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}delete/${num}`);
  }
}
