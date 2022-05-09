import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "Street", 
        city: "City",
        number: 123, 
        zip: "Zip",
    }
};


const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(), 
      create: jest.fn(), //Como o create é void, não preciso fazer nada...
      update: jest.fn(),
    }
}


describe("Unit Test create customer use case", () => {

    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        //CreateCustomerUseCase aceita o parâmetro porque ele pensa que customerRepository é um CustomerRepository
        const customerCreateUsecase = new CreateCustomerUseCase(customerRepository);
    
        const output = await customerCreateUsecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street, 
                number: input.address.number, 
                zip: input.address.zip,
                city: input.address.city,
            }
        });

        const result = await customerCreateUsecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUsecase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
    
        await expect(customerCreateUsecase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUsecase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";
    
        await expect(customerCreateUsecase.execute(input)).rejects.toThrow(
            "Street is required"
        );
    });

    it("should throw an error when number is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUsecase = new CreateCustomerUseCase(customerRepository);

        input.address.number = -1;
    
        await expect(customerCreateUsecase.execute(input)).rejects.toThrow(
            "Number must be greater than zero"
        );
    });

    it("should throw an error when city is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUsecase = new CreateCustomerUseCase(customerRepository);

        input.address.city = "";
    
        await expect(customerCreateUsecase.execute(input)).rejects.toThrow(
            "City is required"
        );
    });


});