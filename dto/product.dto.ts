export interface AddProductDto {
    product_name: string;
    product_img: string;
    product_count: number;
    price: number;
    description: string;
    product_category: number;
    product_size?: string;
    product_color?: string;
}

export interface UpdateProductDto {
    product_name?: string;
    product_img?: string;
    product_count?: number;
    price?: number;
    description?: string;
    product_category?: number;
    product_size?: string;
    product_color?: string;
}