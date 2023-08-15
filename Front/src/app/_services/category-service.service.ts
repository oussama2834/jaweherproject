import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_model/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  PATH_OF_API = 'http://localhost:8086';

  constructor(private http: HttpClient) { }
  public addCategory(category: Category) {
    return this.http.post<Category>("http://localhost:8086/categories", category);
  }


  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.PATH_OF_API}/categories`);

  }
  public deleteCategory(id: number) {
    return this.http.delete("http://localhost:8086/categories?id="+id);

  }
  public UpdateCategory(category:Category,id: number) {
    return this.http.put("http://localhost:8086/categories?id="+id,category);

  }
}
