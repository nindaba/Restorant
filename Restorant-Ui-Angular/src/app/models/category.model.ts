import { Item } from "./item.model";
import { Properties } from "./properties.model";

export interface Category extends Properties{
    image: string;
    items: string[];
}