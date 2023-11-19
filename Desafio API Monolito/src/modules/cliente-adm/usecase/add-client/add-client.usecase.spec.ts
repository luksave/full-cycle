import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
      add: jest.fn(),
      find: jest.fn(),
    };
};

describe("Add client usecase unit test" , () => {
    it("should add a client", async () => {
        const clientRepository = MockRepository();
        const usecase = new AddClientUseCase(clientRepository);

        const input = {
            id: "1",
            name: "Client 1",
            document: "123456789",
            email: "client@email.com",
            street: "Rua 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "12345678",
        };

        const result = await usecase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.email).toBe(input.email);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
    });
});


