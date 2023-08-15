import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';





@NgModule({
    declarations: [
        AddUserComponent
    ],
    imports: [
        CommonModule,
        AddUserRoutingModule,
      ReactiveFormsModule,
        FormsModule,
        TableModule,
        CardModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        ToastModule,
        MessagesModule,
        MessageModule,
      DropdownModule,
      ProgressSpinnerModule,
      FileUploadModule,
      DialogModule,


    ]
})
export class AddUserModule { }
