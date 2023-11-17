import { IProduct } from "./product";
import { IUser } from "./user";

export interface IOrder {
  id?: number;
  code?: string;
  orderType?: string;
  userId?: number;
  fullName?: string;
  email?: string;
  status?: string;
  phone?: string;
  address?: string;
  amount?: number;
  orderDetails?: IOrderDetail[];
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrderDetail {
    id?: number;
    orderId?: number;
    bookId?: number;
    book?: IProduct;
    quantity?: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  