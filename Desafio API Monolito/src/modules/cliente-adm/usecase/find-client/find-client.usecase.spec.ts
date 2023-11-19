import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "Client 1",
    document: "123456789",
    email: "x@x.com",
    street: "Street 1",
    number: "123",
    complement: "Complement 1",
    city: "City 1",
    state: "State 1",
    zipCode: "12345678",
});

const MockRepository = () => {
    return {
      add: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
  };

describe("Find Client Usecase unit test", () => {
    it("should return client", async () => {
        const clientRepository = MockRepository();
        const usecase = new FindClientUseCase(clientRepository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(clientRepository.find).toHaveBeenCalledWith("1");
        expect(result.id).toBe(input.id);
        expect(result.name).toBe(client.name);
        expect(result.document).toBe(client.document);
        expect(result.email).toBe(client.email);
        expect(result.street).toBe(client.street);
        expect(result.number).toBe(client.number);
        expect(result.complement).toBe(client.complement);
        expect(result.city).toBe(client.city);
        expect(result.state).toBe(client.state);
        expect(result.zipCode).toBe(client.zipCode);        
        expect(result.createdAt).toBe(client.createdAt);
        expect(result.updatedAt).toBe(client.updatedAt);
    });
});
