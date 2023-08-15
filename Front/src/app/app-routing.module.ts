import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './layout/components/auth-layout/login/login.component';
import { AuthGuard } from './_auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: "", redirectTo: "/auth/login", pathMatch: "full" },
      {
        path: 'auth', loadChildren: () =>
          import('./layout/components/auth-layout/auth-layout.module')
            .then(m => m.AuthLayoutModule)
      }
    ]
  },


  {
    path: 'dashboard', component: AppLayoutComponent,
     children: [
      { path: 'adminPages', loadChildren: () =>
        import('./layout/components/admin-pages/admin-pages.module')
          .then(m => m.AdminPagesModule)
      },

    ]
  },
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
