import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { LignePanier } from 'src/app/_model/LignePanier';
import { Photo } from 'src/app/_model/Photo';
import { Product } from 'src/app/_model/Product';
import { UserModel } from 'src/app/_model/UserModel';
import { PhotoServiceService } from 'src/app/_services/photo-service.service';
import { ProductService } from 'src/app/_services/product.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { PanierServiceService } from '../../../../_services/panier-service.service';
import { Panier } from 'src/app/_model/panier';
import { Category } from 'src/app/_model/Category';
import { CategoryServiceService } from 'src/app/_services/category-service.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [MessageService]
})
export class AddProductComponent {
  productDialog: boolean = false;
  product = new Product();
  value5: any;
  user = new UserModel();
  successMessage: string = '';
  msgs: Message[] = [];
  searchByname = "";
  ErrorExist = false;
  products : Product[]=[]
  selectedFiles: File[] = [];
  fileList: File[] = [];
  fileResults: any[] = [];
  msg = "";
  DialogPhoto = false;
  photo = new Photo();
  urlimg: any;
  items !: any[];
  currenProductId !: number;
  currentuser = new UserModel();
  panier = new Panier();
  CratedLineCart = false;
  role = "";
  paniers: Panier[] = [];
  
  lignepaniers: LignePanier[] = [];
  id !: number;
  selectedCategory = "";
  categories: Category[] = [];
  EditproductDialog = false;
  productEdit = new Product();
  constructor(private productservice: ProductService,
    private photoServiceService: PhotoServiceService,
    private router: Router, private authService: UserAuthService,
    private panierServiceService: PanierServiceService,
    private categoryService: CategoryServiceService) { }
  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;
      // this.logotext =   event.target.files[0].name
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      console.log('reader:',reader)

    reader.onload = (_event) => {
      this.msg = "";
      this.urlimg = reader.result;

    }

  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res
      console.log(res)
    }, (error) => {
      console.log(error)
    })
  }
  onFileChange(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = this.selectedFiles.concat(Array.from(files));
    if (this.selectedFiles.length > 0) {

      this.selectedFiles.forEach(file => {
        console.log(file.name);
      });

    }
    if (!event.target.files || event.target.files.length === 0) {
      this.msg = 'You must select at least one image';
      return;
    }

    this.msg = ''; // Clear the message if files are selected

    this.fileList = Array.from(event.target.files);

    for (const file of this.fileList) {
      this.validateAndReadFile(file);
    }
  }
  openDialogPhoto(id:number){
    this.DialogPhoto = true;
    this.currenProductId = id;

  }
  addPhoto(f: NgForm) {
    this.photo.url = this.urlimg
    console.log(this.currenProductId);
    this.photoServiceService.addPhoto(this.photo,this.currenProductId).subscribe(res => {
      console.log(res)
      f.reset();
      this.DialogPhoto = false;
})
  }
validateAndReadFile(file: File) {
  const mimeType = file.type;
  if (!mimeType.match(/image\/*/)) {
    this.msg = "Only images are supported";
    return;
  }


  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (_event) => {

    this.urlimg = reader.result;
  };
}


  ngOnInit(): void {
    this.loadCategories();
    this.user = this.authService.getUser();
    this.id = this.user.id;
    console.log(this.user);
    this.role = this.user.roles[0].role;
    this.loadProducts();
    this.loadPaniers();

  }

  loadPaniers() {
    this.panierServiceService.getAll().subscribe(res => {
      this.paniers = res
      this.paniers = this.paniers.filter(p => p.user.id == this.id)
      console.log("paniers :", this.paniers)
      this.lignepaniers = this.paniers[0]?.lignepaniers
      console.log(this.lignepaniers);
    })
  }
  AddToPanier(produit: Product) {
    let lignePanier = new LignePanier();
    lignePanier.produit = produit;
    console.log(lignePanier);
    this.panierServiceService.create(this.user.id,lignePanier).subscribe(res => {
      this.panier = res
      console.log(this.panier);
      this.loadPaniers();
      this.CratedLineCart = true;
})


  }

  openNew() {
    this.productDialog = true;
  }
  clear(n:any) {

  }
  loadProducts() {
    this.productservice.getAllProducts().subscribe(res => {
    this.products = res
    console.log(res)
    })
  }
  navigate(id: number) {
    // this.router.navigate(["productDetails"], { queryParams: { id: id } })
    this.router.navigateByUrl(`/dashboard/adminPages/productDetails?id=${id}`);

  }
  deleteProduit(id: number) {
    this.productservice.delete(id).subscribe(res => console.log(res));
    this.products = this.products.filter(produit => produit.id != id);
  }
  openEditDialog(product: Product) {
    this.EditproductDialog = true;
    this.productEdit = product
  }
  editProduct() {
    this.productservice.update(this.productEdit.id, this.productEdit).subscribe(res => {
      console.log(res)
      this.EditproductDialog = false;
      this.loadProducts();
    })
  }

  addProduct(productForm: NgForm) {
    console.log(productForm.value)
    this.productservice.addProduct(productForm.value).subscribe(
      (response: Product) => {
        console.log(response);
        // this.successMessage = 'product added successfully!';
        productForm.reset();
        this.loadProducts();

        this.productDialog = false;

      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }





  hideDialog() {
    this.productDialog = false;
}


showSuccessViaMessages() {
  this.msgs = [];
  this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Project added successfully!' });
}
}
