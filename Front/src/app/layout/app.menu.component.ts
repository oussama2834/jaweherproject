import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { UserModel } from '../_model/UserModel';
import { CategoryServiceService } from '../_services/category-service.service';
import { Category } from '../_model/Category';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  user = new UserModel();
  role = "";
  model: any[] = [];
  categories: Category[] = [];
  constructor(public layoutService: LayoutService,
    public userService: UserService,private authService:UserAuthService,private categoruservice :CategoryServiceService) { }

  ngOnInit() {
    this.categoruservice.getAllCategories().subscribe(res => {
      this.categories = res;

    })
    this.user = this.authService.getUser();
    console.log(this.user)
    this.role = this.user.roles[0].role
    if (this.role == 'ADMIN'){
      this.model = [
        {
          label: 'Home',
          items: [
            // {
            //   label: 'Admin dashboard',
            //   icon: 'pi pi-fw pi-home',
            //   routerLink: ['/'],
            // },
            {
              label: 'Products management', icon: 'pi pi-fw pi-briefcase',
              items: [
                {

                  label: 'Products', icon: 'pi pi-fw pi-bookmark',
                  routerLink: ['/dashboard/adminPages/addProduct'],
                },

                {
                  label: 'Categories', icon: 'pi pi-fw pi-bookmark',
                  routerLink: ['/dashboard/adminPages/addCategory'],


                },

              ]
            },
            {
              label: 'Accounts management', icon: 'pi pi-fw pi-users',
              items: [
                {
                  label: 'Users ', icon: 'pi pi-fw pi-user-plus',
                  routerLink: ['/dashboard/adminPages/addUser'],
                },
                {
                  label: 'roles', icon: 'pi pi-fw pi-user',
                  routerLink: ['/dashboard/adminPages/addRole'],
                },
                {

                },


              ]
            },
            {
              label: 'Orders', icon: 'pi pi-shopping-bag',
              routerLink: ['/dashboard/adminPages/commandes'],
            }
          ]

        },

      ];
    } else {
      this.model = [
        {
          label: 'Home',
          items: [

            {
              label: 'Products', icon: 'pi pi-fw pi-briefcase',
              routerLink: ['/dashboard/adminPages/addProduct'],


            },
            {
              label: 'Orders', icon: 'pi pi-shopping-bag',
              routerLink: ['/dashboard/adminPages/commandes'],
            }
          ]

        },

      ];
    }



  }

}
