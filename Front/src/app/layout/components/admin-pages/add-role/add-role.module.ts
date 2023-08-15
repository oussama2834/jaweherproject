import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AddRoleRoutingModule } from './add-role-routing.module';
import { AddRoleComponent } from './add-role.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    AddRoleRoutingModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CardModule
  ]
})
export class AddRoleModule { }
