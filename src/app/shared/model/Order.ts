import { CartItem } from "./CartItem";
import { User } from "./User";

export interface Order{
    orderBy: User
    orderedItems: Array<CartItem>
    orderDate: Date
}