import { Injectable } from '@angular/core';
import { UserModel } from '../_model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const rolesString = localStorage.getItem('roles');
    return rolesString ? JSON.parse(rolesString) : [];
  }


  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }
  public setUser(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
  }
    getUser():UserModel {
   return  JSON.parse(localStorage.getItem('user') || '');

  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName =='Admin';
  }
  public isUser() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName =='User';
  }
}
