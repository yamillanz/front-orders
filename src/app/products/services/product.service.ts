import { Observable, map } from 'rxjs';
import { ProductDTO } from './../models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private adapterProduct(product: ProductDTO): ProductDTO {
    let productAdapter: ProductDTO = { ...product };

    typeof productAdapter.idOrder === 'string' &&
      (productAdapter.idOrder = +productAdapter?.idOrder);

    typeof productAdapter.qtyBox === 'string' &&
      (productAdapter.qtyBox = +productAdapter?.qtyBox);
    typeof productAdapter.quantity === 'string' &&
      (productAdapter.quantity = +productAdapter?.quantity);

    typeof productAdapter.valueUnit === 'string' &&
      (productAdapter.valueUnit = +productAdapter?.valueUnit);

    typeof productAdapter.volume === 'string' &&
      (productAdapter.volume = +productAdapter?.volume);
    typeof productAdapter.weight === 'string' &&
      (productAdapter.weight = +productAdapter?.weight);

    return productAdapter;
  }

  getProducts(idOrder: number): Observable<ProductDTO[]> {
    return this.http
      .get<ProductDTO[]>(environment.URL_PRODUCTS)
      .pipe(
        map((data) =>
          data.filter(
            (product) => product.idOrder === idOrder && product.status === 1
          )
        )
      );
  }
  getAProduct(idProduct: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(environment.URL_PRODUCTS + idProduct);
  }
  saveAProduct(newProduct: ProductDTO): Observable<any> {
    newProduct = { ...this.adapterProduct(newProduct) };
    return this.http.post(environment.URL_PRODUCTS, newProduct);
  }
  updateProduct(idProduct: number, product: ProductDTO): Observable<any> {
    product = { ...this.adapterProduct(product) };
    return this.http.put(environment.URL_PRODUCTS + idProduct, product);
  }
}
