import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panier } from '../_model/panier';
import { Observable } from 'rxjs';
import { LignePanier } from '../_model/LignePanier';

const baseUrl = 'http://localhost:8086/panier/';
@Injectable({
  providedIn: 'root'
})
export class PanierServiceService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<Panier[]> {
    return this.http.get<Panier[]>(baseUrl + "getAll");
  }

  get(id: number): Observable<Panier> {
    return this.http.get<Panier>(`${baseUrl}get/${id}`);
  }
  // edit(panier: Panier): Observable<Panier> {
  //   return this.http.put<Panier>(`${baseUrl}`,panier);
  // }
  create(userId: number, produit: LignePanier): Observable<Panier> {
    return this.http.post<Panier>(baseUrl + 'post/' + userId, produit);
  }
  delete(num: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}delete/${num}`);
  }
}
