import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleModel } from 'src/app/_model/RoleModel';
import { UserModel } from 'src/app/_model/UserModel';
import { RoleService } from 'src/app/_services/role.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  userForm: FormGroup;
  successMessage: string = '';
 errorMessage: string = '';
  roles!: RoleModel[];
  users!: UserModel[];
  selectedRole!: RoleModel;
  Exists !: boolean;
  ActiveSpinner = false;
  searchByname = "";
  userDialog = false;
  disabledpassword = false;
  user = new UserModel();
  userEdit = new UserModel();
  editDialog = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.userForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      username: ['', Validators.required],
      ville: ['', Validators.required],
      email: ['', Validators.required],
      addresse: ['', Validators.required],
      motDePasse: ['', Validators.required],
      // roles: ['', Validators.required],
    });



  }
  ngOnInit(): void {
    this.loadUsers();
  }
  openNew() {
    this.userDialog = true;
    this.user.adresse = "";
    this.user.email = "";
    this.user.motDePasse = "";
        this.user.nom = "";
        this.user.numero = "";
        this.user.prenom = "";
        this.user.ville = "";
        this.user.username = "";
    console.log(this.userDialog)
  }
  clear(x: any) {

  }



  // onSubmit() {
  //   if (this.userForm.invalid) {
  //     return;
  //   }
  //   this.ActiveSpinner = true;
  //   this.userService.existsbyusername(this.userForm.value.username).subscribe(res => {
  //     this.Exists = res
  //     console.log(this.Exists)
  //     if (!this.Exists) {
  //       this.userService.createUserWithRole(this.userForm.value)
  //         .subscribe(
  //           (response) => {
  //         console.log(response)
  //             console.log('User created successfully!', response);
  //             this.successMessage = "user added successfully!";
  //             // this.showSuccess();
  //             // this.userForm.reset();

  //             this.loadUsers();

  //             this.ActiveSpinner = false;
  //           },
  //           (error) => {
  //             console.log('Error creating user:', error);
  //             // Handle error
  //           }
  //         )
  //     }
  //     // this.showError();

  //   })
  // }
  delete(id:number) {
    this.userService.deleteUser(id).subscribe(res => console.log(res))
    this.users = this.users.filter(u => u.id != id)
  }
  openEditDialog(u :UserModel) {
    this.editDialog = true;
    this.userEdit = u;

  }
  Edit() {
    this.userService.editUser(this.userEdit, this.userEdit.id).subscribe(res => {
      console.log(res)
      this.loadUsers();

      this.editDialog = false;
    })
  }
  onSubmit() {


        this.userService.createUserWithRole(this.user)
          .subscribe(
            (response) => {
          console.log(response)
              console.log('User created successfully!', response);
              this.successMessage = "user added successfully!";
              // this.showSuccess();
              // this.userForm.reset();

              this.loadUsers();

              this.userDialog = false;
            },
            (error) => {
              console.log('Error creating user:', error);
              // Handle error
            }
          )


      // this.showError();


  }




  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (users: UserModel[]) => {
        this.users = users;
       console.log(this.users)
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }




  loadRoles() {
    this.roleService.getAllRoles().subscribe(
      (roles: RoleModel[]) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Error loading roles:', error);
      }
    );
  }


  onDelete(id: number) {
    this.userService.deleteUser(id).subscribe(
      response => {
        console.log(response);
        this.loadUsers();
        // refresh the list, show a success message, etc.
      },
      error => {
        console.error(error);
        // handle the error, show an error message, etc.
      }
    );
  }

  hideDialog() {
    this.userDialog = false;

  }





}
