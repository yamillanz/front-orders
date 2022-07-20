export interface Products {
  idOrderProduct: number;
  idOrder: number;
  valueUnit: number;
  unit: number;
  descriptionProd: string;
  sku: string;
  quantity: number;
  qtyBox: number;
  weight: number;
  volume: number;
  mark: string;
  status: number;
}
export interface ProductDTO extends Partial<Products> {}
