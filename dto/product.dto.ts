export interface AddProductDto {
    product_name: string;
    product_img: string;
    product_count: string;
    price: number;
    description: string;
    product_category: string;
    product_size?: string;
    product_color?: string;
}