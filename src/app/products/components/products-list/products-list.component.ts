import { ProductService } from './../../services/product.service';
import { ProductDTO } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [DialogService],
})
export class ProductsListComponent implements OnInit {
  @Input() idOrder: string = '';
  products: ProductDTO[] = [];

  constructor(
    private productsSvr: ProductService,
    public dialogService: DialogService
  ) {}

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

  newProductShow() {
    const ref = this.dialogService.open(ProductDetailsComponent, {
      header: 'Product Details',
      width: '50%',
    });
    ref.onClose.subscribe(async (product: ProductDTO) => {
      if (product) {
        product.idOrder = +this.idOrder;
        product.status = 1;
        console.log('product', product);

        await firstValueFrom(this.productsSvr.saveAProduct(product));
        this.gettingDataProducts();
        //   delete Product.idOrder;
        //   Product.totalValue = 333.333;
        //   Product.status = 1;
      }
    });
  }
}
