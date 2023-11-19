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
        return this._generateUseCase.execute(input);
    }
}