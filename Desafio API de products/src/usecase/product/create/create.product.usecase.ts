import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

export default class CreateProductUseCase {
    //Colocamos a interface aqui para que possamos usar qualquer repositório
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
        
        //Esse objeto product não pode passar dessa camada!
        //Apenas DTOs devem perambular entre camadas
        //const product = ProductFactory.create(input.type, input.name, input.price);
        const product = new Product(input.id, input.name, input.price);
        await this.productRepository.create(product);    

        return {
            id: product.id,
            name: product.name, 
            price: product.price,
        };
    }
}