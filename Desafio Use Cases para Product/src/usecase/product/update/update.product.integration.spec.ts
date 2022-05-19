import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";

import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });


    it("should update a products", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const productA = new Product("123", "Product A", 10);
        
        await productRepository.create(productA);
        
        const inputA = {
            id: "123",
            name: "Product AAA",
            price: 15,
        };

        const output = await usecase.execute(inputA);
  
        expect(output).toEqual({
            id: inputA.id,
            name: inputA.name, 
            price: inputA.price,
        });

    });


});