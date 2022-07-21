import { ProductService } from './../../services/product.service';
import { ProductDTO } from './../../models/product';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { firstValueFrom, Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  @Input() idOrder: string = '';
  products: ProductDTO[] = [];
  subs: Subscription = new Subscription();

  constructor(
    private productsSvr: ProductService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  gettingDataProducts() {
    this.subs.add(
      this.productsSvr.getProducts(+this.idOrder).subscribe((data) => {
        console.log(data);
        this.products = data;
      })
    );
  }
  ngOnInit(): void {
    this.gettingDataProducts();
  }

  updateProduct(product: ProductDTO) {
    const ref = this.dialogService.open(ProductDetailsComponent, {
      data: { ...product },
      header: 'Product Details ' + product.idOrderProduct,
      width: '50%',
    });
    ref.onClose.subscribe(async (product: ProductDTO) => {
      if (product) {
        const { idOrderProduct, ...restDataProduct } = product;
        product.idOrder = +this.idOrder;
        await firstValueFrom(
          this.productsSvr.updateProduct(idOrderProduct ?? -1, restDataProduct)
        );
        this.gettingDataProducts();
        //   delete Product.idOrder;
        //   Product.totalValue = 333.333;
        //   Product.status = 1;
      }
    });
  }

  deleteProduct(product: ProductDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected product?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const { idOrderProduct, ...restProduct } = product;
        restProduct.status = 0;
        await firstValueFrom(
          this.productsSvr.updateProduct(idOrderProduct ?? -1, restProduct)
        );
        this.gettingDataProducts();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  newProductShow() {
    const ref = this.dialogService.open(ProductDetailsComponent, {
      header: 'Product Details',
      width: '50%',
    });
    ref.onClose.subscribe(async (product: ProductDTO) => {
      if (product) {
        product.idOrder = +this.idOrder;
        product.status = 1;
        await firstValueFrom(this.productsSvr.saveAProduct(product));
        this.gettingDataProducts();
        //   delete Product.idOrder;
        //   Product.totalValue = 333.333;
        //   Product.status = 1;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
