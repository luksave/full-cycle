import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("Street", 123, "Zip", "City")
);

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Street Updated", 
        number: 1234,
        zip: "Zip Updated", 
        city: "City Updated",
    },
};

const MockRepository = () => {
    return {
      create:  jest.fn(),
      //Nesse caso, find deve estar implementadoe, pois, para atualizar, o update precisa buscar o item 
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      update: jest.fn(),
    }
}

describe("Unit Test update customer use case", () => {

    it("should update a customer", async () => {

        const customerRepository = MockRepository();
        //FindCustomerUseCase aceita o parâmetro porque ele pensa que customerRepository é um CustomerRepository
        const customerUpdateUsecase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUsecase.execute(input);

        expect(output).toEqual(input);
    });

    it("should not update a customer", () => {
      const customerRepository = MockRepository();
      customerRepository.update.mockImplementation(() => { 
        throw new Error("Customer not updated");
      });

      const customerUpdateUsecase = new UpdateCustomerUseCase(customerRepository);

      expect(()=> { 
        return customerUpdateUsecase.execute(input);
      }).rejects.toThrow("Customer not updated");
    });


});