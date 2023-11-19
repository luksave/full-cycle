import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.inteface";

export interface UseCaseProps {
    processPaymentUseCase: UseCaseInterface;
}

export default class PaymentFacade implements PaymentFacadeInterface {

    private _processPaymentUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this._processPaymentUseCase = useCaseProps.processPaymentUseCase;
    }
 
    async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this._processPaymentUseCase.execute(input);
    }
}
