import { Sequelize } from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../factory/store-catalog.facade.factory";
import { ProductModel } from "../repository/product.model";

describe("StoreCatalogFacade test", () => {
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

    it("should find a product", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        const storeCatalogFacade = StoreCatalogFacadeFactory.create();
        const result = await storeCatalogFacade.find({ id:"1"});

        expect(result.id).toBe("1");
        expect(result.name).toBe("Product 1");
        expect(result.description).toBe("Product 1 description");
        expect(result.salesPrice).toBe(100);
    });

});

