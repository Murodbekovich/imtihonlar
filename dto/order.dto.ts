export interface CreateOrderDto {
    items: Array<{
        product_id: number;
        quantity: number;
    }>;
}