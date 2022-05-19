import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUseCase from "./update.usecase";


describe("Test update customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        sequelize.addModels([CustomerModel]);
        
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });


    it("should update a customer", async () => {

        const customerRepository = new CustomerRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        const customer = CustomerFactory.createWithAddress(
            "John",
            new Address("Street", 123, "Zip", "City")
        );

        await customerRepository.create(customer);

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

        const output = await usecase.execute(input);

        expect(output).toEqual(input);

    });

});