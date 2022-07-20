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

  getProducts(idOrder: number): Observable<ProductDTO[]> {
    return this.http
      .get<ProductDTO[]>(environment.URL_PRODUCTS)
      .pipe(
        map((data) => data.filter((product) => product.idOrder === idOrder))
      );
  }
  saveAProduct(newProduct: ProductDTO) {}
  getAProduct(idProduct: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(environment.URL_PRODUCTS + idProduct);
  }
}
