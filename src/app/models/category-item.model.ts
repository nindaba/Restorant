import { Item } from "./item.model";
import { Properties } from "./properties.model";

export interface CategoryItem extends Properties{
    image: string;
    items: Item[];
}