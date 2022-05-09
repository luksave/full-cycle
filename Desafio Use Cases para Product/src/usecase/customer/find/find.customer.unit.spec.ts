import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";


const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("Street", 123, "Zip", "City")
);

const MockRepository = () => {
    return {
      /** 
       * Estou explicitamente dizendo que toda vez que essa função for chamada, 
       * devo retornar um o objeto customer.
       * Assim se finge que estamos trabalhando com o repositório.
       */
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(), 
      create: jest.fn(),
      update: jest.fn(),
    }
}

describe("Unit Test find customer use case", () => {


    it("should find a customer", async () => {

        const customerRepository = MockRepository();
        //FindCustomerUseCase aceita o parâmetro porque ele pensa que customerRepository é um CustomerRepository
        const customerFindUsecase = new FindCustomerUseCase(customerRepository);
        //Agora o usecase, que recebe um input e retorna um output
        const input = {
          id: "123",
        };

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street", 
                city: "City",
                number: 123, 
                zip: "Zip",
            }
        };

        const result = await customerFindUsecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a customer", () => {
      const customerRepository = MockRepository();
      customerRepository.find.mockImplementation(() => { 
        throw new Error("Customer not found");
      });

      const customerFindUsecase = new FindCustomerUseCase(customerRepository);
      const input = {
        id: "123",
      };

      expect(()=> { 
        return customerFindUsecase.execute(input);
      }).rejects.toThrow("Customer note found");
    });


});