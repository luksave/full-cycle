export interface AddProductInputDto {
    id: string;
    name: string;
    description: string;
    salePrice: number;
    purchasePrice: number;
    stock: number;
  }
  
  export interface AddProductOutputDto {
    id: string;
    name: string;
    description: string;
    salePrice: number;
  }