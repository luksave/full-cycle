import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";

import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {

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


    it("should create a product", async () => {

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const inputA = {
            id: "12314",
            name: "Product A",
            price: 10,
        };

        const output = await usecase.execute(inputA);

        expect(output).toEqual({
            id: inputA.id,
            name: inputA.name,
            price: inputA.price,
        });

    });

});