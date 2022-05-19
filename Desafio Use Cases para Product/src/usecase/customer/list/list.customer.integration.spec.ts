import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Test list customer use case", () => {

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


    it("should list customers", async () => {

        const customerRepository = new CustomerRepository();
        const usecase = new ListCustomerUseCase(customerRepository);

        const customer1 = CustomerFactory.createWithAddress(
            "John",
            new Address("Street", 123, "Zip", "City")
        );
        
        const customer2 = CustomerFactory.createWithAddress(
            "Jane",
            new Address("Street 2", 456, "Zip 2", "City 2")
        );

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const input = {}

        const output = await usecase.execute(input);

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);

    });

});