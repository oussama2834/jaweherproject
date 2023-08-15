import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';
import { UserModel } from '../_model/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8086';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) { }

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData);
  }
  public editUser(user: UserModel, id: number) {
    return this.httpclient.put(this.PATH_OF_API+'/users?id='+id,user)
  }
  public existsbyusername(username:string):Observable<boolean> {
    return this.httpclient.post<boolean>(this.PATH_OF_API + '/existByusername',username)
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }




  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
          }
        }
      }
    }
    return isMatch;
  }


  createUserWithRole(user: UserModel): Observable<UserModel> {
    const url = `${this.PATH_OF_API}/users`;
    return this.httpclient.post<UserModel>(url, user);
  }



  getAllUsers(): Observable<UserModel[]> {
    return this.httpclient.get<UserModel[]>(`${this.PATH_OF_API}/users`);
  }





  deleteUser(id: number) {
    return this.httpclient.delete(`${this.PATH_OF_API}/users?id=${id}`);
  }




}
