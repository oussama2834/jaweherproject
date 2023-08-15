import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleModel } from 'src/app/_model/RoleModel';
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  providers: []
})
export class AddRoleComponent implements OnInit {



  roleForm: FormGroup;
  roles: RoleModel[]=[];
  role!: RoleModel;






  constructor(private userService: UserService,
   private roleService: RoleService,
   private formBuilder: FormBuilder,

   )  {
    this.roleForm = this.formBuilder.group({
      role: ['', Validators.required],


    });



  }

  deleterole(id: number) {
    this.roleService.deleteRole(id).subscribe(res => console.log(res))
    this.roles = this.roles.filter(role =>role.id !=id)
}




  ngOnInit(): void {
    this.loadRoles();
  }
 



  onSubmit() {
    if (this.roleForm.invalid) {
      return;
    }



    this.roleService.addRole(this.roleForm.value)
      .subscribe(
        (response) => {
          console.log('Role created successfully!', response);
        //  this.successMessage="user added successfully!";


         this.roleForm.reset();
         this.loadRoles();



        },
        (error) => {
          console.error('Error creating user:', error);
          // Handle error
        }
      );
  }


  loadRoles() {
    this.roleService.getAllRoles().subscribe(
      (res) => {
        this.roles = res;
        console.log(this.roles)
      },
      (error) => {
        console.error('Error loading roles:', error);
      }
    );
  }








}
