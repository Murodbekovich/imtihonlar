export interface AddToCartDto {
    product_id: number;
    quantity: number;
}

export interface UpdateCartDto {
    quantity: number;
}