import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  valCheck: string[] = ['remember'];
  error = false;
  password!: string;
  validform = false;
  role = "";
  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    public layoutService: LayoutService) { }



  ngOnInit(): void { }
//   show() {
//     this.messageService.add({
//       severity: 'success', summary: 'Success', detail:
//         'Message Content'
//     });
// }
  login(loginForm: NgForm) {
    this.validform = false;
   let userName = loginForm.value.username
    let userPassword = loginForm.value.motDePasse
    let loginrequest ={userName,userPassword}
    this.error = false;
    if (loginForm.value.username !='' && loginForm.value.motDePasse !='' ) {
      this.userService.login(loginrequest).subscribe(
        (response: any) => {
          // this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);
          this.userAuthService.setUser(response.user);
          this.role = response.user.roles[0]?.role;
          console.log(this.role)
          if (this.role === 'ADMIN' || this.role === 'CLIENT' ) {
            this.router.navigate(['/dashboard/adminPages/addProduct']);
          }


        },
        (error) => {
          console.log(error);
          this.error = true;
        }
      );
    } else {

      // this.validform = true;
    }


  console.log(this.error)
  }
}
