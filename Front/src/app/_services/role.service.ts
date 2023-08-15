import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleModel } from '../_model/RoleModel';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${this.baseUrl}/roles`);
  }


  public addRole(role: RoleModel){
    return this.http.post<RoleModel>("http://localhost:8086/roles", role);
  }
  public deleteRole(id: number) {
    return this.http.delete("http://localhost:8086/roles?id="+id);

  }




}
