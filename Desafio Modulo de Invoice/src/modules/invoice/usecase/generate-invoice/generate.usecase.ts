import Address from "../../../@shared/domain/value-object/address.value-objects";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInputDto, GenerateOutputDto } from "./generate.dto";

export default class GenerateUseCase {
    private _invoiceRepository: InvoiceGateway;

    constructor(_invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = _invoiceRepository;
    }

    async execute(input: GenerateInputDto): Promise<GenerateOutputDto> {

        const props = {
            id: new Id(input.id) || new Id(),
            name: input.name,
            document: input.document,
            address: new Address(
                input.address.street,
                input.address.number,
                input.address.complement,
                input.address.city,
                input.address.state,
                input.address.zipCode,
            ),
            items: input.items.map((item) => {
                return new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
                });
            }),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const invoice = new Invoice(props);
        await this._invoiceRepository.generate(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                }
            }),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        }

    }
}