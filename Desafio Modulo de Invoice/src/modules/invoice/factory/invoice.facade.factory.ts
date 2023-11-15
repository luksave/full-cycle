import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindUseCase from "../usecase/find-invoice/find.usecase";
import GenerateUseCase from "../usecase/generate-invoice/generate.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const invoiceRepository = new InvoiceRepository();
        const generateUseCase = new GenerateUseCase(invoiceRepository);
        const findUseCase = new FindUseCase(invoiceRepository);
        return new InvoiceFacade({
            generateUseCase: generateUseCase,
            findUseCase: findUseCase,
        });
    }
    }