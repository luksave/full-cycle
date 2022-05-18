import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const inputA = {
    id: "123",
    name: "Product A",
    price: 10,
};

const product = new Product(inputA.id, inputA.name, inputA.price);

const MockRepository = () => {
    return {
      create:  jest.fn(),
      //Nesse caso, find deve estar implementadoe, pois, para atualizar, o update precisa buscar o item 
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      update: jest.fn(),
    }
}

describe("Unit Test update product use case", () => {

    it("should update a product", async () => {

        const productRepository = MockRepository();
        const productUpdateUsecase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUsecase.execute(inputA);

        expect(output).toEqual(inputA);
    });

    it("should not update a product", () => {
      const productRepository = MockRepository();
      productRepository.update.mockImplementation(() => { 
        throw new Error("Product not updated");
      });

      const customerUpdateUsecase = new UpdateProductUseCase(productRepository);

      expect(()=> { 
        return customerUpdateUsecase.execute(inputA);
      }).rejects.toThrow("Product not updated");
    });


});