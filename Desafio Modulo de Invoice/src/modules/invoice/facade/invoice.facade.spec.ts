import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceModel } from "../repository/invoice.model";


describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });
    
        sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });
    
    it("should generate a invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();

        const input = {
            id: "1",
            name: "Name 1",
            document: "99999999",

            street: "Rua 1",
            number: "1",
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
    
        await invoiceFacade.generateInvoice(input);

        const invoice = await InvoiceModel.findOne({ where: { id: "1" }});

        console.log("invoice recebido de findOne", invoice);

        expect(invoice).toBeDefined();
        expect(invoice.id).toBe(input.id);
        expect(invoice.document).toBe(input.document);
        expect(invoice.street).toBe(input.street);
        expect(invoice.number).toBe(input.number);
        expect(invoice.complement).toBe(input.complement);
        expect(invoice.city).toBe(input.city);
        expect(invoice.state).toBe(input.state);
        expect(invoice.zipCode).toBe(input.zipCode);
        expect(invoice.items[0].id).toBe(input.items[0].id);
        expect(invoice.items[0].name).toBe(input.items[0].name);
        expect(invoice.items[0].price).toBe(input.items[0].price);
        //Dá para resumir o teste acima com o código abaixo?
        expect(invoice.items[1]).toEqual(input.items[1]);
    });
    
    it("should finda a invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();
    
        const inputCreate = {
            id: "1",
            name: "Name 1",
            document: "123456789",
            
            street: "Rua 1",
            number: "1",
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
    
        await invoiceFacade.generateInvoice(inputCreate);

    
        const invoice = await InvoiceModel.findOne({ where: { id: inputCreate.id}});
        expect(invoice).toBeDefined();
        expect(invoice.id).toBe(inputCreate.id);
        expect(invoice.document).toBe(inputCreate.document);
        expect(invoice.street).toBe(inputCreate.street);
        expect(invoice.number).toBe(inputCreate.number);
        expect(invoice.complement).toBe(inputCreate.complement);
        expect(invoice.city).toBe(inputCreate.city);
        expect(invoice.state).toBe(inputCreate.state);
        expect(invoice.zipCode).toBe(inputCreate.zipCode);
        expect(invoice.items[0].id).toBe(inputCreate.items[0].id);
        expect(invoice.items[0].name).toBe(inputCreate.items[0].name);
        expect(invoice.items[0].price).toBe(inputCreate.items[0].price);
        //Dá para resumir o teste acima com o código abaixo?
        expect(invoice.items[1]).toEqual(inputCreate.items[1]);
        });

    });