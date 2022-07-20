import { ProductService } from './../../services/product.service';
import { ProductDTO } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @Input() idOrder: string = '';
  products: ProductDTO[] = [];

  constructor(private productsSvr: ProductService) {
    // this.gettingDataProducts();
  }

  gettingDataProducts() {
    this.productsSvr.getProducts(+this.idOrder).subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
  ngOnInit(): void {
    this.gettingDataProducts();
  }
  updateProduct(product: ProductDTO) {}
  deleteProduct(product: ProductDTO) {}
  newProductShow() {}
}
