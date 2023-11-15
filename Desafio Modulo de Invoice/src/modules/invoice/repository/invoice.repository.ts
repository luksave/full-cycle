import Address from "../../@shared/domain/value-object/address.value-objects";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(_invoice: Invoice): Promise<void> {

        //console.log("invoice recebido invoice.repository.ts:", _invoice);

        await InvoiceModel.create({
            id: _invoice.id.id,
            document: _invoice.document,
            name: _invoice.name,
    
            street: _invoice.address.street,
            number: _invoice.address.number,
            complement: _invoice.address.complement,
            city: _invoice.address.city,
            state: _invoice.address.state,
            zipCode: _invoice.address.zipCode,

            items: _invoice.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                };
            }),
            createdAt: new Date(),
            updatedAt: new Date(),
        });


    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: { id },
        });

        if (!invoice) {
            throw new Error(`Invoice with id ${id} not found`);
        }

        const items = invoice.items.map((item) => {
            return new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            });
        });


        return new Invoice({
            id: new Id(invoice.id),
            document: invoice.document,
            name: invoice.name,
            address: new Address(
                invoice.street,
                invoice.number,
                invoice.complement,
                invoice.city,
                invoice.state,
                invoice.zipCode,
            ),
            items: items,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }
}
