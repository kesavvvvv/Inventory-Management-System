export interface orderReports {
  orderId: number;
  orderQuantity: number;
  customerId: number;
  productId: number;
  dateOfPurchase: Date;
  status: String;
  paid: String;
  paymentMethod: String;
}
