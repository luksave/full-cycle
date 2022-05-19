import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";

import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

describe("Test create customer use case", () => {

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


    it("should create a customer", async () => {

        const customerRepository = new CustomerRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "John",
            address: {
                street: "Street", 
                city: "City",
                number: 123, 
                zip: "Zip",
            }
        };

        const output = await usecase.execute(input);

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

    });

});