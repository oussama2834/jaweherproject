import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  PATH_OF_API='http://localhost:8086';

  constructor(private httpclient: HttpClient) { }


  public addProduct(product: Product){
    return this.httpclient.post<Product>("http://localhost:8086/produits", product);
  }


  public getAllProducts(): Observable<Product[]>{
    return this.httpclient.get<Product[]>(`${this.PATH_OF_API}/produits`);

  }
  update(id:number, produit: Product): Observable<Product> {
    return this.httpclient.put<Product>(`${this.PATH_OF_API}/produits?id=${id}`, produit);
  }

  delete(id: number): Observable<void> {
    return this.httpclient.delete<void>(`${this.PATH_OF_API}/produits?id=${id}`);
  }


  getProductDetail(productId: number): Observable<Product> {
    const url = `${this. PATH_OF_API}/produits/getArticleById?id=${productId}`;
    return this.httpclient.get<Product>(url);
  }


}
