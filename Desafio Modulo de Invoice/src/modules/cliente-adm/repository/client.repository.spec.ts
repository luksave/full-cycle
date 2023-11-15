import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      sequelize.addModels([ClientModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should add a client", async () => {
        const client = new Client({
          id: new Id("1"),
          name: "Client Lucas",
          email: "x@x.com",
          address: "Rua 1",
        });

        const clientRepository = new ClientRepository();
        clientRepository.add(client);

        const result = await ClientModel.findOne({ where: {id: "1"} });
        expect(result).toBeDefined();
        expect(result.id).toBe(client.id.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
    });



    it("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
            name: "Client Lucas",
            email: "x@x.com",
            address: "Rua 1",
            createdAt: new Date(),
            updatedAt: new Date(), 
        });

        const repository = new ClientRepository();
        const result = await repository.find(client.id);

        expect(result.id.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
    });
});



