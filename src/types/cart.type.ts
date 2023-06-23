import { Product } from "./product.type";

export interface Cart extends Product {
  numberCount: number;
  totalCount: number;
}
