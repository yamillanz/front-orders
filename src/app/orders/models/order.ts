/**
 * interface that represents the order from the rest api
 */

export interface Order {
  idOrder: number;
  idUser: number;
  orderNumber: number;
  dateTime: string;
  providerName: string;
  dateCreated: string;
  observation: string;
  totalValue: number;
  status: boolean | number;
}
/**
 * interface that represents the partia DTO of the class order base
 */

export interface OrderDTO extends Partial<Order> {
  userName?: string;
}
