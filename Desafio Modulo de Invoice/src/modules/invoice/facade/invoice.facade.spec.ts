import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemsModel } from "../repository/invoice-items.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateUseCase from "../usecase/generate-invoice/generate.usecase";
import FindUseCase from "../usecase/find-invoice/find.usecase";
import InvoiceFacade from "./invoice.facade";


describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });
    
        sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });
    
    it("should create a invoice", async () => {
        const repository = new InvoiceRepository();
        const usecase = new GenerateUseCase(repository);
        const facade = new InvoiceFacade({
            generateUseCase: usecase,
            findUseCase: undefined
        });

        const invoice = {
            id: "1",
            name: "John Doe",
            document: "123456789",
            street: "Street",
            number: "123",
            complement: "Complement",
            city: "City",
            state: "State",
            zipCode: "12345678",
            items: [
                {
                id: "1",
                name: "Item 1",
                price: 100,
            },
                {
                id: "2",
                name: "Item 2",
                price: 200,
            }
            ]   
        };

        const output = await facade.generateInvoice(invoice);
        const resultFind = await InvoiceModel.findOne({ where: { id: output.id }, include: [InvoiceItemsModel]});
        expect(resultFind).toBeDefined();
        expect(resultFind.id).toBeDefined();
        expect(resultFind.name).toBe(invoice.name);
        expect(resultFind.document).toBe(invoice.document);
        expect(resultFind.street).toBe(invoice.street);
        expect(resultFind.number).toBe(invoice.number);
        expect(resultFind.complement).toBe(invoice.complement);
        expect(resultFind.city).toBe(invoice.city);
        expect(resultFind.state).toBe(invoice.state);
        expect(resultFind.zipCode).toBe(invoice.zipCode);
        expect(resultFind.items).toHaveLength(2);
        expect(resultFind.items[0].id).toBe(invoice.items[0].id);
        expect(resultFind.items[0].name).toBe(invoice.items[0].name);
        expect(resultFind.items[0].price).toBe(invoice.items[0].price);
        expect(resultFind.items[1].id).toBe(invoice.items[1].id);
        expect(resultFind.items[1].name).toBe(invoice.items[1].name);
        expect(resultFind.items[1].price).toBe(invoice.items[1].price);
        expect(resultFind.total).toBe(300);
    });
    

    it("should find a invoice", async () => {
        const repository = new InvoiceRepository();
        const CreateUsecase = new GenerateUseCase(repository);
        const FindUsecase = new FindUseCase(repository);
        const facade = new InvoiceFacade({
            generateUseCase: CreateUsecase,
            findUseCase: FindUsecase
        });

        const invoice = {
            id: "1",
            name: "John Doe",
            document: "123456789",
            street: "Street",
            number: "123",
            complement: "Complement",
            city: "City",
            state: "State",
            zipCode: "12345678",
            items: [
                {
                id: "1",
                name: "Item 1",
                price: 100,
            },
                {
                id: "2",
                name: "Item 2",
                price: 200,
            }
            ]   
        };

        const output = await facade.generateInvoice(invoice);

        console.log("OUTPUT",output);

        const entrada = {
            id: output.id,
        };

        const resultFind = await facade.findInvoice(entrada);

        console.log("RESULTADO FIND",resultFind);

        expect(resultFind).toBeDefined();
        expect(resultFind.id).toBeDefined();
        expect(resultFind.name).toBe(invoice.name);
        expect(resultFind.document).toBe(invoice.document);
        expect(resultFind.address.street).toBe(invoice.street);
        expect(resultFind.address.number).toBe(invoice.number);
        expect(resultFind.address.complement).toBe(invoice.complement);
        expect(resultFind.address.city).toBe(invoice.city);
        expect(resultFind.address.state).toBe(invoice.state);
        expect(resultFind.address.zipCode).toBe(invoice.zipCode);
        expect(resultFind.items).toHaveLength(2);
        expect(resultFind.items[0].id).toBe(invoice.items[0].id);
        expect(resultFind.items[0].name).toBe(invoice.items[0].name);
        expect(resultFind.items[0].price).toBe(invoice.items[0].price);
        expect(resultFind.items[1].id).toBe(invoice.items[1].id);
        expect(resultFind.items[1].name).toBe(invoice.items[1].name);
        expect(resultFind.items[1].price).toBe(invoice.items[1].price);
        expect(resultFind.total).toBe(300);
    });
});