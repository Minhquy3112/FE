import { IUser } from "./user";

export interface IBill {
  _id: string;
  name: string;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  userId: IUser;
  cartId: any;
  phone: number;
  totalPrice: number
  status: any;
}
