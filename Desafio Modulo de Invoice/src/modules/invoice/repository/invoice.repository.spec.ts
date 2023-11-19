import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceRepository from "./invoice.repository";
import Address from "../../@shared/domain/value-object/address.value-objects";
import InvoiceItems from "../domain/invoice-items.entity";
import { InvoiceItemsModel } from "./invoice-items.model";

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });
    
        sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync( {alter: true} );
    });
    
    afterEach(async () => {
        await sequelize.close();
    });
    

    it("should create a invoice", async () => { 
        const address = new Address(
            "Rua 1",
            "123",
            "Bairro 1",
            "Cidade 1",
            "Estado 1",
            "12345678",
        );

        const invoice = new Invoice({
            id: new Id("1"),
            name: "Name 1",
            document: "00000000",
            address: address,
            items: [
                new InvoiceItems({
                    id: new Id("1"),
                    name: "Product 1",
                    price: 10,
                }),
                new InvoiceItems({
                    id: new Id("2"),
                    name: "Product 2",
                    price: 20,
                }),
            ]
            
        });

        try {
            const invoiceRepository = new InvoiceRepository();
            await invoiceRepository.generate(invoice);

            const todos = await InvoiceModel.findAll();
            console.log("TODOS", todos);
        } catch (error) {
            console.error(error);
        }

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: invoice.id.id },
            include: [InvoiceItemsModel],
        });
    
        expect(invoice.id.id).toEqual(invoiceDb?.id);
        expect(invoice.document).toEqual(invoiceDb?.document);
        expect(invoice.name).toEqual(invoiceDb?.name);
        expect(invoice.address.street).toEqual(invoiceDb?.street);
        expect(invoice.address.number).toEqual(invoiceDb?.number);
        expect(invoice.address.complement).toEqual(invoiceDb?.complement);
        expect(invoice.address.city).toEqual(invoiceDb?.city);
        expect(invoice.address.state).toEqual(invoiceDb?.state);
        expect(invoice.address.zipCode).toEqual(invoiceDb?.zipCode);
        expect(invoice.items[0].id.id).toEqual(invoiceDb?.items[0].id);
        expect(invoice.items[0].name).toEqual(invoiceDb?.items[0].name);
        expect(invoice.items[0].price).toEqual(invoiceDb?.items[0].price);
        expect(invoice.items[1].id.id).toEqual(invoiceDb?.items[1].id);
        expect(invoice.items[1].name).toEqual(invoiceDb?.items[1].name);
        expect(invoice.items[1].price).toEqual(invoiceDb?.items[1].price);
    }, 50000);

    it("should find a invoice", async () => {

        const invoiceProps = {
            id: new Id("1"),
            name: "Name 1",
            document: "123456789",
            address: new Address(
                "Rua 1",
                "123",
                "Bairro 1",
                "Cidade 1",
                "Estado 1",
                "12345678",
            ),
            items: [
                new InvoiceItems({
                    id: new Id("1"),
                    name: "Product 1",
                    price: 10,
                }),
                new InvoiceItems({
                    id: new Id("2"),
                    name: "Product 2",
                    price: 20,
                }),
            ]
        };
        const invoice = new Invoice(invoiceProps);
        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.generate(invoice);
    
        const resultDB = await invoiceRepository.find("1");
    
        expect(resultDB.id.id).toEqual("1");
        expect(resultDB.document).toEqual("123456789");
        expect(resultDB.name).toEqual("Name 1");
        expect(resultDB.address.street).toEqual("Rua 1");
        expect(resultDB.address.number).toEqual("123");
        expect(resultDB.address.complement).toEqual("Bairro 1");
        expect(resultDB.address.city).toEqual("Cidade 1");
        expect(resultDB.address.state).toEqual("Estado 1");
        expect(resultDB.address.zipCode).toEqual("12345678");
        expect(resultDB.items[0].id.id).toEqual("1");
        expect(resultDB.items[0].name).toEqual("Product 1");
        expect(resultDB.items[0].price).toEqual(10);
        expect(resultDB.items[1].id.id).toEqual("2");
        expect(resultDB.items[1].name).toEqual("Product 2");
        expect(resultDB.items[1].price).toEqual(20);
    });  

});
