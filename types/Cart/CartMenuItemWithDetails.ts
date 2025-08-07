import { CartMenuItem } from "./CartMenuItem";

export interface CartMenuItemWithDetails extends CartMenuItem {
    slogan: string;
    description: string;
}