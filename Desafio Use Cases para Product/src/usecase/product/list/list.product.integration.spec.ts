import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";

import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list products use case", () => {

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


    it("should list products", async () => {

        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const productA = new Product("123", "Product A", 10);
        const productB = new Product("456", "Product B", 15);
        
        await productRepository.create(productA);
        await productRepository.create(productB);

        //Agora o usecase, que recebe um input e retorna um output

        const input = {}

        const output = await usecase.execute(input);

        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe(productA.id);
        expect(output.products[0].name).toBe(productA.name);
        expect(output.products[0].price).toBe(productA.price);

        expect(output.products[1].id).toBe(productB.id);
        expect(output.products[1].name).toBe(productB.name);
        expect(output.products[1].price).toBe(productB.price);
    });


});