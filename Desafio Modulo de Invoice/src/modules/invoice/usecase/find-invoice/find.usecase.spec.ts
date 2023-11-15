import Address from "../../../@shared/domain/value-object/address.value-objects";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import FindUseCase from "./find.usecase";


const items = [
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
];

const invoice = new Invoice({
    id: new Id("1"),
    name: "Name 1",
    document: "555555555",
    address: new Address(
        "Rua 1",
        "123",
        "Bairro 1",
        "Cidade 1",
        "Estado 1",
        "12345678",
    ),
    items: items.map((item) => {
        return new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
        });
    }),
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find usecase unit test", () => {

    it("should find a invoice", async () => {
        const invoiceRepository = {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
            generate: jest.fn(),
        };
        const usecase = new FindUseCase(invoiceRepository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.id).toBe("1");
    });

});