import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";


const inputA = {
    id: "123",
    name: "Product A",
    price: 10,
};

const product = new Product(inputA.id, inputA.name, inputA.price);

const MockRepository = () => {
    return {
      /** 
       * Estou explicitamente dizendo que toda vez que essa função for chamada, 
       * devo retornar um o objeto customer.
       * Assim se finge que estamos trabalhando com o repositório.
       */
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(), 
      create: jest.fn(),
      update: jest.fn(),
    }
}

describe("Unit Test find product use case", () => {


    it("should find a customer", async () => {

        const productRepository = MockRepository();
        const productFindUsecase = new FindProductUseCase(productRepository);
    
        const input = {
          id: "123",
        };

        const output = {
            id: "123",
            name: "Product A",
            price: 10,
        };

        const result = await productFindUsecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a product", () => {
      const productRepository = MockRepository();
      productRepository.find.mockImplementation(() => { 
        throw new Error("Product not found");
      });

      const productFindUsecase = new FindProductUseCase(productRepository);
      const input = {
        id: "123",
      };

      expect(()=> { 
        return productFindUsecase.execute(input);
      }).rejects.toThrow("Customer not found");
    });


});