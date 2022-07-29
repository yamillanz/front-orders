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

  /**
   * function to adapt the fields from the form to the rest api needs
   * @param product
   * @returns a product with class productDTO
   */
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

  /**
   * get all data from the product's rest api. First filter only the active products (status == 1)
   * return a array of Observables of DTO class
   * @param idOrder type number
   * @returns a array of product DTO into a Observable object
   */
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
  /**
   * get one product calling the rest api.
   * return a Observables of DTO class   *
   * @param idProduct number
   * @returns a product DTO into a Observable object
   */
  getAProduct(idProduct: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(environment.URL_PRODUCTS + idProduct);
  }
  /**
   * save the data from the product calling the rest api post method.
   * @param newProduct type ProductDTO
   * @returns
   */
  saveAProduct(newProduct: ProductDTO): Observable<any> {
    newProduct = { ...this.adapterProduct(newProduct) };
    return this.http.post(environment.URL_PRODUCTS, newProduct);
  }
  /**
   * update the data from the product calling the rest api post method.
   * @param idProduct
   * @param product
   * @returns a observable with the api response
   */
  updateProduct(idProduct: number, product: ProductDTO): Observable<any> {
    product = { ...this.adapterProduct(product) };
    return this.http.put(environment.URL_PRODUCTS + idProduct, product);
  }
}
