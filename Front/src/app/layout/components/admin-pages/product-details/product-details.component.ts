import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_model/Product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  id !: number
  product = new Product();
  responsiveOptions: any;
  constructor(private activatedRoute : ActivatedRoute,private productService : ProductService) {

  }
  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.queryParamMap.get('id'));
    this.productService.getProductDetail(this.id).subscribe(res => {
      this.product = res
      console.log(this.product)
    })
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
}
