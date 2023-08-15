import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/_model/Category';
import { CategoryServiceService } from 'src/app/_services/category-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  searchByname = "";
  categoryDialog = false;
  editDialog = false;
  categorie = new Category();
  editCategory = new Category();
  categories: Category[] = [];

  constructor(private categoryService:CategoryServiceService) {

  }
  ngOnInit(): void {
    this.loadCategories();
  }
  openNew() {
    this.categoryDialog = true;
  }
  hideDialog() {
    this.categoryDialog = false;
    this.editDialog= false;

  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res
      console.log(res)
    }, (error) => {
      console.log(error)
    })
  }
  delete(id:number) {
    this.categoryService.deleteCategory(id).subscribe(res => res)
    this.categories = this.categories.filter(c =>c.id != id)
  }
  Edit() {
    this.categoryService.UpdateCategory(this.editCategory, this.editCategory.id)
      .subscribe(res => {
        console.log(res)
        this.editDialog = false;
        this.loadCategories();
      })
  }
  openEditDialog(category:Category) {
    this.editDialog = true;
    this.editCategory = category;
  }
  onSubmit(categoryForm:NgForm) {
    this.categoryService.addCategory(this.categorie).subscribe((res) =>
    {
      console.log(res)
      this.categoryDialog = false;
      this.loadCategories();
      categoryForm.onReset();

    },
      (error) => {
      console.log(error)
    })
  }
  clear(x: any) {

  }
}
