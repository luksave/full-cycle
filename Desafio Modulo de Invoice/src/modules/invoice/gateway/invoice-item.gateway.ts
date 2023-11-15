import InvoiceItems from "../domain/invoice-items.entity";

export default interface InvoiceItemsGateway {
    add(invoiceItems: InvoiceItems): Promise<void>;
    find(id: string): Promise<InvoiceItems>;
}