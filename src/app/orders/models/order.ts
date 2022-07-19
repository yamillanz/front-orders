export interface Order {
  idOrder: number;
  idUser: number;
  orderNumber: number;
  // dateTime: Date;
  dateTime: string;
  providerName: string;
  // dateCreated: Date;
  dateCreated: string;
  observation: string;
  totalValue: number;
  status: boolean | number;
}

export interface OrderDTO extends Partial<Order> {
  userName?: string;
}
