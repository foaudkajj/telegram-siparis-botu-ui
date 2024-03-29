export enum OrderStatus {
  New = 0,
  UserConfirmed = 1,
  MerchantConfirmed = 2,
  Prepared = 3,
  OrderSent = 4,
  Delivered = 5,
  Canceled = 6,
  FutureOrder = 7,
  ConfirmedFutureOrder = 8,
}
