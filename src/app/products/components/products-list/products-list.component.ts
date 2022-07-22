import { ProductService } from './../../services/product.service';
import { ProductDTO } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { firstValueFrom, Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class ProductsListComponent implements OnInit {
  @Input() idOrder: string = '';
  products: ProductDTO[] = [];
  products$: Observable<ProductDTO[]> = new Observable<ProductDTO[]>();

  constructor(
    private productsSvr: ProductService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  /**
   * create a dialog object of "ProductDetailsComponent" type with certain characteristics
   */
  private createOrderDetailsDialog(dataInput: any = null) {
    return this.dialogService.open(ProductDetailsComponent, {
      header: 'Order Details',
      width: '60%',
      data: { ...dataInput },
    });
  }
  /**
   * get all products calling the rest api and put it into "orders" variable
   * add the subscription result into "sub" variable for do unsubscribe later
   */
  gettingDataProducts() {
    this.products$ = this.productsSvr.getProducts(+this.idOrder);
  }

  ngOnInit(): void {
    this.gettingDataProducts();
  }
  /**
   * create and show the dialog with product's form, next, after close the dialog
   * get the data and send it to the rest api""
   */
  newProductShow() {
    const dialogProduct = this.createOrderDetailsDialog();
    dialogProduct.onClose.subscribe(async (product: ProductDTO) => {
      if (product) {
        product.idOrder = +this.idOrder;
        product.status = 1;
        await firstValueFrom(this.productsSvr.saveAProduct(product));
        this.gettingDataProducts();
      }
    });
  }

  /**
   * create and show the dialog with product's form, next, after close the dialog
   * get the data and send it to the rest api ""
   */
  updateProduct(product: ProductDTO) {
    const dialogProduct = this.createOrderDetailsDialog(product);
    dialogProduct.onClose.subscribe(async (product: ProductDTO) => {
      if (product) {
        const { idOrderProduct, ...restDataProduct } = product;
        product.idOrder = +this.idOrder;
        await firstValueFrom(
          this.productsSvr.updateProduct(idOrderProduct ?? -1, restDataProduct)
        );
        this.gettingDataProducts();
      }
    });
  }

  /**
   * function to do a logical delete to the order, first ask for confirm, then send
   * the data to the rest api and finally send a confirmation messages
   */
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
}
