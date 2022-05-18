import CreateProductUseCase from "./create.product.usecase";
import CreateCustomerUseCase from "./create.product.usecase";

const inputA = {
    id: "12314",
    name: "Product A",
    price: 10,
};


const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(), 
      create: jest.fn(), //Como o create é void, não preciso fazer nada...
      update: jest.fn(),
    }
}


describe("Unit Test create product use case", () => {

    it("should create a product A", async () => {
        const productRepository = MockRepository();
        //CreateCustomerUseCase aceita o parâmetro porque ele pensa que customerRepository é um CustomerRepository
        const productCreateUsecase = new CreateProductUseCase(productRepository);
    
        const output = await productCreateUsecase.execute(inputA);

        expect(output).toEqual({
            id: expect.any(String),
            name: inputA.name,
            price: inputA.price,
        });

        const result = await productCreateUsecase.execute(inputA);

        expect(result).toEqual(output);
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUsecase = new CreateProductUseCase(productRepository);

        inputA.name = "";
    
        await expect(productCreateUsecase.execute(inputA)).rejects.toThrow(
            "Name is required"
        );
    });


    it("should throw an error when price is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUsecase = new CreateProductUseCase(productRepository);

        inputA.price = -1;
    
        await expect(productCreateUsecase.execute(inputA)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });

});