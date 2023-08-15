import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LignePanier } from '../_model/LignePanier';
import { Observable } from 'rxjs';
import { Panier } from '../_model/panier';
const baseUrl = 'http://localhost:8086/lignepanier/';

@Injectable({
  providedIn: 'root'
})
export class LignepanierServiceService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<LignePanier[]> {
    return this.http.get<LignePanier[]>(baseUrl+"getAll");
  }

  get(id: number): Observable<LignePanier> {
    return this.http.get<LignePanier>(`${baseUrl}get/${id}`);
  }

  create(lignePanier: LignePanier): Observable<LignePanier> {
    return this.http.post<LignePanier>(baseUrl+'post', lignePanier);
  }
  delete(num: number): Observable<Panier> {
    return this.http.delete<Panier>(`${baseUrl}delete/${num}`);
  }
  edit(lignepanier:LignePanier,id:number) {
  return this.http.put<LignePanier>(baseUrl+'edit/'+id,lignepanier)
  }
}
