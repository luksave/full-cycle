import GenerateUseCase from "./generate.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
        generate: jest.fn(),
    };
};

describe("Generate Invoice usecase unit test", () => {
    it("should generate a invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new GenerateUseCase(invoiceRepository);

        const input = {
            name: "Name 1",
            document: "123456789",
            street: "Rua 1",
            number: "123",
            complement: "Bairro 1",
            city: "Cidade 1",
            state: "Estado 1",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 10,
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 20,
                },
            ],
        };

        const result = await usecase.execute(input);

        expect(invoiceRepository.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);
        expect(result.items[1].id).toBe(input.items[1].id);
        expect(result.items[1].name).toBe(input.items[1].name);
        expect(result.items[1].price).toBe(input.items[1].price);

    });
});
