import { IUser } from "./user";

export interface IReview {
  id?: number;
  userId?: string;
  bookId?: number;
  user: IUser;
  rating?: string | number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
