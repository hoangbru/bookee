export interface IProduct {
  id?: number;
  title?: string;
  author?: string;
  image?: string;
  publishedDate?: string;
  description?: string;
  price: number;
  quantity?: number;
  reviews?: [];
  promotion?: string;
  promotionId?: string;
  category?: string;
  categoryId?: string;
  stock_quantity?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
