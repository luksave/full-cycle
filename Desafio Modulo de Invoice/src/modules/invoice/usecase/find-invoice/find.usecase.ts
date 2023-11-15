import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInputDto, FindOutputDto } from "./find.dto";

export default class FindUseCase {
    private _invoiceRepository: InvoiceGateway;

    constructor(_invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = _invoiceRepository;
        }
    
    async execute(input: FindInputDto): Promise<FindOutputDto> {
        
        const invoice = await this._invoiceRepository.find(input.id);

        const items = invoice.items.map((item) => {
            return {
                id: item.id.id,
                name: item.name,
                price: item.price,
            }
        });

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
        }

    }
    
}