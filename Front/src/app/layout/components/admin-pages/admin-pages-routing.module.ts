import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_auth/auth.guard';
import { CategoryScale } from 'chart.js';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path:'',redirectTo:'addProject',pathMatch:'full'},
  {
    path: 'addProduct',
    loadChildren: () => import('./add-product/add-product.module')
      .then(m => m.AddProjectModule)
    // , canActivate: [AuthGuard], data: { roles: ['ADMIN'] }
  },
  {
    path: 'addUser', loadChildren:
      () => import('./add-user/add-user.module').then(m => m.AddUserModule),
    // canActivate: [AuthGuard], data: { roles: [{ role: 'ADMIN' }] }
  },
  {
    path: 'addRole', loadChildren: () =>
      import('./add-role/add-role.module').
        then(m => m.AddRoleModule)
    // , canActivate: [AuthGuard], data: { roles: ['ADMIN'] }
  },
  {
    path: 'addCategory', component:AddCategoryComponent
    // , canActivate: [AuthGuard], data: { roles: ['ADMIN'] }
  },
  { path: 'productDetails', loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule) },
  { path: 'productDetails/:id',component:ProductDetailsComponent },
  { path: 'commandes', loadChildren: () => import('../commandes/commandes.module').then(m => m.CommandesModule) },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
