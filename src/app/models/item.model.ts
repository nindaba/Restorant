import { Properties } from "./properties.model";

export interface Item extends Properties{
    image: string;
    category: string;
    price: number;
}