import Id from "../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
    FindInvoiceUseCaseInputDTO,
    FindInvoiceUseCaseOutputDTO,
    GenerateInvoiceUseCaseInputDto,
    GenerateInvoiceUseCaseOutputDto,
    } from "./invoice.facade.interface";

export interface UseCasesProps {
    findUseCase: UseCaseInterface;
    generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findUseCase: UseCaseInterface;
    private _generateUseCase: UseCaseInterface;

    constructor(usecasesProps: UseCasesProps) {
        this._findUseCase = usecasesProps.findUseCase;
        this._generateUseCase = usecasesProps.generateUseCase;
    }

    findInvoice(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        return this._findUseCase.execute(input);
    }
    generateInvoice(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        //Aqui o DTO está diferente do input do caso de uso, então é necessário converter o DTO da facade para o DTO do caso de uso
        console.log("input recebido generateInvoicefacade 090000:", input);

        const inputUseCase = {
            id: input.id,
            name: input.name,
            document: input.document,
            address: {
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            },
            items: input.items.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                };
            }),
        };


        console.log("inputUseCase recebido invoice-item.repository:", inputUseCase);
        return this._generateUseCase.execute(inputUseCase);
    }
}