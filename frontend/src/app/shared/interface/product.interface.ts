

export interface CategoryResponse{
    id:number;
    name:string;
    slug:string;
}

export interface ProductResponse{
    id:number;
    name:number;
    category:CategoryResponse;
    category_id:number;
}