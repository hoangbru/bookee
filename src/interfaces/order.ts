import { IUser } from "./user";

export interface IOrder {
  id?: number;
  code?: string;
  orderType?: string;
  userId?: number;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  amount?: number;
  quantity?: number;
  orderDetails: IOrderDetail[];
  status?: string;
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrderDetail {
    id?: number;
    
    quantity?: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  